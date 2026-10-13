import { DiscussionsService } from './discussions.service';
export declare class DiscussionsController {
    private readonly discussionsService;
    constructor(discussionsService: DiscussionsService);
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
    getReplies(threadId: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        discussion: import("../database/entities/discussion.entity").Discussion;
        discussion_id: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        body: string;
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        parentReply: import("../database/entities/discussion-reply.entity").DiscussionReply;
        parent_reply_id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createThread(userId: string, data: any): Promise<{
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
    createReply(userId: string, threadId: string, data: any): Promise<import("../database/entities/discussion-reply.entity").DiscussionReply | {
        _id: string;
        id: string;
        mongoId: string;
        discussion: import("../database/entities/discussion.entity").Discussion;
        discussion_id: string;
        author: import("../database/entities/user.entity").User;
        author_id: string;
        body: string;
        upvotes: number;
        downvotes: number;
        upvotedBy: string[];
        downvotedBy: string[];
        parentReply: import("../database/entities/discussion-reply.entity").DiscussionReply;
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
