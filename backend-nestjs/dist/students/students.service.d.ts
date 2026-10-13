import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { AuditLog } from '../database/entities/audit-log.entity';
import { EmailJob } from '../database/entities/email-job.entity';
import { Queue } from 'bullmq';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
export declare class StudentsService {
    private readonly userRepository;
    private readonly auditLogRepo;
    private readonly emailJobRepo;
    private readonly credentialEmailQueue;
    constructor(userRepository: Repository<User>, auditLogRepo: Repository<AuditLog>, emailJobRepo: Repository<EmailJob>, credentialEmailQueue: Queue);
    private generateSecurePassword;
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
    create(dto: CreateStudentDto, adminUser: any, ip?: string, userAgent?: string): Promise<{
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
    update(id: string, dto: UpdateStudentDto, adminUser: any, ip?: string, userAgent?: string): Promise<{
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
    setActiveStatus(id: string, isActive: boolean, adminUser: any, ip?: string, userAgent?: string): Promise<{
        message: string;
        studentId: string;
        isActive: boolean;
    }>;
    resetPassword(id: string, adminUser: any, ip?: string, userAgent?: string): Promise<{
        message: string;
        temporaryPassword: string;
        uid: string | undefined;
        email: string;
        name: string;
    }>;
    parseAndValidateImport(fileBuffer: Buffer): Promise<{
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
    confirmImport(validRows: any[], adminUser: any, ip?: string, userAgent?: string): Promise<{
        message: string;
        importedCount: number;
        emailJobsCreated: number;
    }>;
    sendCredentials(jobIds?: string[], portalUrl?: string): Promise<{
        enqueuedCount: number;
        message: string;
    }>;
    sendIndividualCredential(studentId: string, portalUrl?: string): Promise<{
        success: boolean;
        message: string;
        jobId: string;
    }>;
    retryFailedCredentials(portalUrl?: string): Promise<{
        retriedCount: number;
        message: string;
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
            student: User;
            student_id: string;
            uid: string;
            email: string;
            name: string;
            temporaryPassword?: string;
            status: string;
            retryCount: number;
            sentAt?: Date;
            error?: string;
            createdBy: User;
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
}
