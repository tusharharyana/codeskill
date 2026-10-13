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
exports.Problem = void 0;
const typeorm_1 = require("typeorm");
let Problem = class Problem {
    id;
    title;
    slug;
    description;
    inputFormat;
    outputFormat;
    examples;
    visibility;
    difficulty;
    constraints;
    tags;
    timeLimit;
    memoryLimit;
    supportedLanguages;
    starterCode;
    testCases;
    hints;
    editorial;
    stats;
    isPublished;
    createdAt;
    updatedAt;
};
exports.Problem = Problem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Problem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Problem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Problem.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Problem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Problem.prototype, "inputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Problem.prototype, "outputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Problem.prototype, "examples", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'Published' }),
    __metadata("design:type", String)
], Problem.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'Easy',
    }),
    __metadata("design:type", String)
], Problem.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Problem.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Problem.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 2000 }),
    __metadata("design:type", Number)
], Problem.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 256 }),
    __metadata("design:type", Number)
], Problem.prototype, "memoryLimit", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Problem.prototype, "supportedLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Problem.prototype, "starterCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Problem.prototype, "testCases", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Problem.prototype, "hints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Problem.prototype, "editorial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], Problem.prototype, "stats", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Problem.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Problem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Problem.prototype, "updatedAt", void 0);
exports.Problem = Problem = __decorate([
    (0, typeorm_1.Entity)('problems')
], Problem);
//# sourceMappingURL=problem.entity.js.map