import { AdminService } from '../admin.service';
export declare class AdminDashboardController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        stats: {
            totalUsers: any;
            totalProblems: any;
            totalContests: any;
            totalSubmissions: any;
            totalAssessments: any;
            totalQuestions: any;
            activeToday: any;
        };
        recentActivity: {
            users: any;
            submissions: any;
            assessments: any;
        };
    }>;
}
