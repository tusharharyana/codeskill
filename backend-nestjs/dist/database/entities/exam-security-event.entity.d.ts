import { User } from './user.entity';
import { Assessment } from './assessment.entity';
import { ExamSession } from './exam-session.entity';
export declare class ExamSecurityEvent {
    id: string;
    mongoId: string;
    session: ExamSession;
    sessionId: string;
    get session_id(): string;
    set session_id(val: string);
    candidate: User;
    candidateId: string;
    get candidate_id(): string;
    set candidate_id(val: string);
    assessment: Assessment;
    assessmentId: string;
    get assessment_id(): string;
    set assessment_id(val: string);
    eventType: string;
    severity: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
