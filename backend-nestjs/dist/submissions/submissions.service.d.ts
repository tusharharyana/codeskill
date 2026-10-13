import { Repository } from 'typeorm';
import { Submission } from '../database/entities/submission.entity';
import { User } from '../database/entities/user.entity';
import { Queue } from 'bullmq';
import { AppGateway } from '../gateway/app.gateway';
import { RedisService } from '../redis/redis.service';
export declare enum SubmissionStatus {
    QUEUED = "queued",
    PENDING = "pending",
    RUNNING = "running",
    ACCEPTED = "accepted",
    WRONG_ANSWER = "wrong_answer",
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded",
    MEMORY_LIMIT_EXCEEDED = "memory_limit_exceeded",
    COMPILATION_ERROR = "compilation_error",
    RUNTIME_ERROR = "runtime_error",
    INTERNAL_ERROR = "internal_error",
    CANCELLED = "cancelled"
}
export declare class SubmissionsService {
    private readonly submissionRepo;
    private readonly userRepo;
    private submissionQueue;
    private readonly appGateway;
    private readonly redisService;
    private readonly logger;
    constructor(submissionRepo: Repository<Submission>, userRepo: Repository<User>, submissionQueue: Queue, appGateway: AppGateway, redisService: RedisService);
    createSubmission(userId: string, data: any): Promise<{
        _id: string;
        id: string;
        user: User;
        userId: string;
        problem: import("../database/entities/problem.entity").Problem;
        problemId: string;
        code: string;
        language: string;
        status: string;
        executionTime?: number;
        memoryUsed?: number;
        testsPassed?: number;
        totalTests?: number;
        errorMessage?: string;
        testResults: Array<{
            testId: string;
            passed: boolean;
            executionTime?: number;
            memoryUsed?: number;
            error?: string;
        }>;
        mongoId?: string;
        runtime?: number;
        memory?: number;
        testCasesPassed?: number;
        totalTestCases?: number;
        compileOutput?: string;
        queuedAt?: Date;
        startedAt?: Date;
        completedAt?: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSubmissionById(userId: string, submissionId: string, isAdmin?: boolean): Promise<{
        _id: string;
        id: string;
        user: User;
        userId: string;
        problem: import("../database/entities/problem.entity").Problem;
        problemId: string;
        code: string;
        language: string;
        status: string;
        executionTime?: number;
        memoryUsed?: number;
        testsPassed?: number;
        totalTests?: number;
        errorMessage?: string;
        testResults: Array<{
            testId: string;
            passed: boolean;
            executionTime?: number;
            memoryUsed?: number;
            error?: string;
        }>;
        mongoId?: string;
        runtime?: number;
        memory?: number;
        testCasesPassed?: number;
        totalTestCases?: number;
        compileOutput?: string;
        queuedAt?: Date;
        startedAt?: Date;
        completedAt?: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSubmissionResult(userId: string, submissionId: string, isAdmin?: boolean): Promise<{
        submissionId: string;
        _id: string;
        status: string;
        runtime: number | undefined;
        memory: number | undefined;
        testCasesPassed: number | undefined;
        totalTestCases: number | undefined;
        compileOutput: string | undefined;
        testResults: {
            testId: string;
            passed: boolean;
            executionTime?: number;
            memoryUsed?: number;
            error?: string;
        }[];
        queuedAt: Date | undefined;
        startedAt: Date | undefined;
        completedAt: Date | undefined;
    }>;
    cancelSubmission(userId: string, submissionId: string, isAdmin?: boolean): Promise<{
        success: boolean;
        message: string;
    }>;
    getSubmissionsByProblem(userId: string, problemId: string): Promise<{
        _id: string;
        id: string;
        user: User;
        userId: string;
        problem: import("../database/entities/problem.entity").Problem;
        problemId: string;
        code: string;
        language: string;
        status: string;
        executionTime?: number;
        memoryUsed?: number;
        testsPassed?: number;
        totalTests?: number;
        errorMessage?: string;
        testResults: Array<{
            testId: string;
            passed: boolean;
            executionTime?: number;
            memoryUsed?: number;
            error?: string;
        }>;
        mongoId?: string;
        runtime?: number;
        memory?: number;
        testCasesPassed?: number;
        totalTestCases?: number;
        compileOutput?: string;
        queuedAt?: Date;
        startedAt?: Date;
        completedAt?: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getRecentSubmissions(userId: string): Promise<{
        _id: string;
        id: string;
        user: User;
        userId: string;
        problem: import("../database/entities/problem.entity").Problem;
        problemId: string;
        code: string;
        language: string;
        status: string;
        executionTime?: number;
        memoryUsed?: number;
        testsPassed?: number;
        totalTests?: number;
        errorMessage?: string;
        testResults: Array<{
            testId: string;
            passed: boolean;
            executionTime?: number;
            memoryUsed?: number;
            error?: string;
        }>;
        mongoId?: string;
        runtime?: number;
        memory?: number;
        testCasesPassed?: number;
        totalTestCases?: number;
        compileOutput?: string;
        queuedAt?: Date;
        startedAt?: Date;
        completedAt?: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSubmissionsByUser(userId: string, query: {
        page?: number;
        limit?: number;
        problemId?: string;
        status?: string;
    }): Promise<{
        submissions: {
            _id: string;
            id: string;
            user: User;
            userId: string;
            problem: import("../database/entities/problem.entity").Problem;
            problemId: string;
            code: string;
            language: string;
            status: string;
            executionTime?: number;
            memoryUsed?: number;
            testsPassed?: number;
            totalTests?: number;
            errorMessage?: string;
            testResults: Array<{
                testId: string;
                passed: boolean;
                executionTime?: number;
                memoryUsed?: number;
                error?: string;
            }>;
            mongoId?: string;
            runtime?: number;
            memory?: number;
            testCasesPassed?: number;
            totalTestCases?: number;
            compileOutput?: string;
            queuedAt?: Date;
            startedAt?: Date;
            completedAt?: Date;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserStats(userId: string): Promise<{
        user: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username?: string;
            email: string;
            password?: string;
            role: string;
            uid?: string;
            forcePasswordChange: boolean;
            isAssessmentStudent: boolean;
            mfaEnabled: boolean;
            mfaSecret?: string;
            isActive: boolean;
            studentProfile: {
                university?: string;
                department?: string;
                course?: string;
                semester?: number;
                section?: string;
                group?: string;
                year?: number;
                batch?: string;
            };
            authProvider: string;
            googleId?: string;
            githubId?: string;
            linkedinId?: string;
            avatar: string;
            bio: string;
            isAdmin: boolean;
            profile: {
                institution?: string;
                role?: string;
                preferredLanguage?: string;
                theme?: string;
                fontSize?: number;
            };
            stats: {
                totalSolved?: number;
                easySolved?: number;
                mediumSolved?: number;
                hardSolved?: number;
                dsaSolved?: number;
                sqlSolved?: number;
                jsSolved?: number;
                currentStreak?: number;
                longestStreak?: number;
                totalSubmissions?: number;
                acceptedSubmissions?: number;
                xp?: number;
            };
            solvedProblems: string[];
            bookmarkedProblems: string[];
            badges: {
                badgeId: string;
                unlockedAt: Date;
            }[];
            activityMap: Record<string, number>;
            notes: Record<string, string>;
            lastActive: Date;
            lastSolveDate?: Date;
            createdAt: Date;
            updatedAt: Date;
        };
        totalSubmissions: number;
        acceptedSubmissions: number;
        acceptanceRate: number;
    }>;
}
