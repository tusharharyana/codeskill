"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const assessment_attempt_entity_1 = require("../database/entities/assessment-attempt.entity");
const question_entity_1 = require("../database/entities/question.entity");
const audit_log_entity_1 = require("../database/entities/audit-log.entity");
const assessments_service_1 = require("./assessments.service");
const assessments_admin_controller_1 = require("./assessments-admin.controller");
const assessments_student_controller_1 = require("./assessments-student.controller");
let AssessmentsModule = class AssessmentsModule {
};
exports.AssessmentsModule = AssessmentsModule;
exports.AssessmentsModule = AssessmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                assessment_entity_1.Assessment,
                assessment_attempt_entity_1.AssessmentAttempt,
                question_entity_1.Question,
                audit_log_entity_1.AuditLog,
            ]),
        ],
        controllers: [assessments_admin_controller_1.AssessmentsAdminController, assessments_student_controller_1.AssessmentsStudentController],
        providers: [assessments_service_1.AssessmentsService],
        exports: [assessments_service_1.AssessmentsService],
    })
], AssessmentsModule);
//# sourceMappingURL=assessments.module.js.map