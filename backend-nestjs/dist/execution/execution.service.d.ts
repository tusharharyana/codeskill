export declare const Status: {
    readonly ACCEPTED: "accepted";
    readonly WRONG_ANSWER: "wrong_answer";
    readonly COMPILATION_ERROR: "compile_error";
    readonly RUNTIME_ERROR: "runtime_error";
    readonly TIME_LIMIT_EXCEEDED: "time_limit";
    readonly MEMORY_LIMIT_EXCEEDED: "memory_limit";
    readonly SYSTEM_ERROR: "system_error";
};
export interface TestCaseInput {
    id: number | string;
    input: string;
    expected: string;
}
export interface TestCaseResult {
    id: number | string;
    passed: boolean;
    status: string;
    output: string;
    expected: string;
    error?: string;
    executionTime?: number;
}
export declare class ExecutionService {
    private readonly logger;
    runCode(code: string, language: string, testCases: any[], config?: any): Promise<TestCaseResult[]>;
    executeCode(language: string, code: string, testCases: any[], config?: any): Promise<TestCaseResult[]>;
    private runTestCasesConcurrently;
    private executeCompiled;
    private executeInterpreted;
    private compile;
    private sandboxCommand;
    private runProcess;
    private compareOutput;
    private normalizeInput;
    private normalizeExpected;
    private getSafeEnv;
    private killProcessTree;
    private classifyRuntimeError;
    private sanitizeCompilerOutput;
    private cleanup;
}
