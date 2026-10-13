import { ProblemMetadata } from './problem-metadata.entity';
export declare class ProblemStatement {
    id: string;
    mongoId: string;
    metadata: ProblemMetadata;
    metadata_id: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    samples: Array<{
        input?: string;
        output?: string;
        explanation?: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
