export declare class QuestionAnswerDto {
    questionId: string;
    selectedAnswer?: number;
    timeSpentSeconds?: number;
    status?: string;
    code?: string;
    language?: string;
    testCasesPassed?: number;
    totalTestCases?: number;
}
export declare class ProctoringViolationDto {
    type: string;
    timestamp?: string;
    details?: string;
}
export declare class SubmitAssessmentDto {
    responses: QuestionAnswerDto[];
    timeSpentSeconds?: number;
    violations?: ProctoringViolationDto[];
}
