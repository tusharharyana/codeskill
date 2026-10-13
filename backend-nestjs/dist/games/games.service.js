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
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cognitive_game_attempt_entity_1 = require("../database/entities/cognitive-game-attempt.entity");
const cognitive_game_entity_1 = require("../database/entities/cognitive-game.entity");
const game_kind_registry_1 = require("./game-kind-registry");
let GamesService = class GamesService {
    attempts;
    games;
    constructor(attempts, games) {
        this.attempts = attempts;
        this.games = games;
    }
    async onModuleInit() {
        const presets = [
            { slug: 'deductive', title: 'Deductive Challenge', shortDescription: 'Use clues to reach a logical conclusion.', description: 'Choose the conclusion supported by the facts.', color: 'violet', icon: '∴', durationSeconds: 180, rounds: [{ kind: 'choice', prompt: 'All architects are problem solvers. What must be true?', choices: ['All architects are musicians', 'All architects are problem solvers', 'No architects solve problems'], answer: 1 }, { kind: 'choice', prompt: 'Mira finished before Dev. Dev before Lee. Who finished last?', choices: ['Mira', 'Dev', 'Lee'], answer: 2 }], isPublished: true },
            { slug: 'switch', title: 'Switch Challenge', shortDescription: 'Change rules quickly and stay accurate.', description: 'Classify each prompt using its rule.', color: 'cyan', icon: '⇄', durationSeconds: 120, rounds: [{ kind: 'choice', instruction: 'NUMBER RULE · Choose ODD or EVEN', prompt: '17', choices: ['ODD', 'EVEN'], answer: 0 }, { kind: 'choice', instruction: 'LETTER RULE · Choose VOWEL or CONSONANT', prompt: 'M', choices: ['VOWEL', 'CONSONANT'], answer: 1 }], isPublished: true },
            { slug: 'grid', title: 'Grid Challenge', shortDescription: 'Remember the order of a flashing tile sequence.', description: 'Watch the tiles light up, then reproduce their sequence.', color: 'emerald', icon: '▦', durationSeconds: 120, rounds: [{ kind: 'grid', prompt: 'Repeat the highlighted tiles in order.', cells: [0, 4, 8] }, { kind: 'grid', prompt: 'Repeat the highlighted tiles in order.', cells: [2, 5, 1, 7] }], isPublished: true },
            { slug: 'inductive', title: 'Inductive Challenge', shortDescription: 'Spot a pattern and predict what comes next.', description: 'Find the rule behind each sequence.', color: 'amber', icon: '⌁', durationSeconds: 180, rounds: [{ kind: 'choice', prompt: '2, 4, 8, 16, ?', choices: ['18', '24', '32', '64'], answer: 2 }, { kind: 'choice', prompt: '3, 6, 11, 18, ?', choices: ['25', '27', '29', '36'], answer: 1 }], isPublished: true },
            { slug: 'motion', title: 'Motion Challenge', shortDescription: 'Track a moving marker across changing lanes.', description: 'Follow the marker as it jumps between lanes.', color: 'rose', icon: '➜', durationSeconds: 120, rounds: [{ kind: 'motion', prompt: 'Track the marker. Which lane does it finish in?', path: [0, 2, 1, 3, 2] }, { kind: 'motion', prompt: 'Follow the marker. Where does it stop?', path: [3, 1, 0, 2, 1, 3] }], isPublished: true },
        ];
        for (const preset of presets) {
            if (!(await this.games.findOne({ where: { slug: preset.slug } })))
                await this.games.save(this.games.create(preset));
        }
    }
    listPublished() { return this.games.find({ where: { isPublished: true, isDeleted: false }, order: { createdAt: 'ASC' } }); }
    async getPublished(slug) {
        const game = await this.games.findOne({ where: { slug, isPublished: true, isDeleted: false } });
        if (!game)
            throw new common_1.NotFoundException('Game not found');
        return game;
    }
    listAdmin() { return this.games.find({ where: { isDeleted: false }, order: { updatedAt: 'DESC' } }); }
    async createGame(dto) { this.validateRounds(dto.rounds); return this.games.save(this.games.create(dto)); }
    async updateGame(id, dto) {
        const game = await this.games.findOne({ where: { id, isDeleted: false } });
        if (!game)
            throw new common_1.NotFoundException('Game not found');
        if (dto.rounds)
            this.validateRounds(dto.rounds);
        Object.assign(game, dto);
        return this.games.save(game);
    }
    async deleteGame(id) {
        const game = await this.games.findOne({ where: { id, isDeleted: false } });
        if (!game)
            throw new common_1.NotFoundException('Game not found');
        game.isDeleted = true;
        game.isPublished = false;
        await this.games.save(game);
        return { success: true, message: 'Game archived; student history retained.' };
    }
    async listAdminAttempts(gameId, studentId) {
        const query = this.attempts.createQueryBuilder('attempt')
            .leftJoin('attempt.user', 'student')
            .select(['attempt.id', 'attempt.gameId', 'attempt.score', 'attempt.totalRounds', 'attempt.correctRounds', 'attempt.durationSeconds', 'attempt.responses', 'attempt.createdAt', 'attempt.userId'])
            .addSelect(['student.name', 'student.email', 'student.uid'])
            .orderBy('attempt.createdAt', 'DESC').take(500);
        if (gameId)
            query.andWhere('attempt.gameId = :gameId', { gameId });
        if (studentId)
            query.andWhere('attempt.userId = :studentId', { studentId });
        return query.getMany();
    }
    validateRounds(rounds) {
        if (!Array.isArray(rounds) || rounds.length < 1 || rounds.length > 20)
            throw new common_1.BadRequestException('Provide between 1 and 20 rounds.');
        for (const round of rounds) {
            const error = (0, game_kind_registry_1.validateGameRound)(round);
            if (error)
                throw new common_1.BadRequestException(error);
        }
    }
    async createAttempt(dto, user) {
        if (!dto.responses && dto.correctRounds > dto.totalRounds) {
            throw new common_1.BadRequestException('Correct rounds cannot exceed total rounds.');
        }
        const game = await this.games.findOne({ where: { slug: dto.gameId, isPublished: true, isDeleted: false } });
        if (!game)
            throw new common_1.BadRequestException('This game is not available.');
        let correctRounds = dto.correctRounds;
        let score = dto.score;
        if (dto.responses) {
            if (dto.totalRounds !== game.rounds.length || dto.responses.length > game.rounds.length)
                throw new common_1.BadRequestException('Attempt round counts do not match this game.');
            correctRounds = dto.responses.reduce((total, response, index) => total + (0, game_kind_registry_1.scoreGameRound)(game.rounds[index], response), 0);
            score = Math.round((correctRounds / game.rounds.length) * 100);
        }
        const attempt = this.attempts.create({
            ...dto,
            correctRounds,
            score,
            responses: dto.responses || [],
            userId: String(user.id || user._id),
        });
        return this.attempts.save(attempt);
    }
    async getMyAttempts(user) {
        const attempts = await this.attempts.find({
            where: { userId: String(user.id || user._id) },
            order: { createdAt: 'DESC' },
            take: 100,
        });
        const bestScores = attempts.reduce((best, attempt) => {
            best[attempt.gameId] = Math.max(best[attempt.gameId] || 0, attempt.score);
            return best;
        }, {});
        return { attempts, bestScores };
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cognitive_game_attempt_entity_1.CognitiveGameAttempt)),
    __param(1, (0, typeorm_1.InjectRepository)(cognitive_game_entity_1.CognitiveGame)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamesService);
//# sourceMappingURL=games.service.js.map