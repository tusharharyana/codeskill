import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly sesClient;
    private readonly logger;
    private readonly isMock;
    private readonly senderEmail;
    constructor(configService: ConfigService);
    sendOTPEmail(toEmail: string, otp: string): Promise<any>;
    sendCredentialEmail(toEmail: string, studentName: string, uid: string, temporaryPassword: string, portalUrl?: string): Promise<any>;
}
