import { User } from './user.entity';
import { Company } from './company.entity';
import { Job } from './job.entity';
export declare class Application {
    id: string;
    mongoId: string;
    job: Job;
    job_id: string;
    company: Company;
    company_id: string;
    user: User;
    user_id: string;
    stage: string;
    resumeUrl: string;
    coverLetter: string;
    notes: string;
    assessmentScore: number;
    createdAt: Date;
    updatedAt: Date;
}
