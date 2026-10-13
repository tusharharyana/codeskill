import { User } from './user.entity';
import { University } from './university.entity';
export declare class UniversityUser {
    id: string;
    mongoId: string;
    university: University;
    university_id: string;
    user: User;
    user_id: string;
    role: string;
    department: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
