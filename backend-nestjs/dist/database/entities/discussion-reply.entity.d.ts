import { User } from './user.entity';
import { Discussion } from './discussion.entity';
export declare class DiscussionReply {
    id: string;
    mongoId: string;
    discussion: Discussion;
    discussion_id: string;
    author: User;
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
}
