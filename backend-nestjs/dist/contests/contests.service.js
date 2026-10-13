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
exports.ContestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contest_entity_1 = require("../database/entities/contest.entity");
const contest_attempt_entity_1 = require("../database/entities/contest-attempt.entity");
let ContestsService = class ContestsService {
    contestRepo;
    attemptRepo;
    constructor(contestRepo, attemptRepo) {
        this.contestRepo = contestRepo;
        this.attemptRepo = attemptRepo;
    }
    async getContests() {
        const list = await this.contestRepo.find({
            where: { isPublished: true, isPrivate: false },
            order: { startTime: 'DESC' },
        });
        return list.map((c) => ({ ...c, _id: c.id }));
    }
    async getContest(slug) {
        const contest = await this.contestRepo.findOne({
            where: { slug, isPublished: true },
        });
        if (!contest)
            throw new common_1.NotFoundException('Contest not found');
        return { ...contest, _id: contest.id };
    }
    async register(contestId, userId, password) {
        const contest = await this.contestRepo.findOne({
            where: [{ id: contestId }, { mongoId: contestId }],
        });
        if (!contest)
            throw new common_1.NotFoundException('Contest not found');
        if (contest.isPrivate && contest.password !== password) {
            throw new Error('Invalid contest password');
        }
        const participants = Array.isArray(contest.participants) ? contest.participants : [];
        if (!participants.includes(userId)) {
            contest.participants = [...participants, userId];
            await this.contestRepo.save(contest);
        }
        return { success: true };
    }
};
exports.ContestsService = ContestsService;
exports.ContestsService = ContestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contest_entity_1.Contest)),
    __param(1, (0, typeorm_1.InjectRepository)(contest_attempt_entity_1.ContestAttempt)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ContestsService);
//# sourceMappingURL=contests.service.js.map