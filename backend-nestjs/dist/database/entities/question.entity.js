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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Question = class Question {
    id;
    mongoId;
    question;
    options;
    correctAnswer;
    explanation;
    codeSnippet;
    topic;
    subtopic;
    difficulty;
    marks;
    negativeMarks;
    language;
    questionType;
    status;
    createdBy;
    created_by_id;
    aiGenerated;
    aiProvider;
    aiModel;
    generatedAt;
    approvedBy;
    approved_by_id;
    approvedAt;
    rejectedReason;
    tags;
    metadata;
    title;
    slug;
    description;
    correctAnswers;
    code;
    expectedOutput;
    problemStatement;
    constraints;
    examples;
    inputFormat;
    outputFormat;
    starterCode;
    supportedLanguages;
    functionSignature;
    timeLimit;
    memoryLimit;
    testCases;
    referenceSolutions;
    hints;
    createdAt;
    updatedAt;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Question.prototype, "explanation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "codeSnippet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Question.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, default: '' }),
    __metadata("design:type", String)
], Question.prototype, "subtopic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'medium',
    }),
    __metadata("design:type", String)
], Question.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 1 }),
    __metadata("design:type", Number)
], Question.prototype, "marks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Question.prototype, "negativeMarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'general' }),
    __metadata("design:type", String)
], Question.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'single_choice',
    }),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'approved',
    }),
    __metadata("design:type", String)
], Question.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "aiGenerated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "aiProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "aiModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Question.prototype, "generatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approved_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "approved_by_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Question.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "rejectedReason", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Question.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "correctAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "expectedOutput", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "problemStatement", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "examples", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "inputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "outputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "starterCode", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "supportedLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "functionSignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1000 }),
    __metadata("design:type", Number)
], Question.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 256 }),
    __metadata("design:type", Number)
], Question.prototype, "memoryLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "testCases", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "referenceSolutions", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Question.prototype, "hints", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)('questions'),
    (0, typeorm_1.Index)(['topic', 'difficulty', 'status']),
    (0, typeorm_1.Index)(['topic', 'subtopic']),
    (0, typeorm_1.Index)(['status', 'createdAt']),
    (0, typeorm_1.Index)(['aiGenerated', 'status'])
], Question);
//# sourceMappingURL=question.entity.js.map