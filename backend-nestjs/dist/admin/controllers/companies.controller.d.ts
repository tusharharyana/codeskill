import { AdminService } from '../admin.service';
export declare class AdminCompaniesController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCompanies(page: string, limit: string, search: string): Promise<{
        companies: {
            _id: string;
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
            createdBy: import("../../database/entities/user.entity").User;
            created_by_id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pages: number;
    }>;
    createCompany(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    toggleVerify(id: string): Promise<{
        success: boolean;
        isVerified: boolean;
    }>;
    deleteCompany(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
