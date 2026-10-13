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
exports.CognitiveGame = void 0;
const typeorm_1 = require("typeorm");
let CognitiveGame = class CognitiveGame {
    id;
    slug;
    title;
    shortDescription;
    description;
    color;
    icon;
    durationSeconds;
    rounds;
    isPublished;
    isDeleted;
    createdAt;
    updatedAt;
};
exports.CognitiveGame = CognitiveGame;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CognitiveGame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 64 }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'short_description', type: 'text', default: '' }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "shortDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32, default: 'cyan' }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 16, default: '✦' }),
    __metadata("design:type", String)
], CognitiveGame.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', type: 'int', default: 120 }),
    __metadata("design:type", Number)
], CognitiveGame.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], CognitiveGame.prototype, "rounds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_published', default: false }),
    __metadata("design:type", Boolean)
], CognitiveGame.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', default: false }),
    __metadata("design:type", Boolean)
], CognitiveGame.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CognitiveGame.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CognitiveGame.prototype, "updatedAt", void 0);
exports.CognitiveGame = CognitiveGame = __decorate([
    (0, typeorm_1.Entity)('cognitive_games')
], CognitiveGame);
//# sourceMappingURL=cognitive-game.entity.js.map