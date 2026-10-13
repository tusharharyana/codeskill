export declare class CreateQuestionDto {
    question?: string;
    options?: Array<string | {
        text: string;
        isCorrect?: boolean;
        explanation?: string;
    }>;
    correctAnswer?: number;
    explanation?: string;
    topic: string;
    categories?: string[];
    subtopic?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    marks?: number;
    negativeMarks?: number;
    language?: string;
    questionType?: string;
    status?: string;
    tags?: string[];
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
}
