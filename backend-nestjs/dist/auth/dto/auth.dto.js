"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceChangePasswordDto = exports.StudentLoginDto = exports.LinkedinAuthDto = exports.GithubAuthDto = exports.OAuthDto = exports.AdminVerifyOtpDto = exports.VerifyOtpDto = exports.SendOtpDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.AdminLoginDto = exports.LoginDto = exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterDto {
    name;
    email;
    password;
    otp;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "otp", void 0);
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class AdminLoginDto {
    email;
    password;
}
exports.AdminLoginDto = AdminLoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "password", void 0);
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
    email;
    otp;
    newPassword;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class SendOtpDto {
    email;
}
exports.SendOtpDto = SendOtpDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SendOtpDto.prototype, "email", void 0);
class VerifyOtpDto {
    email;
    code;
    name;
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "name", void 0);
class AdminVerifyOtpDto {
    email;
    otp;
}
exports.AdminVerifyOtpDto = AdminVerifyOtpDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AdminVerifyOtpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminVerifyOtpDto.prototype, "otp", void 0);
class OAuthDto {
    token;
}
exports.OAuthDto = OAuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OAuthDto.prototype, "token", void 0);
class GithubAuthDto {
    code;
}
exports.GithubAuthDto = GithubAuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GithubAuthDto.prototype, "code", void 0);
class LinkedinAuthDto {
    code;
    redirectUri;
}
exports.LinkedinAuthDto = LinkedinAuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedinAuthDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedinAuthDto.prototype, "redirectUri", void 0);
class StudentLoginDto {
    uid;
    password;
}
exports.StudentLoginDto = StudentLoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentLoginDto.prototype, "uid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentLoginDto.prototype, "password", void 0);
class ForceChangePasswordDto {
    currentPassword;
    newPassword;
}
exports.ForceChangePasswordDto = ForceChangePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ForceChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'New password must be at least 8 characters' }),
    __metadata("design:type", String)
], ForceChangePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=auth.dto.js.map