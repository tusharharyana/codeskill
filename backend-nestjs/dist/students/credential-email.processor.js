"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CredentialEmailProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialEmailProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_job_entity_1 = require("../database/entities/email-job.entity");
const email_service_1 = require("../emails/email.service");
let CredentialEmailProcessor = CredentialEmailProcessor_1 = class CredentialEmailProcessor extends bullmq_1.WorkerHost {
    emailJobRepo;
    emailService;
    logger = new common_1.Logger(CredentialEmailProcessor_1.name);
    constructor(emailJobRepo, emailService) {
        super();
        this.emailJobRepo = emailJobRepo;
        this.emailService = emailService;
    }
    async process(job) {
        const { emailJobId, portalUrl } = job.data;
        this.logger.log(`[BullMQ] Processing credential email job: ${emailJobId}`);
        const emailJob = await this.emailJobRepo.findOne({
            where: [{ id: emailJobId }, { mongoId: emailJobId }],
        });
        if (!emailJob) {
            this.logger.error(`[BullMQ] EmailJob record ${emailJobId} not found`);
            return;
        }
        try {
            if (!emailJob.temporaryPassword) {
                throw new Error('Temporary password is empty or already purged');
            }
            await this.emailService.sendCredentialEmail(emailJob.email, emailJob.name, emailJob.uid, emailJob.temporaryPassword, portalUrl || 'http://localhost:3000/student-login');
            emailJob.status = 'sent';
            emailJob.sentAt = new Date();
            emailJob.error = '';
            emailJob.temporaryPassword = '';
            await this.emailJobRepo.save(emailJob);
            this.logger.log(`[BullMQ] Credential email successfully dispatched for ${emailJob.uid} (${emailJob.email})`);
            return { success: true, emailJobId: emailJob.id };
        }
        catch (error) {
            this.logger.error(`[BullMQ] Failed to send credential email for ${emailJob.uid}: ${error.message}`);
            emailJob.retryCount = (emailJob.retryCount || 0) + 1;
            emailJob.error = error.message;
            emailJob.status = emailJob.retryCount >= 3 ? 'failed' : 'retrying';
            await this.emailJobRepo.save(emailJob);
            throw error;
        }
    }
};
exports.CredentialEmailProcessor = CredentialEmailProcessor;
exports.CredentialEmailProcessor = CredentialEmailProcessor = CredentialEmailProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('credential-email'),
    __param(0, (0, typeorm_1.InjectRepository)(email_job_entity_1.EmailJob)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], CredentialEmailProcessor);
//# sourceMappingURL=credential-email.processor.js.map