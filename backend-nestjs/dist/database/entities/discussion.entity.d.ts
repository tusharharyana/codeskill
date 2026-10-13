import { User } from './user.entity';
export declare class Discussion {
    id: string;
    mongoId: string;
    problemId: string;
    author: User;
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
}
