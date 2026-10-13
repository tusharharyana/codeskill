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
exports.Contest = void 0;
const typeorm_1 = require("typeorm");
let Contest = class Contest {
    id;
    mongoId;
    title;
    slug;
    description;
    startTime;
    endTime;
    problems;
    isPrivate;
    password;
    antiCheatConfig;
    isPublished;
    participants;
    createdAt;
    updatedAt;
};
exports.Contest = Contest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Contest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contest.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contest.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Contest.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Contest.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Contest.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Contest.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Contest.prototype, "problems", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contest.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contest.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: {
            enableFullscreen: true,
            enableCopyProtect: true,
            enablePasteProtect: true,
            enableDevToolsDetect: true,
            enableTabSwitchDetect: true,
            enableMultipleDeviceProtect: true,
            enableWatermark: true,
            warningLimit: 5,
            autoSubmitOnViolation: true,
        },
    }),
    __metadata("design:type", Object)
], Contest.prototype, "antiCheatConfig", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contest.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Contest.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Contest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Contest.prototype, "updatedAt", void 0);
exports.Contest = Contest = __decorate([
    (0, typeorm_1.Entity)('contests')
], Contest);
//# sourceMappingURL=contest.entity.js.map