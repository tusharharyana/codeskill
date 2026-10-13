"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const database_module_1 = require("../database/database.module");
const email_module_1 = require("../emails/email.module");
const students_controller_1 = require("./students.controller");
const students_service_1 = require("./students.service");
const credential_email_processor_1 = require("./credential-email.processor");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const audit_log_entity_1 = require("../database/entities/audit-log.entity");
const email_job_entity_1 = require("../database/entities/email-job.entity");
let StudentsModule = class StudentsModule {
};
exports.StudentsModule = StudentsModule;
exports.StudentsModule = StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            email_module_1.EmailModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, audit_log_entity_1.AuditLog, email_job_entity_1.EmailJob]),
            bullmq_1.BullModule.registerQueue({
                name: 'credential-email',
            }),
        ],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService, credential_email_processor_1.CredentialEmailProcessor],
        exports: [students_service_1.StudentsService],
    })
], StudentsModule);
//# sourceMappingURL=students.module.js.map