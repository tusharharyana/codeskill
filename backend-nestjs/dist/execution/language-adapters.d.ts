import { ExecutionConfig, ExecutionMode, FunctionParameter, FunctionSignature } from './execution.types';
export interface Command {
    cmd: string;
    args: string[];
}
export interface PreparedSource {
    filename: string;
    source: string;
    entryPoint?: string;
}
export interface ResolvedFunctionSignature {
    className: string;
    functionName: string;
    returnType: string;
    parameters: FunctionParameter[];
}
export interface LanguageAdapter {
    readonly id: 'c' | 'cpp' | 'java' | 'python' | 'javascript' | 'typescript';
    readonly compiled: boolean;
    readonly sandboxImage: string;
    prepare(code: string, mode: ExecutionMode, signature?: FunctionSignature): PreparedSource;
    compileCommand(sourcePath: string, outputPath: string, cwd: string): Command | undefined;
    runCommand(sourcePath: string, outputPath: string, cwd: string, prepared: PreparedSource): Command;
}
export declare function getLanguageAdapter(language: string): LanguageAdapter | undefined;
export declare function getSandboxImage(language: string, config: ExecutionConfig): string | undefined;
export declare function commandBasename(command: Command, cwd: string): Command;
