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
exports.QuestionBank = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let QuestionBank = class QuestionBank {
    id;
    name;
    description;
    questions;
    topic;
    isPublic;
    tags;
    createdBy;
    createdBy_id;
    createdAt;
    updatedAt;
};
exports.QuestionBank = QuestionBank;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionBank.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], QuestionBank.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], QuestionBank.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], QuestionBank.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], QuestionBank.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], QuestionBank.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdBy_id' }),
    __metadata("design:type", user_entity_1.User)
], QuestionBank.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], QuestionBank.prototype, "createdBy_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionBank.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionBank.prototype, "updatedAt", void 0);
exports.QuestionBank = QuestionBank = __decorate([
    (0, typeorm_1.Entity)('question_banks'),
    (0, typeorm_1.Index)(['topic', 'name'])
], QuestionBank);
//# sourceMappingURL=question-bank.entity.js.map