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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("../admin.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let AdminUsersController = class AdminUsersController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getUsers(page, limit, search, adminsOnly) {
        return this.adminService.getUsers(parseInt(page, 10) || 1, parseInt(limit, 10) || 50, search, adminsOnly === 'true');
    }
    async updateUserRole(id, body) {
        const user = await this.adminService.updateUserRole(id, body);
        return { success: true, user };
    }
    async getReport(id) {
        return this.adminService.getReport(id);
    }
    async promoteUser(id) {
        const user = await this.adminService.updateUserRole(id, {
            isAdmin: true,
            'profile.role': 'admin',
        });
        return {
            success: true,
            message: `${user.email} is now an admin`,
            user,
        };
    }
    async demoteUser(id) {
        const user = await this.adminService.updateUserRole(id, {
            isAdmin: false,
            'profile.role': 'student',
        });
        return {
            success: true,
            message: `${user.email} is no longer an admin`,
            user,
        };
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all users with pagination and search' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('adminsOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Put)(':id/role'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user role (admin/campus/company)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Get)(':id/report'),
    (0, swagger_1.ApiOperation)({ summary: 'Get candidate report' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "getReport", null);
__decorate([
    (0, common_1.Put)(':id/promote'),
    (0, swagger_1.ApiOperation)({ summary: 'Promote user to admin' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "promoteUser", null);
__decorate([
    (0, common_1.Put)(':id/demote'),
    (0, swagger_1.ApiOperation)({ summary: 'Demote user from admin' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersController.prototype, "demoteUser", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminUsersController);
//# sourceMappingURL=users.controller.js.map