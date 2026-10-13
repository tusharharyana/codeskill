import { RedisService } from './redis.service';
import { EmailService } from '../emails/email.service';
export declare class OtpService {
    private readonly redisService;
    private readonly emailService;
    constructor(redisService: RedisService, emailService: EmailService);
    private generateOTP;
    sendOTP(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOTP(email: string, code: string): Promise<boolean>;
}
