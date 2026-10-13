import { ProblemMetadata } from './problem-metadata.entity';
export declare class ProblemConfig {
    id: string;
    mongoId: string;
    metadata: ProblemMetadata;
    metadata_id: string;
    supportedLanguages: string[];
    timeLimit: number;
    memoryLimit: number;
    cpuLimit: number;
    stackSize: number;
    outputLimit: number;
    maxSourceCodeSize: number;
    executionMode: string;
    functionSignature: any;
    exactOutput: boolean;
    enableCustomInput: boolean;
    allowMultipleFiles: boolean;
    enableFileUpload: boolean;
    starterCode: Record<string, string>;
    referenceSolution: Record<string, string>;
    hasCustomChecker: boolean;
    customCheckerCode: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
}
