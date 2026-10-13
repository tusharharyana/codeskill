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
exports.ContestAttempt = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const contest_entity_1 = require("./contest.entity");
let ContestAttempt = class ContestAttempt {
    id;
    mongoId;
    contest;
    contest_id;
    user;
    user_id;
    sessionId;
    deviceFingerprint;
    status;
    startedAt;
    submittedAt;
    warnings;
    violations;
    savedCode;
    createdAt;
    updatedAt;
};
exports.ContestAttempt = ContestAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContestAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContestAttempt.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contest_entity_1.Contest, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'contest_id' }),
    __metadata("design:type", contest_entity_1.Contest)
], ContestAttempt.prototype, "contest", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContestAttempt.prototype, "contest_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ContestAttempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContestAttempt.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContestAttempt.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContestAttempt.prototype, "deviceFingerprint", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'InProgress' }),
    __metadata("design:type", String)
], ContestAttempt.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ContestAttempt.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ContestAttempt.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ContestAttempt.prototype, "warnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ContestAttempt.prototype, "violations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], ContestAttempt.prototype, "savedCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContestAttempt.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContestAttempt.prototype, "updatedAt", void 0);
exports.ContestAttempt = ContestAttempt = __decorate([
    (0, typeorm_1.Entity)('contest_attempts'),
    (0, typeorm_1.Index)(['contest_id', 'user_id'], { unique: true })
], ContestAttempt);
//# sourceMappingURL=contest-attempt.entity.js.map