import { User } from './user.entity';
import { University } from './university.entity';
import { Batch } from './batch.entity';
export declare class StudentEnrollment {
    id: string;
    mongoId: string;
    university: University;
    university_id: string;
    batch: Batch;
    batch_id: string;
    student: User;
    student_id: string;
    rollNumber: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
