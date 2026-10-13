"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const university_entity_1 = require("./university.entity");
const crypto = __importStar(require("crypto"));
let Batch = class Batch {
    id;
    mongoId;
    university;
    university_id;
    name;
    department;
    graduationYear;
    inviteCode;
    createdBy;
    created_by_id;
    createdAt;
    updatedAt;
    generateInviteCode() {
        if (!this.inviteCode) {
            const uniqueString = crypto.randomBytes(4).toString('hex').toUpperCase();
            this.inviteCode = `${this.graduationYear}-${uniqueString}`;
        }
    }
};
exports.Batch = Batch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Batch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Batch.prototype, "mongoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => university_entity_1.University, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'university_id' }),
    __metadata("design:type", university_entity_1.University)
], Batch.prototype, "university", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Batch.prototype, "university_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Batch.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Batch.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Batch.prototype, "graduationYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Batch.prototype, "inviteCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", user_entity_1.User)
], Batch.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Batch.prototype, "created_by_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Batch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Batch.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Batch.prototype, "generateInviteCode", null);
exports.Batch = Batch = __decorate([
    (0, typeorm_1.Entity)('batches'),
    (0, typeorm_1.Index)(['university_id', 'name'], { unique: true })
], Batch);
//# sourceMappingURL=batch.entity.js.map