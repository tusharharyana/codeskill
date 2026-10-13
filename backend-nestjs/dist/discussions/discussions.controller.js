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
exports.DiscussionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discussions_service_1 = require("./discussions.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let DiscussionsController = class DiscussionsController {
    discussionsService;
    constructor(discussionsService) {
        this.discussionsService = discussionsService;
    }
    async getThreads(problemId, query) {
        return this.discussionsService.getThreads(problemId, query);
    }
    async getThread(threadId) {
        return this.discussionsService.getThread(threadId);
    }
    async getReplies(threadId) {
        return this.discussionsService.getReplies(threadId);
    }
    async createThread(userId, data) {
        return this.discussionsService.createThread(userId, data);
    }
    async deleteThread(userId, threadId) {
        return this.discussionsService.deleteThread(userId, threadId);
    }
    async voteThread(userId, threadId, direction) {
        return this.discussionsService.voteThread(userId, threadId, direction);
    }
    async createReply(userId, threadId, data) {
        return this.discussionsService.createReply(userId, threadId, data);
    }
    async deleteReply(userId, replyId) {
        return this.discussionsService.deleteReply(userId, replyId);
    }
    async voteReply(userId, replyId, direction) {
        return this.discussionsService.voteReply(userId, replyId, direction);
    }
};
exports.DiscussionsController = DiscussionsController;
__decorate([
    (0, common_1.Get)('problem/:problemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get discussion threads for a problem' }),
    __param(0, (0, common_1.Param)('problemId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "getThreads", null);
__decorate([
    (0, common_1.Get)(':threadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single discussion thread' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "getThread", null);
__decorate([
    (0, common_1.Get)(':threadId/replies'),
    (0, swagger_1.ApiOperation)({ summary: 'Get replies for a discussion thread' }),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "getReplies", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new discussion thread' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "createThread", null);
__decorate([
    (0, common_1.Delete)(':threadId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a discussion thread (author only)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "deleteThread", null);
__decorate([
    (0, common_1.Put)(':threadId/vote'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upvote or downvote a thread' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Body)('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "voteThread", null);
__decorate([
    (0, common_1.Post)(':threadId/replies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Reply to a discussion thread' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "createReply", null);
__decorate([
    (0, common_1.Delete)('replies/:replyId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a reply (author only)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('replyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "deleteReply", null);
__decorate([
    (0, common_1.Put)('replies/:replyId/vote'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upvote or downvote a reply' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('replyId')),
    __param(2, (0, common_1.Body)('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DiscussionsController.prototype, "voteReply", null);
exports.DiscussionsController = DiscussionsController = __decorate([
    (0, swagger_1.ApiTags)('Discussions'),
    (0, common_1.Controller)('discussions'),
    __metadata("design:paramtypes", [discussions_service_1.DiscussionsService])
], DiscussionsController);
//# sourceMappingURL=discussions.controller.js.map