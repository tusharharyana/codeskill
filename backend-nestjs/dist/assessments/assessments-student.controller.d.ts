import { AssessmentsService } from './assessments.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
export declare class AssessmentsStudentController {
    private readonly assessmentsService;
    constructor(assessmentsService: AssessmentsService);
    getMyAssessments(studentUser: any): Promise<{
        success: boolean;
        assessments: {
            _id: string;
            allowedAttempts: any;
            completedAttemptsCount: number;
            questionCount: number;
            attemptStatus: string;
            attemptScore: number | null;
            attemptPassed: boolean;
            highestScore: number | null;
            totalAttempts: number;
            canRetake: boolean;
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
            proctoring: {
                enforceFullscreen?: boolean;
                blockCopyPaste?: boolean;
                detectTabSwitch?: boolean;
                maxTabSwitches?: number;
                autoSubmitOnViolation?: boolean;
            };
            securityPolicy: {
                secureExamMode?: "DISABLED" | "STANDARD" | "STRICT";
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
                proctoringMode?: "NONE" | "BASIC" | "STANDARD" | "STRICT";
            };
            status: string;
            createdBy?: import("../database/entities/user.entity").User;
            created_by_id?: string;
            instructions: string[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getOverview(id: string, studentUser: any): Promise<{
        success: boolean;
        assessment: {
            _id: string;
            id: string;
            title: string;
            code: string;
            description: string;
            type: string;
            status: string;
            startTime: Date | undefined;
            endTime: Date | undefined;
            isAvailable: boolean;
            unavailabilityReason: string;
            durationMinutes: number;
            totalMarks: number;
            passingMarks: number;
            negativeMarking: boolean;
            questionCount: number;
            allowedAttempts: number;
            proctoring: {
                enforceFullscreen?: boolean;
                blockCopyPaste?: boolean;
                detectTabSwitch?: boolean;
                maxTabSwitches?: number;
                autoSubmitOnViolation?: boolean;
            };
            instructions: string[];
        };
        attempt: {
            _id: string;
            status: import("../database/entities/assessment-attempt.entity").AttemptStatus;
            score: number;
            percentage: number;
            passed: boolean;
            startedAt: Date;
            submittedAt: Date | undefined;
            attemptNumber: number | undefined;
        } | null;
        canRetake: boolean;
        completedAttemptsCount: number;
        highestScore: number | null;
    }>;
    startAttempt(id: string, studentUser: any): Promise<{
        success: boolean;
        attemptId: string;
        _id: string;
        startedAt: Date;
        durationMinutes: number;
        proctoring: {
            enforceFullscreen?: boolean;
            blockCopyPaste?: boolean;
            detectTabSwitch?: boolean;
            maxTabSwitches?: number;
            autoSubmitOnViolation?: boolean;
        };
        questions: ({
            _id: string;
            id: string;
            questionIndex: number;
            question: string;
            questionType: string;
            topic: string;
            subtopic: string;
            difficulty: string;
            marks: number;
            negativeMarks: number;
            options: any[];
            codeSnippet: string | undefined;
            starterCode: any;
            language: string;
            constraints: any;
            timeLimit: any;
            memoryLimit: any;
            testCases: {
                id: any;
                input: any;
                expected: any;
                output: any;
                explanation: any;
            }[];
        } | null)[];
        savedResponses: any[];
    }>;
    retakeAttempt(id: string, studentUser: any): Promise<{
        success: boolean;
        attemptId: string;
        _id: string;
        startedAt: Date;
        durationMinutes: number;
        proctoring: {
            enforceFullscreen?: boolean;
            blockCopyPaste?: boolean;
            detectTabSwitch?: boolean;
            maxTabSwitches?: number;
            autoSubmitOnViolation?: boolean;
        };
        questions: ({
            _id: string;
            id: string;
            questionIndex: number;
            question: string;
            questionType: string;
            topic: string;
            subtopic: string;
            difficulty: string;
            marks: number;
            negativeMarks: number;
            options: any[];
            codeSnippet: string | undefined;
            starterCode: any;
            language: string;
            constraints: any;
            timeLimit: any;
            memoryLimit: any;
            testCases: {
                id: any;
                input: any;
                expected: any;
                output: any;
                explanation: any;
            }[];
        } | null)[];
        savedResponses: any[];
    }>;
    saveProgress(id: string, dto: SubmitAssessmentDto, studentUser: any): Promise<{
        success: boolean;
        message: string;
    }>;
    submitAttempt(id: string, dto: SubmitAssessmentDto, studentUser: any): Promise<{
        success: boolean;
        canRetake: boolean;
        assessment: {
            title: string;
            code: string;
            totalMarks: number;
            passingMarks: number;
            allowReview: boolean;
            allowedAttempts: number;
        };
        attempt: {
            _id: string;
            score: number;
            maxScore: number;
            percentage: number;
            passed: boolean;
            accuracy: number;
            totalAttempted: number;
            totalCorrect: number;
            totalWrong: number;
            totalSkipped: number;
            timeSpentSeconds: number;
            startedAt: Date;
            submittedAt: Date | undefined;
            tabSwitchCount: number;
        };
        topicBreakdown: {
            topic: string;
            total: number;
            correct: number;
            accuracy: number;
            marksEarned: number;
        }[];
        reviewQuestions: ({
            questionId: string;
            _id: string;
            question: string;
            options: string[];
            selectedAnswer: any;
            correctAnswer: number | undefined;
            explanation: string | undefined;
            isCorrect: any;
            marksAwarded: any;
            topic: string;
            difficulty: string;
        } | null)[];
    } | {
        success: boolean;
        message: string;
        result: {
            score: number;
            highestScore: number;
            maxScore: number;
            percentage: number;
            passed: boolean;
            accuracy: number;
            totalAttempted: number;
            totalCorrect: number;
            totalWrong: number;
            totalSkipped: number;
            timeSpentSeconds: number;
            tabSwitchCount: number;
        };
    }>;
    getResult(id: string, studentUser: any): Promise<{
        success: boolean;
        canRetake: boolean;
        assessment: {
            title: string;
            code: string;
            totalMarks: number;
            passingMarks: number;
            allowReview: boolean;
            allowedAttempts: number;
        };
        attempt: {
            _id: string;
            score: number;
            maxScore: number;
            percentage: number;
            passed: boolean;
            accuracy: number;
            totalAttempted: number;
            totalCorrect: number;
            totalWrong: number;
            totalSkipped: number;
            timeSpentSeconds: number;
            startedAt: Date;
            submittedAt: Date | undefined;
            tabSwitchCount: number;
        };
        topicBreakdown: {
            topic: string;
            total: number;
            correct: number;
            accuracy: number;
            marksEarned: number;
        }[];
        reviewQuestions: ({
            questionId: string;
            _id: string;
            question: string;
            options: string[];
            selectedAnswer: any;
            correctAnswer: number | undefined;
            explanation: string | undefined;
            isCorrect: any;
            marksAwarded: any;
            topic: string;
            difficulty: string;
        } | null)[];
    }>;
}
