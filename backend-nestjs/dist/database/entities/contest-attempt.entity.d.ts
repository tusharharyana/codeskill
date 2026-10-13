import { User } from './user.entity';
import { Contest } from './contest.entity';
export declare class ContestAttempt {
    id: string;
    mongoId: string;
    contest: Contest;
    contest_id: string;
    user: User;
    user_id: string;
    sessionId: string;
    deviceFingerprint: string;
    status: string;
    startedAt: Date;
    submittedAt: Date;
    warnings: number;
    violations: Array<{
        type: string;
        timestamp: Date;
        metadata?: any;
    }>;
    savedCode: Array<{
        problemId: string;
        code: string;
        language: string;
        lastSaved: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
