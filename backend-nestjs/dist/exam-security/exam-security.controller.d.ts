import { ExamSecurityService } from './exam-security.service';
export declare class ExamSecurityController {
    private readonly examSecurityService;
    constructor(examSecurityService: ExamSecurityService);
    initSession(assessmentId: string, req: any, body: any): Promise<{
        success: boolean;
        sessionId: string;
        expiresAt: Date;
        status: string;
        secureMode: string;
        token: string;
    }>;
    heartbeat(sessionId: string, req: any): Promise<{
        success: boolean;
        status: string;
    }>;
    reportViolation(sessionId: string, req: any, body: {
        eventType: string;
        metadata?: any;
    }): Promise<{
        success: boolean;
        status: string;
        violations: number;
    }>;
}
