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
exports.AssessmentsAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assessments_service_1 = require("./assessments.service");
const create_assessment_dto_1 = require("./dto/create-assessment.dto");
const update_assessment_dto_1 = require("./dto/update-assessment.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let AssessmentsAdminController = class AssessmentsAdminController {
    assessmentsService;
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    async create(dto, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.assessmentsService.create(dto, adminUser, ip, userAgent);
    }
    async findAll(query) {
        return this.assessmentsService.findAll(query);
    }
    async findById(id) {
        return this.assessmentsService.findById(id);
    }
    async update(id, dto, adminUser) {
        return this.assessmentsService.update(id, dto, adminUser);
    }
    async updateStatus(id, dto, adminUser) {
        return this.assessmentsService.updateStatus(id, dto.status, adminUser);
    }
    async delete(id, adminUser) {
        return this.assessmentsService.delete(id, adminUser);
    }
    async getResults(id) {
        return this.assessmentsService.getAssessmentResults(id);
    }
};
exports.AssessmentsAdminController = AssessmentsAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new MCQ assessment / exam' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assessment_dto_1.CreateAssessmentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all assessments with filters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assessment details with populated questions' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update assessment details, schedule, or timings' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assessment_dto_1.UpdateAssessmentDto, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle or update assessment status (published, draft, completed, etc.)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assessment_dto_1.UpdateAssessmentStatusDto, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive assessment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/results'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get student attempt results and summary analytics',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentsAdminController.prototype, "getResults", null);
exports.AssessmentsAdminController = AssessmentsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Assessments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/assessments'),
    __metadata("design:paramtypes", [assessments_service_1.AssessmentsService])
], AssessmentsAdminController);
//# sourceMappingURL=assessments-admin.controller.js.map