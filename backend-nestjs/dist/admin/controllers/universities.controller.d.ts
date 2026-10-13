import { AdminService } from '../admin.service';
export declare class AdminUniversitiesController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getUniversities(page: string, limit: string, search: string): Promise<{
        universities: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username: string;
            domain: string;
            logo: string;
            coverImage: string;
            location: string;
            website: string;
            description: string;
            contactEmail: string;
            tier: string;
            establishedYear: number;
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
    createUniversity(body: {
        name: string;
        domain?: string;
        website?: string;
        location?: string;
        contactEmail?: string;
    }): Promise<{
        success: boolean;
        message: string;
        university?: undefined;
    } | {
        success: boolean;
        university: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username: string;
            domain: string;
            logo: string;
            coverImage: string;
            location: string;
            website: string;
            description: string;
            contactEmail: string;
            tier: string;
            establishedYear: number;
            isVerified: boolean;
            createdBy: import("../../database/entities/user.entity").User;
            created_by_id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        message?: undefined;
    }>;
    toggleVerify(id: string): Promise<{
        success: boolean;
        isVerified: boolean;
    }>;
    deleteUniversity(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
