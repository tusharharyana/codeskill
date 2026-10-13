"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bullmq_1 = require("@nestjs/bullmq");
const execution_controller_1 = require("./execution.controller");
const execution_service_1 = require("./execution.service");
const azure_execution_service_1 = require("./azure-execution.service");
const judge_processor_1 = require("./judge.processor");
const submission_entity_1 = require("../database/entities/submission.entity");
const problem_metadata_entity_1 = require("../database/entities/problem-metadata.entity");
const problem_testcase_entity_1 = require("../database/entities/problem-testcase.entity");
const user_entity_1 = require("../database/entities/user.entity");
const gateway_module_1 = require("../gateway/gateway.module");
const redis_module_1 = require("../redis/redis.module");
const judgeProviders = process.env.PROCESS_ROLE === 'judge' ? [judge_processor_1.JudgeProcessor] : [];
let ExecutionModule = class ExecutionModule {
};
exports.ExecutionModule = ExecutionModule;
exports.ExecutionModule = ExecutionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                submission_entity_1.Submission,
                problem_metadata_entity_1.ProblemMetadata,
                problem_testcase_entity_1.ProblemTestCase,
                user_entity_1.User,
            ]),
            bullmq_1.BullModule.registerQueue({
                name: 'submissions',
            }),
            gateway_module_1.GatewayModule,
            redis_module_1.RedisModule,
        ],
        controllers: [execution_controller_1.ExecutionController],
        providers: [execution_service_1.ExecutionService, azure_execution_service_1.AzureExecutionService, ...judgeProviders],
        exports: [execution_service_1.ExecutionService, azure_execution_service_1.AzureExecutionService],
    })
], ExecutionModule);
//# sourceMappingURL=execution.module.js.map