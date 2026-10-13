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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSecurityEvent = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const assessment_entity_1 = require("./assessment.entity");
const exam_session_entity_1 = require("./exam-session.entity");
let ExamSecurityEvent = class ExamSecurityEvent {
    id;
    mongoId;
    session;
    sessionId;
    get session_id() {
        return this.sessionId;
    }
    set session_id(val) {
        this.sessionId = val;
    }
    candidate;
    candidateId;
    get candidate_id() {
        return this.candidateId;
    }
    set candidate_id(val) {
        this.candidateId = val;
    }
    assessment;
    assessmentId;
    get assessment_id() {
        return this.assessmentId;
    }
    set assessment_id(val) {
        this.assessmentId = val;
    }
    eventType;
    severity;
    metadata;
    createdAt;
    updatedAt;
};
exports.ExamSecurityEvent = ExamSecurityEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_session_entity_1.ExamSession, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", exam_session_entity_1.ExamSession)
], ExamSecurityEvent.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id' }),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'candidate_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", user_entity_1.User)
], ExamSecurityEvent.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_id' }),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "candidateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_entity_1.Assessment, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assessment_id' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", assessment_entity_1.Assessment)
], ExamSecurityEvent.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assessment_id' }),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "assessmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'INFO' }),
    __metadata("design:type", String)
], ExamSecurityEvent.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], ExamSecurityEvent.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExamSecurityEvent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ExamSecurityEvent.prototype, "updatedAt", void 0);
exports.ExamSecurityEvent = ExamSecurityEvent = __decorate([
    (0, typeorm_1.Entity)('exam_security_events')
], ExamSecurityEvent);
//# sourceMappingURL=exam-security-event.entity.js.map