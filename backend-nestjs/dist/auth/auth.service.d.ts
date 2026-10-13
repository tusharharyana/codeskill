import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User as UserEntity } from '../database/entities/user.entity';
import { OtpService } from '../redis/otp.service';
import { RegisterDto, LoginDto, SendOtpDto, VerifyOtpDto, OAuthDto, GithubAuthDto, LinkedinAuthDto, AdminLoginDto, AdminVerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, StudentLoginDto, ForceChangePasswordDto } from './dto/auth.dto';
export declare class AuthService implements OnModuleInit {
    private userRepository;
    private otpService;
    private configService;
    private googleClient;
    constructor(userRepository: Repository<UserEntity>, otpService: OtpService, configService: ConfigService);
    onModuleInit(): Promise<void>;
    seedAdmin(): Promise<{
        success: boolean;
        message: string;
        results: {
            email: string;
            status: string;
        }[];
    }>;
    private authResponse;
    sendOtp(dto: SendOtpDto): Promise<{
        success: boolean;
        message: string;
    }>;
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
    getMe(userId: string): Promise<UserEntity>;
    updateProfile(userId: string, data: any): Promise<UserEntity>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
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
    updateAvatar(userId: string, avatarUrl: string): Promise<UserEntity>;
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
}
