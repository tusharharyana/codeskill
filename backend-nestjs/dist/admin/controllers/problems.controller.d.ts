import { AdminService } from '../admin.service';
export declare class AdminProblemsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getProblems(page: string, limit: string, search: string): Promise<{
        problems: {
            _id: string;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            difficulty: string;
            categories: string[];
            tags: string[];
            author: import("../../database/entities/user.entity").User;
            author_id: string;
            visibility: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string[];
            stats: Record<string, any>;
            statement: import("../../database/entities/problem-statement.entity").ProblemStatement;
            config: import("../../database/entities/problem-config.entity").ProblemConfig;
            testCases: import("../../database/entities/problem-testcase.entity").ProblemTestCase;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        pages: number;
    }>;
    getProblem(id: string): Promise<{
        _id: string;
        id: string;
        mongoId: string;
        title: string;
        slug: string;
        difficulty: string;
        categories: string[];
        tags: string[];
        author: import("../../database/entities/user.entity").User;
        author_id: string;
        visibility: string;
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
        stats: Record<string, any>;
        statement: import("../../database/entities/problem-statement.entity").ProblemStatement;
        config: import("../../database/entities/problem-config.entity").ProblemConfig;
        testCases: import("../../database/entities/problem-testcase.entity").ProblemTestCase;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createProblem(body: any, req: any): Promise<{
        success: boolean;
        problem: {
            _id: string;
            statement: import("../../database/entities/problem-statement.entity").ProblemStatement;
            config: import("../../database/entities/problem-config.entity").ProblemConfig;
            testCases: import("../../database/entities/problem-testcase.entity").ProblemTestCase;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            difficulty: string;
            categories: string[];
            tags: string[];
            author: import("../../database/entities/user.entity").User;
            author_id: string;
            visibility: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string[];
            stats: Record<string, any>;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateProblem(id: string, body: any): Promise<{
        success: boolean;
        problem: {
            _id: string;
            id: string;
            mongoId: string;
            title: string;
            slug: string;
            difficulty: string;
            categories: string[];
            tags: string[];
            author: import("../../database/entities/user.entity").User;
            author_id: string;
            visibility: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string[];
            stats: Record<string, any>;
            statement: import("../../database/entities/problem-statement.entity").ProblemStatement;
            config: import("../../database/entities/problem-config.entity").ProblemConfig;
            testCases: import("../../database/entities/problem-testcase.entity").ProblemTestCase;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteProblem(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
