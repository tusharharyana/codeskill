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
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const assessment_attempt_entity_1 = require("../database/entities/assessment-attempt.entity");
const question_entity_1 = require("../database/entities/question.entity");
const audit_log_entity_1 = require("../database/entities/audit-log.entity");
let AssessmentsService = class AssessmentsService {
    assessmentRepo;
    attemptRepo;
    questionRepo;
    auditLogRepo;
    constructor(assessmentRepo, attemptRepo, questionRepo, auditLogRepo) {
        this.assessmentRepo = assessmentRepo;
        this.attemptRepo = attemptRepo;
        this.questionRepo = questionRepo;
        this.auditLogRepo = auditLogRepo;
    }
    async create(dto, adminUser, ip = '', userAgent = '') {
        let questionObjIds = [];
        let totalMarks = 0;
        const sectionsToSave = [];
        if (dto.sections && dto.sections.length > 0) {
            dto.sections.forEach((sec) => {
                sec.questions.forEach((q) => {
                    questionObjIds.push(String(q.questionId));
                    totalMarks += q.marks || 1;
                });
                sectionsToSave.push({
                    title: sec.title,
                    description: sec.description || '',
                    order: sec.order || 0,
                    timeLimit: sec.timeLimit || 0,
                    questions: sec.questions.map((q) => ({
                        questionId: String(q.questionId),
                        marks: q.marks || 1,
                        negativeMarks: q.negativeMarks || 0,
                        order: q.order || 0,
                    })),
                });
            });
        }
        else if (dto.questionIds && dto.questionIds.length > 0) {
            questionObjIds = dto.questionIds.map((id) => String(id));
            const questions = await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(questionObjIds) }, { mongoId: (0, typeorm_2.In)(questionObjIds) }],
            });
            totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
        }
        else {
            throw new common_1.BadRequestException('At least one section or question must be provided.');
        }
        if (questionObjIds.length > 0) {
            const qCount = await this.questionRepo.count({
                where: [{ id: (0, typeorm_2.In)(questionObjIds) }, { mongoId: (0, typeorm_2.In)(questionObjIds) }],
            });
            if (qCount !== questionObjIds.length) {
                throw new common_1.BadRequestException('One or more valid questions could not be found.');
            }
        }
        const passingMarks = dto.passingMarks ?? Math.ceil(totalMarks * 0.4);
        const code = (dto.code || `TEST-${Date.now().toString().slice(-6)}`)
            .toUpperCase()
            .trim();
        const existingCode = await this.assessmentRepo.findOne({ where: { code } });
        if (existingCode) {
            throw new common_1.BadRequestException(`Assessment code '${code}' is already in use.`);
        }
        const assessment = this.assessmentRepo.create({
            title: dto.title.trim(),
            code,
            description: dto.description || '',
            type: dto.type || 'mcq',
            category: dto.category || 'exam',
            durationMinutes: dto.durationMinutes,
            totalMarks,
            passingMarks,
            negativeMarking: dto.negativeMarking ?? true,
            questions: questionObjIds,
            targetBatches: dto.targetBatches || [],
            targetDepartments: dto.targetDepartments || [],
            targetCourses: dto.targetCourses || [],
            startTime: dto.startTime ? new Date(dto.startTime) : undefined,
            endTime: dto.endTime ? new Date(dto.endTime) : undefined,
            shuffleQuestions: dto.shuffleQuestions ?? true,
            shuffleOptions: dto.shuffleOptions ?? true,
            showResultImmediately: dto.showResultImmediately ?? true,
            allowReview: dto.allowReview ?? true,
            allowedAttempts: dto.allowedAttempts !== undefined ? Number(dto.allowedAttempts) : 1,
            proctoring: dto.proctoring || {
                enforceFullscreen: true,
                blockCopyPaste: true,
                detectTabSwitch: true,
                maxTabSwitches: 3,
                autoSubmitOnViolation: true,
            },
            instructions: dto.instructions || [
                'Ensure a stable internet connection throughout the test duration.',
                'Fullscreen mode is strictly enforced. Leaving fullscreen or switching tabs will be recorded.',
                'Negative marking applies for incorrect answers where specified.',
                'The assessment will automatically submit when the countdown reaches zero.',
            ],
            sections: sectionsToSave,
            status: dto.status || 'draft',
            created_by_id: adminUser?.id || adminUser?._id,
        });
        await this.assessmentRepo.save(assessment);
        await this.auditLogRepo.save(this.auditLogRepo.create({
            actorId: adminUser?.id || adminUser?._id,
            actorEmail: adminUser?.email || '',
            action: 'CREATE_ASSESSMENT',
            target: assessment.id,
            targetType: 'Assessment',
            ipAddress: ip,
            userAgent: userAgent,
            metadata: {
                title: assessment.title,
                code: assessment.code,
                questionCount: questionObjIds.length,
                totalMarks,
            },
        }));
        return { ...assessment, _id: assessment.id };
    }
    async findAll(query = {}) {
        const qb = this.assessmentRepo
            .createQueryBuilder('assessment')
            .leftJoinAndSelect('assessment.createdBy', 'createdBy')
            .orderBy('assessment.createdAt', 'DESC');
        if (query.status && query.status !== 'all') {
            qb.andWhere('assessment.status = :status', { status: query.status });
        }
        else {
            qb.andWhere('assessment.status != :archived', { archived: 'archived' });
        }
        if (query.search && query.search.trim()) {
            const search = `%${query.search.trim()}%`;
            qb.andWhere('(assessment.title ILIKE :search OR assessment.code ILIKE :search)', { search });
        }
        const rawAssessments = await qb.getMany();
        const assessments = rawAssessments.map((a) => ({
            ...a,
            _id: a.id,
        }));
        return { success: true, assessments, count: assessments.length };
    }
    async findById(id) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
            relations: { createdBy: true },
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        let questionsList = [];
        if (assessment.questions && assessment.questions.length > 0) {
            questionsList = await this.questionRepo.find({
                where: [
                    { id: (0, typeorm_2.In)(assessment.questions) },
                    { mongoId: (0, typeorm_2.In)(assessment.questions) },
                ],
            });
        }
        const qMap = new Map(questionsList.map((q) => [q.id, { ...q, _id: q.id }]));
        const sections = (assessment.sections || []).map((sec) => ({
            ...sec,
            questions: sec.questions.map((q) => ({
                ...q,
                questionId: qMap.get(String(q.questionId)) || q.questionId,
            })),
        }));
        return {
            success: true,
            assessment: {
                ...assessment,
                _id: assessment.id,
                questions: questionsList.map((q) => ({ ...q, _id: q.id })),
                sections,
            },
        };
    }
    async delete(id, adminUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        assessment.status = 'archived';
        await this.assessmentRepo.save(assessment);
        return { success: true, message: 'Assessment archived successfully' };
    }
    async update(id, dto, adminUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        if (dto.title !== undefined)
            assessment.title = dto.title;
        if (dto.code !== undefined)
            assessment.code = dto.code.toUpperCase().trim();
        if (dto.description !== undefined)
            assessment.description = dto.description;
        if (dto.durationMinutes !== undefined)
            assessment.durationMinutes = dto.durationMinutes;
        if (dto.passingMarks !== undefined)
            assessment.passingMarks = dto.passingMarks;
        if (dto.negativeMarking !== undefined)
            assessment.negativeMarking = dto.negativeMarking;
        if (dto.startTime !== undefined)
            assessment.startTime = dto.startTime ? new Date(dto.startTime) : undefined;
        if (dto.endTime !== undefined)
            assessment.endTime = dto.endTime ? new Date(dto.endTime) : undefined;
        if (dto.status !== undefined)
            assessment.status = dto.status;
        if (dto.shuffleQuestions !== undefined)
            assessment.shuffleQuestions = dto.shuffleQuestions;
        if (dto.shuffleOptions !== undefined)
            assessment.shuffleOptions = dto.shuffleOptions;
        if (dto.showResultImmediately !== undefined)
            assessment.showResultImmediately = dto.showResultImmediately;
        if (dto.allowReview !== undefined)
            assessment.allowReview = dto.allowReview;
        if (dto.allowedAttempts !== undefined)
            assessment.allowedAttempts = Number(dto.allowedAttempts);
        if (!assessment.created_by_id && (adminUser?.id || adminUser?._id)) {
            assessment.created_by_id = adminUser.id || adminUser._id;
        }
        if (dto.proctoring) {
            assessment.proctoring = {
                ...assessment.proctoring,
                ...dto.proctoring,
            };
        }
        if (dto.sections &&
            Array.isArray(dto.sections) &&
            dto.sections.length > 0) {
            const qIds = [];
            let tMarks = 0;
            const sectionsToSave = [];
            dto.sections.forEach((sec) => {
                sec.questions.forEach((q) => {
                    qIds.push(String(q.questionId));
                    tMarks += q.marks || 1;
                });
                sectionsToSave.push({
                    title: sec.title,
                    description: sec.description || '',
                    order: sec.order || 0,
                    timeLimit: sec.timeLimit || 0,
                    questions: sec.questions.map((q) => ({
                        questionId: String(q.questionId),
                        marks: q.marks || 1,
                        negativeMarks: q.negativeMarks || 0,
                        order: q.order || 0,
                    })),
                });
            });
            assessment.sections = sectionsToSave;
            assessment.questions = qIds;
            assessment.totalMarks = tMarks;
        }
        else if (dto.questionIds && Array.isArray(dto.questionIds)) {
            const qIds = dto.questionIds.map((qId) => String(qId));
            assessment.questions = qIds;
            const questionsList = await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(qIds) }, { mongoId: (0, typeorm_2.In)(qIds) }],
            });
            assessment.totalMarks = questionsList.reduce((sum, q) => sum + (q.marks || 1), 0);
        }
        await this.assessmentRepo.save(assessment);
        await this.auditLogRepo.save(this.auditLogRepo.create({
            action: 'UPDATE_ASSESSMENT',
            actorId: adminUser?.id || adminUser?._id,
            actorEmail: adminUser?.email || '',
            targetType: 'Assessment',
            assessmentId: assessment.id,
            target: assessment.title,
        }));
        return {
            success: true,
            message: 'Assessment updated successfully',
            assessment: { ...assessment, _id: assessment.id },
        };
    }
    async updateStatus(id, status, adminUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        assessment.status = status;
        await this.assessmentRepo.save(assessment);
        await this.auditLogRepo.save(this.auditLogRepo.create({
            action: 'TOGGLE_ASSESSMENT_STATUS',
            actorId: adminUser?.id || adminUser?._id,
            actorEmail: adminUser?.email || '',
            targetType: 'Assessment',
            assessmentId: assessment.id,
            target: `Status -> ${status}`,
        }));
        return {
            success: true,
            message: `Assessment status updated to ${status}`,
            assessment: { ...assessment, _id: assessment.id },
        };
    }
    async getAssessmentResults(id) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        const attempts = await this.attemptRepo.find({
            where: [{ assessmentId: assessment.id }, { assessmentId: id }],
            order: { score: 'DESC', timeSpentSeconds: 'ASC' },
        });
        const studentAttemptsMap = new Map();
        for (const att of attempts) {
            const studentKey = att.studentId
                ? att.studentId.toString()
                : att.studentUid;
            const list = studentAttemptsMap.get(studentKey) || [];
            list.push(att);
            studentAttemptsMap.set(studentKey, list);
        }
        const uniqueCandidates = Array.from(studentAttemptsMap.entries()).map(([key, studentAttempts]) => {
            const submitted = studentAttempts.filter((a) => a.status === 'submitted' || a.status === 'auto_submitted');
            const best = submitted.length > 0
                ? [...submitted].sort((a, b) => (b.score || 0) - (a.score || 0))[0]
                : [...studentAttempts].sort((a, b) => new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime())[0];
            const maxScore = submitted.length > 0
                ? Math.max(...submitted.map((s) => s.score || 0))
                : best?.score || 0;
            const hasPassed = submitted.length > 0
                ? submitted.some((s) => s.passed)
                : best?.passed || false;
            return {
                ...best,
                _id: best?.id,
                attemptNumber: studentAttempts.length,
                totalAttempts: studentAttempts.length,
                score: maxScore,
                highestScore: maxScore,
                passed: hasPassed,
                allAttempts: studentAttempts
                    .sort((a, b) => (a.attemptNumber || 0) - (b.attemptNumber || 0))
                    .map((a, idx) => ({
                    _id: a.id,
                    attemptNumber: a.attemptNumber || idx + 1,
                    score: a.score ?? 0,
                    maxScore: a.maxScore || assessment.totalMarks || 100,
                    status: a.status,
                    percentage: a.percentage ?? 0,
                    submittedAt: a.submittedAt || a.createdAt || a.startedAt,
                    passed: a.passed,
                    timeSpentSeconds: a.timeSpentSeconds || 0,
                    tabSwitchCount: a.tabSwitchCount || 0,
                    violationsCount: a.violations?.length || 0,
                    responses: a.responses || [],
                    violations: a.violations || [],
                })),
            };
        });
        const totalCandidates = uniqueCandidates.length;
        const submittedCandidates = uniqueCandidates.filter((c) => c.status === 'submitted' || c.status === 'auto_submitted');
        const submittedCount = submittedCandidates.length;
        const passedCount = uniqueCandidates.filter((c) => c.passed).length;
        const avgScore = submittedCount > 0
            ? Number((submittedCandidates.reduce((sum, c) => sum + (c.score || 0), 0) /
                submittedCount).toFixed(1))
            : 0;
        return {
            success: true,
            assessment: {
                id: assessment.id,
                _id: assessment.id,
                title: assessment.title,
                code: assessment.code,
                totalMarks: assessment.totalMarks || 100,
                passingMarks: assessment.passingMarks || 40,
                allowedAttempts: assessment.allowedAttempts !== undefined
                    ? assessment.allowedAttempts
                    : 0,
            },
            stats: {
                totalCandidates,
                submittedCount,
                passedCount,
                passPercentage: submittedCount > 0
                    ? Number(((passedCount / submittedCount) * 100).toFixed(1))
                    : 0,
                avgScore,
                totalSubmissionsCount: attempts.filter((a) => a.status === 'submitted' || a.status === 'auto_submitted').length,
            },
            attempts: uniqueCandidates,
            rawAttempts: attempts.map((a, idx) => ({
                _id: a.id,
                id: a.id,
                studentId: a.studentId,
                studentUid: a.studentUid,
                studentName: a.studentName,
                studentEmail: a.studentEmail,
                attemptNumber: a.attemptNumber || idx + 1,
                score: a.score ?? 0,
                maxScore: a.maxScore || assessment.totalMarks || 100,
                percentage: a.percentage ?? 0,
                passed: a.passed,
                status: a.status,
                submittedAt: a.submittedAt || a.createdAt || a.startedAt,
                timeSpentSeconds: a.timeSpentSeconds || 0,
                tabSwitchCount: a.tabSwitchCount || 0,
                violations: a.violations || [],
                responses: a.responses || [],
            })),
        };
    }
    async getStudentAssessments(studentUser) {
        const studentProfile = studentUser.studentProfile || {};
        const batch = studentProfile.batch || '';
        const dept = studentProfile.department || '';
        const assessments = await this.assessmentRepo
            .createQueryBuilder('a')
            .where('a.status IN (:...statuses)', {
            statuses: ['published', 'ongoing'],
        })
            .orderBy('a.createdAt', 'DESC')
            .getMany();
        const filteredAssessments = assessments.filter((a) => {
            const matchBatch = !a.targetBatches ||
                a.targetBatches.length === 0 ||
                (batch && a.targetBatches.includes(batch));
            const matchDept = !a.targetDepartments ||
                a.targetDepartments.length === 0 ||
                (dept && a.targetDepartments.includes(dept));
            return matchBatch && matchDept;
        });
        const studentId = String(studentUser.id || studentUser._id);
        const attemptWhere = [{ studentId }];
        if (studentUser.uid) {
            attemptWhere.push({ studentUid: studentUser.uid });
        }
        const existingAttempts = await this.attemptRepo.find({
            where: attemptWhere,
            order: { score: 'DESC', createdAt: 'DESC' },
        });
        const items = filteredAssessments.map((a) => {
            const allForAssessment = existingAttempts.filter((att) => att.assessmentId === a.id || att.assessmentId === a.mongoId);
            const submittedAttempts = allForAssessment.filter((att) => att.status === 'submitted' || att.status === 'auto_submitted');
            const isCompleted = submittedAttempts.length > 0;
            const inProgressAttempt = allForAssessment.find((att) => att.status === 'in_progress');
            const maxScore = isCompleted
                ? Math.max(...submittedAttempts.map((s) => s.score || 0))
                : (inProgressAttempt?.score ?? null);
            const hasPassed = isCompleted
                ? submittedAttempts.some((s) => s.passed)
                : false;
            const allowedAttempts = a.allowedAttempts !== undefined
                ? a.allowedAttempts
                : 1;
            const completedCount = submittedAttempts.length;
            const canRetake = allowedAttempts === 0 ? true : completedCount < allowedAttempts;
            return {
                ...a,
                _id: a.id,
                allowedAttempts,
                completedAttemptsCount: completedCount,
                questionCount: a.questions?.length || 0,
                attemptStatus: isCompleted
                    ? 'submitted'
                    : inProgressAttempt
                        ? 'in_progress'
                        : 'not_started',
                attemptScore: maxScore,
                attemptPassed: hasPassed,
                highestScore: maxScore,
                totalAttempts: allForAssessment.length,
                canRetake,
            };
        });
        return { success: true, assessments: items };
    }
    async getStudentAssessmentOverview(id, studentUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        const studentId = String(studentUser.id || studentUser._id);
        const whereConditions = [
            { assessmentId: assessment.id, studentId },
        ];
        if (id && id !== assessment.id) {
            whereConditions.push({ assessmentId: id, studentId });
        }
        if (studentUser.uid) {
            whereConditions.push({ assessmentId: assessment.id, studentUid: studentUser.uid });
        }
        const allAttempts = await this.attemptRepo.find({
            where: whereConditions,
            order: { score: 'DESC', startedAt: 'DESC' },
        });
        const submittedAttempts = allAttempts.filter((a) => a.status === 'submitted' || a.status === 'auto_submitted');
        const inProgressAttempt = allAttempts.find((a) => a.status === 'in_progress');
        const allowedAttempts = assessment.allowedAttempts !== undefined ? assessment.allowedAttempts : 1;
        const completedCount = submittedAttempts.length;
        const canRetake = allowedAttempts === 0 ? true : completedCount < allowedAttempts;
        const highestScore = submittedAttempts.length > 0
            ? Math.max(...submittedAttempts.map((s) => s.score || 0))
            : null;
        const latestAttempt = inProgressAttempt || (allAttempts.length > 0 ? allAttempts[0] : null);
        const now = new Date();
        let isAvailable = assessment.status === 'published' || assessment.status === 'ongoing';
        let unavailabilityReason = '';
        if (assessment.status === 'draft') {
            isAvailable = false;
            unavailabilityReason =
                'Assessment is currently in draft mode (disabled by administrator).';
        }
        else if (assessment.status === 'completed' ||
            assessment.status === 'archived') {
            isAvailable = false;
            unavailabilityReason = 'Assessment has concluded and is closed.';
        }
        else if (assessment.startTime && now < new Date(assessment.startTime)) {
            isAvailable = false;
            unavailabilityReason = `Assessment window has not opened yet. Scheduled to open at ${new Date(assessment.startTime).toLocaleString()}.`;
        }
        else if (assessment.endTime && now > new Date(assessment.endTime)) {
            isAvailable = false;
            unavailabilityReason = 'Assessment submission deadline has passed.';
        }
        return {
            success: true,
            assessment: {
                _id: assessment.id,
                id: assessment.id,
                title: assessment.title,
                code: assessment.code,
                description: assessment.description,
                type: assessment.type,
                status: assessment.status,
                startTime: assessment.startTime,
                endTime: assessment.endTime,
                isAvailable,
                unavailabilityReason,
                durationMinutes: assessment.durationMinutes,
                totalMarks: assessment.totalMarks,
                passingMarks: assessment.passingMarks,
                negativeMarking: assessment.negativeMarking,
                questionCount: assessment.questions.length,
                allowedAttempts,
                proctoring: assessment.proctoring,
                instructions: assessment.instructions,
            },
            attempt: latestAttempt
                ? {
                    _id: latestAttempt.id,
                    status: latestAttempt.status,
                    score: latestAttempt.score,
                    percentage: latestAttempt.percentage,
                    passed: latestAttempt.passed,
                    startedAt: latestAttempt.startedAt,
                    submittedAt: latestAttempt.submittedAt,
                    attemptNumber: latestAttempt.attemptNumber,
                }
                : null,
            canRetake,
            completedAttemptsCount: completedCount,
            highestScore,
        };
    }
    async startStudentAttempt(id, studentUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        if (assessment.status === 'draft' || assessment.status === 'archived') {
            throw new common_1.BadRequestException('This assessment is currently disabled by administrator.');
        }
        const now = new Date();
        if (assessment.startTime && now < new Date(assessment.startTime)) {
            throw new common_1.BadRequestException(`Assessment has not started yet. Scheduled to begin at ${new Date(assessment.startTime).toLocaleString()}.`);
        }
        if (assessment.endTime && now > new Date(assessment.endTime)) {
            throw new common_1.BadRequestException('Assessment window has expired. Submissions are closed.');
        }
        const questionIds = assessment.questions || [];
        const questionsList = questionIds.length > 0
            ? await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(questionIds) }, { mongoId: (0, typeorm_2.In)(questionIds) }],
            })
            : [];
        const studentId = String(studentUser.id || studentUser._id);
        let attempt = await this.attemptRepo.findOne({
            where: [
                { assessmentId: assessment.id, studentId, status: 'in_progress' },
                { assessmentId: id, studentId, status: 'in_progress' },
            ],
        });
        if (!attempt) {
            const previousSubmitted = await this.attemptRepo.find({
                where: [
                    {
                        assessmentId: assessment.id,
                        studentId,
                        status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                    },
                    {
                        assessmentId: id,
                        studentId,
                        status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                    },
                ],
                order: { score: 'DESC' },
            });
            const allowedAttempts = assessment.allowedAttempts !== undefined
                ? assessment.allowedAttempts
                : 1;
            if (allowedAttempts > 0 && previousSubmitted.length >= allowedAttempts) {
                throw new common_1.BadRequestException(allowedAttempts === 1
                    ? 'Only 1 attempt is allowed for this examination and you have already completed it.'
                    : `You have reached the maximum limit of ${allowedAttempts} attempts for this examination.`);
            }
            const highestPreviousScore = previousSubmitted.length > 0 ? previousSubmitted[0].score || 0 : 0;
            const attemptNum = previousSubmitted.length + 1;
            let orderedIds = questionsList.map((q) => q.id);
            if (assessment.shuffleQuestions) {
                orderedIds = [...orderedIds].sort(() => Math.random() - 0.5);
            }
            attempt = this.attemptRepo.create({
                assessmentId: assessment.id,
                studentId,
                studentUid: studentUser.uid || 'UNKNOWN',
                studentName: studentUser.name || 'Student Candidate',
                studentEmail: studentUser.email || '',
                status: 'in_progress',
                startedAt: new Date(),
                attemptNumber: attemptNum,
                highestScore: highestPreviousScore,
                questionOrder: orderedIds,
                maxScore: assessment.totalMarks,
                responses: orderedIds.map((qId) => ({
                    questionId: qId,
                    selectedAnswer: -1,
                    isCorrect: false,
                    marksAwarded: 0,
                    timeSpentSeconds: 0,
                    status: 'unvisited',
                })),
            });
            await this.attemptRepo.save(attempt);
        }
        const qMap = new Map(questionsList.map((q) => [q.id, q]));
        const sanitizedQuestions = (attempt.questionOrder || [])
            .map((qId, index) => {
            const q = qMap.get(String(qId));
            if (!q)
                return null;
            return {
                _id: q.id,
                id: q.id,
                questionIndex: index + 1,
                question: q.question,
                questionType: q.questionType,
                topic: q.topic,
                subtopic: q.subtopic,
                difficulty: q.difficulty,
                marks: q.marks || 1,
                negativeMarks: assessment.negativeMarking ? q.negativeMarks || 0 : 0,
                options: Array.isArray(q.options)
                    ? q.options.map((opt) => typeof opt === 'string' ? opt : opt?.text || String(opt || ''))
                    : [],
                codeSnippet: q.codeSnippet,
                starterCode: q.metadata?.starterCode ||
                    (q.questionType === 'coding' ? q.codeSnippet || '' : ''),
                language: q.language || 'python',
                constraints: Array.isArray(q.constraints) && q.constraints.length > 0
                    ? q.constraints
                    : q.metadata?.constraints || [],
                timeLimit: q.timeLimit || q.metadata?.timeLimit || 2000,
                memoryLimit: q.memoryLimit || q.metadata?.memoryLimit || 256,
                testCases: (q.metadata?.testCases || [])
                    .filter((tc) => !tc.isHidden)
                    .map((tc, tcIdx) => ({
                    id: tc.id || String(tcIdx + 1),
                    input: tc.input || '',
                    expected: tc.output || tc.expected || '',
                    output: tc.output || tc.expected || '',
                    explanation: tc.explanation || '',
                })),
            };
        })
            .filter(Boolean);
        return {
            success: true,
            attemptId: attempt.id,
            _id: attempt.id,
            startedAt: attempt.startedAt,
            durationMinutes: assessment.durationMinutes,
            proctoring: assessment.proctoring,
            questions: sanitizedQuestions,
            savedResponses: attempt.responses,
        };
    }
    async retakeStudentAttempt(id, studentUser) {
        const studentId = String(studentUser.id || studentUser._id);
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        const targetAssessmentId = assessment?.id || id;
        await this.attemptRepo.delete({
            assessmentId: targetAssessmentId,
            studentId,
            status: 'in_progress',
        });
        return this.startStudentAttempt(id, studentUser);
    }
    async saveProgress(id, dto, studentUser) {
        const studentId = String(studentUser.id || studentUser._id);
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        const targetAssessmentId = assessment?.id || id;
        const attempt = await this.attemptRepo.findOne({
            where: {
                assessmentId: targetAssessmentId,
                studentId,
                status: 'in_progress',
            },
        });
        if (!attempt) {
            throw new common_1.BadRequestException('No active attempt found for this assessment.');
        }
        if (dto.responses && Array.isArray(dto.responses)) {
            attempt.responses = dto.responses.map((r) => ({
                questionId: String(r.questionId),
                selectedAnswer: r.selectedAnswer ?? -1,
                code: r.code || '',
                language: r.language || 'python',
                testCasesPassed: r.testCasesPassed || 0,
                totalTestCases: r.totalTestCases || 0,
                isCorrect: false,
                marksAwarded: 0,
                timeSpentSeconds: r.timeSpentSeconds || 0,
                status: r.status ||
                    ((r.selectedAnswer !== undefined && r.selectedAnswer >= 0) ||
                        (r.code && r.code.trim().length > 0)
                        ? 'answered'
                        : 'unvisited'),
            }));
        }
        if (dto.timeSpentSeconds) {
            attempt.timeSpentSeconds = dto.timeSpentSeconds;
        }
        if (dto.violations && Array.isArray(dto.violations)) {
            attempt.violations = dto.violations.map((v) => ({
                type: v.type,
                timestamp: v.timestamp ? new Date(v.timestamp) : new Date(),
                details: v.details || '',
            }));
            attempt.tabSwitchCount = attempt.violations.filter((v) => v.type === 'tab_switch').length;
        }
        await this.attemptRepo.save(attempt);
        return { success: true, message: 'Progress saved successfully.' };
    }
    async submitAttempt(id, dto, studentUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        const studentId = String(studentUser.id || studentUser._id);
        const attempt = await this.attemptRepo.findOne({
            where: [
                { assessmentId: assessment.id, studentId, status: 'in_progress' },
                { assessmentId: id, studentId, status: 'in_progress' },
            ],
            order: { startedAt: 'DESC' },
        });
        if (!attempt) {
            return this.getStudentResult(id, studentUser);
        }
        const questionIds = assessment.questions || [];
        const questions = questionIds.length > 0
            ? await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(questionIds) }, { mongoId: (0, typeorm_2.In)(questionIds) }],
            })
            : [];
        const questionMap = new Map(questions.map((q) => [q.id, q]));
        let totalScore = 0;
        let totalAttempted = 0;
        let totalCorrect = 0;
        let totalWrong = 0;
        let totalSkipped = 0;
        const evaluatedResponses = (dto.responses || []).map((r) => {
            const q = questionMap.get(String(r.questionId));
            if (!q) {
                return {
                    questionId: String(r.questionId),
                    selectedAnswer: r.selectedAnswer ?? -1,
                    isCorrect: false,
                    marksAwarded: 0,
                    timeSpentSeconds: r.timeSpentSeconds || 0,
                    status: 'skipped',
                };
            }
            const isCoding = q.questionType === 'coding' || q.questionType === 'algorithmic';
            let isAttempted = false;
            let isCorrect = false;
            let marksAwarded = 0;
            if (isCoding) {
                const hasCode = r.code && r.code.trim().length > 0;
                if (hasCode) {
                    isAttempted = true;
                    totalAttempted++;
                    const passed = Number(r.testCasesPassed) || 0;
                    const totalTc = Number(r.totalTestCases) || 1;
                    const ratio = Math.min(1, Math.max(0, passed / totalTc));
                    marksAwarded = Math.round(ratio * (q.marks || 5) * 10) / 10;
                    isCorrect = ratio >= 0.99;
                    if (isCorrect)
                        totalCorrect++;
                    else if (ratio > 0)
                        totalCorrect++;
                    else
                        totalWrong++;
                }
                else {
                    totalSkipped++;
                }
            }
            else {
                isAttempted = r.selectedAnswer !== undefined && r.selectedAnswer >= 0;
                if (isAttempted) {
                    totalAttempted++;
                    if (r.selectedAnswer === q.correctAnswer) {
                        isCorrect = true;
                        marksAwarded = q.marks || 1;
                        totalCorrect++;
                    }
                    else {
                        isCorrect = false;
                        const negMarks = assessment.negativeMarking
                            ? q.negativeMarks || 0
                            : 0;
                        marksAwarded = -negMarks;
                        totalWrong++;
                    }
                }
                else {
                    totalSkipped++;
                }
            }
            totalScore += marksAwarded;
            return {
                questionId: q.id,
                selectedAnswer: r.selectedAnswer ?? -1,
                code: r.code || '',
                language: r.language || 'python',
                testCasesPassed: r.testCasesPassed || 0,
                totalTestCases: r.totalTestCases || 0,
                isCorrect,
                marksAwarded,
                timeSpentSeconds: r.timeSpentSeconds || 0,
                status: isAttempted ? 'answered' : 'skipped',
            };
        });
        const finalScore = Math.max(0, Math.round(totalScore * 100) / 100);
        const maxScore = assessment.totalMarks || 1;
        const percentage = Math.round((finalScore / maxScore) * 1000) / 10;
        const passed = finalScore >= (assessment.passingMarks || 0);
        const accuracy = totalAttempted > 0
            ? Math.round((totalCorrect / totalAttempted) * 100)
            : 0;
        const violations = (dto.violations || []).map((v) => ({
            type: v.type,
            timestamp: v.timestamp ? new Date(v.timestamp) : new Date(),
            details: v.details || '',
        }));
        const tabSwitches = violations.filter((v) => v.type === 'tab_switch').length;
        const prevAttempts = await this.attemptRepo.find({
            where: [
                {
                    assessmentId: assessment.id,
                    studentId,
                    status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                    id: (0, typeorm_2.Not)(attempt.id),
                },
            ],
        });
        const prevMax = prevAttempts.length > 0
            ? Math.max(...prevAttempts.map((a) => a.score || 0))
            : 0;
        const finalHighestScore = Math.max(finalScore, prevMax);
        attempt.status = 'submitted';
        attempt.submittedAt = new Date();
        attempt.timeSpentSeconds = dto.timeSpentSeconds || 0;
        attempt.responses = evaluatedResponses;
        attempt.score = finalScore;
        attempt.highestScore = finalHighestScore;
        attempt.maxScore = maxScore;
        attempt.percentage = percentage;
        attempt.passed = passed || prevMax >= (assessment.passingMarks || 0);
        attempt.totalAttempted = totalAttempted;
        attempt.totalCorrect = totalCorrect;
        attempt.totalWrong = totalWrong;
        attempt.totalSkipped = totalSkipped;
        attempt.accuracy = accuracy;
        attempt.tabSwitchCount = tabSwitches;
        attempt.violations = violations;
        await this.attemptRepo.save(attempt);
        return {
            success: true,
            message: 'Assessment submitted successfully.',
            result: {
                score: finalScore,
                highestScore: finalHighestScore,
                maxScore,
                percentage,
                passed: attempt.passed,
                accuracy,
                totalAttempted,
                totalCorrect,
                totalWrong,
                totalSkipped,
                timeSpentSeconds: attempt.timeSpentSeconds,
                tabSwitchCount: tabSwitches,
            },
        };
    }
    async getStudentResult(id, studentUser) {
        const assessment = await this.assessmentRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Assessment not found');
        }
        const studentId = String(studentUser.id || studentUser._id);
        const attempt = await this.attemptRepo.findOne({
            where: [
                {
                    assessmentId: assessment.id,
                    studentId,
                    status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                },
                {
                    assessmentId: id,
                    studentId,
                    status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                },
            ],
            order: { score: 'DESC', submittedAt: 'DESC' },
        });
        if (!attempt) {
            throw new common_1.BadRequestException('No completed assessment attempt found.');
        }
        const questionIds = assessment.questions || [];
        const questions = questionIds.length > 0
            ? await this.questionRepo.find({
                where: [{ id: (0, typeorm_2.In)(questionIds) }, { mongoId: (0, typeorm_2.In)(questionIds) }],
            })
            : [];
        const questionMap = new Map(questions.map((q) => [q.id, q]));
        const topicStats = {};
        const reviewQuestions = (attempt.responses || [])
            .map((resp) => {
            const q = questionMap.get(String(resp.questionId));
            if (!q)
                return null;
            const topic = q.topic || 'General';
            if (!topicStats[topic]) {
                topicStats[topic] = { total: 0, correct: 0, marks: 0 };
            }
            topicStats[topic].total++;
            if (resp.isCorrect) {
                topicStats[topic].correct++;
            }
            topicStats[topic].marks += resp.marksAwarded;
            return {
                questionId: q.id,
                _id: q.id,
                question: q.question,
                options: q.options,
                selectedAnswer: resp.selectedAnswer,
                correctAnswer: assessment.allowReview ? q.correctAnswer : undefined,
                explanation: assessment.allowReview ? q.explanation : undefined,
                isCorrect: resp.isCorrect,
                marksAwarded: resp.marksAwarded,
                topic: q.topic,
                difficulty: q.difficulty,
            };
        })
            .filter(Boolean);
        const topicBreakdown = Object.entries(topicStats).map(([topic, stat]) => ({
            topic,
            total: stat.total,
            correct: stat.correct,
            accuracy: Math.round((stat.correct / stat.total) * 100),
            marksEarned: stat.marks,
        }));
        const submittedCount = await this.attemptRepo.count({
            where: [
                {
                    assessmentId: assessment.id,
                    studentId,
                    status: (0, typeorm_2.In)(['submitted', 'auto_submitted']),
                },
            ],
        });
        return {
            success: true,
            canRetake: assessment.allowedAttempts === 0
                ? true
                : submittedCount < (assessment.allowedAttempts !== undefined ? assessment.allowedAttempts : 1),
            assessment: {
                title: assessment.title,
                code: assessment.code,
                totalMarks: assessment.totalMarks,
                passingMarks: assessment.passingMarks,
                allowReview: assessment.allowReview,
                allowedAttempts: assessment.allowedAttempts !== undefined
                    ? assessment.allowedAttempts
                    : 1,
            },
            attempt: {
                _id: attempt.id,
                score: attempt.score,
                maxScore: attempt.maxScore,
                percentage: attempt.percentage,
                passed: attempt.passed,
                accuracy: attempt.accuracy,
                totalAttempted: attempt.totalAttempted,
                totalCorrect: attempt.totalCorrect,
                totalWrong: attempt.totalWrong,
                totalSkipped: attempt.totalSkipped,
                timeSpentSeconds: attempt.timeSpentSeconds,
                startedAt: attempt.startedAt,
                submittedAt: attempt.submittedAt,
                tabSwitchCount: attempt.tabSwitchCount,
            },
            topicBreakdown,
            reviewQuestions: assessment.allowReview ? reviewQuestions : [],
        };
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(1, (0, typeorm_1.InjectRepository)(assessment_attempt_entity_1.AssessmentAttempt)),
    __param(2, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(3, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AssessmentsService);
//# sourceMappingURL=assessments.service.js.map