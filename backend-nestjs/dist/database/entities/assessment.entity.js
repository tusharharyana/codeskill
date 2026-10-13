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
exports.Assessment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Assessment = class Assessment {
    id;
    title;
    code;
    description;
    type;
    category;
    durationMinutes;
    totalMarks;
    passingMarks;
    negativeMarking;
    mongoId;
    questions;
    sections;
    targetBatches;
    targetDepartments;
    targetCourses;
    targetSections;
    startTime;
    endTime;
    shuffleQuestions;
    shuffleOptions;
    showResultImmediately;
    allowReview;
    allowedAttempts;
    proctoring;
    securityPolicy;
    status;
    createdBy;
    created_by_id;
    instructions;
    createdAt;
    updatedAt;
};
exports.Assessment = Assessment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Assessment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Assessment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Assessment.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Assessment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'mcq',
    }),
    __metadata("design:type", String)
], Assessment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'exam',
    }),
    __metadata("design:type", String)
], Assessment.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 60 }),
    __metadata("design:type", Number)
], Assessment.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Assessment.prototype, "totalMarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Assessment.prototype, "passingMarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "negativeMarking", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Assessment.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Assessment.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "targetBatches", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "targetDepartments", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "targetCourses", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "targetSections", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Assessment.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Assessment.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "shuffleQuestions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "shuffleOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "showResultImmediately", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "allowReview", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Assessment.prototype, "allowedAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Assessment.prototype, "proctoring", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Assessment.prototype, "securityPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'published',
    }),
    __metadata("design:type", String)
], Assessment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Assessment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Assessment.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Assessment.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Assessment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Assessment.prototype, "updatedAt", void 0);
exports.Assessment = Assessment = __decorate([
    (0, typeorm_1.Entity)('assessments'),
    (0, typeorm_1.Index)(['status', 'startTime', 'endTime']),
    (0, typeorm_1.Index)(['targetBatches']),
    (0, typeorm_1.Index)(['targetDepartments'])
], Assessment);
//# sourceMappingURL=assessment.entity.js.map