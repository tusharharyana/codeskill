import { ExecutionService } from './execution.service';
import { AzureExecutionService } from './azure-execution.service';
import { Queue } from 'bullmq';
export declare class ExecutionController {
    private readonly executionService;
    private readonly azureExecutionService;
    private readonly submissionQueue;
    constructor(executionService: ExecutionService, azureExecutionService: AzureExecutionService, submissionQueue: Queue);
    runCode(userId: string, body: any): Promise<{
        success: boolean;
        status: string;
        jobId: string | undefined;
        message: string;
    }>;
    getJob(userId: string, jobId: string): Promise<any>;
    azureRun(userId: string, body: {
        code: string;
        language: string;
        stdin?: string;
        testCases?: Array<{
            id: string;
            input: string;
            expected: string;
        }>;
        timeoutMs?: number;
        memoryMB?: number;
    }): Promise<{
        success: boolean;
        engine: string;
        status: string;
        jobId: string | undefined;
        message: string;
        passedCount?: undefined;
        totalCount?: undefined;
        results?: undefined;
        result?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        engine: string;
        passedCount: number;
        totalCount: number;
        results: (import("./azure-execution.service").ExecutionResult & {
            id: string | number;
            passed: boolean;
        })[];
        status?: undefined;
        jobId?: undefined;
        message?: undefined;
        result?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        engine: string;
        result: import("./azure-execution.service").ExecutionResult;
        status?: undefined;
        jobId?: undefined;
        message?: undefined;
        passedCount?: undefined;
        totalCount?: undefined;
        results?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        engine: string;
        error: any;
        status?: undefined;
        jobId?: undefined;
        message?: undefined;
        passedCount?: undefined;
        totalCount?: undefined;
        results?: undefined;
        result?: undefined;
    }>;
}
