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
exports.ProblemStatement = void 0;
const typeorm_1 = require("typeorm");
const problem_metadata_entity_1 = require("./problem-metadata.entity");
let ProblemStatement = class ProblemStatement {
    id;
    mongoId;
    metadata;
    metadata_id;
    description;
    inputFormat;
    outputFormat;
    constraints;
    samples;
    createdAt;
    updatedAt;
};
exports.ProblemStatement = ProblemStatement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProblemStatement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProblemStatement.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => problem_metadata_entity_1.ProblemMetadata, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'metadata_id' }),
    __metadata("design:type", problem_metadata_entity_1.ProblemMetadata)
], ProblemStatement.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProblemStatement.prototype, "metadata_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProblemStatement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProblemStatement.prototype, "inputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProblemStatement.prototype, "outputFormat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProblemStatement.prototype, "constraints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ProblemStatement.prototype, "samples", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProblemStatement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProblemStatement.prototype, "updatedAt", void 0);
exports.ProblemStatement = ProblemStatement = __decorate([
    (0, typeorm_1.Entity)('problem_statements')
], ProblemStatement);
//# sourceMappingURL=problem-statement.entity.js.map