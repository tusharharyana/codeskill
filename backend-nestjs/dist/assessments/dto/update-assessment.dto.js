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
exports.UpdateAssessmentStatusDto = exports.UpdateAssessmentDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_assessment_dto_1 = require("./create-assessment.dto");
class UpdateAssessmentDto {
    title;
    code;
    description;
    type;
    durationMinutes;
    passingMarks;
    negativeMarking;
    questionIds;
    sections;
    startTime;
    endTime;
    status;
    shuffleQuestions;
    shuffleOptions;
    showResultImmediately;
    allowReview;
    proctoring;
    instructions;
    allowedAttempts;
}
exports.UpdateAssessmentDto = UpdateAssessmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['mcq', 'coding', 'hybrid']),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAssessmentDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAssessmentDto.prototype, "passingMarks", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAssessmentDto.prototype, "negativeMarking", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateAssessmentDto.prototype, "questionIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_assessment_dto_1.AssessmentSectionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateAssessmentDto.prototype, "sections", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['draft', 'published', 'ongoing', 'completed', 'archived']),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAssessmentDto.prototype, "shuffleQuestions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAssessmentDto.prototype, "shuffleOptions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAssessmentDto.prototype, "showResultImmediately", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAssessmentDto.prototype, "allowReview", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateAssessmentDto.prototype, "proctoring", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateAssessmentDto.prototype, "instructions", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAssessmentDto.prototype, "allowedAttempts", void 0);
class UpdateAssessmentStatusDto {
    status;
}
exports.UpdateAssessmentStatusDto = UpdateAssessmentStatusDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['draft', 'published', 'ongoing', 'completed', 'archived']),
    __metadata("design:type", String)
], UpdateAssessmentStatusDto.prototype, "status", void 0);
//# sourceMappingURL=update-assessment.dto.js.map