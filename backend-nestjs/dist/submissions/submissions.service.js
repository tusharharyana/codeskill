"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SubmissionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionsService = exports.SubmissionStatus = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const submission_entity_1 = require("../database/entities/submission.entity");
const user_entity_1 = require("../database/entities/user.entity");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const app_gateway_1 = require("../gateway/app.gateway");
const redis_service_1 = require("../redis/redis.service");
const execution_types_1 = require("../execution/execution.types");
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["QUEUED"] = "queued";
    SubmissionStatus["PENDING"] = "pending";
    SubmissionStatus["RUNNING"] = "running";
    SubmissionStatus["ACCEPTED"] = "accepted";
    SubmissionStatus["WRONG_ANSWER"] = "wrong_answer";
    SubmissionStatus["TIME_LIMIT_EXCEEDED"] = "time_limit_exceeded";
    SubmissionStatus["MEMORY_LIMIT_EXCEEDED"] = "memory_limit_exceeded";
    SubmissionStatus["COMPILATION_ERROR"] = "compilation_error";
    SubmissionStatus["RUNTIME_ERROR"] = "runtime_error";
    SubmissionStatus["INTERNAL_ERROR"] = "internal_error";
    SubmissionStatus["CANCELLED"] = "cancelled";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
let SubmissionsService = SubmissionsService_1 = class SubmissionsService {
    submissionRepo;
    userRepo;
    submissionQueue;
    appGateway;
    redisService;
    logger = new common_1.Logger(SubmissionsService_1.name);
    constructor(submissionRepo, userRepo, submissionQueue, appGateway, redisService) {
        this.submissionRepo = submissionRepo;
        this.userRepo = userRepo;
        this.submissionQueue = submissionQueue;
        this.appGateway = appGateway;
        this.redisService = redisService;
    }
    async createSubmission(userId, data) {
        const { status: _untrustedStatus, runtime: _untrustedRuntime, memory: _untrustedMemory, testCasesPassed: _untrustedPassed, totalTestCases: _untrustedTotal, ...submissionData } = data;
        if (!submissionData.code || typeof submissionData.code !== 'string') {
            throw new common_1.BadRequestException('Missing or invalid code');
        }
        if (!submissionData.language ||
            typeof submissionData.language !== 'string') {
            throw new common_1.BadRequestException('Missing or invalid language');
        }
        if (!submissionData.problemId) {
            throw new common_1.BadRequestException('Missing problemId');
        }
        const langLower = submissionData.language.toLowerCase();
        if (!execution_types_1.SUPPORTED_LANGUAGES.includes(langLower)) {
            throw new common_1.BadRequestException(`Unsupported language: "${submissionData.language}". Supported: ${execution_types_1.SUPPORTED_LANGUAGES.join(', ')}`);
        }
        if (Buffer.byteLength(submissionData.code, 'utf8') > 1_000_000) {
            throw new common_1.BadRequestException('Source code exceeds the 1MB limit');
        }
        const submission = this.submissionRepo.create({
            userId,
            user: { id: userId },
            problemId: submissionData.problemId,
            problem: { id: submissionData.problemId },
            code: submissionData.code,
            language: submissionData.language,
            status: SubmissionStatus.QUEUED,
            queuedAt: new Date(),
            testResults: [],
        });
        await this.submissionRepo.save(submission);
        const client = this.redisService.getClient();
        if (client) {
            await client.incr(`active:submissions:${userId}`);
            await client.expire(`active:submissions:${userId}`, 120);
        }
        await this.submissionQueue.add('evaluate-code', {
            submissionId: submission.id,
            problemId: submissionData.problemId,
            code: submissionData.code,
            language: submissionData.language,
            userId,
        }, {
            jobId: String(submission.id),
            attempts: 2,
            backoff: { type: 'exponential', delay: 2_000 },
            removeOnComplete: { age: 24 * 60 * 60, count: 5000 },
            removeOnFail: { age: 7 * 24 * 60 * 60, count: 5000 },
        });
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (user) {
            const stats = user.stats || {};
            user.stats = {
                ...stats,
                totalSubmissions: (stats.totalSubmissions || 0) + 1,
            };
            await this.userRepo.save(user);
        }
        this.appGateway.emitToUser(userId, 'submission_status', {
            submissionId: submission.id,
            status: SubmissionStatus.QUEUED,
            problemId: submissionData.problemId,
            queuedAt: submission.queuedAt,
        });
        return { ...submission, _id: submission.id };
    }
    async getSubmissionById(userId, submissionId, isAdmin = false) {
        const submission = await this.submissionRepo.findOne({
            where: [{ id: submissionId }, { mongoId: submissionId }],
            relations: { user: true },
        });
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        if (!isAdmin && submission.userId !== userId && submission.user?.id !== userId) {
            throw new common_1.ForbiddenException('Access denied to this submission');
        }
        return { ...submission, _id: submission.id };
    }
    async getSubmissionResult(userId, submissionId, isAdmin = false) {
        const submission = await this.getSubmissionById(userId, submissionId, isAdmin);
        return {
            submissionId: submission.id,
            _id: submission.id,
            status: submission.status,
            runtime: submission.runtime ?? submission.executionTime,
            memory: submission.memory ?? submission.memoryUsed,
            testCasesPassed: submission.testCasesPassed ?? submission.testsPassed,
            totalTestCases: submission.totalTestCases ?? submission.totalTests,
            compileOutput: submission.compileOutput ?? submission.errorMessage,
            testResults: submission.testResults || [],
            queuedAt: submission.queuedAt,
            startedAt: submission.startedAt,
            completedAt: submission.completedAt,
        };
    }
    async cancelSubmission(userId, submissionId, isAdmin = false) {
        const submission = await this.submissionRepo.findOne({
            where: [{ id: submissionId }, { mongoId: submissionId }],
        });
        if (!submission) {
            throw new common_1.NotFoundException('Submission not found');
        }
        if (!isAdmin && submission.userId !== userId) {
            throw new common_1.ForbiddenException('Access denied to this submission');
        }
        if (submission.status !== SubmissionStatus.QUEUED &&
            submission.status !== 'pending') {
            throw new common_1.BadRequestException(`Cannot cancel submission with status "${submission.status}". Only queued submissions can be cancelled.`);
        }
        try {
            const job = await this.submissionQueue.getJob(submissionId);
            if (job) {
                await job.remove();
            }
        }
        catch (err) {
            this.logger.warn(`Could not remove job ${submissionId} from queue: ${err.message}`);
        }
        submission.status = SubmissionStatus.CANCELLED;
        submission.completedAt = new Date();
        await this.submissionRepo.save(submission);
        const client = this.redisService.getClient();
        if (client) {
            await client.decr(`active:submissions:${userId}`);
        }
        this.appGateway.emitToUser(userId, 'submission_status', {
            submissionId: submission.id,
            status: SubmissionStatus.CANCELLED,
            message: 'Submission cancelled by user',
        });
        return { success: true, message: 'Submission cancelled successfully' };
    }
    async getSubmissionsByProblem(userId, problemId) {
        const list = await this.submissionRepo.find({
            where: { userId, problemId },
            order: { createdAt: 'DESC' },
            take: 20,
        });
        return list.map((s) => ({ ...s, _id: s.id }));
    }
    async getRecentSubmissions(userId) {
        const list = await this.submissionRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: 20,
        });
        return list.map((s) => ({ ...s, _id: s.id }));
    }
    async getSubmissionsByUser(userId, query) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
        const skip = (page - 1) * limit;
        const where = { userId };
        if (query.problemId)
            where.problemId = query.problemId;
        if (query.status)
            where.status = query.status;
        const [submissions, total] = await this.submissionRepo.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return {
            submissions: submissions.map((s) => ({ ...s, _id: s.id })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserStats(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            select: {
                id: true,
                stats: true,
                badges: true,
                activityMap: true,
                name: true,
                avatar: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const totalSubmissions = await this.submissionRepo.count({
            where: { userId },
        });
        const acceptedSubmissions = await this.submissionRepo.count({
            where: { userId, status: 'accepted' },
        });
        return {
            user: { ...user, _id: user.id },
            totalSubmissions,
            acceptedSubmissions,
            acceptanceRate: totalSubmissions > 0
                ? (acceptedSubmissions / totalSubmissions) * 100
                : 0,
        };
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = SubmissionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, bullmq_1.InjectQueue)('submissions')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        bullmq_2.Queue,
        app_gateway_1.AppGateway,
        redis_service_1.RedisService])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map