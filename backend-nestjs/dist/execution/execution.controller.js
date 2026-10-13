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
exports.ExecutionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const execution_service_1 = require("./execution.service");
const azure_execution_service_1 = require("./azure-execution.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ExecutionController = class ExecutionController {
    executionService;
    azureExecutionService;
    submissionQueue;
    constructor(executionService, azureExecutionService, submissionQueue) {
        this.executionService = executionService;
        this.azureExecutionService = azureExecutionService;
        this.submissionQueue = submissionQueue;
    }
    async runCode(userId, body) {
        const { language, code, testCases, config = {} } = body;
        if (!code || typeof code !== 'string') {
            throw new common_1.BadRequestException('Missing or invalid "code" field');
        }
        if (!language || typeof language !== 'string') {
            throw new common_1.BadRequestException('Missing or invalid "language" field');
        }
        if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
            throw new common_1.BadRequestException('Missing or invalid "testCases" array');
        }
        const supportedLanguages = [
            'c',
            'cpp',
            'c++',
            'java',
            'python',
            'python3',
            'py',
            'javascript',
            'js',
            'node',
            'typescript',
            'ts',
        ];
        if (!supportedLanguages.includes(language.toLowerCase())) {
            throw new common_1.BadRequestException(`Unsupported language: "${language}". Supported: ${supportedLanguages.join(', ')}`);
        }
        const job = await this.submissionQueue.add('run-code', { code, language, testCases, config, userId }, {
            attempts: 1,
            removeOnComplete: { age: 15 * 60, count: 2000 },
            removeOnFail: { age: 60 * 60, count: 2000 },
        });
        return {
            success: true,
            status: 'queued',
            jobId: job.id,
            message: 'Execution queued',
        };
    }
    async getJob(userId, jobId) {
        const job = await this.submissionQueue.getJob(jobId);
        if (!job ||
            (job.data.userId && String(job.data.userId) !== String(userId))) {
            throw new common_1.NotFoundException('Execution job not found');
        }
        const state = await job.getState();
        if (state === 'completed')
            return job.returnvalue;
        if (state === 'failed') {
            return {
                success: false,
                status: execution_service_1.Status.SYSTEM_ERROR,
                message: 'The judge worker could not complete this execution',
                results: [],
                runtime: 0,
                passedCount: 0,
                totalCount: Array.isArray(job.data.testCases)
                    ? job.data.testCases.length
                    : 0,
            };
        }
        return { success: true, status: state, jobId };
    }
    async azureRun(userId, body) {
        if (!body.code || !body.language) {
            throw new common_1.BadRequestException('code and language are required');
        }
        if (!this.azureExecutionService.isAvailable) {
            const isSingleRun = !body.testCases || body.testCases.length === 0;
            const testCases = isSingleRun
                ? [{ id: 'run', input: body.stdin || '', expected: '' }]
                : body.testCases;
            const job = await this.submissionQueue.add('run-code', {
                code: body.code,
                language: body.language,
                testCases,
                config: {
                    timeLimit: body.timeoutMs || 10000,
                    memoryLimit: body.memoryMB || 256,
                },
                userId,
            }, {
                attempts: 1,
                removeOnComplete: { age: 15 * 60, count: 2000 },
                removeOnFail: { age: 60 * 60, count: 2000 },
            });
            return {
                success: true,
                engine: 'queue',
                status: 'queued',
                jobId: job.id,
                message: 'Execution queued to isolated runner pool',
            };
        }
        try {
            if (body.testCases && body.testCases.length > 0) {
                const results = await this.azureExecutionService.executeWithTestCases(body.code, body.language, body.testCases, { timeoutMs: body.timeoutMs, memoryMB: body.memoryMB });
                const passedCount = results.filter((r) => r.passed).length;
                return {
                    success: true,
                    engine: 'azure',
                    passedCount,
                    totalCount: results.length,
                    results,
                };
            }
            else {
                const result = await this.azureExecutionService.execute({
                    code: body.code,
                    language: body.language,
                    stdin: body.stdin,
                    timeoutMs: body.timeoutMs,
                    memoryMB: body.memoryMB,
                });
                return {
                    success: true,
                    engine: 'azure',
                    result,
                };
            }
        }
        catch (err) {
            return {
                success: false,
                engine: 'azure',
                error: err.message,
            };
        }
    }
};
exports.ExecutionController = ExecutionController;
__decorate([
    (0, common_1.Post)('run'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Execute code against test cases without saving a submission',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['code', 'language', 'testCases'],
            properties: {
                code: { type: 'string', description: 'Source code to execute' },
                language: {
                    type: 'string',
                    enum: [
                        'c',
                        'cpp',
                        'c++',
                        'java',
                        'python',
                        'python3',
                        'py',
                        'javascript',
                        'js',
                        'node',
                    ],
                    description: 'Programming language',
                },
                testCases: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            input: { type: 'string', description: 'Stdin input' },
                            expected: {
                                type: 'string',
                                description: 'Expected stdout output',
                            },
                        },
                    },
                },
                config: {
                    type: 'object',
                    description: 'Optional execution configuration (timeLimit, memoryLimit, etc.)',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Execution results',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                status: { type: 'string', enum: Object.values(execution_service_1.Status) },
                results: { type: 'array' },
                runtime: { type: 'number' },
                passedCount: { type: 'number' },
                totalCount: { type: 'number' },
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExecutionController.prototype, "runCode", null);
__decorate([
    (0, common_1.Get)('jobs/:jobId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an asynchronous execution result' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExecutionController.prototype, "getJob", null);
__decorate([
    (0, common_1.Post)('azure-run'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Execute code via Azure Container Instances (Microsoft-powered, high scale)',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExecutionController.prototype, "azureRun", null);
exports.ExecutionController = ExecutionController = __decorate([
    (0, swagger_1.ApiTags)('Execution'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('execution'),
    __param(2, (0, bullmq_1.InjectQueue)('submissions')),
    __metadata("design:paramtypes", [execution_service_1.ExecutionService,
        azure_execution_service_1.AzureExecutionService,
        bullmq_2.Queue])
], ExecutionController);
//# sourceMappingURL=execution.controller.js.map