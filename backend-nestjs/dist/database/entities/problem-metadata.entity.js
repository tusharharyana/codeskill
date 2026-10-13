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
exports.ProblemMetadata = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const problem_statement_entity_1 = require("./problem-statement.entity");
const problem_config_entity_1 = require("./problem-config.entity");
const problem_testcase_entity_1 = require("./problem-testcase.entity");
let ProblemMetadata = class ProblemMetadata {
    id;
    mongoId;
    title;
    slug;
    difficulty;
    categories;
    tags;
    author;
    author_id;
    visibility;
    metaTitle;
    metaDescription;
    keywords;
    stats;
    statement;
    config;
    testCases;
    createdAt;
    updatedAt;
};
exports.ProblemMetadata = ProblemMetadata;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Easy' }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ProblemMetadata.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ProblemMetadata.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.User)
], ProblemMetadata.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Draft' }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProblemMetadata.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ProblemMetadata.prototype, "keywords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: { totalSubmissions: 0, acceptedSubmissions: 0, acceptanceRate: 0 } }),
    __metadata("design:type", Object)
], ProblemMetadata.prototype, "stats", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => problem_statement_entity_1.ProblemStatement, statement => statement.metadata),
    __metadata("design:type", problem_statement_entity_1.ProblemStatement)
], ProblemMetadata.prototype, "statement", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => problem_config_entity_1.ProblemConfig, config => config.metadata),
    __metadata("design:type", problem_config_entity_1.ProblemConfig)
], ProblemMetadata.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => problem_testcase_entity_1.ProblemTestCase, testCases => testCases.metadata),
    __metadata("design:type", problem_testcase_entity_1.ProblemTestCase)
], ProblemMetadata.prototype, "testCases", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProblemMetadata.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProblemMetadata.prototype, "updatedAt", void 0);
exports.ProblemMetadata = ProblemMetadata = __decorate([
    (0, typeorm_1.Entity)('problem_metadata')
], ProblemMetadata);
//# sourceMappingURL=problem-metadata.entity.js.map