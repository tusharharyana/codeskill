import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(query: QueryStudentsDto): Promise<{
        students: {
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
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        stats: {
            total: number;
            active: number;
            pendingPasswordChange: number;
        };
    }>;
    getEmailStatus(page?: number, limit?: number, status?: string): Promise<{
        stats: {
            total: number;
            pending: number;
            queued: number;
            sent: number;
            failed: number;
            retrying: number;
        };
        jobs: {
            _id: string;
            id: string;
            mongoId: string;
            student: import("../database/entities/user.entity").User;
            student_id: string;
            uid: string;
            email: string;
            name: string;
            temporaryPassword?: string;
            status: string;
            retryCount: number;
            sentAt?: Date;
            error?: string;
            createdBy: import("../database/entities/user.entity").User;
            created_by_id: string;
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
    findById(id: string): Promise<{
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
    }>;
    create(dto: CreateStudentDto, adminUser: any, req: any): Promise<{
        student: {
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
        generatedPassword: string | null;
    }>;
    update(id: string, dto: UpdateStudentDto, adminUser: any, req: any): Promise<{
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
    }>;
    setStatus(id: string, isActive: boolean, adminUser: any, req: any): Promise<{
        message: string;
        studentId: string;
        isActive: boolean;
    }>;
    deactivate(id: string, adminUser: any, req: any): Promise<{
        message: string;
        studentId: string;
        isActive: boolean;
    }>;
    resetPassword(id: string, adminUser: any, req: any): Promise<{
        message: string;
        temporaryPassword: string;
        uid: string | undefined;
        email: string;
        name: string;
    }>;
    importPreview(file: Express.Multer.File): Promise<{
        total: number;
        valid: number;
        invalid: number;
        duplicates: number;
        errors: {
            row: number;
            uid?: string;
            email?: string;
            error: string;
        }[];
        previewRows: any[];
        validRows: any[];
    }>;
    confirmImport(validRows: any[], adminUser: any, req: any): Promise<{
        message: string;
        importedCount: number;
        emailJobsCreated: number;
    }>;
    sendCredentials(jobIds?: string[], portalUrl?: string): Promise<{
        enqueuedCount: number;
        message: string;
    }>;
    sendSingleCredential(studentId: string, portalUrl?: string): Promise<{
        success: boolean;
        message: string;
        jobId: string;
    }>;
    retryFailed(portalUrl?: string): Promise<{
        retriedCount: number;
        message: string;
    }>;
}
