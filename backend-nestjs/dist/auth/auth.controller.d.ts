import { AuthService } from './auth.service';
import { S3Service } from '../s3/s3.service';
import { RegisterDto, LoginDto, SendOtpDto, VerifyOtpDto, OAuthDto, GithubAuthDto, LinkedinAuthDto, AdminLoginDto, AdminVerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, StudentLoginDto, ForceChangePasswordDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    private readonly s3Service;
    constructor(authService: AuthService, s3Service: S3Service);
    sendRegistrationOtp(dto: SendOtpDto): Promise<void>;
    register(dto: RegisterDto): Promise<void>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    studentLogin(dto: StudentLoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    forceChangePassword(userId: string, dto: ForceChangePasswordDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            uid: string | undefined;
            forcePasswordChange: boolean;
        };
    }>;
    adminLogin(dto: AdminLoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    adminVerifyOtp(dto: AdminVerifyOtpDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    googleLogin(dto: OAuthDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    githubLogin(dto: GithubAuthDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    linkedinLogin(dto: LinkedinAuthDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    sendOtp(dto: SendOtpDto): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            isAdmin: boolean;
            uid: string | null;
            isAssessmentStudent: boolean;
            forcePasswordChange: boolean;
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
            avatar: string;
            bio: string;
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
            authProvider: string;
        };
    }>;
    getMe(userId: string): Promise<{
        user: import("../database/entities/user.entity").User;
    }>;
    updateProfile(userId: string, body: any): Promise<{
        user: import("../database/entities/user.entity").User;
    }>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        user: import("../database/entities/user.entity").User;
        avatarUrl: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
