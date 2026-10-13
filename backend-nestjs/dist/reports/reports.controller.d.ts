import { Repository } from 'typeorm';
import { AssessmentAttempt } from '../database/entities/assessment-attempt.entity';
import { Assessment } from '../database/entities/assessment.entity';
import { Question } from '../database/entities/question.entity';
import type { Response } from 'express';
export declare class ReportsController {
    private readonly attemptRepo;
    private readonly assessmentRepo;
    private readonly questionRepo;
    constructor(attemptRepo: Repository<AssessmentAttempt>, assessmentRepo: Repository<Assessment>, questionRepo: Repository<Question>);
    getStudentResultReport(attemptId: string, res: Response): Promise<void>;
}
