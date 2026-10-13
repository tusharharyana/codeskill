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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSecurityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const exam_session_entity_1 = require("../database/entities/exam-session.entity");
const exam_security_event_entity_1 = require("../database/entities/exam-security-event.entity");
let ExamSecurityService = class ExamSecurityService {
    assessmentRepo;
    sessionRepo;
    eventRepo;
    constructor(assessmentRepo, sessionRepo, eventRepo) {
        this.assessmentRepo = assessmentRepo;
        this.sessionRepo = sessionRepo;
        this.eventRepo = eventRepo;
    }
    async initSecureSession(assessmentId, candidateId, headers, clientBody) {
        if (!assessmentId)
            throw new common_1.BadRequestException('Invalid assessment ID');
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id: assessmentId }, { mongoId: assessmentId }],
        });
        if (!assessment)
            throw new common_1.NotFoundException('Assessment not found');
        const security = assessment.securityPolicy;
        const isSecureMode = security && security.secureExamMode !== 'DISABLED';
        const clientType = clientBody.isSEB ? 'SEB' : 'BROWSER';
        const clientVersion = clientBody.clientVersion || 'UNKNOWN';
        const configKey = clientBody.configKey;
        if (security?.requireSEB && clientType !== 'SEB') {
            throw new common_1.ForbiddenException('This assessment requires Safe Exam Browser. Please launch via SEB.');
        }
        if (security?.requireSEB && security.allowedSEBVersions?.length > 0) {
            if (!security.allowedSEBVersions.includes(clientVersion)) {
                throw new common_1.ForbiddenException(`Your Safe Exam Browser version (${clientVersion}) is not supported for this assessment. Please install an approved version.`);
            }
        }
        let session = await this.sessionRepo.findOne({
            where: [
                { assessment: { id: assessment.id }, candidate: { id: candidateId } },
                { assessmentId: assessment.id, candidateId },
            ],
        });
        if (!session) {
            const expiresAt = new Date(Date.now() +
                (assessment.durationMinutes || 60) * 60 * 1000 +
                (security?.heartbeatGracePeriod || 60) * 1000);
            session = this.sessionRepo.create({
                assessment: { id: assessment.id },
                candidate: { id: candidateId },
                assessmentId: assessment.id,
                candidateId,
                status: 'VERIFIED',
                secureMode: security?.secureExamMode || 'DISABLED',
                clientType,
                clientVersion,
                configKey,
                expiresAt,
                startedAt: new Date(),
                lastHeartbeatAt: new Date(),
                violationCount: 0,
            });
            await this.sessionRepo.save(session);
        }
        else {
            if (['SUBMITTED', 'EXPIRED', 'TERMINATED'].includes(session.status)) {
                throw new common_1.ForbiddenException('Exam session has already ended.');
            }
            session.lastHeartbeatAt = new Date();
            await this.sessionRepo.save(session);
        }
        return {
            success: true,
            sessionId: session.id,
            expiresAt: session.expiresAt,
            status: session.status,
            secureMode: session.secureMode,
            token: 'simulate-secure-token',
        };
    }
    async processHeartbeat(sessionId, candidateId) {
        const session = await this.sessionRepo.findOne({
            where: [{ id: sessionId }, { mongoId: sessionId }],
        });
        if (!session || (session.candidateId !== candidateId && session.candidate?.id !== candidateId)) {
            throw new common_1.ForbiddenException('Invalid session');
        }
        if (['SUBMITTED', 'EXPIRED', 'TERMINATED'].includes(session.status)) {
            throw new common_1.ForbiddenException('Session ended');
        }
        session.lastHeartbeatAt = new Date();
        if (session.status === 'SUSPENDED') {
            session.status = 'ACTIVE';
        }
        await this.sessionRepo.save(session);
        return { success: true, status: session.status };
    }
    async reportViolation(sessionId, candidateId, eventType, metadata) {
        const session = await this.sessionRepo.findOne({
            where: [{ id: sessionId }, { mongoId: sessionId }],
        });
        if (!session || (session.candidateId !== candidateId && session.candidate?.id !== candidateId)) {
            throw new common_1.ForbiddenException('Invalid session');
        }
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id: session.assessmentId }, { mongoId: session.assessmentId }],
        });
        const severity = ['TAB_HIDDEN', 'FULLSCREEN_EXIT', 'COPY_ATTEMPT'].includes(eventType)
            ? 'WARNING'
            : 'CRITICAL';
        const event = this.eventRepo.create({
            session: { id: session.id },
            candidate: { id: candidateId },
            assessment: { id: session.assessmentId },
            sessionId: session.id,
            candidateId,
            assessmentId: session.assessmentId,
            eventType,
            severity,
            metadata,
        });
        await this.eventRepo.save(event);
        session.violationCount = (session.violationCount || 0) + 1;
        const threshold = assessment?.securityPolicy?.violationThreshold || 3;
        if (session.violationCount >= threshold) {
            session.status = 'SUSPENDED';
            session.securityState = 'VIOLATED';
        }
        await this.sessionRepo.save(session);
        return {
            success: true,
            status: session.status,
            violations: session.violationCount,
        };
    }
};
exports.ExamSecurityService = ExamSecurityService;
exports.ExamSecurityService = ExamSecurityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(1, (0, typeorm_1.InjectRepository)(exam_session_entity_1.ExamSession)),
    __param(2, (0, typeorm_1.InjectRepository)(exam_security_event_entity_1.ExamSecurityEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExamSecurityService);
//# sourceMappingURL=exam-security.service.js.map