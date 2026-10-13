import { AdminService } from '../admin.service';
export declare class AdminUsersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getUsers(page: string, limit: string, search: string, adminsOnly: string): Promise<{
        success: boolean;
        users: any;
        total: number;
        page: number;
        pages: any;
    }>;
    updateUserRole(id: string, body: any): Promise<{
        success: boolean;
        user: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username?: string;
            email: string;
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
        };
    }>;
    getReport(id: string): Promise<{
        report: {
            user: {
                _id: string;
                id: string;
                mongoId: string;
                name: string;
                username?: string;
                email: string;
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
            };
            stats: {
                totalSubmissions: any;
                accepted: any;
            };
            recentSubmissions: any;
        };
    }>;
    promoteUser(id: string): Promise<{
        success: boolean;
        message: string;
        user: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username?: string;
            email: string;
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
        };
    }>;
    demoteUser(id: string): Promise<{
        success: boolean;
        message: string;
        user: {
            _id: string;
            id: string;
            mongoId: string;
            name: string;
            username?: string;
            email: string;
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
        };
    }>;
}
