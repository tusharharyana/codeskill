import { AdminService } from '../admin.service';
export declare class AdminContestsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getContests(page: string, limit: string, search: string): Promise<{
        contests: {
            _id: string;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            description: string;
            startTime: Date;
            endTime: Date;
            problems: string[];
            isPrivate: boolean;
            password?: string;
            antiCheatConfig: any;
            isPublished: boolean;
            participants: string[];
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pages: number;
    }>;
    getContestResults(contestId?: string): Promise<{
        contests: {
            id: string;
            _id: string;
            title: string;
            slug: string;
            startTime: Date;
            endTime: Date;
            totalProblems: number;
            participants: {
                rank: number;
                id: string;
                name: string;
                email: string;
                uid: string;
                status: string;
                startedAt: Date | null;
                submittedAt: Date | null;
                warnings: number;
                solved: number;
                submissions: number;
            }[];
        }[];
    }>;
    getContest(id: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        title: string;
        slug: string;
        description: string;
        startTime: Date;
        endTime: Date;
        problems: string[];
        isPrivate: boolean;
        password?: string;
        antiCheatConfig: any;
        isPublished: boolean;
        participants: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    createContest(body: any): Promise<{
        success: boolean;
        message: string;
        contest: {
            _id: string;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            description: string;
            startTime: Date;
            endTime: Date;
            problems: string[];
            isPrivate: boolean;
            password?: string;
            antiCheatConfig: any;
            isPublished: boolean;
            participants: string[];
            createdAt: Date;
            updatedAt: Date;
        };
        shareUrl: string;
    }>;
    updateContest(id: string, body: any): Promise<{
        success: boolean;
        message: string;
        contest: {
            _id: string;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            description: string;
            startTime: Date;
            endTime: Date;
            problems: string[];
            isPrivate: boolean;
            password?: string;
            antiCheatConfig: any;
            isPublished: boolean;
            participants: string[];
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteContest(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
