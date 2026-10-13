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
exports.CompanyUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const company_entity_1 = require("./company.entity");
let CompanyUser = class CompanyUser {
    id;
    mongoId;
    company;
    company_id;
    user;
    user_id;
    role;
    designation;
    isActive;
    createdAt;
    updatedAt;
};
exports.CompanyUser = CompanyUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CompanyUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanyUser.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'company_id' }),
    __metadata("design:type", company_entity_1.Company)
], CompanyUser.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyUser.prototype, "company_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CompanyUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompanyUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Recruiter' }),
    __metadata("design:type", String)
], CompanyUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], CompanyUser.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CompanyUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CompanyUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CompanyUser.prototype, "updatedAt", void 0);
exports.CompanyUser = CompanyUser = __decorate([
    (0, typeorm_1.Entity)('company_users'),
    (0, typeorm_1.Index)(['company_id', 'user_id'], { unique: true })
], CompanyUser);
//# sourceMappingURL=company-user.entity.js.map