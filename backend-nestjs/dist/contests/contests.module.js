"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contests_controller_1 = require("./contests.controller");
const contests_service_1 = require("./contests.service");
const contest_entity_1 = require("../database/entities/contest.entity");
const contest_attempt_entity_1 = require("../database/entities/contest-attempt.entity");
let ContestsModule = class ContestsModule {
};
exports.ContestsModule = ContestsModule;
exports.ContestsModule = ContestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([contest_entity_1.Contest, contest_attempt_entity_1.ContestAttempt]),
        ],
        controllers: [contests_controller_1.ContestsController],
        providers: [contests_service_1.ContestsService],
        exports: [contests_service_1.ContestsService],
    })
], ContestsModule);
//# sourceMappingURL=contests.module.js.map