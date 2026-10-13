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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../database/entities/user.entity");
const otp_service_1 = require("../redis/otp.service");
const google_auth_library_1 = require("google-auth-library");
const axios_1 = __importDefault(require("axios"));
let AuthService = class AuthService {
    userRepository;
    otpService;
    configService;
    googleClient;
    constructor(userRepository, otpService, configService) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.configService = configService;
        this.googleClient = new google_auth_library_1.OAuth2Client(this.configService.get('oauth.googleClientId'));
    }
    async onModuleInit() {
        try {
            await this.seedAdmin();
        }
        catch (err) {
            console.error('[Seed Admin] Startup error:', err);
        }
    }
    async seedAdmin() {
        const adminEmailsString = this.configService.get('admin.emails') ||
            'admin@codeskill.com,admin@cuchd.in,md.shadab.azam.ansari@gmail.com,kanhamishra555@gmail.com,shaikhmustakim2942@gmail.com';
        const adminEmails = adminEmailsString
            .split(',')
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean);
        const defaultPassword = this.configService.get('admin.password') || 'admin123';
        const results = [];
        for (const email of adminEmails) {
            try {
                const user = await this.userRepository.findOne({
                    where: { email },
                    select: { id: true, email: true, password: true, isAdmin: true, role: true },
                });
                if (user) {
                    let updated = false;
                    if (!user.isAdmin) {
                        user.isAdmin = true;
                        updated = true;
                    }
                    if (user.role !== 'admin' && user.role !== 'super_admin') {
                        user.role = 'super_admin';
                        updated = true;
                    }
                    if (!user.password) {
                        user.password = defaultPassword;
                        updated = true;
                    }
                    if (updated) {
                        await this.userRepository.save(user);
                        results.push({ email, status: 'Upgraded / Updated Admin' });
                    }
                    else {
                        results.push({ email, status: 'Already Admin' });
                    }
                }
                else {
                    const adminName = email
                        .split('@')[0]
                        .replace(/[._-]/g, ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase()) + ' (Admin)';
                    const newUser = this.userRepository.create({
                        name: adminName,
                        email,
                        password: defaultPassword,
                        isAdmin: true,
                        role: 'super_admin',
                        stats: {},
                        profile: {},
                        studentProfile: {},
                    });
                    await this.userRepository.save(newUser);
                    results.push({ email, status: 'Created as Admin' });
                }
            }
            catch (e) {
                results.push({ email, status: `Failed: ${e.message}` });
            }
        }
        return {
            success: true,
            message: 'Admin seeding process completed',
            results,
        };
    }
    authResponse(user) {
        const token = user.getSignedJwtToken();
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || (user.isAdmin ? 'admin' : 'student'),
                isAdmin: user.isAdmin,
                uid: user.uid || null,
                isAssessmentStudent: user.isAssessmentStudent || false,
                forcePasswordChange: user.forcePasswordChange || false,
                studentProfile: user.studentProfile || null,
                avatar: user.avatar,
                bio: user.bio,
                profile: user.profile,
                stats: user.stats,
                authProvider: user.authProvider,
            },
        };
    }
    async sendOtp(dto) {
        return this.otpService.sendOTP(dto.email);
    }
    async sendRegistrationOtp(dto) {
        throw new common_1.BadRequestException('Public registration is currently disabled. Please contact your administrator.');
    }
    async register(dto) {
        throw new common_1.BadRequestException('Public registration is currently disabled. Please contact your administrator.');
    }
    async login(dto) {
        const raw = dto.email.trim();
        const user = await this.userRepository.findOne({
            where: [
                { email: (0, typeorm_2.ILike)(raw) },
                { uid: (0, typeorm_2.ILike)(raw) },
                { username: (0, typeorm_2.ILike)(raw) },
                { name: (0, typeorm_2.ILike)(raw) },
                { email: (0, typeorm_2.ILike)(`${raw}@%`) },
            ],
            select: { id: true, name: true, email: true, password: true, role: true, isAdmin: true, uid: true, isAssessmentStudent: true, forcePasswordChange: true, studentProfile: true, avatar: true, bio: true, profile: true, stats: true, authProvider: true, isActive: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.isActive === false) {
            throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact your administrator.');
        }
        if (user.authProvider !== 'local' && !user.password) {
            throw new common_1.UnauthorizedException(`Please login using ${user.authProvider}`);
        }
        const isMatch = await user.matchPassword(dto.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.authResponse(user);
    }
    async verifyOtp(dto) {
        await this.otpService.verifyOTP(dto.email, dto.code);
        let user = await this.userRepository.findOne({ where: { email: dto.email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Account not found. Sign-up is disabled. Please contact your administrator.');
        }
        if (user.isActive === false) {
            throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact your administrator.');
        }
        return this.authResponse(user);
    }
    async googleLogin(dto) {
        let payload;
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: dto.token,
                audience: this.configService.get('oauth.googleClientId'),
            });
            payload = ticket.getPayload();
        }
        catch (e) {
            try {
                const response = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${dto.token}` },
                });
                payload = response.data;
            }
            catch (err) {
                throw new common_1.UnauthorizedException('Invalid Google token');
            }
        }
        const { email, name, sub, picture } = payload;
        let user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            if (user.isAssessmentStudent) {
                throw new common_1.UnauthorizedException('Assessment students cannot use social login. Please log in using your University UID and password.');
            }
            if (user.isActive === false) {
                throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact your administrator.');
            }
            if (!user.googleId) {
                user.googleId = sub;
                if (!user.avatar)
                    user.avatar = picture;
                await this.userRepository.save(user);
            }
        }
        else {
            throw new common_1.UnauthorizedException('Account not found. Sign-up is disabled. Please contact your administrator.');
        }
        return this.authResponse(user);
    }
    async githubLogin(dto) {
        try {
            const tokenResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
                client_id: this.configService.get('oauth.githubClientId'),
                client_secret: this.configService.get('oauth.githubClientSecret'),
                code: dto.code,
            }, { headers: { Accept: 'application/json' } });
            const accessToken = tokenResponse.data.access_token;
            if (!accessToken)
                throw new Error('No access token from GitHub');
            const userResponse = await axios_1.default.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const emailsResponse = await axios_1.default.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const primaryEmail = emailsResponse.data.find((e) => e.primary)?.email ||
                emailsResponse.data[0]?.email;
            const { id, name, login, avatar_url } = userResponse.data;
            let user = await this.userRepository.findOne({ where: { email: primaryEmail } });
            if (user) {
                if (user.isActive === false) {
                    throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact your administrator.');
                }
                if (user.isAssessmentStudent) {
                    throw new common_1.UnauthorizedException('Assessment students cannot use social login. Please log in using your University UID and password.');
                }
                if (!user.githubId) {
                    user.githubId = id.toString();
                    if (!user.avatar)
                        user.avatar = avatar_url;
                    await this.userRepository.save(user);
                }
            }
            else {
                throw new common_1.UnauthorizedException('Account not found. Sign-up is disabled. Please contact your administrator.');
            }
            return this.authResponse(user);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException('GitHub authentication failed');
        }
    }
    async linkedinLogin(dto) {
        try {
            const tokenResponse = await axios_1.default.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
                params: {
                    grant_type: 'authorization_code',
                    code: dto.code,
                    client_id: this.configService.get('oauth.linkedinClientId'),
                    client_secret: this.configService.get('oauth.linkedinClientSecret'),
                    redirect_uri: dto.redirectUri,
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            const accessToken = tokenResponse.data.access_token;
            const userResponse = await axios_1.default.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const { sub, name, email, picture } = userResponse.data;
            let user = await this.userRepository.findOne({ where: { email } });
            if (user) {
                if (user.isActive === false) {
                    throw new common_1.UnauthorizedException('Your account has been deactivated. Please contact your administrator.');
                }
                if (user.isAssessmentStudent) {
                    throw new common_1.UnauthorizedException('Assessment students cannot use social login. Please log in using your University UID and password.');
                }
                if (!user.linkedinId) {
                    user.linkedinId = sub;
                    if (!user.avatar)
                        user.avatar = picture;
                    await this.userRepository.save(user);
                }
            }
            else {
                throw new common_1.UnauthorizedException('Account not found. Sign-up is disabled. Please contact your administrator.');
            }
            return this.authResponse(user);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException('LinkedIn authentication failed');
        }
    }
    async getMe(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async updateProfile(userId, data) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const allowedFields = ['name', 'bio', 'avatar', 'username'];
        const allowedProfileFields = [
            'institution',
            'role',
            'preferredLanguage',
            'theme',
            'fontSize',
        ];
        for (const key of allowedFields) {
            if (data[key] !== undefined)
                user[key] = data[key];
        }
        if (data.profile) {
            for (const key of allowedProfileFields) {
                if (data.profile[key] !== undefined) {
                    if (!user.profile)
                        user.profile = {};
                    user.profile[key] = data.profile[key];
                }
            }
        }
        if (data.username) {
            const usernameRegex = /^[a-z0-9_]+$/;
            if (!usernameRegex.test(data.username)) {
                throw new common_1.BadRequestException('Username can only contain lowercase letters, numbers, and underscores');
            }
            const existingUser = await this.userRepository.createQueryBuilder('user')
                .where('user.username = :username', { username: data.username })
                .andWhere('user.id != :id', { id: userId })
                .getOne();
            if (existingUser) {
                throw new common_1.BadRequestException('Username is already taken');
            }
            user.username = data.username;
        }
        return await this.userRepository.save(user);
    }
    async forgotPassword(dto) {
        const normalizedEmail = dto.email.trim().toLowerCase();
        const user = await this.userRepository.findOne({ where: { email: normalizedEmail } });
        if (!user) {
            throw new common_1.BadRequestException('No user found with this email address');
        }
        if (user.isAssessmentStudent) {
            throw new common_1.BadRequestException('Assessment students cannot reset password online. Please contact your institution administrator.');
        }
        await this.otpService.sendOTP(normalizedEmail);
        return {
            success: true,
            message: 'Password reset OTP sent to your email via SES',
        };
    }
    async resetPassword(dto) {
        const normalizedEmail = dto.email.trim().toLowerCase();
        await this.otpService.verifyOTP(normalizedEmail, dto.otp);
        const user = await this.userRepository.findOne({
            where: { email: normalizedEmail },
            select: { id: true, password: true },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        user.password = dto.newPassword;
        await this.userRepository.save(user);
        return { success: true, message: 'Password has been successfully reset' };
    }
    async adminLogin(dto) {
        const raw = dto.email.trim();
        const user = await this.userRepository.findOne({
            where: [
                { email: (0, typeorm_2.ILike)(raw) },
                { uid: (0, typeorm_2.ILike)(raw) },
                { username: (0, typeorm_2.ILike)(raw) },
                { name: (0, typeorm_2.ILike)(raw) },
                { email: (0, typeorm_2.ILike)(`${raw}@%`) },
            ],
            select: { id: true, name: true, email: true, password: true, role: true, isAdmin: true, uid: true, isAssessmentStudent: true, forcePasswordChange: true, studentProfile: true, avatar: true, bio: true, profile: true, stats: true, authProvider: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found with this email or ID');
        }
        if (!user.isAdmin) {
            throw new common_1.UnauthorizedException('Access denied. Admin privileges required.');
        }
        if (user.password) {
            if (!dto.password) {
                throw new common_1.BadRequestException('Password is required for this admin account');
            }
            const isMatch = await user.matchPassword(dto.password);
            if (!isMatch) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        }
        return this.authResponse(user);
    }
    async adminVerifyOtp(dto) {
        const normalizedEmail = dto.email.trim().toLowerCase();
        await this.otpService.verifyOTP(normalizedEmail, dto.otp);
        const user = await this.userRepository.findOne({ where: { email: normalizedEmail } });
        if (!user || !user.isAdmin) {
            throw new common_1.UnauthorizedException('Access denied');
        }
        user.lastActive = new Date();
        await this.userRepository.save(user);
        return this.authResponse(user);
    }
    async updateAvatar(userId, avatarUrl) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.avatar = avatarUrl;
        await this.userRepository.save(user);
        return user;
    }
    async studentLogin(dto) {
        const raw = dto.uid.trim();
        const user = await this.userRepository.findOne({
            where: [
                { uid: (0, typeorm_2.ILike)(raw) },
                { email: (0, typeorm_2.ILike)(raw) },
                { username: (0, typeorm_2.ILike)(raw) },
                { name: (0, typeorm_2.ILike)(raw) },
                { email: (0, typeorm_2.ILike)(`${raw}@%`) },
            ],
            select: { id: true, name: true, email: true, password: true, role: true, isAdmin: true, uid: true, isAssessmentStudent: true, forcePasswordChange: true, studentProfile: true, avatar: true, bio: true, profile: true, stats: true, authProvider: true, isActive: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid University UID or password');
        }
        if (user.isActive === false) {
            throw new common_1.UnauthorizedException('Your student account has been deactivated. Please contact your institution administrator.');
        }
        const isMatch = await user.matchPassword(dto.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid University UID or password');
        }
        user.lastActive = new Date();
        await this.userRepository.save(user);
        return this.authResponse(user);
    }
    async forceChangePassword(userId, dto) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: { id: true, name: true, email: true, uid: true, password: true, forcePasswordChange: true }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isMatch = await user.matchPassword(dto.currentPassword);
        if (!isMatch) {
            throw new common_1.BadRequestException('Current temporary password is incorrect');
        }
        if (dto.currentPassword === dto.newPassword) {
            throw new common_1.BadRequestException('New password must be different from current temporary password');
        }
        user.password = dto.newPassword;
        user.forcePasswordChange = false;
        await this.userRepository.save(user);
        return {
            success: true,
            message: 'Password successfully updated',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                uid: user.uid,
                forcePasswordChange: false,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        otp_service_1.OtpService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map