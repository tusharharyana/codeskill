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
exports.CampusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const university_entity_1 = require("../database/entities/university.entity");
const university_user_entity_1 = require("../database/entities/university-user.entity");
let CampusService = class CampusService {
    universityRepo;
    universityUserRepo;
    constructor(universityRepo, universityUserRepo) {
        this.universityRepo = universityRepo;
        this.universityUserRepo = universityUserRepo;
    }
    async getUniversities() {
        const list = await this.universityRepo.find({
            where: { isVerified: true },
            order: { createdAt: 'DESC' },
        });
        return list.map((u) => ({ ...u, _id: u.id }));
    }
    async getUniversityProfile(username) {
        const university = await this.universityRepo.findOne({
            where: { username, isVerified: true },
        });
        if (!university)
            throw new common_1.NotFoundException('University not found');
        return { ...university, _id: university.id };
    }
    async registerUniversity(userId, data) {
        const { name, username, domain, website } = data;
        const existingUniversity = await this.universityRepo.findOne({
            where: { username: username.toLowerCase() },
        });
        if (existingUniversity) {
            throw new common_1.BadRequestException('University username already exists');
        }
        const university = this.universityRepo.create({
            name,
            username: username.toLowerCase(),
            domain: domain || '',
            website: website || '',
            createdBy: { id: userId },
        });
        await this.universityRepo.save(university);
        const membership = this.universityUserRepo.create({
            university: { id: university.id },
            user: { id: userId },
            role: 'Admin',
            isActive: true,
        });
        await this.universityUserRepo.save(membership);
        return { success: true, university: { ...university, _id: university.id } };
    }
    async getMyUniversities(userId) {
        const memberships = await this.universityUserRepo.find({
            where: { user: { id: userId }, isActive: true },
            relations: { university: true },
            order: { createdAt: 'DESC' },
        });
        return {
            success: true,
            universities: memberships.map((m) => ({
                ...m,
                _id: m.id,
                university: m.university ? { ...m.university, _id: m.university.id } : null,
            })),
        };
    }
    async getUniversityById(universityId) {
        const university = await this.universityRepo.findOne({
            where: [{ id: universityId }, { mongoId: universityId }],
        });
        if (!university) {
            throw new common_1.NotFoundException('University not found');
        }
        return { success: true, university: { ...university, _id: university.id } };
    }
    async updateUniversity(universityId, updates) {
        delete updates.username;
        delete updates.createdBy;
        const university = await this.universityRepo.findOne({
            where: [{ id: universityId }, { mongoId: universityId }],
        });
        if (!university)
            throw new common_1.NotFoundException('University not found');
        Object.assign(university, updates);
        await this.universityRepo.save(university);
        return { success: true, university: { ...university, _id: university.id } };
    }
};
exports.CampusService = CampusService;
exports.CampusService = CampusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(university_entity_1.University)),
    __param(1, (0, typeorm_1.InjectRepository)(university_user_entity_1.UniversityUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CampusService);
//# sourceMappingURL=campus.service.js.map