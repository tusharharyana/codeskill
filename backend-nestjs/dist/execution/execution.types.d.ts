export declare const Status: {
    readonly ACCEPTED: "accepted";
    readonly WRONG_ANSWER: "wrong_answer";
    readonly COMPILATION_ERROR: "compile_error";
    readonly RUNTIME_ERROR: "runtime_error";
    readonly TIME_LIMIT_EXCEEDED: "time_limit";
    readonly MEMORY_LIMIT_EXCEEDED: "memory_limit";
    readonly SYSTEM_ERROR: "system_error";
};
export type ExecutionStatus = (typeof Status)[keyof typeof Status];
export type ExecutionMode = 'standard' | 'function';
export interface FunctionParameter {
    name: string;
    type: string;
}
export interface FunctionSignature {
    className?: string;
    functionName: string;
    returnType?: string;
    parameters?: FunctionParameter[];
}
export interface ExecutionConfig {
    timeLimit?: number;
    memoryLimit?: number;
    cpuLimit?: number;
    executionMode?: ExecutionMode;
    functionSignature?: FunctionSignature;
    exactOutput?: boolean;
    sandboxImage?: string;
    executionProfiles?: Record<string, {
        timeLimitMultiplier?: number;
    }>;
}
export interface TestCaseInput {
    id: number | string;
    input: string;
    expected: string;
}
export interface TestCaseResult {
    id: number | string;
    passed: boolean;
    status: ExecutionStatus | string;
    output: string;
    expected: string;
    error?: string;
    executionTime?: number;
    memoryUsed?: number;
}
export declare const SUPPORTED_LANGUAGES: readonly ["c", "cpp", "c++", "java", "python", "python3", "py", "javascript", "js", "node", "typescript", "ts"];
export declare function canonicalLanguage(language: string): 'c' | 'cpp' | 'java' | 'python' | 'javascript' | 'typescript' | undefined;
