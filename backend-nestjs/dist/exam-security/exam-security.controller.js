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
exports.ExamSecurityController = void 0;
const common_1 = require("@nestjs/common");
const exam_security_service_1 = require("./exam-security.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let ExamSecurityController = class ExamSecurityController {
    examSecurityService;
    constructor(examSecurityService) {
        this.examSecurityService = examSecurityService;
    }
    async initSession(assessmentId, req, body) {
        return this.examSecurityService.initSecureSession(assessmentId, req.user._id, req.headers, body);
    }
    async heartbeat(sessionId, req) {
        return this.examSecurityService.processHeartbeat(sessionId, req.user._id);
    }
    async reportViolation(sessionId, req, body) {
        return this.examSecurityService.reportViolation(sessionId, req.user._id, body.eventType, body.metadata || {});
    }
};
exports.ExamSecurityController = ExamSecurityController;
__decorate([
    (0, common_1.Post)(':assessmentId/secure-session/init'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('assessmentId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamSecurityController.prototype, "initSession", null);
__decorate([
    (0, common_1.Post)('session/:sessionId/heartbeat'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExamSecurityController.prototype, "heartbeat", null);
__decorate([
    (0, common_1.Post)('session/:sessionId/violation'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamSecurityController.prototype, "reportViolation", null);
exports.ExamSecurityController = ExamSecurityController = __decorate([
    (0, common_1.Controller)('exam-security'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [exam_security_service_1.ExamSecurityService])
], ExamSecurityController);
//# sourceMappingURL=exam-security.controller.js.map