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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const company_entity_1 = require("./company.entity");
let Job = class Job {
    id;
    mongoId;
    company;
    company_id;
    title;
    description;
    skills;
    experienceLevel;
    salaryRange;
    location;
    workplaceType;
    employmentType;
    status;
    applicationDeadline;
    createdBy;
    created_by_id;
    createdAt;
    updatedAt;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.Company)
], Job.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], Job.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Entry Level' }),
    __metadata("design:type", String)
], Job.prototype, "experienceLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], Job.prototype, "salaryRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Remote' }),
    __metadata("design:type", String)
], Job.prototype, "workplaceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Full-time' }),
    __metadata("design:type", String)
], Job.prototype, "employmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Published' }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Job.prototype, "applicationDeadline", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Job.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)('jobs')
], Job);
//# sourceMappingURL=job.entity.js.map