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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assessment_attempt_entity_1 = require("../database/entities/assessment-attempt.entity");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const question_entity_1 = require("../database/entities/question.entity");
let AnalyticsService = class AnalyticsService {
    attemptRepo;
    assessmentRepo;
    questionRepo;
    constructor(attemptRepo, assessmentRepo, questionRepo) {
        this.attemptRepo = attemptRepo;
        this.assessmentRepo = assessmentRepo;
        this.questionRepo = questionRepo;
    }
    async getAssessmentOverview(assessmentId) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id: assessmentId }, { mongoId: assessmentId }],
        });
        if (!assessment)
            throw new common_1.NotFoundException('Assessment not found');
        const targetId = assessment.id;
        const completedStatuses = ['submitted', 'auto_submitted', 'timed_out'];
        const totalAttempts = await this.attemptRepo.count({
            where: [{ assessmentId: targetId }, { assessmentId: assessmentId }],
        });
        const completedAttempts = await this.attemptRepo.count({
            where: [
                { assessmentId: targetId, status: (0, typeorm_2.In)(completedStatuses) },
                { assessmentId: assessmentId, status: (0, typeorm_2.In)(completedStatuses) },
            ],
        });
        const stats = await this.attemptRepo
            .createQueryBuilder('a')
            .select('COALESCE(AVG(a.score), 0)', 'avgScore')
            .addSelect('COALESCE(MAX(a.score), 0)', 'maxScore')
            .addSelect('COALESCE(MIN(a.score), 0)', 'minScore')
            .addSelect('COALESCE(AVG(a.timeSpentSeconds), 0)', 'avgTimeSpent')
            .addSelect('COUNT(CASE WHEN a.passed = true THEN 1 END)', 'totalPassed')
            .where('(a.assessmentId = :targetId OR a.assessmentId = :assessmentId)', {
            targetId,
            assessmentId,
        })
            .andWhere('a.status IN (:...statuses)', { statuses: completedStatuses })
            .getRawOne();
        return {
            assessment: {
                title: assessment.title,
                status: assessment.status,
            },
            participation: {
                total: totalAttempts,
                completed: completedAttempts,
            },
            metrics: {
                avgScore: Number(stats?.avgScore || 0),
                maxScore: Number(stats?.maxScore || 0),
                minScore: Number(stats?.minScore || 0),
                avgTimeSpent: Number(stats?.avgTimeSpent || 0),
                totalPassed: Number(stats?.totalPassed || 0),
            },
        };
    }
    async getAssessmentLeaderboard(assessmentId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const completedStatuses = ['submitted', 'auto_submitted', 'timed_out'];
        const [data, total] = await this.attemptRepo.findAndCount({
            where: [
                { assessmentId, status: (0, typeorm_2.In)(completedStatuses) },
            ],
            order: { score: 'DESC', timeSpentSeconds: 'ASC' },
            skip,
            take: limit,
            select: {
                id: true,
                studentName: true,
                studentEmail: true,
                studentUid: true,
                score: true,
                maxScore: true,
                percentage: true,
                passed: true,
                timeSpentSeconds: true,
                startedAt: true,
                submittedAt: true,
                violations: true,
                tabSwitchCount: true,
                fullscreenExitCount: true,
            },
        });
        return {
            data: data.map((d) => ({ ...d, _id: d.id })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getQuestionAnalytics(assessmentId) {
        const completedStatuses = ['submitted', 'auto_submitted', 'timed_out'];
        const attempts = await this.attemptRepo.find({
            where: [{ assessmentId, status: (0, typeorm_2.In)(completedStatuses) }],
            select: { id: true, responses: true },
        });
        const questionMap = new Map();
        for (const att of attempts) {
            const responses = Array.isArray(att.responses) ? att.responses : [];
            for (const resp of responses) {
                if (!resp.questionId)
                    continue;
                const qId = String(resp.questionId);
                const cur = questionMap.get(qId) || {
                    totalAttempts: 0,
                    correctCount: 0,
                    totalTime: 0,
                    totalMarks: 0,
                };
                cur.totalAttempts += 1;
                if (resp.isCorrect)
                    cur.correctCount += 1;
                cur.totalTime += Number(resp.timeSpentSeconds || 0);
                cur.totalMarks += Number(resp.marksAwarded || 0);
                questionMap.set(qId, cur);
            }
        }
        const questionIds = Array.from(questionMap.keys());
        const questions = questionIds.length > 0
            ? await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(questionIds) }],
            })
            : [];
        const detailsMap = new Map();
        for (const q of questions) {
            detailsMap.set(q.id, q);
        }
        const questionStats = [];
        for (const [qId, stat] of questionMap.entries()) {
            const q = detailsMap.get(qId);
            const successRate = stat.totalAttempts > 0 ? (stat.correctCount / stat.totalAttempts) * 100 : 0;
            questionStats.push({
                questionId: qId,
                title: q?.title || 'Question ' + qId,
                type: q?.questionType || 'mcq',
                difficulty: q?.difficulty || 'Medium',
                totalAttempts: stat.totalAttempts,
                correctCount: stat.correctCount,
                successRate: Math.round(successRate * 10) / 10,
                avgTimeSpent: stat.totalAttempts > 0 ? Math.round(stat.totalTime / stat.totalAttempts) : 0,
                avgMarksAwarded: stat.totalAttempts > 0 ? Math.round((stat.totalMarks / stat.totalAttempts) * 10) / 10 : 0,
            });
        }
        questionStats.sort((a, b) => a.successRate - b.successRate);
        return questionStats;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_attempt_entity_1.AssessmentAttempt)),
    __param(1, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map