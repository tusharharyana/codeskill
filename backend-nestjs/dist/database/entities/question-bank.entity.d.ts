import { User } from './user.entity';
export declare class QuestionBank {
    id: string;
    name: string;
    description: string;
    questions: string[];
    topic: string;
    isPublic: boolean;
    tags: string[];
    createdBy: User;
    createdBy_id: string;
    createdAt: Date;
    updatedAt: Date;
}
