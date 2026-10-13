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
exports.AdminUniversitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
const admin_service_1 = require("../admin.service");
let AdminUniversitiesController = class AdminUniversitiesController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getUniversities(page, limit, search) {
        return this.adminService.getUniversities(parseInt(page, 10) || 1, parseInt(limit, 10) || 20, search);
    }
    async createUniversity(body) {
        return this.adminService.createUniversity(body);
    }
    async toggleVerify(id) {
        return this.adminService.toggleUniversityVerification(id);
    }
    async deleteUniversity(id) {
        return this.adminService.deleteUniversity(id);
    }
};
exports.AdminUniversitiesController = AdminUniversitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all universities' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminUniversitiesController.prototype, "getUniversities", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create/register a university' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminUniversitiesController.prototype, "createUniversity", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle university verification' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUniversitiesController.prototype, "toggleVerify", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a university' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUniversitiesController.prototype, "deleteUniversity", null);
exports.AdminUniversitiesController = AdminUniversitiesController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Universities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/universities'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminUniversitiesController);
//# sourceMappingURL=universities.controller.js.map