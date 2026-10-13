import { User } from './user.entity';
import { Company } from './company.entity';
export declare class CompanyUser {
    id: string;
    mongoId: string;
    company: Company;
    company_id: string;
    user: User;
    user_id: string;
    role: string;
    designation: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
