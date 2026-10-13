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
exports.EmailJob = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let EmailJob = class EmailJob {
    id;
    mongoId;
    student;
    student_id;
    uid;
    email;
    name;
    temporaryPassword;
    status;
    retryCount;
    sentAt;
    error;
    createdBy;
    created_by_id;
    createdAt;
    updatedAt;
};
exports.EmailJob = EmailJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmailJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailJob.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", user_entity_1.User)
], EmailJob.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailJob.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailJob.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailJob.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailJob.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailJob.prototype, "temporaryPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], EmailJob.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EmailJob.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EmailJob.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], EmailJob.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], EmailJob.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailJob.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmailJob.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmailJob.prototype, "updatedAt", void 0);
exports.EmailJob = EmailJob = __decorate([
    (0, typeorm_1.Entity)('email_jobs'),
    (0, typeorm_1.Index)(['status', 'createdAt']),
    (0, typeorm_1.Index)(['student_id', 'status']),
    (0, typeorm_1.Index)(['uid', 'status'])
], EmailJob);
//# sourceMappingURL=email-job.entity.js.map