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
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const company_entity_1 = require("./company.entity");
const job_entity_1 = require("./job.entity");
let Application = class Application {
    id;
    mongoId;
    job;
    job_id;
    company;
    company_id;
    user;
    user_id;
    stage;
    resumeUrl;
    coverLetter;
    notes;
    assessmentScore;
    createdAt;
    updatedAt;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'job_id' }),
    __metadata("design:type", job_entity_1.Job)
], Application.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "job_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.Company)
], Application.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Application.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Applied' }),
    __metadata("design:type", String)
], Application.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Application.prototype, "resumeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Application.prototype, "coverLetter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Application.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Application.prototype, "assessmentScore", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications'),
    (0, typeorm_1.Index)(['job_id', 'user_id'], { unique: true })
], Application);
//# sourceMappingURL=application.entity.js.map