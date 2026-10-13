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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Company = class Company {
    id;
    mongoId;
    name;
    username;
    logo;
    coverImage;
    industry;
    website;
    description;
    headquarters;
    companySize;
    foundedYear;
    email;
    phone;
    socialLinks;
    techStack;
    benefits;
    hiringStatus;
    isVerified;
    createdBy;
    created_by_id;
    createdAt;
    updatedAt;
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "headquarters", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Company.prototype, "companySize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Company.prototype, "foundedYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], Company.prototype, "socialLinks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: [] }),
    __metadata("design:type", Array)
], Company.prototype, "techStack", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: [] }),
    __metadata("design:type", Array)
], Company.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Actively Hiring' }),
    __metadata("design:type", String)
], Company.prototype, "hiringStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Company.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)('companies')
], Company);
//# sourceMappingURL=company.entity.js.map