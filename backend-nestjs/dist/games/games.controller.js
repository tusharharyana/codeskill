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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_game_attempt_dto_1 = require("./dto/create-game-attempt.dto");
const games_service_1 = require("./games.service");
let GamesController = class GamesController {
    games;
    constructor(games) {
        this.games = games;
    }
    listPublished() { return this.games.listPublished(); }
    getPublished(slug) { return this.games.getPublished(slug); }
    getMyAttempts(user) {
        return this.games.getMyAttempts(user);
    }
    createAttempt(dto, user) {
        return this.games.createAttempt(dto, user);
    }
};
exports.GamesController = GamesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "listPublished", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getPublished", null);
__decorate([
    (0, common_1.Get)('attempts/me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the current user’s cognitive game history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getMyAttempts", null);
__decorate([
    (0, common_1.Post)('attempts'),
    (0, swagger_1.ApiOperation)({ summary: 'Save a completed cognitive game attempt' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_attempt_dto_1.CreateGameAttemptDto, Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "createAttempt", null);
exports.GamesController = GamesController = __decorate([
    (0, swagger_1.ApiTags)('Cognitive Games'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
//# sourceMappingURL=games.controller.js.map