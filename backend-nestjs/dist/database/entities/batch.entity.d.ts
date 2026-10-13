import { User } from './user.entity';
import { University } from './university.entity';
export declare class Batch {
    id: string;
    mongoId: string;
    university: University;
    university_id: string;
    name: string;
    department: string;
    graduationYear: number;
    inviteCode: string;
    createdBy: User;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
    generateInviteCode(): void;
}
