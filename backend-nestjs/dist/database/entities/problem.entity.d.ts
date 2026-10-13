export declare class Problem {
    id: string;
    title: string;
    slug: string;
    description: string;
    inputFormat?: string;
    outputFormat?: string;
    examples: any[];
    visibility: string;
    difficulty: string;
    constraints?: string;
    tags: string[];
    timeLimit: number;
    memoryLimit: number;
    supportedLanguages: string[];
    starterCode: Record<string, string>;
    testCases: {
        input: string;
        output: string;
        isHidden: boolean;
        explanation?: string;
    }[];
    hints: string[];
    editorial?: string;
    stats: {
        totalSubmissions?: number;
        acceptedSubmissions?: number;
        acceptanceRate?: number;
    };
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}
