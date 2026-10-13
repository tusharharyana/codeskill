import { User } from './user.entity';
export declare class Question {
    id: string;
    mongoId?: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    codeSnippet?: string;
    topic: string;
    subtopic: string;
    difficulty: string;
    marks: number;
    negativeMarks: number;
    language: string;
    questionType: string;
    status: string;
    createdBy: User;
    created_by_id?: string;
    aiGenerated: boolean;
    aiProvider?: string;
    aiModel?: string;
    generatedAt?: Date;
    approvedBy?: User;
    approved_by_id?: string;
    approvedAt?: Date;
    rejectedReason?: string;
    tags: string[];
    metadata: Record<string, any>;
    title?: string;
    slug?: string;
    description?: string;
    correctAnswers?: number[];
    code?: string;
    expectedOutput?: string;
    problemStatement?: string;
    constraints?: string[];
    examples?: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    inputFormat?: string;
    outputFormat?: string;
    starterCode?: Array<{
        language: string;
        code: string;
    }>;
    supportedLanguages?: string[];
    functionSignature?: string;
    timeLimit?: number;
    memoryLimit?: number;
    testCases?: Array<{
        id: string;
        input: string;
        expectedOutput: string;
        isHidden: boolean;
        weight: number;
    }>;
    referenceSolutions?: Array<{
        language: string;
        sourceCode: string;
    }>;
    hints?: string[];
    createdAt: Date;
    updatedAt: Date;
}
