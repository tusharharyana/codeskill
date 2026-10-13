import { User } from './user.entity';
export declare class AuditLog {
    id: string;
    mongoId?: string;
    actor?: User;
    actorId?: string;
    actorEmail: string;
    action: string;
    target: string;
    targetType: string;
    studentId?: string;
    attemptId?: string;
    assessmentId?: string;
    event?: string;
    riskWeight: number;
    ipAddress: string;
    userAgent: string;
    metadata: Record<string, any>;
    timestamp: Date;
}
