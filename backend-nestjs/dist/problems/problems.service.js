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
exports.ProblemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const problem_entity_1 = require("../database/entities/problem.entity");
const cache_service_1 = require("../redis/cache.service");
let ProblemsService = class ProblemsService {
    problemRepository;
    cacheService;
    constructor(problemRepository, cacheService) {
        this.problemRepository = problemRepository;
        this.cacheService = cacheService;
    }
    async getProblems(query) {
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;
        const difficulty = query.difficulty || 'all';
        const category = query.category || 'all';
        const search = query.search || 'none';
        const cacheKey = `problems:${page}:${limit}:${difficulty}:${category}:${search}`;
        const cachedData = await this.cacheService.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const qb = this.problemRepository.createQueryBuilder('problem');
        qb.where(new typeorm_2.Brackets((qbInner) => {
            qbInner.where('problem.visibility IN (:...vis)', { vis: ['Published', 'published', 'Public', 'public'] })
                .orWhere('problem.visibility IS NULL');
        }));
        if (difficulty !== 'all') {
            qb.andWhere('problem.difficulty = :difficulty', { difficulty });
        }
        if (category !== 'All Topics' && category !== 'all') {
            qb.andWhere(`EXISTS (SELECT 1 FROM unnest(problem.tags) AS t WHERE t ILIKE :category)`, { category: `%${category}%` });
        }
        if (search !== 'none' && search.trim()) {
            const s = search.trim();
            qb.andWhere(new typeorm_2.Brackets((searchQb) => {
                searchQb.where('problem.title ILIKE :search', { search: `%${s}%` })
                    .orWhere('problem.slug ILIKE :search', { search: `%${s}%` })
                    .orWhere(`EXISTS (SELECT 1 FROM unnest(problem.tags) AS t WHERE t ILIKE :search)`, { search: `%${s}%` });
            }));
        }
        const [problems, total] = await qb
            .select([
            'problem.id',
            'problem.title',
            'problem.slug',
            'problem.difficulty',
            'problem.tags',
            'problem.stats',
            'problem.createdAt',
            'problem.updatedAt'
        ])
            .orderBy('problem.createdAt', 'DESC')
            .addOrderBy('problem.id', 'DESC')
            .skip(startIndex)
            .take(limit)
            .getManyAndCount();
        const mappedProblems = problems.map(p => ({
            ...p,
            categories: p.tags
        }));
        const result = {
            count: problems.length,
            total,
            page,
            pages: Math.ceil(total / limit) || 1,
            totalPages: Math.ceil(total / limit) || 1,
            data: mappedProblems,
        };
        await this.cacheService.set(cacheKey, result, 300);
        return result;
    }
    async getProblemBySlug(slug) {
        const cacheKey = `problem:${slug}`;
        const cachedData = await this.cacheService.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        let problem = await this.problemRepository.createQueryBuilder('problem')
            .where('problem.slug = :slug', { slug })
            .andWhere(new typeorm_2.Brackets((qbInner) => {
            qbInner.where('problem.visibility IN (:...vis)', { vis: ['Published', 'published', 'Public', 'public'] })
                .orWhere('problem.visibility IS NULL');
        }))
            .getOne();
        if (!problem) {
            problem = await this.problemRepository.findOne({ where: { slug } });
        }
        if (!problem) {
            throw new common_1.NotFoundException('Problem not found');
        }
        if (problem.starterCode && problem.starterCode['referenceSolution']) {
            delete problem.starterCode['referenceSolution'];
        }
        if (problem.testCases && Array.isArray(problem.testCases)) {
            problem.testCases = problem.testCases.filter(c => !c.isHidden);
        }
        const mappedProblem = {
            ...problem,
            statement: {
                description: problem.description,
                inputFormat: problem.inputFormat,
                outputFormat: problem.outputFormat,
                constraints: problem.constraints,
                examples: problem.examples,
                hints: problem.hints,
            },
            config: {
                timeLimit: problem.timeLimit,
                memoryLimit: problem.memoryLimit,
                supportedLanguages: problem.supportedLanguages,
                difficulty: problem.difficulty,
            },
            testCases: {
                cases: problem.testCases,
            }
        };
        await this.cacheService.set(cacheKey, { data: mappedProblem }, 3600);
        return { data: mappedProblem };
    }
};
exports.ProblemsService = ProblemsService;
exports.ProblemsService = ProblemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(problem_entity_1.Problem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cache_service_1.CacheService])
], ProblemsService);
//# sourceMappingURL=problems.service.js.map