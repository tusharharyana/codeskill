import { Repository } from 'typeorm';
import { User as UserEntity } from '../database/entities/user.entity';
import { Problem as ProblemEntity } from '../database/entities/problem.entity';
export declare class UsersService {
    private userRepository;
    private problemRepository;
    constructor(userRepository: Repository<UserEntity>, problemRepository: Repository<ProblemEntity>);
    private getTier;
    getLeaderboard(limit?: number): Promise<{
        success: boolean;
        leaderboard: {
            rank: number;
            _id: string;
            name: string;
            username: string | undefined;
            uid: string | undefined;
            avatar: string;
            xp: number;
            totalSolved: number;
            currentStreak: number;
            tier: string;
            department: string;
            batch: string;
        }[];
        total: number;
    }>;
    getPublicProfile(identifier: string): Promise<{
        solvedProblemsDetails: any[];
        id: string;
        mongoId: string;
        name: string;
        username?: string;
        email: string;
        password?: string;
        role: string;
        uid?: string;
        forcePasswordChange: boolean;
        isAssessmentStudent: boolean;
        mfaEnabled: boolean;
        mfaSecret?: string;
        isActive: boolean;
        studentProfile: {
            university?: string;
            department?: string;
            course?: string;
            semester?: number;
            section?: string;
            group?: string;
            year?: number;
            batch?: string;
        };
        authProvider: string;
        googleId?: string;
        githubId?: string;
        linkedinId?: string;
        avatar: string;
        bio: string;
        isAdmin: boolean;
        profile: {
            institution?: string;
            role?: string;
            preferredLanguage?: string;
            theme?: string;
            fontSize?: number;
        };
        stats: {
            totalSolved?: number;
            easySolved?: number;
            mediumSolved?: number;
            hardSolved?: number;
            dsaSolved?: number;
            sqlSolved?: number;
            jsSolved?: number;
            currentStreak?: number;
            longestStreak?: number;
            totalSubmissions?: number;
            acceptedSubmissions?: number;
            xp?: number;
        };
        solvedProblems: string[];
        bookmarkedProblems: string[];
        badges: {
            badgeId: string;
            unlockedAt: Date;
        }[];
        activityMap: Record<string, number>;
        notes: Record<string, string>;
        lastActive: Date;
        lastSolveDate?: Date;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
