import { AssessmentSectionDto } from './create-assessment.dto';
export declare class UpdateAssessmentDto {
    title?: string;
    code?: string;
    description?: string;
    type?: 'mcq' | 'coding' | 'hybrid';
    durationMinutes?: number;
    passingMarks?: number;
    negativeMarking?: boolean;
    questionIds?: string[];
    sections?: AssessmentSectionDto[];
    startTime?: string;
    endTime?: string;
    status?: 'draft' | 'published' | 'ongoing' | 'completed' | 'archived';
    shuffleQuestions?: boolean;
    shuffleOptions?: boolean;
    showResultImmediately?: boolean;
    allowReview?: boolean;
    proctoring?: {
        enforceFullscreen?: boolean;
        blockCopyPaste?: boolean;
        detectTabSwitch?: boolean;
        maxTabSwitches?: number;
        autoSubmitOnViolation?: boolean;
    };
    instructions?: string[];
    allowedAttempts?: number;
}
export declare class UpdateAssessmentStatusDto {
    status: 'draft' | 'published' | 'ongoing' | 'completed' | 'archived';
}
