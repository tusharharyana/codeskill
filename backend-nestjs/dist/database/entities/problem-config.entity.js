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
exports.ProblemConfig = void 0;
const typeorm_1 = require("typeorm");
const problem_metadata_entity_1 = require("./problem-metadata.entity");
let ProblemConfig = class ProblemConfig {
    id;
    mongoId;
    metadata;
    metadata_id;
    supportedLanguages;
    timeLimit;
    memoryLimit;
    cpuLimit;
    stackSize;
    outputLimit;
    maxSourceCodeSize;
    executionMode;
    functionSignature;
    exactOutput;
    enableCustomInput;
    allowMultipleFiles;
    enableFileUpload;
    starterCode;
    referenceSolution;
    hasCustomChecker;
    customCheckerCode;
    createdAt;
    updatedAt;
};
exports.ProblemConfig = ProblemConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProblemConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProblemConfig.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => problem_metadata_entity_1.ProblemMetadata, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'metadata_id' }),
    __metadata("design:type", problem_metadata_entity_1.ProblemMetadata)
], ProblemConfig.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProblemConfig.prototype, "metadata_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ProblemConfig.prototype, "supportedLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2000 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 256 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "memoryLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "cpuLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 8 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "stackSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 10 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "outputLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1048576 }),
    __metadata("design:type", Number)
], ProblemConfig.prototype, "maxSourceCodeSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'standard' }),
    __metadata("design:type", String)
], ProblemConfig.prototype, "executionMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ProblemConfig.prototype, "functionSignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProblemConfig.prototype, "exactOutput", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProblemConfig.prototype, "enableCustomInput", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProblemConfig.prototype, "allowMultipleFiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProblemConfig.prototype, "enableFileUpload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], ProblemConfig.prototype, "starterCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], ProblemConfig.prototype, "referenceSolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProblemConfig.prototype, "hasCustomChecker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], ProblemConfig.prototype, "customCheckerCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProblemConfig.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProblemConfig.prototype, "updatedAt", void 0);
exports.ProblemConfig = ProblemConfig = __decorate([
    (0, typeorm_1.Entity)('problem_configs')
], ProblemConfig);
//# sourceMappingURL=problem-config.entity.js.map