import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Repository } from 'typeorm';
import { EmailJob } from '../database/entities/email-job.entity';
import { EmailService } from '../emails/email.service';
export declare class CredentialEmailProcessor extends WorkerHost {
    private readonly emailJobRepo;
    private readonly emailService;
    private readonly logger;
    constructor(emailJobRepo: Repository<EmailJob>, emailService: EmailService);
    process(job: Job<{
        emailJobId: string;
        portalUrl?: string;
    }>): Promise<any>;
}
