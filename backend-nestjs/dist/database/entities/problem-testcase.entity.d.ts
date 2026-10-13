import { ProblemMetadata } from './problem-metadata.entity';
export declare class ProblemTestCase {
    id: string;
    mongoId: string;
    metadata: ProblemMetadata;
    metadata_id: string;
    cases: Array<{
        input?: string;
        output?: string;
        isHidden: boolean;
        explanation?: string;
        weight: number;
    }>;
    s3BucketUrl: string;
    testCaseGeneratorCode: string;
    createdAt: Date;
    updatedAt: Date;
}
