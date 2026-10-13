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
exports.StudentEnrollment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const university_entity_1 = require("./university.entity");
const batch_entity_1 = require("./batch.entity");
let StudentEnrollment = class StudentEnrollment {
    id;
    mongoId;
    university;
    university_id;
    batch;
    batch_id;
    student;
    student_id;
    rollNumber;
    isActive;
    createdAt;
    updatedAt;
};
exports.StudentEnrollment = StudentEnrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => university_entity_1.University, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'university_id' }),
    __metadata("design:type", university_entity_1.University)
], StudentEnrollment.prototype, "university", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "university_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => batch_entity_1.Batch, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", batch_entity_1.Batch)
], StudentEnrollment.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "batch_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", user_entity_1.User)
], StudentEnrollment.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], StudentEnrollment.prototype, "rollNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], StudentEnrollment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StudentEnrollment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StudentEnrollment.prototype, "updatedAt", void 0);
exports.StudentEnrollment = StudentEnrollment = __decorate([
    (0, typeorm_1.Entity)('student_enrollments'),
    (0, typeorm_1.Index)(['batch_id', 'student_id'], { unique: true }),
    (0, typeorm_1.Index)(['university_id', 'student_id'], { unique: true })
], StudentEnrollment);
//# sourceMappingURL=student-enrollment.entity.js.map