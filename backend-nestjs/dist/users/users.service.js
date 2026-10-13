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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const problem_entity_1 = require("../database/entities/problem.entity");
let UsersService = class UsersService {
    userRepository;
    problemRepository;
    constructor(userRepository, problemRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
    }
    getTier(xp) {
        if (xp >= 50000)
            return 'Grandmaster';
        if (xp >= 30000)
            return 'Master';
        if (xp >= 15000)
            return 'Expert';
        if (xp >= 8000)
            return 'Specialist';
        if (xp >= 3000)
            return 'Competent';
        if (xp >= 1000)
            return 'Learner';
        return 'Beginner';
    }
    async getLeaderboard(limit = 50) {
        const users = await this.userRepository.find({
            where: { isActive: true },
            order: { stats: { xp: 'DESC' } },
            take: limit,
        });
        const leaderboard = users.map((u, idx) => ({
            rank: idx + 1,
            _id: u.id,
            name: u.name,
            username: u.username,
            uid: u.uid,
            avatar: u.avatar || '',
            xp: u.stats?.xp ?? 0,
            totalSolved: u.stats?.totalSolved ?? 0,
            currentStreak: u.stats?.currentStreak ?? 0,
            tier: this.getTier(u.stats?.xp ?? 0),
            department: u.studentProfile?.department || '',
            batch: u.studentProfile?.batch || '',
        }));
        return { success: true, leaderboard, total: leaderboard.length };
    }
    async getPublicProfile(identifier) {
        let user;
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
        if (isUuid) {
            user = await this.userRepository.findOne({ where: { id: identifier } });
        }
        else {
            user = await this.userRepository.findOne({ where: { username: identifier.toLowerCase() } });
        }
        if (!user)
            return null;
        let solvedProblemsDetails = [];
        if (user.solvedProblems && user.solvedProblems.length > 0) {
            solvedProblemsDetails = await this.problemRepository.find({
                where: { slug: (0, typeorm_2.In)(user.solvedProblems) },
                select: { slug: true, title: true, difficulty: true, tags: true, stats: true },
            });
            solvedProblemsDetails = solvedProblemsDetails.map(p => ({
                slug: p.slug,
                title: p.title,
                difficulty: p.difficulty,
                tags: p.tags,
                acceptanceRate: p.stats?.acceptanceRate || 0,
            }));
        }
        return {
            ...user,
            solvedProblemsDetails,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(problem_entity_1.Problem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map