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
exports.CreateQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateQuestionDto {
    question;
    options;
    correctAnswer;
    explanation;
    topic;
    categories;
    subtopic;
    difficulty = 'medium';
    marks = 1;
    negativeMarks = 0;
    language = 'general';
    questionType = 'single_choice';
    status;
    tags;
    title;
    slug;
    description;
    correctAnswers;
    code;
    expectedOutput;
    problemStatement;
    constraints;
    examples;
    inputFormat;
    outputFormat;
    starterCode;
    supportedLanguages;
    functionSignature;
    timeLimit;
    memoryLimit;
    testCases;
    referenceSolutions;
    hints;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        description: 'Array of options',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Zero-based index of the correct option (0, 1, 2, or 3)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Binary search repeatedly divides the search interval in half, leading to O(log n) time complexity.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Data Structures & Algorithms' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'Topic categories only; question type remains a separate field',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Searching Algorithms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "subtopic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['easy', 'medium', 'hard'], default: 'medium' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['easy', 'medium', 'hard']),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "marks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "negativeMarks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 'general' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: [
            'single_choice',
            'multiple_choice',
            'coding',
            'algorithmic',
            'MCQ',
            'MULTIPLE_CHOICE',
            'TRUE_FALSE',
            'CODE_OUTPUT',
            'DSA',
        ],
        default: 'single_choice',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([
        'single_choice',
        'multiple_choice',
        'coding',
        'algorithmic',
        'MCQ',
        'MULTIPLE_CHOICE',
        'TRUE_FALSE',
        'CODE_OUTPUT',
        'DSA',
    ]),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['binary-search', 'algorithms', 'time-complexity'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "correctAnswers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "expectedOutput", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "problemStatement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return value
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean);
        }
        return value;
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "constraints", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "examples", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "inputFormat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "outputFormat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "starterCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "supportedLanguages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "functionSignature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "timeLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "memoryLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "testCases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "referenceSolutions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "hints", void 0);
//# sourceMappingURL=create-question.dto.js.map