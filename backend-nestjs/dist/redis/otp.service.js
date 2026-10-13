"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
const email_service_1 = require("../emails/email.service");
const crypto = __importStar(require("crypto"));
let OtpService = class OtpService {
    redisService;
    emailService;
    constructor(redisService, emailService) {
        this.redisService = redisService;
        this.emailService = emailService;
    }
    generateOTP() {
        return crypto.randomInt(100000, 999999).toString();
    }
    async sendOTP(email) {
        if (!email || typeof email !== 'string') {
            throw new common_1.BadRequestException('A valid email address is required to send OTP.');
        }
        const normalizedEmail = email.trim().toLowerCase();
        const rateLimitKey = `otp_ratelimit:${normalizedEmail}`;
        const otpKey = `otp:${normalizedEmail}`;
        const isRateLimited = await this.redisService.get(rateLimitKey);
        if (isRateLimited) {
            throw new common_1.BadRequestException('Please wait before requesting another OTP.');
        }
        const otp = this.generateOTP();
        await this.redisService.set(otpKey, otp, 300);
        await this.redisService.set(rateLimitKey, '1', 60);
        try {
            await this.emailService.sendOTPEmail(normalizedEmail, otp);
        }
        catch (error) {
            await this.redisService.del([otpKey, rateLimitKey]);
            throw error;
        }
        return { success: true, message: 'OTP sent successfully' };
    }
    async verifyOTP(email, code) {
        if (!email || !code) {
            throw new common_1.BadRequestException('Email and OTP code are required.');
        }
        const normalizedEmail = email.trim().toLowerCase();
        const otpKey = `otp:${normalizedEmail}`;
        const storedOTP = await this.redisService.get(otpKey);
        if (!storedOTP) {
            throw new common_1.BadRequestException('OTP expired or not found. Please request a new one.');
        }
        if (storedOTP.toString() !== code.toString().trim()) {
            throw new common_1.BadRequestException('Invalid OTP code.');
        }
        await this.redisService.del(otpKey);
        return true;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        email_service_1.EmailService])
], OtpService);
//# sourceMappingURL=otp.service.js.map