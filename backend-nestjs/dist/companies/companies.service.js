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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../database/entities/company.entity");
const job_entity_1 = require("../database/entities/job.entity");
const company_user_entity_1 = require("../database/entities/company-user.entity");
let CompaniesService = class CompaniesService {
    companyRepo;
    jobRepo;
    companyUserRepo;
    constructor(companyRepo, jobRepo, companyUserRepo) {
        this.companyRepo = companyRepo;
        this.jobRepo = jobRepo;
        this.companyUserRepo = companyUserRepo;
    }
    async getCompanies() {
        const list = await this.companyRepo.find({
            where: { isVerified: true },
            order: { createdAt: 'DESC' },
        });
        return list.map((c) => ({ ...c, _id: c.id }));
    }
    async getCompanyProfile(username) {
        const company = await this.companyRepo.findOne({
            where: { username, isVerified: true },
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        const jobs = await this.jobRepo.find({
            where: { company: { id: company.id }, status: 'Published' },
        });
        return { ...company, _id: company.id, jobs: jobs.map((j) => ({ ...j, _id: j.id })) };
    }
    async registerCompany(userId, data) {
        const { name, username, industry, website } = data;
        const existingCompany = await this.companyRepo.findOne({
            where: { username: username.toLowerCase() },
        });
        if (existingCompany) {
            throw new common_1.BadRequestException('Company username already exists');
        }
        const company = this.companyRepo.create({
            name,
            username: username.toLowerCase(),
            industry: industry || '',
            website: website || '',
            createdBy: { id: userId },
        });
        await this.companyRepo.save(company);
        const membership = this.companyUserRepo.create({
            company: { id: company.id },
            user: { id: userId },
            role: 'Owner',
            isActive: true,
        });
        await this.companyUserRepo.save(membership);
        return { success: true, company: { ...company, _id: company.id } };
    }
    async getMyCompanies(userId) {
        const memberships = await this.companyUserRepo.find({
            where: { user: { id: userId }, isActive: true },
            relations: { company: true },
            order: { createdAt: 'DESC' },
        });
        return {
            success: true,
            companies: memberships.map((m) => ({
                ...m,
                _id: m.id,
                company: m.company ? { ...m.company, _id: m.company.id } : null,
            })),
        };
    }
    async getCompanyById(companyId) {
        const company = await this.companyRepo.findOne({
            where: [{ id: companyId }, { mongoId: companyId }],
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return { success: true, company: { ...company, _id: company.id } };
    }
    async updateCompany(companyId, updates) {
        delete updates.username;
        delete updates.createdBy;
        const company = await this.companyRepo.findOne({
            where: [{ id: companyId }, { mongoId: companyId }],
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        Object.assign(company, updates);
        await this.companyRepo.save(company);
        return { success: true, company: { ...company, _id: company.id } };
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(company_user_entity_1.CompanyUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map