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
exports.AssessmentAttempt = void 0;
const typeorm_1 = require("typeorm");
const assessment_entity_1 = require("./assessment.entity");
const user_entity_1 = require("./user.entity");
let AssessmentAttempt = class AssessmentAttempt {
    id;
    assessment;
    assessmentId;
    get assessment_id() {
        return this.assessmentId;
    }
    set assessment_id(val) {
        this.assessmentId = val;
    }
    student;
    studentId;
    get student_id() {
        return this.studentId;
    }
    set student_id(val) {
        this.studentId = val;
    }
    mongoId;
    studentUid;
    studentName;
    studentEmail;
    status;
    startedAt;
    submittedAt;
    timeSpentSeconds;
    responses;
    questionOrder;
    score;
    highestScore;
    attemptNumber;
    maxScore;
    percentage;
    passed;
    totalAttempted;
    totalCorrect;
    totalWrong;
    totalSkipped;
    accuracy;
    tabSwitchCount;
    fullscreenExitCount;
    violations;
    disqualifiedReason;
    createdAt;
    updatedAt;
};
exports.AssessmentAttempt = AssessmentAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_entity_1.Assessment, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'assessment_id' }),
    __metadata("design:type", assessment_entity_1.Assessment)
], AssessmentAttempt.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'assessment_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "assessmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", user_entity_1.User)
], AssessmentAttempt.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'student_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "studentUid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "studentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "studentEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'in_progress',
    }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], AssessmentAttempt.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AssessmentAttempt.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "timeSpentSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], AssessmentAttempt.prototype, "responses", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], AssessmentAttempt.prototype, "questionOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "highestScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "attemptNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "maxScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AssessmentAttempt.prototype, "passed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "totalAttempted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "totalCorrect", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "totalWrong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "totalSkipped", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "accuracy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "tabSwitchCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AssessmentAttempt.prototype, "fullscreenExitCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], AssessmentAttempt.prototype, "violations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: '' }),
    __metadata("design:type", String)
], AssessmentAttempt.prototype, "disqualifiedReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AssessmentAttempt.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AssessmentAttempt.prototype, "updatedAt", void 0);
exports.AssessmentAttempt = AssessmentAttempt = __decorate([
    (0, typeorm_1.Entity)('assessment_attempts'),
    (0, typeorm_1.Index)(['assessmentId', 'studentId']),
    (0, typeorm_1.Index)(['assessmentId', 'score']),
    (0, typeorm_1.Index)(['studentUid', 'status'])
], AssessmentAttempt);
//# sourceMappingURL=assessment-attempt.entity.js.map