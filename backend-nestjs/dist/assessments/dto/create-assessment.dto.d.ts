export declare class AssessmentQuestionConfigDto {
    questionId: string;
    marks: number;
    negativeMarks?: number;
    order?: number;
}
export declare class AssessmentSectionDto {
    title: string;
    description?: string;
    order?: number;
    timeLimit?: number;
    questions: AssessmentQuestionConfigDto[];
}
export declare class CreateAssessmentDto {
    title: string;
    code: string;
    description?: string;
    type?: 'mcq' | 'coding' | 'hybrid';
    category?: string;
    durationMinutes: number;
    passingMarks?: number;
    negativeMarking?: boolean;
    questionIds?: string[];
    sections?: AssessmentSectionDto[];
    status?: string;
    targetBatches?: string[];
    targetDepartments?: string[];
    targetCourses?: string[];
    startTime?: string;
    endTime?: string;
    shuffleQuestions?: boolean;
    shuffleOptions?: boolean;
    showResultImmediately?: boolean;
    allowReview?: boolean;
    allowedAttempts?: number;
    proctoring?: {
        enforceFullscreen?: boolean;
        blockCopyPaste?: boolean;
        detectTabSwitch?: boolean;
        maxTabSwitches?: number;
        autoSubmitOnViolation?: boolean;
    };
    instructions?: string[];
}
