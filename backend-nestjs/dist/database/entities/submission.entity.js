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
exports.Submission = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const problem_entity_1 = require("./problem.entity");
let Submission = class Submission {
    id;
    user;
    userId;
    problem;
    problemId;
    code;
    language;
    status;
    executionTime;
    memoryUsed;
    testsPassed;
    totalTests;
    errorMessage;
    testResults;
    mongoId;
    runtime;
    memory;
    testCasesPassed;
    totalTestCases;
    compileOutput;
    queuedAt;
    startedAt;
    completedAt;
    createdAt;
    updatedAt;
};
exports.Submission = Submission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Submission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Submission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Submission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => problem_entity_1.Problem),
    (0, typeorm_1.JoinColumn)({ name: 'problemId' }),
    __metadata("design:type", problem_entity_1.Problem)
], Submission.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Submission.prototype, "problemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Submission.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Submission.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'Pending',
    }),
    __metadata("design:type", String)
], Submission.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "executionTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "memoryUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "testsPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "totalTests", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Submission.prototype, "testResults", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "runtime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "memory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "testCasesPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Submission.prototype, "totalTestCases", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Submission.prototype, "compileOutput", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Submission.prototype, "queuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Submission.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Submission.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Submission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Submission.prototype, "updatedAt", void 0);
exports.Submission = Submission = __decorate([
    (0, typeorm_1.Entity)('submissions'),
    (0, typeorm_1.Index)(['userId', 'problemId', 'status']),
    (0, typeorm_1.Index)(['createdAt']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['language'])
], Submission);
//# sourceMappingURL=submission.entity.js.map