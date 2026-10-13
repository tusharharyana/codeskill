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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assessment_attempt_entity_1 = require("../database/entities/assessment-attempt.entity");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const question_entity_1 = require("../database/entities/question.entity");
const renderer_1 = require("@react-pdf/renderer");
const student_result_pdf_1 = require("./student-result.pdf");
const React = __importStar(require("react"));
let ReportsController = class ReportsController {
    attemptRepo;
    assessmentRepo;
    questionRepo;
    constructor(attemptRepo, assessmentRepo, questionRepo) {
        this.attemptRepo = attemptRepo;
        this.assessmentRepo = assessmentRepo;
        this.questionRepo = questionRepo;
    }
    async getStudentResultReport(attemptId, res) {
        if (!attemptId) {
            throw new common_1.BadRequestException('Invalid attempt ID');
        }
        const attempt = await this.attemptRepo.findOne({
            where: [{ id: attemptId }, { mongoId: attemptId }],
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Attempt not found');
        }
        const assessmentId = attempt.assessmentId;
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id: assessmentId }, { mongoId: assessmentId }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        const responses = Array.isArray(attempt.responses) ? attempt.responses : [];
        const questions = await Promise.all(responses.map(async (resp) => {
            const q = resp.questionId
                ? await this.questionRepo.findOne({
                    where: [{ id: resp.questionId }, { mongoId: resp.questionId }],
                })
                : null;
            const item = {
                id: String(resp.questionId || 'unknown'),
                title: q?.title ? q.title : 'Assessment Question',
                difficulty: q?.difficulty ? q.difficulty : 'Medium',
                status: resp.isCorrect ? 'Passed' : resp.marksAwarded > 0 ? 'Partial' : 'Failed',
                points: Number(resp.marksAwarded || 0),
            };
            return item;
        }));
        const resultData = {
            studentName: attempt.studentName || 'Unknown Student',
            studentEmail: attempt.studentEmail || 'No Email',
            examName: assessment.title,
            dateTaken: attempt.startedAt
                ? new Date(attempt.startedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                : 'Unknown Date',
            score: attempt.score || 0,
            maxScore: attempt.maxScore || 100,
            duration: `${Math.floor((attempt.timeSpentSeconds || 0) / 60)}m ${(attempt.timeSpentSeconds || 0) % 60}s`,
            questions,
        };
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="result-${attempt.studentUid || attempt.id}.pdf"`,
        });
        try {
            const stream = await (0, renderer_1.renderToStream)(React.createElement(student_result_pdf_1.StudentResultReport, { result: resultData }));
            stream.pipe(res);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error generating PDF');
        }
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('assessment-attempt/:attemptId'),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getStudentResultReport", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_attempt_entity_1.AssessmentAttempt)),
    __param(1, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map