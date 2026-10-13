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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const discussion_entity_1 = require("../database/entities/discussion.entity");
const discussion_reply_entity_1 = require("../database/entities/discussion-reply.entity");
let DiscussionsService = class DiscussionsService {
    discussionRepo;
    replyRepo;
    constructor(discussionRepo, replyRepo) {
        this.discussionRepo = discussionRepo;
        this.replyRepo = replyRepo;
    }
    async getThreads(problemId, query) {
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 20;
        const qb = this.discussionRepo
            .createQueryBuilder('thread')
            .leftJoinAndSelect('thread.author', 'author')
            .where('thread.problemId = :problemId', { problemId });
        if (query.tag && query.tag !== 'all') {
            qb.andWhere(':tag = ANY(thread.tags)', { tag: query.tag });
        }
        if (query.sort === 'popular') {
            qb.orderBy('thread.upvotes', 'DESC');
        }
        else {
            qb.orderBy('thread.createdAt', 'DESC');
        }
        qb.skip((page - 1) * limit).take(limit);
        const [threads, total] = await qb.getManyAndCount();
        return {
            data: threads.map((t) => ({ ...t, _id: t.id })),
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    async getThread(threadId) {
        const thread = await this.discussionRepo.findOne({
            where: [{ id: threadId }, { mongoId: threadId }],
            relations: { author: true },
        });
        if (!thread)
            throw new common_1.NotFoundException('Thread not found');
        return { ...thread, _id: thread.id };
    }
    async createThread(userId, data) {
        if (!data.title?.trim() || !data.body?.trim()) {
            throw new common_1.BadRequestException('Title and body are required');
        }
        const thread = this.discussionRepo.create({
            problemId: data.problemId,
            author: { id: userId },
            title: data.title.trim(),
            body: data.body.trim(),
            tags: data.tags || ['general'],
            upvotes: 0,
            downvotes: 0,
            replyCount: 0,
        });
        await this.discussionRepo.save(thread);
        return this.getThread(thread.id);
    }
    async deleteThread(userId, threadId) {
        const thread = await this.discussionRepo.findOne({
            where: [{ id: threadId }, { mongoId: threadId }],
            relations: { author: true },
        });
        if (!thread)
            throw new common_1.NotFoundException('Thread not found');
        if (thread.author?.id !== userId) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        await this.replyRepo.delete({ discussion: { id: thread.id } });
        await this.discussionRepo.delete(thread.id);
        return { deleted: true };
    }
    async voteThread(userId, threadId, direction) {
        const thread = await this.discussionRepo.findOne({
            where: [{ id: threadId }, { mongoId: threadId }],
        });
        if (!thread)
            throw new common_1.NotFoundException('Thread not found');
        const upvotedBy = Array.isArray(thread.upvotedBy) ? [...thread.upvotedBy] : [];
        const downvotedBy = Array.isArray(thread.downvotedBy) ? [...thread.downvotedBy] : [];
        const alreadyUpvoted = upvotedBy.includes(userId);
        const alreadyDownvoted = downvotedBy.includes(userId);
        if (direction === 'up') {
            if (alreadyUpvoted) {
                thread.upvotedBy = upvotedBy.filter((id) => id !== userId);
                thread.upvotes = Math.max(0, (thread.upvotes || 0) - 1);
            }
            else {
                if (alreadyDownvoted) {
                    thread.downvotedBy = downvotedBy.filter((id) => id !== userId);
                    thread.downvotes = Math.max(0, (thread.downvotes || 0) - 1);
                }
                thread.upvotedBy = [...upvotedBy, userId];
                thread.upvotes = (thread.upvotes || 0) + 1;
            }
        }
        else {
            if (alreadyDownvoted) {
                thread.downvotedBy = downvotedBy.filter((id) => id !== userId);
                thread.downvotes = Math.max(0, (thread.downvotes || 0) - 1);
            }
            else {
                if (alreadyUpvoted) {
                    thread.upvotedBy = upvotedBy.filter((id) => id !== userId);
                    thread.upvotes = Math.max(0, (thread.upvotes || 0) - 1);
                }
                thread.downvotedBy = [...downvotedBy, userId];
                thread.downvotes = (thread.downvotes || 0) + 1;
            }
        }
        await this.discussionRepo.save(thread);
        return { upvotes: thread.upvotes, downvotes: thread.downvotes };
    }
    async getReplies(threadId) {
        const replies = await this.replyRepo.find({
            where: { discussion: { id: threadId } },
            relations: { author: true },
            order: { createdAt: 'ASC' },
        });
        return replies.map((r) => ({ ...r, _id: r.id }));
    }
    async createReply(userId, threadId, data) {
        const thread = await this.discussionRepo.findOne({
            where: [{ id: threadId }, { mongoId: threadId }],
        });
        if (!thread)
            throw new common_1.NotFoundException('Thread not found');
        if (!data.body?.trim()) {
            throw new common_1.BadRequestException('Reply body is required');
        }
        const reply = this.replyRepo.create({
            discussion: { id: thread.id },
            author: { id: userId },
            body: data.body.trim(),
            parentReply: data.parentReply ? { id: data.parentReply } : null,
        });
        await this.replyRepo.save(reply);
        thread.replyCount = (thread.replyCount || 0) + 1;
        await this.discussionRepo.save(thread);
        const saved = await this.replyRepo.findOne({
            where: { id: reply.id },
            relations: { author: true },
        });
        return saved ? { ...saved, _id: saved.id } : reply;
    }
    async deleteReply(userId, replyId) {
        const reply = await this.replyRepo.findOne({
            where: { id: replyId },
            relations: { author: true, discussion: true },
        });
        if (!reply)
            throw new common_1.NotFoundException('Reply not found');
        if (reply.author?.id !== userId) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        if (reply.discussion) {
            const thread = await this.discussionRepo.findOne({ where: { id: reply.discussion.id } });
            if (thread) {
                thread.replyCount = Math.max(0, (thread.replyCount || 1) - 1);
                await this.discussionRepo.save(thread);
            }
        }
        await this.replyRepo.delete(replyId);
        return { deleted: true };
    }
    async voteReply(userId, replyId, direction) {
        const reply = await this.replyRepo.findOne({ where: { id: replyId } });
        if (!reply)
            throw new common_1.NotFoundException('Reply not found');
        const upvotedBy = Array.isArray(reply.upvotedBy) ? [...reply.upvotedBy] : [];
        const downvotedBy = Array.isArray(reply.downvotedBy) ? [...reply.downvotedBy] : [];
        const alreadyUpvoted = upvotedBy.includes(userId);
        const alreadyDownvoted = downvotedBy.includes(userId);
        if (direction === 'up') {
            if (alreadyUpvoted) {
                reply.upvotedBy = upvotedBy.filter((id) => id !== userId);
                reply.upvotes = Math.max(0, (reply.upvotes || 0) - 1);
            }
            else {
                if (alreadyDownvoted) {
                    reply.downvotedBy = downvotedBy.filter((id) => id !== userId);
                    reply.downvotes = Math.max(0, (reply.downvotes || 0) - 1);
                }
                reply.upvotedBy = [...upvotedBy, userId];
                reply.upvotes = (reply.upvotes || 0) + 1;
            }
        }
        else {
            if (alreadyDownvoted) {
                reply.downvotedBy = downvotedBy.filter((id) => id !== userId);
                reply.downvotes = Math.max(0, (reply.downvotes || 0) - 1);
            }
            else {
                if (alreadyUpvoted) {
                    reply.upvotedBy = upvotedBy.filter((id) => id !== userId);
                    reply.upvotes = Math.max(0, (reply.upvotes || 0) - 1);
                }
                reply.downvotedBy = [...downvotedBy, userId];
                reply.downvotes = (reply.downvotes || 0) + 1;
            }
        }
        await this.replyRepo.save(reply);
        return { upvotes: reply.upvotes, downvotes: reply.downvotes };
    }
};
exports.DiscussionsService = DiscussionsService;
exports.DiscussionsService = DiscussionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discussion_entity_1.Discussion)),
    __param(1, (0, typeorm_1.InjectRepository)(discussion_reply_entity_1.DiscussionReply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DiscussionsService);
//# sourceMappingURL=discussions.service.js.map