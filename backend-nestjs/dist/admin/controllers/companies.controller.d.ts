import { AdminService } from '../admin.service';
export declare class AdminCompaniesController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getCompanies(page: string, limit: string, search: string): Promise<{
        companies: any;
        total: number;
        page: number;
        pages: any;
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
