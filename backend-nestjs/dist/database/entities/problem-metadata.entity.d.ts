import { User } from './user.entity';
import { ProblemStatement } from './problem-statement.entity';
import { ProblemConfig } from './problem-config.entity';
import { ProblemTestCase } from './problem-testcase.entity';
export declare class ProblemMetadata {
    id: string;
    mongoId: string;
    title: string;
    slug: string;
    difficulty: string;
    categories: string[];
    tags: string[];
    author: User;
    author_id: string;
    visibility: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    stats: Record<string, any>;
    statement: ProblemStatement;
    config: ProblemConfig;
    testCases: ProblemTestCase;
    createdAt: Date;
    updatedAt: Date;
}
