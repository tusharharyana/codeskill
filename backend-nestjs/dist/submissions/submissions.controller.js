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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const submissions_service_1 = require("./submissions.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const submission_rate_limit_guard_1 = require("../common/guards/submission-rate-limit.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    async createSubmission(userId, data) {
        const submission = await this.submissionsService.createSubmission(userId, data);
        return {
            success: true,
            submissionId: submission._id,
            status: submission.status,
            message: 'Submission successfully queued for execution',
            submission,
        };
    }
    async getSubmission(userId, role, id) {
        const isAdmin = role === 'admin';
        const submission = await this.submissionsService.getSubmissionById(userId, id, isAdmin);
        return { success: true, submission };
    }
    async getSubmissionResult(userId, role, id) {
        const isAdmin = role === 'admin';
        const result = await this.submissionsService.getSubmissionResult(userId, id, isAdmin);
        return { success: true, ...result };
    }
    async cancelSubmission(userId, role, id) {
        const isAdmin = role === 'admin';
        return this.submissionsService.cancelSubmission(userId, id, isAdmin);
    }
    async getSubmissionsByUser(currentUserId, role, targetUserId, query) {
        const isAdmin = role === 'admin';
        const effectiveUserId = isAdmin ? targetUserId : currentUserId;
        return this.submissionsService.getSubmissionsByUser(effectiveUserId, query);
    }
    async getSubmissionsByProblem(userId, problemId) {
        const submissions = await this.submissionsService.getSubmissionsByProblem(userId, problemId);
        return { count: submissions.length, data: submissions };
    }
    async getRecentSubmissions(userId) {
        const submissions = await this.submissionsService.getRecentSubmissions(userId);
        return { count: submissions.length, data: submissions };
    }
    async getUserStats(userId) {
        return this.submissionsService.getUserStats(userId);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(submission_rate_limit_guard_1.SubmissionRateLimitGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new code submission and queue for isolated execution',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "createSubmission", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submission details by ID' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getSubmission", null);
__decorate([
    (0, common_1.Get)(':id/result'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submission result and status' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getSubmissionResult", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a queued submission' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "cancelSubmission", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: "Get a specific user's submissions history" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Param)('userId')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getSubmissionsByUser", null);
__decorate([
    (0, common_1.Get)('problem/:problemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions for a specific problem' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('problemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getSubmissionsByProblem", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent submissions' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getRecentSubmissions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user statistics' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getUserStats", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, swagger_1.ApiTags)('Submissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('submissions'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map