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
exports.UniversityUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const university_entity_1 = require("./university.entity");
let UniversityUser = class UniversityUser {
    id;
    mongoId;
    university;
    university_id;
    user;
    user_id;
    role;
    department;
    isActive;
    createdAt;
    updatedAt;
};
exports.UniversityUser = UniversityUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UniversityUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UniversityUser.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => university_entity_1.University, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'university_id' }),
    __metadata("design:type", university_entity_1.University)
], UniversityUser.prototype, "university", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UniversityUser.prototype, "university_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UniversityUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UniversityUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Professor' }),
    __metadata("design:type", String)
], UniversityUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UniversityUser.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UniversityUser.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UniversityUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UniversityUser.prototype, "updatedAt", void 0);
exports.UniversityUser = UniversityUser = __decorate([
    (0, typeorm_1.Entity)('university_users'),
    (0, typeorm_1.Index)(['university_id', 'user_id'], { unique: true })
], UniversityUser);
//# sourceMappingURL=university-user.entity.js.map