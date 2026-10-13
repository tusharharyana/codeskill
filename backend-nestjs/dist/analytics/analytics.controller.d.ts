import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(id: string): Promise<{
        assessment: {
            title: string;
            status: string;
        };
        participation: {
            total: number;
            completed: number;
        };
        metrics: {
            avgScore: number;
            maxScore: number;
            minScore: number;
            avgTimeSpent: number;
            totalPassed: number;
        };
    }>;
    getLeaderboard(id: string, page: string, limit: string): Promise<{
        data: {
            _id: string;
            id: string;
            assessment: import("../database/entities/assessment.entity").Assessment;
            assessmentId: string;
            student: import("../database/entities/user.entity").User;
            studentId: string;
            mongoId?: string;
            studentUid: string;
            studentName: string;
            studentEmail: string;
            status: import("../database/entities/assessment-attempt.entity").AttemptStatus;
            startedAt: Date;
            submittedAt?: Date;
            timeSpentSeconds: number;
            responses: any[];
            questionOrder: string[];
            score: number;
            highestScore?: number;
            attemptNumber?: number;
            maxScore: number;
            percentage: number;
            passed: boolean;
            totalAttempted: number;
            totalCorrect: number;
            totalWrong: number;
            totalSkipped: number;
            accuracy: number;
            tabSwitchCount: number;
            fullscreenExitCount: number;
            violations: any[];
            disqualifiedReason?: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getQuestionAnalytics(id: string): Promise<{
        questionId: string;
        title: string;
        type: string;
        difficulty: string;
        totalAttempts: number;
        correctCount: number;
        successRate: number;
        avgTimeSpent: number;
        avgMarksAwarded: number;
    }[]>;
}
