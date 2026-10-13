import { Repository } from 'typeorm';
import { Assessment } from '../database/entities/assessment.entity';
import { ExamSession } from '../database/entities/exam-session.entity';
import { ExamSecurityEvent } from '../database/entities/exam-security-event.entity';
export declare class ExamSecurityService {
    private readonly assessmentRepo;
    private readonly sessionRepo;
    private readonly eventRepo;
    constructor(assessmentRepo: Repository<Assessment>, sessionRepo: Repository<ExamSession>, eventRepo: Repository<ExamSecurityEvent>);
    initSecureSession(assessmentId: string, candidateId: string, headers: any, clientBody: any): Promise<{
        success: boolean;
        sessionId: string;
        expiresAt: Date;
        status: string;
        secureMode: string;
        token: string;
    }>;
    processHeartbeat(sessionId: string, candidateId: string): Promise<{
        success: boolean;
        status: string;
    }>;
    reportViolation(sessionId: string, candidateId: string, eventType: string, metadata: any): Promise<{
        success: boolean;
        status: string;
        violations: number;
    }>;
}
