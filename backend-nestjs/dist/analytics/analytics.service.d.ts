import { Repository } from 'typeorm';
import { AssessmentAttempt } from '../database/entities/assessment-attempt.entity';
import { Assessment } from '../database/entities/assessment.entity';
import { Question } from '../database/entities/question.entity';
export declare class AnalyticsService {
    private readonly attemptRepo;
    private readonly assessmentRepo;
    private readonly questionRepo;
    constructor(attemptRepo: Repository<AssessmentAttempt>, assessmentRepo: Repository<Assessment>, questionRepo: Repository<Question>);
    getAssessmentOverview(assessmentId: string): Promise<{
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
    getAssessmentLeaderboard(assessmentId: string, page?: number, limit?: number): Promise<{
        data: {
            _id: string;
            id: string;
            assessment: Assessment;
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
    getQuestionAnalytics(assessmentId: string): Promise<{
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
