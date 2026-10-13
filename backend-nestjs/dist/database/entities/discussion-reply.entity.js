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
exports.DiscussionReply = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const discussion_entity_1 = require("./discussion.entity");
let DiscussionReply = class DiscussionReply {
    id;
    mongoId;
    discussion;
    discussion_id;
    author;
    author_id;
    body;
    upvotes;
    downvotes;
    upvotedBy;
    downvotedBy;
    parentReply;
    parent_reply_id;
    createdAt;
    updatedAt;
};
exports.DiscussionReply = DiscussionReply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DiscussionReply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DiscussionReply.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => discussion_entity_1.Discussion, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'discussion_id' }),
    __metadata("design:type", discussion_entity_1.Discussion)
], DiscussionReply.prototype, "discussion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DiscussionReply.prototype, "discussion_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.User)
], DiscussionReply.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DiscussionReply.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3000 }),
    __metadata("design:type", String)
], DiscussionReply.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], DiscussionReply.prototype, "upvotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], DiscussionReply.prototype, "downvotes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], DiscussionReply.prototype, "upvotedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], DiscussionReply.prototype, "downvotedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DiscussionReply, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_reply_id' }),
    __metadata("design:type", DiscussionReply)
], DiscussionReply.prototype, "parentReply", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DiscussionReply.prototype, "parent_reply_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DiscussionReply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DiscussionReply.prototype, "updatedAt", void 0);
exports.DiscussionReply = DiscussionReply = __decorate([
    (0, typeorm_1.Entity)('discussion_replies'),
    (0, typeorm_1.Index)(['discussion_id', 'createdAt'])
], DiscussionReply);
//# sourceMappingURL=discussion-reply.entity.js.map