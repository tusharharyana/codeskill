import { User } from './user.entity';
export declare class EmailJob {
    id: string;
    mongoId: string;
    student: User;
    student_id: string;
    uid: string;
    email: string;
    name: string;
    temporaryPassword?: string;
    status: string;
    retryCount: number;
    sentAt?: Date;
    error?: string;
    createdBy: User;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
}
