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
exports.Discussion = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Discussion = class Discussion {
    id;
    mongoId;
    problemId;
    author;
    author_id;
    title;
    body;
    tags;
    upvotes;
    downvotes;
    upvotedBy;
    downvotedBy;
    replyCount;
    isPinned;
    createdAt;
    updatedAt;
};
exports.Discussion = Discussion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Discussion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Discussion.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Discussion.prototype, "problemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.User)
], Discussion.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Discussion.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Discussion.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 5000 }),
    __metadata("design:type", String)
], Discussion.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: ['general'] }),
    __metadata("design:type", Array)
], Discussion.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Discussion.prototype, "upvotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Discussion.prototype, "downvotes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Discussion.prototype, "upvotedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Discussion.prototype, "downvotedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Discussion.prototype, "replyCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Discussion.prototype, "isPinned", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Discussion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Discussion.prototype, "updatedAt", void 0);
exports.Discussion = Discussion = __decorate([
    (0, typeorm_1.Entity)('discussions'),
    (0, typeorm_1.Index)(['problemId', 'createdAt']),
    (0, typeorm_1.Index)(['problemId', 'upvotes'])
], Discussion);
//# sourceMappingURL=discussion.entity.js.map