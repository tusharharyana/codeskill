import { User } from './user.entity';
import { Company } from './company.entity';
export declare class Job {
    id: string;
    mongoId: string;
    company: Company;
    company_id: string;
    title: string;
    description: string;
    skills: string[];
    experienceLevel: string;
    salaryRange: any;
    location: string;
    workplaceType: string;
    employmentType: string;
    status: string;
    applicationDeadline: Date;
    createdBy: User;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
}
