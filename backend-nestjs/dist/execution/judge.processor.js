"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JudgeProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JudgeProcessor = exports.SubmissionStatus = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const execution_service_1 = require("./execution.service");
const submission_entity_1 = require("../database/entities/submission.entity");
const problem_metadata_entity_1 = require("../database/entities/problem-metadata.entity");
const problem_testcase_entity_1 = require("../database/entities/problem-testcase.entity");
const user_entity_1 = require("../database/entities/user.entity");
const app_gateway_1 = require("../gateway/app.gateway");
const redis_service_1 = require("../redis/redis.service");
const execution_types_1 = require("./execution.types");
const os = __importStar(require("os"));
var SubmissionStatus;
(function (SubmissionStatus) {
    SubmissionStatus["QUEUED"] = "queued";
    SubmissionStatus["RUNNING"] = "running";
    SubmissionStatus["TESTING"] = "testing";
    SubmissionStatus["ACCEPTED"] = "accepted";
    SubmissionStatus["WRONG_ANSWER"] = "wrong_answer";
    SubmissionStatus["TIME_LIMIT_EXCEEDED"] = "time_limit_exceeded";
    SubmissionStatus["MEMORY_LIMIT_EXCEEDED"] = "memory_limit_exceeded";
    SubmissionStatus["COMPILATION_ERROR"] = "compilation_error";
    SubmissionStatus["RUNTIME_ERROR"] = "runtime_error";
    SubmissionStatus["SYSTEM_ERROR"] = "system_error";
})(SubmissionStatus || (exports.SubmissionStatus = SubmissionStatus = {}));
const WORKER_CONCURRENCY = Number(process.env.WORKER_CONCURRENCY) || 10;
let JudgeProcessor = JudgeProcessor_1 = class JudgeProcessor extends bullmq_1.WorkerHost {
    executionService;
    submissionRepo;
    problemModel;
    testCaseModel;
    userRepo;
    appGateway;
    redisService;
    logger = new common_1.Logger(JudgeProcessor_1.name);
    runnerId = process.env.RUNNER_ID || `runner-${os.hostname()}-${process.pid}`;
    constructor(executionService, submissionRepo, problemModel, testCaseModel, userRepo, appGateway, redisService) {
        super();
        this.executionService = executionService;
        this.submissionRepo = submissionRepo;
        this.problemModel = problemModel;
        this.testCaseModel = testCaseModel;
        this.userRepo = userRepo;
        this.appGateway = appGateway;
        this.redisService = redisService;
        this.logger.log(`JudgeProcessor initialized on runner: ${this.runnerId} (concurrency: ${WORKER_CONCURRENCY})`);
    }
    async process(job) {
        this.logger.log(`[Judge:${this.runnerId}] Processing job ${job.id} — type: ${job.name}`);
        if (job.name === 'run-code') {
            const { code, language, testCases, config = {}, userId } = job.data;
            if (userId) {
                this.appGateway.emitToUser(userId, 'run_status', {
                    jobId: job.id,
                    status: 'running',
                    message: `Running code in isolated container sandbox...`,
                });
            }
            const results = await this.executionService.executeCode(language, code, testCases, config);
            const passedCount = results.filter((result) => result.passed).length;
            const status = this.overallStatus(results);
            const payload = {
                success: true,
                status,
                results,
                runtime: results.reduce((total, result) => total + (result.executionTime || 0), 0),
                passedCount,
                totalCount: results.length,
            };
            if (userId) {
                this.appGateway.emitToUser(userId, 'run_complete', {
                    jobId: job.id,
                    ...payload,
                });
            }
            return payload;
        }
        if (job.name === 'evaluate-code') {
            const { submissionId, problemId, code, language, userId } = job.data;
            try {
                const submission = await this.submissionRepo.findOne({
                    where: [{ id: submissionId }, { mongoId: submissionId }],
                });
                if (submission) {
                    submission.status = SubmissionStatus.RUNNING;
                    submission.startedAt = new Date();
                    await this.submissionRepo.save(submission);
                }
                this.appGateway.emitToUser(userId, 'submission_status', {
                    submissionId,
                    status: SubmissionStatus.RUNNING,
                    message: `Worker picked up submission on ${this.runnerId}`,
                });
                let testCases = [];
                const testCaseDoc = await this.testCaseModel.findOne({
                    where: [{ id: problemId }, { metadata_id: problemId }],
                });
                if (testCaseDoc?.cases && Array.isArray(testCaseDoc.cases)) {
                    testCases = testCaseDoc.cases.map((tc, i) => ({
                        id: i + 1,
                        input: tc.input || '',
                        expected: tc.output || '',
                        isHidden: tc.isHidden === true,
                    }));
                }
                if (testCases.length === 0) {
                    this.logger.warn(`[Judge] No test cases found for problem ${problemId}`);
                    if (submission) {
                        submission.status = SubmissionStatus.SYSTEM_ERROR;
                        submission.compileOutput = 'No test cases configured for this problem';
                        submission.completedAt = new Date();
                        await this.submissionRepo.save(submission);
                    }
                    this.appGateway.emitToUser(userId, 'execution_error', {
                        submissionId,
                        status: SubmissionStatus.SYSTEM_ERROR,
                        error: 'No test cases configured for this problem',
                    });
                    return { status: SubmissionStatus.SYSTEM_ERROR };
                }
                this.appGateway.emitToUser(userId, 'submission_status', {
                    submissionId,
                    status: SubmissionStatus.TESTING,
                    message: `Executing your ${language} code against ${testCases.length} test case(s)...`,
                    totalTestCases: testCases.length,
                });
                const config = {};
                const start = Date.now();
                const results = await this.executionService.executeCode(language, code, testCases, config);
                const runtime = Date.now() - start;
                let passedCount = 0;
                let hasCompileError = false;
                let hasRuntimeError = false;
                let hasTLE = false;
                let hasMemoryLimit = false;
                let compileOutput = '';
                for (const res of results) {
                    if (res.passed) {
                        passedCount++;
                    }
                    if (res.status === execution_types_1.Status.COMPILATION_ERROR) {
                        hasCompileError = true;
                        compileOutput = res.error || '';
                    }
                    if (res.status === execution_types_1.Status.RUNTIME_ERROR)
                        hasRuntimeError = true;
                    if (res.status === execution_types_1.Status.TIME_LIMIT_EXCEEDED)
                        hasTLE = true;
                    if (res.status === execution_types_1.Status.MEMORY_LIMIT_EXCEEDED)
                        hasMemoryLimit = true;
                }
                const allPassed = passedCount === testCases.length;
                let status;
                if (allPassed) {
                    status = SubmissionStatus.ACCEPTED;
                }
                else if (hasCompileError) {
                    status = SubmissionStatus.COMPILATION_ERROR;
                }
                else if (hasMemoryLimit) {
                    status = SubmissionStatus.MEMORY_LIMIT_EXCEEDED;
                }
                else if (hasRuntimeError) {
                    status = SubmissionStatus.RUNTIME_ERROR;
                }
                else if (hasTLE) {
                    status = SubmissionStatus.TIME_LIMIT_EXCEEDED;
                }
                else {
                    status = SubmissionStatus.WRONG_ANSWER;
                }
                if (submission) {
                    submission.status = status;
                    submission.runtime = runtime;
                    submission.executionTime = runtime;
                    submission.testCasesPassed = passedCount;
                    submission.testsPassed = passedCount;
                    submission.totalTestCases = testCases.length;
                    submission.totalTests = testCases.length;
                    submission.compileOutput = compileOutput || undefined;
                    submission.completedAt = new Date();
                    submission.testResults = results.map((result, index) => testCases[index]?.isHidden
                        ? {
                            testId: String(result.id),
                            passed: result.passed,
                            executionTime: result.executionTime,
                            error: result.error,
                        }
                        : {
                            testId: String(result.id),
                            passed: result.passed,
                            executionTime: result.executionTime,
                            error: result.error,
                        });
                    await this.submissionRepo.save(submission);
                }
                if (status === SubmissionStatus.ACCEPTED && userId) {
                    const user = await this.userRepo.findOne({ where: { id: userId } });
                    if (user) {
                        const stats = user.stats || {};
                        user.stats = {
                            ...stats,
                            acceptedSubmissions: (stats.acceptedSubmissions || 0) + 1,
                        };
                        await this.userRepo.save(user);
                    }
                }
                const completionPayload = {
                    submissionId,
                    status,
                    runtime,
                    passedCount,
                    totalCount: testCases.length,
                    results: results.map((result, index) => testCases[index]?.isHidden
                        ? {
                            id: result.id,
                            passed: result.passed,
                            status: result.status,
                            executionTime: result.executionTime,
                        }
                        : result),
                };
                this.appGateway.emitToUser(userId, 'submission_completed', completionPayload);
                this.appGateway.emitToUser(userId, 'execution_complete', completionPayload);
                this.logger.log(`[Judge] Submission ${submissionId}: ${status} (${passedCount}/${testCases.length}) in ${runtime}ms`);
                return { status, passedCount, totalCount: testCases.length };
            }
            catch (err) {
                this.logger.error(`[Judge] Error processing submission ${submissionId}: ${err.message}`, err.stack);
                const sub = await this.submissionRepo.findOne({
                    where: [{ id: submissionId }, { mongoId: submissionId }],
                });
                if (sub) {
                    sub.status = SubmissionStatus.SYSTEM_ERROR;
                    sub.compileOutput = `Internal error: ${err.message}`;
                    sub.completedAt = new Date();
                    await this.submissionRepo.save(sub);
                }
                this.appGateway.emitToUser(userId, 'execution_error', {
                    submissionId,
                    status: SubmissionStatus.SYSTEM_ERROR,
                    error: 'An internal error occurred during execution.',
                });
                throw err;
            }
            finally {
                const client = this.redisService.getClient();
                if (client && userId) {
                    try {
                        await client.decr(`active:submissions:${userId}`);
                    }
                    catch (e) {
                    }
                }
            }
        }
    }
    overallStatus(results) {
        if (results.every((result) => result.passed))
            return execution_types_1.Status.ACCEPTED;
        if (results.some((result) => result.status === execution_types_1.Status.COMPILATION_ERROR)) {
            return execution_types_1.Status.COMPILATION_ERROR;
        }
        if (results.some((result) => result.status === execution_types_1.Status.MEMORY_LIMIT_EXCEEDED)) {
            return execution_types_1.Status.MEMORY_LIMIT_EXCEEDED;
        }
        if (results.some((result) => result.status === execution_types_1.Status.RUNTIME_ERROR)) {
            return execution_types_1.Status.RUNTIME_ERROR;
        }
        if (results.some((result) => result.status === execution_types_1.Status.TIME_LIMIT_EXCEEDED)) {
            return execution_types_1.Status.TIME_LIMIT_EXCEEDED;
        }
        if (results.some((result) => result.status === execution_types_1.Status.SYSTEM_ERROR)) {
            return execution_types_1.Status.SYSTEM_ERROR;
        }
        return execution_types_1.Status.WRONG_ANSWER;
    }
};
exports.JudgeProcessor = JudgeProcessor;
exports.JudgeProcessor = JudgeProcessor = JudgeProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('submissions', { concurrency: WORKER_CONCURRENCY }),
    __param(1, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(2, (0, typeorm_1.InjectRepository)(problem_metadata_entity_1.ProblemMetadata)),
    __param(3, (0, typeorm_1.InjectRepository)(problem_testcase_entity_1.ProblemTestCase)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [execution_service_1.ExecutionService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        app_gateway_1.AppGateway,
        redis_service_1.RedisService])
], JudgeProcessor);
//# sourceMappingURL=judge.processor.js.map