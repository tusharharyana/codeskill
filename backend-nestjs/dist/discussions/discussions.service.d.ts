import { Repository } from 'typeorm';
import { Discussion } from '../database/entities/discussion.entity';
import { DiscussionReply } from '../database/entities/discussion-reply.entity';
export declare class DiscussionsService {
    private readonly discussionRepo;
    private readonly replyRepo;
    constructor(discussionRepo: Repository<Discussion>, replyRepo: Repository<DiscussionReply>);
    getThreads(problemId: string, query: any): Promise<{
        data: {
            _id: string;
            id: string;
            mongoId: string;
            problemId: string;
            author: import("../database/entities/user.entity").User;
            author_id: string;
            title: string;
            body: string;
            tags: string[];
            upvotes: number;
            downvotes: number;
            upvotedBy: string[];
            downvotedBy: string[];
            replyCount: number;
            isPinned: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pages: number;
    }>;
    getThread(threadId: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        problemId: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        title: string;
        body: string;
        tags: string[];
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        replyCount: number;
        isPinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createThread(userId: string, data: {
        problemId: string;
        title: string;
        body: string;
        tags?: string[];
    }): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        problemId: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        title: string;
        body: string;
        tags: string[];
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        replyCount: number;
        isPinned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteThread(userId: string, threadId: string): Promise<{
        deleted: boolean;
    }>;
    voteThread(userId: string, threadId: string, direction: 'up' | 'down'): Promise<{
        upvotes: number;
        downvotes: number;
    }>;
    getReplies(threadId: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        discussion: Discussion;
        discussion_id: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        body: string;
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        parentReply: DiscussionReply;
        parent_reply_id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createReply(userId: string, threadId: string, data: {
        body: string;
        parentReply?: string;
    }): Promise<DiscussionReply | {
        _id: string;
        id: string;
        mongoId: string;
        discussion: Discussion;
        discussion_id: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        body: string;
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        parentReply: DiscussionReply;
        parent_reply_id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteReply(userId: string, replyId: string): Promise<{
        deleted: boolean;
    }>;
    voteReply(userId: string, replyId: string, direction: 'up' | 'down'): Promise<{
        upvotes: number;
        downvotes: number;
    }>;
}
