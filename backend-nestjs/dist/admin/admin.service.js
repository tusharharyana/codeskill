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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const problem_metadata_entity_1 = require("../database/entities/problem-metadata.entity");
const problem_statement_entity_1 = require("../database/entities/problem-statement.entity");
const problem_config_entity_1 = require("../database/entities/problem-config.entity");
const problem_testcase_entity_1 = require("../database/entities/problem-testcase.entity");
const contest_entity_1 = require("../database/entities/contest.entity");
const contest_attempt_entity_1 = require("../database/entities/contest-attempt.entity");
const company_entity_1 = require("../database/entities/company.entity");
const university_entity_1 = require("../database/entities/university.entity");
const submission_entity_1 = require("../database/entities/submission.entity");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const question_entity_1 = require("../database/entities/question.entity");
const cache_service_1 = require("../redis/cache.service");
let AdminService = class AdminService {
    userRepo;
    problemModel;
    statementModel;
    configModel;
    testCaseModel;
    contestModel;
    contestAttemptModel;
    companyModel;
    universityModel;
    submissionModel;
    assessmentModel;
    questionModel;
    cacheService;
    constructor(userRepo, problemModel, statementModel, configModel, testCaseModel, contestModel, contestAttemptModel, companyModel, universityModel, submissionModel, assessmentModel, questionModel, cacheService) {
        this.userRepo = userRepo;
        this.problemModel = problemModel;
        this.statementModel = statementModel;
        this.configModel = configModel;
        this.testCaseModel = testCaseModel;
        this.contestModel = contestModel;
        this.contestAttemptModel = contestAttemptModel;
        this.companyModel = companyModel;
        this.universityModel = universityModel;
        this.submissionModel = submissionModel;
        this.assessmentModel = assessmentModel;
        this.questionModel = questionModel;
        this.cacheService = cacheService;
    }
    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalUsers, totalProblems, totalContests, totalSubmissions, totalAssessments, totalQuestions, activeToday, recentUsers, recentSubmissions, recentAssessments,] = await Promise.all([
            this.userRepo.count(),
            this.problemModel.count(),
            this.contestModel.count(),
            this.submissionModel.count(),
            this.assessmentModel.count().catch(() => 0),
            this.questionModel.count().catch(() => 0),
            this.userRepo
                .count({ where: { updatedAt: (0, typeorm_2.MoreThanOrEqual)(today) } })
                .catch(() => 0),
            this.userRepo.find({
                order: { createdAt: 'DESC' },
                take: 6,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    authProvider: true,
                },
            }),
            this.submissionModel.find({
                order: { createdAt: 'DESC' },
                take: 6,
                relations: { user: true },
            }),
            this.assessmentModel
                .find({
                order: { createdAt: 'DESC' },
                take: 6,
                select: {
                    id: true,
                    title: true,
                    status: true,
                    durationMinutes: true,
                    allowedAttempts: true,
                    createdAt: true,
                },
            })
                .catch(() => []),
        ]);
        return {
            stats: {
                totalUsers,
                totalProblems,
                totalContests,
                totalSubmissions,
                totalAssessments,
                totalQuestions,
                activeToday: Math.max(activeToday, 1),
            },
            recentActivity: {
                users: recentUsers.map((u) => ({ ...u, _id: u.id })),
                submissions: recentSubmissions.map((s) => ({
                    ...s,
                    _id: s.id,
                    user: s.user ? { ...s.user, _id: s.user.id } : null,
                })),
                assessments: recentAssessments.map((a) => ({ ...a, _id: a.id })),
            },
        };
    }
    async getUsers(page = 1, limit = 50, search = '', adminsOnly = false) {
        const skip = (page - 1) * limit;
        const qb = this.userRepo.createQueryBuilder('user');
        if (search && search.trim()) {
            const s = `%${search.trim()}%`;
            qb.where('(user.name ILIKE :s OR user.email ILIKE :s)', { s });
        }
        if (adminsOnly) {
            qb.andWhere('(user.isAdmin = true OR user.role = :adminRole)', {
                adminRole: 'ADMIN',
            });
        }
        qb.orderBy('user.createdAt', 'DESC').skip(skip).take(limit);
        const [rawUsers, total] = await qb.getManyAndCount();
        const users = rawUsers.map((u) => {
            const { password, ...rest } = u;
            return { ...rest, _id: u.id };
        });
        return {
            success: true,
            users,
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    async updateUserRole(id, roleData) {
        const user = await this.userRepo.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        Object.assign(user, roleData);
        await this.userRepo.save(user);
        const { password, ...rest } = user;
        return { ...rest, _id: user.id };
    }
    async getReport(userId) {
        const user = await this.userRepo.findOne({
            where: [{ id: userId }, { mongoId: userId }],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const submissions = await this.submissionModel.find({
            where: [{ userId: user.id }, { userId: userId }],
            order: { createdAt: 'DESC' },
        });
        const stats = {
            totalSubmissions: submissions.length,
            accepted: submissions.filter((s) => s.status === 'Accepted').length,
        };
        const { password, ...userWithoutPassword } = user;
        return {
            report: {
                user: { ...userWithoutPassword, _id: user.id },
                stats,
                recentSubmissions: submissions.slice(0, 10).map((s) => ({
                    ...s,
                    _id: s.id,
                })),
            },
        };
    }
    async getContests(page = 1, limit = 20, search = '') {
        const skip = (page - 1) * limit;
        const qb = this.contestModel.createQueryBuilder('contest');
        if (search && search.trim()) {
            qb.where('contest.title ILIKE :s', { s: `%${search.trim()}%` });
        }
        qb.orderBy('contest.createdAt', 'DESC').skip(skip).take(limit);
        const [contests, total] = await qb.getManyAndCount();
        return {
            contests: contests.map((c) => ({ ...c, _id: c.id })),
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    contestLookup(id) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
            return [{ id }, { mongoId: id }];
        }
        if (/^[0-9a-f]{24}$/i.test(id))
            return [{ mongoId: id }];
        throw new common_1.BadRequestException('Invalid contest ID');
    }
    async getContestById(id) {
        const contest = await this.contestModel.findOne({
            where: this.contestLookup(id),
        });
        if (!contest)
            throw new common_1.NotFoundException('Contest not found');
        return { ...contest, _id: contest.id };
    }
    async getContestResults(contestId) {
        const contests = contestId
            ? [await this.contestModel.findOne({ where: this.contestLookup(contestId) })]
            : await this.contestModel.find({ order: { endTime: 'DESC' } });
        const availableContests = contests.filter((contest) => !!contest);
        if (contestId && !availableContests.length)
            throw new common_1.NotFoundException('Contest not found');
        const results = await Promise.all(availableContests.map(async (contest) => {
            const attempts = await this.contestAttemptModel.find({
                where: { contest_id: contest.id }, relations: { user: true }, order: { startedAt: 'ASC' },
            });
            const participantIds = [...new Set([...(contest.participants || []), ...attempts.map((attempt) => attempt.user_id)])].filter(Boolean);
            const users = participantIds.length
                ? await this.userRepo.createQueryBuilder('user')
                    .where('user.id IN (:...participantIds) OR user.mongoId IN (:...participantIds)', { participantIds })
                    .getMany()
                : [];
            const userById = new Map();
            users.forEach((user) => { userById.set(user.id, user); if (user.mongoId)
                userById.set(user.mongoId, user); });
            const submissions = contest.problems?.length
                ? await this.submissionModel.createQueryBuilder('submission')
                    .where('submission.problemId IN (:...problemIds)', { problemIds: contest.problems })
                    .andWhere('submission.createdAt >= :startTime', { startTime: contest.startTime })
                    .andWhere('submission.createdAt <= :endTime', { endTime: contest.endTime })
                    .getMany()
                : [];
            const submissionsByUser = new Map();
            submissions.forEach((submission) => submissionsByUser.set(submission.userId, [...(submissionsByUser.get(submission.userId) || []), submission]));
            const participants = participantIds.map((id) => {
                const participantSubmissions = submissionsByUser.get(id) || [];
                const attempt = attempts.find((entry) => entry.user_id === id);
                const user = userById.get(id);
                return {
                    id, name: user?.name || 'Unknown student', email: user?.email || '—', uid: user?.uid || '—',
                    status: attempt?.status || 'Registered', startedAt: attempt?.startedAt || null, submittedAt: attempt?.submittedAt || null,
                    warnings: attempt?.warnings || 0,
                    solved: new Set(participantSubmissions.filter((submission) => submission.status === 'Accepted').map((submission) => submission.problemId)).size,
                    submissions: participantSubmissions.length,
                };
            }).sort((left, right) => right.solved - left.solved || left.submissions - right.submissions || left.name.localeCompare(right.name));
            return { id: contest.id, _id: contest.id, title: contest.title, slug: contest.slug, startTime: contest.startTime, endTime: contest.endTime, totalProblems: contest.problems?.length || 0, participants: participants.map((participant, index) => ({ ...participant, rank: index + 1 })) };
        }));
        return { contests: results };
    }
    async deleteContest(id) {
        const contest = await this.contestModel.findOne({
            where: this.contestLookup(id),
        });
        if (!contest)
            throw new common_1.NotFoundException('Contest not found');
        await this.contestModel.remove(contest);
        return { success: true, message: 'Contest deleted' };
    }
    validateContestPayload(body) {
        const title = String(body?.title || '').trim();
        const slug = String(body?.slug || '')
            .trim()
            .toLowerCase();
        const description = String(body?.description || '').trim();
        if (!title)
            throw new common_1.BadRequestException('Contest title is required');
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
            throw new common_1.BadRequestException('Slug may only contain lowercase letters, numbers and hyphens');
        }
        if (!description) {
            throw new common_1.BadRequestException('Contest description is required');
        }
        const startTime = new Date(body?.startTime);
        const endTime = new Date(body?.endTime);
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            throw new common_1.BadRequestException('Valid start and end times are required');
        }
        if (endTime <= startTime) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const problems = Array.isArray(body?.problems) ? body.problems : [];
        if (problems.length === 0) {
            throw new common_1.BadRequestException('Select at least one problem');
        }
        if (body?.isPrivate && !String(body?.password || '').trim()) {
            throw new common_1.BadRequestException('Private contests require a password');
        }
        return {
            title,
            slug,
            description,
            startTime,
            endTime,
            problems,
            isPrivate: !!body?.isPrivate,
            password: body?.isPrivate ? String(body.password).trim() : undefined,
            isPublished: !!body?.isPublished,
        };
    }
    async createContest(body) {
        const data = this.validateContestPayload(body);
        const existing = await this.contestModel.findOne({
            where: { slug: data.slug },
        });
        if (existing) {
            throw new common_1.ConflictException(`Slug '${data.slug}' is already in use`);
        }
        const contest = this.contestModel.create(data);
        await this.contestModel.save(contest);
        return {
            success: true,
            message: 'Contest created',
            contest: { ...contest, _id: contest.id },
            shareUrl: `/contests/${contest.slug}`,
        };
    }
    async updateContest(id, body) {
        const data = this.validateContestPayload(body);
        const contest = await this.contestModel.findOne({
            where: this.contestLookup(id),
        });
        if (!contest)
            throw new common_1.NotFoundException('Contest not found');
        const clash = await this.contestModel.findOne({
            where: { slug: data.slug },
        });
        if (clash && clash.id !== contest.id) {
            throw new common_1.ConflictException(`Slug '${data.slug}' is already in use`);
        }
        Object.assign(contest, data);
        await this.contestModel.save(contest);
        return {
            success: true,
            message: 'Contest updated',
            contest: { ...contest, _id: contest.id },
        };
    }
    async getProblems(page = 1, limit = 20, search = '') {
        const skip = (page - 1) * limit;
        const qb = this.problemModel.createQueryBuilder('p');
        if (search && search.trim()) {
            qb.where('p.title ILIKE :s', { s: `%${search.trim()}%` });
        }
        qb.orderBy('p.createdAt', 'DESC').skip(skip).take(limit);
        const [problems, total] = await qb.getManyAndCount();
        return {
            problems: problems.map((p) => ({ ...p, _id: p.id })),
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    async getProblemById(id) {
        const problem = await this.problemModel.findOne({
            where: [{ id }, { mongoId: id }],
            relations: { statement: true, config: true, testCases: true },
        });
        if (!problem)
            throw new common_1.NotFoundException('Problem not found');
        return { ...problem, _id: problem.id };
    }
    async deleteProblem(id) {
        const problem = await this.problemModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!problem)
            throw new common_1.NotFoundException('Problem not found');
        await this.problemModel.remove(problem);
        await this.cacheService.invalidatePrefix('problems:');
        if (problem.slug) {
            await this.cacheService.invalidatePrefix(`problem:${problem.slug}`);
        }
        return { success: true, message: 'Problem deleted' };
    }
    async createProblem(payload, userId) {
        const { metadata, languages, execution, statement, sampleExamples, starterCode, referenceSolution, testCases, customChecker, publishing, } = payload;
        const visibility = publishing?.visibility ||
            metadata?.visibility ||
            (publishing?.publishImmediately
                ? 'Published'
                : publishing?.saveAsDraft
                    ? 'Draft'
                    : 'Draft');
        const newProblem = this.problemModel.create({
            ...metadata,
            visibility,
            author_id: userId || null,
        });
        await this.problemModel.save(newProblem);
        const newStatement = this.statementModel.create({
            metadata_id: newProblem.id,
            ...statement,
            samples: sampleExamples || [],
        });
        const newConfig = this.configModel.create({
            metadata_id: newProblem.id,
            supportedLanguages: languages || [],
            timeLimit: execution?.timeLimit || 2000,
            memoryLimit: execution?.memoryLimit || 256,
            cpuLimit: execution?.cpuLimit || 1,
            executionMode: execution?.executionMode || 'standard',
            functionSignature: execution?.functionSignature,
            exactOutput: execution?.exactOutput === true,
            starterCode: starterCode || {},
            referenceSolution: referenceSolution || {},
            hasCustomChecker: customChecker?.hasCustomChecker || false,
            customCheckerCode: customChecker?.customCheckerCode || {},
        });
        const newTestCase = this.testCaseModel.create({
            metadata_id: newProblem.id,
            cases: testCases?.cases || [],
        });
        await Promise.all([
            this.statementModel.save(newStatement),
            this.configModel.save(newConfig),
            this.testCaseModel.save(newTestCase),
        ]);
        await this.cacheService.invalidatePrefix('problems:');
        return {
            success: true,
            problem: {
                ...newProblem,
                _id: newProblem.id,
                statement: newStatement,
                config: newConfig,
                testCases: newTestCase,
            },
        };
    }
    async updateProblem(id, payload) {
        const { metadata, languages, execution, statement, sampleExamples, starterCode, referenceSolution, testCases, customChecker, publishing, } = payload;
        const problem = await this.problemModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!problem)
            throw new common_1.NotFoundException('Problem not found');
        const visibility = publishing?.visibility ||
            metadata?.visibility ||
            (publishing?.publishImmediately
                ? 'Published'
                : publishing?.saveAsDraft
                    ? 'Draft'
                    : undefined);
        if (metadata) {
            Object.assign(problem, metadata);
        }
        if (visibility) {
            problem.visibility = visibility;
        }
        await this.problemModel.save(problem);
        if (statement || sampleExamples) {
            let stmt = await this.statementModel.findOne({
                where: [{ metadata_id: problem.id }, { metadata_id: id }],
            });
            if (!stmt) {
                stmt = this.statementModel.create({ metadata_id: problem.id });
            }
            Object.assign(stmt, statement || {}, {
                samples: sampleExamples || [],
            });
            await this.statementModel.save(stmt);
        }
        if (languages ||
            execution ||
            starterCode ||
            referenceSolution ||
            customChecker) {
            let conf = await this.configModel.findOne({
                where: [{ metadata_id: problem.id }, { metadata_id: id }],
            });
            if (!conf) {
                conf = this.configModel.create({ metadata_id: problem.id });
            }
            if (languages)
                conf.supportedLanguages = languages;
            if (execution?.timeLimit)
                conf.timeLimit = execution.timeLimit;
            if (execution?.memoryLimit)
                conf.memoryLimit = execution.memoryLimit;
            if (execution?.cpuLimit)
                conf.cpuLimit = execution.cpuLimit;
            if (execution?.executionMode)
                conf.executionMode = execution.executionMode;
            if (execution?.functionSignature !== undefined)
                conf.functionSignature = execution.functionSignature;
            if (execution?.exactOutput !== undefined)
                conf.exactOutput = execution.exactOutput;
            if (starterCode)
                conf.starterCode = starterCode;
            if (referenceSolution)
                conf.referenceSolution = referenceSolution;
            if (customChecker?.hasCustomChecker !== undefined)
                conf.hasCustomChecker = customChecker.hasCustomChecker;
            if (customChecker?.customCheckerCode)
                conf.customCheckerCode = customChecker.customCheckerCode;
            await this.configModel.save(conf);
        }
        if (testCases?.cases) {
            let tc = await this.testCaseModel.findOne({
                where: [{ metadata_id: problem.id }, { metadata_id: id }],
            });
            if (!tc) {
                tc = this.testCaseModel.create({ metadata_id: problem.id });
            }
            tc.cases = testCases.cases;
            await this.testCaseModel.save(tc);
        }
        await this.cacheService.invalidatePrefix('problems:');
        if (problem.slug) {
            await this.cacheService.invalidatePrefix(`problem:${problem.slug}`);
        }
        return { success: true, problem: { ...problem, _id: problem.id } };
    }
    async getCompanies(page = 1, limit = 20, search = '') {
        const skip = (page - 1) * limit;
        const qb = this.companyModel.createQueryBuilder('c');
        if (search && search.trim()) {
            const s = `%${search.trim()}%`;
            qb.where('(c.name ILIKE :s OR c.domain ILIKE :s)', { s });
        }
        qb.orderBy('c.createdAt', 'DESC').skip(skip).take(limit);
        const [companies, total] = await qb.getManyAndCount();
        return {
            companies: companies.map((c) => ({ ...c, _id: c.id })),
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    async toggleCompanyVerification(id) {
        const company = await this.companyModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        company.isVerified = !company.isVerified;
        await this.companyModel.save(company);
        return { success: true, isVerified: company.isVerified };
    }
    async deleteCompany(id) {
        const company = await this.companyModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        await this.companyModel.remove(company);
        return { success: true, message: 'Company deleted' };
    }
    async getUniversities(page = 1, limit = 20, search = '') {
        const skip = (page - 1) * limit;
        const qb = this.universityModel.createQueryBuilder('u');
        if (search && search.trim()) {
            const s = `%${search.trim()}%`;
            qb.where('(u.name ILIKE :s OR u.domain ILIKE :s)', { s });
        }
        qb.orderBy('u.createdAt', 'DESC').skip(skip).take(limit);
        const [universities, total] = await qb.getManyAndCount();
        return {
            universities: universities.map((u) => ({ ...u, _id: u.id })),
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
    async createUniversity(data) {
        const existing = await this.universityModel.findOne({
            where: { name: data.name },
        });
        if (existing) {
            return {
                success: false,
                message: 'A university with this name already exists',
            };
        }
        const university = this.universityModel.create({
            name: data.name,
            domain: data.domain || '',
            website: data.website || '',
            location: data.location || '',
            contactEmail: data.contactEmail || '',
            isVerified: true,
        });
        await this.universityModel.save(university);
        return {
            success: true,
            university: { ...university, _id: university.id },
        };
    }
    async toggleUniversityVerification(id) {
        const university = await this.universityModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!university)
            throw new common_1.NotFoundException('University not found');
        university.isVerified = !university.isVerified;
        await this.universityModel.save(university);
        return { success: true, isVerified: university.isVerified };
    }
    async deleteUniversity(id) {
        const university = await this.universityModel.findOne({
            where: [{ id }, { mongoId: id }],
        });
        if (!university)
            throw new common_1.NotFoundException('University not found');
        await this.universityModel.remove(university);
        return { success: true, message: 'University deleted' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(problem_metadata_entity_1.ProblemMetadata)),
    __param(2, (0, typeorm_1.InjectRepository)(problem_statement_entity_1.ProblemStatement)),
    __param(3, (0, typeorm_1.InjectRepository)(problem_config_entity_1.ProblemConfig)),
    __param(4, (0, typeorm_1.InjectRepository)(problem_testcase_entity_1.ProblemTestCase)),
    __param(5, (0, typeorm_1.InjectRepository)(contest_entity_1.Contest)),
    __param(6, (0, typeorm_1.InjectRepository)(contest_attempt_entity_1.ContestAttempt)),
    __param(7, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(8, (0, typeorm_1.InjectRepository)(university_entity_1.University)),
    __param(9, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __param(10, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(11, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cache_service_1.CacheService])
], AdminService);
//# sourceMappingURL=admin.service.js.map