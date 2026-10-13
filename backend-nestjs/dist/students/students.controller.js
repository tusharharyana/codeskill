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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const query_students_dto_1 = require("./dto/query-students.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let StudentsController = class StudentsController {
    studentsService;
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async findAll(query) {
        return this.studentsService.findAll(query);
    }
    async getEmailStatus(page, limit, status) {
        return this.studentsService.getEmailStatus(Number(page) || 1, Number(limit) || 20, status);
    }
    async findById(id) {
        return this.studentsService.findById(id);
    }
    async create(dto, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.create(dto, adminUser, ip, userAgent);
    }
    async update(id, dto, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.update(id, dto, adminUser, ip, userAgent);
    }
    async setStatus(id, isActive, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.setActiveStatus(id, isActive, adminUser, ip, userAgent);
    }
    async deactivate(id, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.setActiveStatus(id, false, adminUser, ip, userAgent);
    }
    async resetPassword(id, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.resetPassword(id, adminUser, ip, userAgent);
    }
    async importPreview(file) {
        if (!file) {
            throw new common_1.BadRequestException('Spreadsheet file is required');
        }
        return this.studentsService.parseAndValidateImport(file.buffer);
    }
    async confirmImport(validRows, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.studentsService.confirmImport(validRows, adminUser, ip, userAgent);
    }
    async sendCredentials(jobIds, portalUrl) {
        return this.studentsService.sendCredentials(jobIds, portalUrl);
    }
    async sendSingleCredential(studentId, portalUrl) {
        return this.studentsService.sendIndividualCredential(studentId, portalUrl);
    }
    async retryFailed(portalUrl) {
        return this.studentsService.retryFailedCredentials(portalUrl);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated list of students with filters' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_students_dto_1.QueryStudentsDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('email-status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get delivery metrics and log entries for credential emails',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getEmailStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single student details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new assessment student' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update student profile/details' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate or deactivate a student' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isActive')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "setStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate (soft delete) a student' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Post)(':id/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Admin resets student password to a temporary password',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload and validate spreadsheet (XLSX/CSV) for bulk student import',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 10 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "importPreview", null);
__decorate([
    (0, common_1.Post)('import/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Commit validated students import into database in high-speed batches',
    }),
    __param(0, (0, common_1.Body)('validRows')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "confirmImport", null);
__decorate([
    (0, common_1.Post)('send-credentials'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Enqueue credential dispatch emails into BullMQ queue',
    }),
    __param(0, (0, common_1.Body)('jobIds')),
    __param(1, (0, common_1.Body)('portalUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "sendCredentials", null);
__decorate([
    (0, common_1.Post)(':id/send-credential'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Enqueue single student credential email' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Student User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('portalUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "sendSingleCredential", null);
__decorate([
    (0, common_1.Post)('retry-failed'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Retry all failed credential email jobs' }),
    __param(0, (0, common_1.Body)('portalUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "retryFailed", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Students'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map