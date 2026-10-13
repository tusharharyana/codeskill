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
exports.QuestionBanksController = exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const questions_service_1 = require("./questions.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const query_questions_dto_1 = require("./dto/query-questions.dto");
const create_question_bank_dto_1 = require("./dto/create-question-bank.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const admin_guard_1 = require("../common/guards/admin.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let QuestionsController = class QuestionsController {
    questionsService;
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async findAll(query) {
        return this.questionsService.findAll(query);
    }
    async importPreview(file) {
        if (!file) {
            throw new common_1.BadRequestException('Spreadsheet file is required');
        }
        return this.questionsService.parseAndValidateQuestionsImport(file.buffer);
    }
    async autoImport(file, adminUser, req) {
        if (!file) {
            throw new common_1.BadRequestException('Spreadsheet/CSV file is required');
        }
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.autoImportQuestions(file.buffer, adminUser, ip, userAgent);
    }
    async confirmImport(validRows, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.confirmQuestionsImport(validRows, adminUser, ip, userAgent);
    }
    async getTopics() {
        const topics = await this.questionsService.getTopicsDistribution();
        return { success: true, topics, data: topics };
    }
    async findById(id) {
        return this.questionsService.findById(id, false);
    }
    async create(dto, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.create(dto, adminUser, ip, userAgent);
    }
    async update(id, dto, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.update(id, dto, adminUser, ip, userAgent);
    }
    async delete(id, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.delete(id, adminUser, ip, userAgent);
    }
    async approve(id, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.review(id, 'approved', '', adminUser, ip, userAgent);
    }
    async reject(id, reason, adminUser, req) {
        const ip = req.ip || req.connection?.remoteAddress || '';
        const userAgent = req.headers['user-agent'] || '';
        return this.questionsService.review(id, 'rejected', reason, adminUser, ip, userAgent);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get paginated list of assessment questions with topic/difficulty filters',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_questions_dto_1.QueryQuestionsDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload and validate spreadsheet (XLSX/CSV) for bulk question import',
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
], QuestionsController.prototype, "importPreview", null);
__decorate([
    (0, common_1.Post)('import/auto'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '1-Attempt upload, convert, and push (upsert) questions into bank',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 15 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "autoImport", null);
__decorate([
    (0, common_1.Post)('import/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Commit validated assessment questions into question bank',
    }),
    __param(0, (0, common_1.Body)('validRows')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "confirmImport", null);
__decorate([
    (0, common_1.Get)('topics'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get aggregated topic distribution and difficulty breakdowns',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getTopics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single question details (Admin full view)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Manually author a new assessment question' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing assessment question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete (archive) an assessment question' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve a pending or AI-generated question into question bank',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "approve", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject a pending or AI-generated question with reason',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Question ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "reject", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Question Bank'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
let QuestionBanksController = class QuestionBanksController {
    questionsService;
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async findAll(topic) {
        const banks = await this.questionsService.findAllBanks(topic);
        return { success: true, banks, data: banks };
    }
    async findById(id) {
        return this.questionsService.findBankById(id);
    }
    async create(dto, adminUser) {
        return this.questionsService.createBank(dto, adminUser);
    }
    async update(id, dto) {
        return this.questionsService.updateBank(id, dto);
    }
    async delete(id) {
        return this.questionsService.deleteBank(id);
    }
};
exports.QuestionBanksController = QuestionBanksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all question bank collections' }),
    __param(0, (0, common_1.Query)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBanksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get single question bank with populated questions',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBanksController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new question bank collection' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_bank_dto_1.CreateQuestionBankDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionBanksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a question bank collection' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionBanksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question bank collection' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBanksController.prototype, "delete", null);
exports.QuestionBanksController = QuestionBanksController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Question Bank Collections'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/question-banks'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionBanksController);
//# sourceMappingURL=questions.controller.js.map