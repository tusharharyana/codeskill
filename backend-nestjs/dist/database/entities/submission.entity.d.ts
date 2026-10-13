import { User } from './user.entity';
import { Problem } from './problem.entity';
export declare class Submission {
    id: string;
    user: User;
    userId: string;
    problem: Problem;
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
}
