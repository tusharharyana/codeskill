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
exports.CreateStudentDto = exports.StudentProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class StudentProfileDto {
    university;
    department;
    course;
    semester;
    section;
    group;
    year;
    batch;
}
exports.StudentProfileDto = StudentProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chandigarh University' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "university", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Computer Science and Engineering' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'B.Tech CSE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StudentProfileDto.prototype, "semester", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Group-1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2026 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StudentProfileDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2022-2026' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentProfileDto.prototype, "batch", void 0);
class CreateStudentDto {
    uid;
    name;
    email;
    password;
    forcePasswordChange;
    isActive;
    studentProfile;
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CU202600123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Sharma' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rahul.cu2026@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'InitialTempPass123!' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentDto.prototype, "forcePasswordChange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStudentDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: StudentProfileDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => StudentProfileDto),
    __metadata("design:type", StudentProfileDto)
], CreateStudentDto.prototype, "studentProfile", void 0);
//# sourceMappingURL=create-student.dto.js.map