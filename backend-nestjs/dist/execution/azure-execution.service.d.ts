export interface ExecutionRequest {
    code: string;
    language: string;
    stdin?: string;
    expectedOutput?: string;
    timeoutMs?: number;
    memoryMB?: number;
}
export interface ExecutionResult {
    stdout: string;
    stderr: string;
    status: 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'time_limit' | 'memory_limit' | 'system_error';
    executionTimeMs?: number;
    memoryUsedKB?: number;
    passed?: boolean;
}
export declare class AzureExecutionService {
    private readonly logger;
    private readonly azureUrl;
    private readonly azureKey;
    private readonly isConfigured;
    constructor();
    get isAvailable(): boolean;
    execute(req: ExecutionRequest): Promise<ExecutionResult>;
    executeWithTestCases(code: string, language: string, testCases: Array<{
        id: string | number;
        input: string;
        expected: string;
    }>, options?: {
        timeoutMs?: number;
        memoryMB?: number;
    }): Promise<Array<ExecutionResult & {
        id: string | number;
        passed: boolean;
    }>>;
    private mapJudge0Result;
    private extractHost;
    getSupportedLanguages(): string[];
    getLanguageId(language: string): number | null;
}
