import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { ExecutionService } from './execution.service';
import { Submission } from '../database/entities/submission.entity';
import { ProblemMetadata } from '../database/entities/problem-metadata.entity';
import { ProblemTestCase } from '../database/entities/problem-testcase.entity';
import { User } from '../database/entities/user.entity';
import { AppGateway } from '../gateway/app.gateway';
import { RedisService } from '../redis/redis.service';
export declare enum SubmissionStatus {
    QUEUED = "queued",
    RUNNING = "running",
    TESTING = "testing",
    ACCEPTED = "accepted",
    WRONG_ANSWER = "wrong_answer",
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded",
    MEMORY_LIMIT_EXCEEDED = "memory_limit_exceeded",
    COMPILATION_ERROR = "compilation_error",
    RUNTIME_ERROR = "runtime_error",
    SYSTEM_ERROR = "system_error"
}
export declare class JudgeProcessor extends WorkerHost {
    private readonly executionService;
    private readonly submissionRepo;
    private readonly problemModel;
    private readonly testCaseModel;
    private readonly userRepo;
    private readonly appGateway;
    private readonly redisService;
    private readonly logger;
    private readonly runnerId;
    constructor(executionService: ExecutionService, submissionRepo: Repository<Submission>, problemModel: Repository<ProblemMetadata>, testCaseModel: Repository<ProblemTestCase>, userRepo: Repository<User>, appGateway: AppGateway, redisService: RedisService);
    process(job: Job<any, any, string>): Promise<any>;
    private overallStatus;
}
