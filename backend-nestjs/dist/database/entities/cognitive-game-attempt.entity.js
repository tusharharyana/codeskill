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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveGameAttempt = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let CognitiveGameAttempt = class CognitiveGameAttempt {
    id;
    user;
    userId;
    gameId;
    score;
    totalRounds;
    correctRounds;
    durationSeconds;
    responses;
    createdAt;
};
exports.CognitiveGameAttempt = CognitiveGameAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CognitiveGameAttempt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CognitiveGameAttempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], CognitiveGameAttempt.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'game_id', type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], CognitiveGameAttempt.prototype, "gameId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CognitiveGameAttempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_rounds', type: 'int' }),
    __metadata("design:type", Number)
], CognitiveGameAttempt.prototype, "totalRounds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correct_rounds', type: 'int' }),
    __metadata("design:type", Number)
], CognitiveGameAttempt.prototype, "correctRounds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', type: 'int' }),
    __metadata("design:type", Number)
], CognitiveGameAttempt.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], CognitiveGameAttempt.prototype, "responses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CognitiveGameAttempt.prototype, "createdAt", void 0);
exports.CognitiveGameAttempt = CognitiveGameAttempt = __decorate([
    (0, typeorm_1.Entity)('cognitive_game_attempts'),
    (0, typeorm_1.Index)(['userId', 'gameId', 'createdAt'])
], CognitiveGameAttempt);
//# sourceMappingURL=cognitive-game-attempt.entity.js.map