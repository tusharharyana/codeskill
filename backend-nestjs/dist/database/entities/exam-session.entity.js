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
exports.ExamSession = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const assessment_entity_1 = require("./assessment.entity");
let ExamSession = class ExamSession {
    id;
    mongoId;
    assessment;
    assessmentId;
    get assessment_id() {
        return this.assessmentId;
    }
    set assessment_id(val) {
        this.assessmentId = val;
    }
    candidate;
    candidateId;
    get candidate_id() {
        return this.candidateId;
    }
    set candidate_id(val) {
        this.candidateId = val;
    }
    status;
    secureMode;
    clientType;
    clientVersion;
    configKey;
    browserExamKeyVerified;
    startedAt;
    lastHeartbeatAt;
    expiresAt;
    submittedAt;
    securityState;
    violationCount;
    createdAt;
    updatedAt;
};
exports.ExamSession = ExamSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExamSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExamSession.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_entity_1.Assessment, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assessment_id' }),
    __metadata("design:type", assessment_entity_1.Assessment)
], ExamSession.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assessment_id' }),
    __metadata("design:type", String)
], ExamSession.prototype, "assessmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'candidate_id' }),
    __metadata("design:type", user_entity_1.User)
], ExamSession.prototype, "candidate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'candidate_id' }),
    __metadata("design:type", String)
], ExamSession.prototype, "candidateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'CREATED' }),
    __metadata("design:type", String)
], ExamSession.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'DISABLED' }),
    __metadata("design:type", String)
], ExamSession.prototype, "secureMode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamSession.prototype, "clientType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExamSession.prototype, "clientVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExamSession.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], ExamSession.prototype, "browserExamKeyVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ExamSession.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ExamSession.prototype, "lastHeartbeatAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ExamSession.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ExamSession.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'CLEAN' }),
    __metadata("design:type", String)
], ExamSession.prototype, "securityState", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ExamSession.prototype, "violationCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ExamSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ExamSession.prototype, "updatedAt", void 0);
exports.ExamSession = ExamSession = __decorate([
    (0, typeorm_1.Entity)('exam_sessions'),
    (0, typeorm_1.Index)(['assessmentId', 'candidateId'], { unique: true })
], ExamSession);
//# sourceMappingURL=exam-session.entity.js.map