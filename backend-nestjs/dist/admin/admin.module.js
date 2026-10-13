"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const users_controller_1 = require("./controllers/users.controller");
const problems_controller_1 = require("./controllers/problems.controller");
const contests_controller_1 = require("./controllers/contests.controller");
const companies_controller_1 = require("./controllers/companies.controller");
const universities_controller_1 = require("./controllers/universities.controller");
const admin_service_1 = require("./admin.service");
const user_entity_1 = require("../database/entities/user.entity");
const problem_entity_1 = require("../database/entities/problem.entity");
const problem_metadata_entity_1 = require("../database/entities/problem-metadata.entity");
const problem_statement_entity_1 = require("../database/entities/problem-statement.entity");
const problem_config_entity_1 = require("../database/entities/problem-config.entity");
const problem_testcase_entity_1 = require("../database/entities/problem-testcase.entity");
const contest_entity_1 = require("../database/entities/contest.entity");
const company_entity_1 = require("../database/entities/company.entity");
const university_entity_1 = require("../database/entities/university.entity");
const submission_entity_1 = require("../database/entities/submission.entity");
const assessment_entity_1 = require("../database/entities/assessment.entity");
const question_entity_1 = require("../database/entities/question.entity");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                problem_entity_1.Problem,
                problem_metadata_entity_1.ProblemMetadata,
                problem_statement_entity_1.ProblemStatement,
                problem_config_entity_1.ProblemConfig,
                problem_testcase_entity_1.ProblemTestCase,
                contest_entity_1.Contest,
                company_entity_1.Company,
                university_entity_1.University,
                submission_entity_1.Submission,
                assessment_entity_1.Assessment,
                question_entity_1.Question,
            ]),
        ],
        controllers: [
            dashboard_controller_1.AdminDashboardController,
            users_controller_1.AdminUsersController,
            problems_controller_1.AdminProblemsController,
            contests_controller_1.AdminContestsController,
            companies_controller_1.AdminCompaniesController,
            universities_controller_1.AdminUniversitiesController,
        ],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map