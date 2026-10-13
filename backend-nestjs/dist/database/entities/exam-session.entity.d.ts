import { User } from './user.entity';
import { Assessment } from './assessment.entity';
export declare class ExamSession {
    id: string;
    mongoId: string;
    assessment: Assessment;
    assessmentId: string;
    get assessment_id(): string;
    set assessment_id(val: string);
    candidate: User;
    candidateId: string;
    get candidate_id(): string;
    set candidate_id(val: string);
    status: string;
    secureMode: string;
    clientType: string;
    clientVersion: string;
    configKey: string;
    browserExamKeyVerified: boolean;
    startedAt: Date;
    lastHeartbeatAt: Date;
    expiresAt: Date;
    submittedAt: Date;
    securityState: string;
    violationCount: number;
    createdAt: Date;
    updatedAt: Date;
}
