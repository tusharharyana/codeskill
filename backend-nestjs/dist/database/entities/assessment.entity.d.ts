import { User } from './user.entity';
export declare class Assessment {
    id: string;
    title: string;
    code: string;
    description: string;
    type: string;
    category: string;
    durationMinutes: number;
    totalMarks: number;
    passingMarks: number;
    negativeMarking: boolean;
    mongoId?: string;
    questions: string[];
    sections: Array<{
        title: string;
        description: string;
        order: number;
        timeLimit: number;
        questions: Array<{
            questionId: string;
            marks: number;
            negativeMarks: number;
            order: number;
        }>;
    }>;
    targetBatches: string[];
    targetDepartments: string[];
    targetCourses: string[];
    targetSections: string[];
    startTime?: Date;
    endTime?: Date;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    showResultImmediately: boolean;
    allowReview: boolean;
    allowedAttempts: number;
    proctoring: {
        enforceFullscreen?: boolean;
        blockCopyPaste?: boolean;
        detectTabSwitch?: boolean;
        maxTabSwitches?: number;
        autoSubmitOnViolation?: boolean;
    };
    securityPolicy: {
        secureExamMode?: 'DISABLED' | 'STANDARD' | 'STRICT';
        requireSEB?: boolean;
        allowedSEBVersions?: string[];
        requireFullscreen?: boolean;
        disableClipboard?: boolean;
        disableNavigation?: boolean;
        disablePrinting?: boolean;
        allowDownloads?: boolean;
        allowUploads?: boolean;
        heartbeatInterval?: number;
        heartbeatGracePeriod?: number;
        violationThreshold?: number;
        proctoringMode?: 'NONE' | 'BASIC' | 'STANDARD' | 'STRICT';
    };
    status: string;
    createdBy?: User;
    created_by_id?: string;
    instructions: string[];
    createdAt: Date;
    updatedAt: Date;
}
