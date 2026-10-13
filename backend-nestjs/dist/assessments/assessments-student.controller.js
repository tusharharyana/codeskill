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
exports.AssessmentsStudentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assessments_service_1 = require("./assessments.service");
const submit_assessment_dto_1 = require("./dto/submit-assessment.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let AssessmentsStudentController = class AssessmentsStudentController {
    assessmentsService;
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    async getMyAssessments(studentUser) {
        return this.assessmentsService.getStudentAssessments(studentUser);
    }
    async getOverview(id, studentUser) {
        return this.assessmentsService.getStudentAssessmentOverview(id, studentUser);
    }
    async startAttempt(id, studentUser) {
        return this.assessmentsService.startStudentAttempt(id, studentUser);
    }
    async retakeAttempt(id, studentUser) {
        return this.assessmentsService.retakeStudentAttempt(id, studentUser);
    }
    async saveProgress(id, dto, studentUser) {
        return this.assessmentsService.saveProgress(id, dto, studentUser);
    }
    async submitAttempt(id, dto, studentUser) {
        return this.assessmentsService.submitAttempt(id, dto, studentUser);
    }
    async getResult(id, studentUser) {
        return this.assessmentsService.getStudentResult(id, studentUser);
    }
};
exports.AssessmentsStudentController = AssessmentsStudentController;
__decorate([
    (0, common_1.Get)('my-assessments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assigned assessments for current candidate' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "getMyAssessments", null);
__decorate([
    (0, common_1.Get)(':id/overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get assessment briefing and candidate eligibility',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, swagger_1.ApiOperation)({ summary: 'Begin or resume assessment attempt session' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Post)(':id/retake'),
    (0, swagger_1.ApiOperation)({ summary: 'Redo / Retake assessment session for practice' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "retakeAttempt", null);
__decorate([
    (0, common_1.Post)(':id/save-progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Autosave candidate responses during test' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_assessment_dto_1.SubmitAssessmentDto, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "saveProgress", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit completed assessment for server evaluation',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_assessment_dto_1.SubmitAssessmentDto, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "submitAttempt", null);
__decorate([
    (0, common_1.Get)(':id/result'),
    (0, swagger_1.ApiOperation)({ summary: 'Get candidate scorecard and performance review' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsStudentController.prototype, "getResult", null);
exports.AssessmentsStudentController = AssessmentsStudentController = __decorate([
    (0, swagger_1.ApiTags)('Student Assessments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('assessments'),
    __metadata("design:paramtypes", [assessments_service_1.AssessmentsService])
], AssessmentsStudentController);
//# sourceMappingURL=assessments-student.controller.js.map