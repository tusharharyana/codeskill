export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    otp: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AdminLoginDto {
    email: string;
    password?: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}
export declare class SendOtpDto {
    email: string;
}
export declare class VerifyOtpDto {
    email: string;
    code: string;
    name?: string;
}
export declare class AdminVerifyOtpDto {
    email: string;
    otp: string;
}
export declare class OAuthDto {
    token: string;
}
export declare class GithubAuthDto {
    code: string;
}
export declare class LinkedinAuthDto {
    code: string;
    redirectUri: string;
}
export declare class StudentLoginDto {
    uid: string;
    password: string;
}
export declare class ForceChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
