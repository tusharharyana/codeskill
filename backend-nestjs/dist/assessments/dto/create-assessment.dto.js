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
exports.CreateAssessmentDto = exports.AssessmentSectionDto = exports.AssessmentQuestionConfigDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AssessmentQuestionConfigDto {
    questionId;
    marks;
    negativeMarks;
    order;
}
exports.AssessmentQuestionConfigDto = AssessmentQuestionConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssessmentQuestionConfigDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AssessmentQuestionConfigDto.prototype, "marks", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AssessmentQuestionConfigDto.prototype, "negativeMarks", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AssessmentQuestionConfigDto.prototype, "order", void 0);
class AssessmentSectionDto {
    title;
    description;
    order;
    timeLimit;
    questions;
}
exports.AssessmentSectionDto = AssessmentSectionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssessmentSectionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssessmentSectionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AssessmentSectionDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AssessmentSectionDto.prototype, "timeLimit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AssessmentQuestionConfigDto),
    __metadata("design:type", Array)
], AssessmentSectionDto.prototype, "questions", void 0);
class CreateAssessmentDto {
    title;
    code;
    description;
    type;
    category;
    durationMinutes;
    passingMarks;
    negativeMarking;
    questionIds;
    sections;
    status;
    targetBatches;
    targetDepartments;
    targetCourses;
    startTime;
    endTime;
    shuffleQuestions;
    shuffleOptions;
    showResultImmediately;
    allowReview;
    allowedAttempts;
    proctoring;
    instructions;
}
exports.CreateAssessmentDto = CreateAssessmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['mcq', 'coding', 'hybrid']),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['exam', 'quiz', 'practice', 'recruitment']),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(5),
    __metadata("design:type", Number)
], CreateAssessmentDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAssessmentDto.prototype, "passingMarks", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAssessmentDto.prototype, "negativeMarking", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "questionIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AssessmentSectionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "sections", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['draft', 'published', 'ongoing', 'completed', 'archived']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "targetBatches", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "targetDepartments", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "targetCourses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAssessmentDto.prototype, "shuffleQuestions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAssessmentDto.prototype, "shuffleOptions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAssessmentDto.prototype, "showResultImmediately", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAssessmentDto.prototype, "allowReview", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAssessmentDto.prototype, "allowedAttempts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAssessmentDto.prototype, "proctoring", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "instructions", void 0);
//# sourceMappingURL=create-assessment.dto.js.map