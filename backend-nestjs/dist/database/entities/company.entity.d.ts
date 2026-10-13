import { User } from './user.entity';
export declare class Company {
    id: string;
    mongoId: string;
    name: string;
    username: string;
    logo: string;
    coverImage: string;
    industry: string;
    website: string;
    description: string;
    headquarters: string;
    companySize: string;
    foundedYear: number;
    email: string;
    phone: string;
    socialLinks: Record<string, string>;
    techStack: string[];
    benefits: string[];
    hiringStatus: string;
    isVerified: boolean;
    createdBy: User;
    created_by_id: string;
    createdAt: Date;
    updatedAt: Date;
}
