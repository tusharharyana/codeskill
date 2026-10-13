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
exports.GamesAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_guard_1 = require("../common/guards/admin.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const save_cognitive_game_dto_1 = require("./dto/save-cognitive-game.dto");
const games_service_1 = require("./games.service");
let GamesAdminController = class GamesAdminController {
    games;
    constructor(games) {
        this.games = games;
    }
    list() { return this.games.listAdmin(); }
    attempts(gameId, studentId) { return this.games.listAdminAttempts(gameId, studentId); }
    create(dto) { return this.games.createGame(dto); }
    update(id, dto) { return this.games.updateGame(id, dto); }
    delete(id) { return this.games.deleteGame(id); }
};
exports.GamesAdminController = GamesAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamesAdminController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('attempts'),
    __param(0, (0, common_1.Query)('gameId')),
    __param(1, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GamesAdminController.prototype, "attempts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_cognitive_game_dto_1.SaveCognitiveGameDto]),
    __metadata("design:returntype", void 0)
], GamesAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GamesAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesAdminController.prototype, "delete", null);
exports.GamesAdminController = GamesAdminController = __decorate([
    (0, swagger_1.ApiTags)('Cognitive Games Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesAdminController);
//# sourceMappingURL=games-admin.controller.js.map