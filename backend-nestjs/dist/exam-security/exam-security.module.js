"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSecurityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exam_security_service_1 = require("./exam-security.service");
const exam_security_controller_1 = require("./exam-security.controller");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const exam_session_entity_1 = require("../database/entities/exam-session.entity");
const exam_security_event_entity_1 = require("../database/entities/exam-security-event.entity");
let ExamSecurityModule = class ExamSecurityModule {
};
exports.ExamSecurityModule = ExamSecurityModule;
exports.ExamSecurityModule = ExamSecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([assessment_entity_1.Assessment, exam_session_entity_1.ExamSession, exam_security_event_entity_1.ExamSecurityEvent]),
        ],
        controllers: [exam_security_controller_1.ExamSecurityController],
        providers: [exam_security_service_1.ExamSecurityService],
        exports: [exam_security_service_1.ExamSecurityService],
    })
], ExamSecurityModule);
//# sourceMappingURL=exam-security.module.js.map