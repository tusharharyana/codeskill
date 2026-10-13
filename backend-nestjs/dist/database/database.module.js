"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
const problem_entity_1 = require("./entities/problem.entity");
const problem_metadata_entity_1 = require("./entities/problem-metadata.entity");
const problem_statement_entity_1 = require("./entities/problem-statement.entity");
const problem_config_entity_1 = require("./entities/problem-config.entity");
const problem_testcase_entity_1 = require("./entities/problem-testcase.entity");
const question_entity_1 = require("./entities/question.entity");
const question_bank_entity_1 = require("./entities/question-bank.entity");
const assessment_entity_1 = require("./entities/assessment.entity");
const assessment_attempt_entity_1 = require("./entities/assessment-attempt.entity");
const submission_entity_1 = require("./entities/submission.entity");
const contest_entity_1 = require("./entities/contest.entity");
const contest_attempt_entity_1 = require("./entities/contest-attempt.entity");
const company_entity_1 = require("./entities/company.entity");
const company_user_entity_1 = require("./entities/company-user.entity");
const job_entity_1 = require("./entities/job.entity");
const application_entity_1 = require("./entities/application.entity");
const university_entity_1 = require("./entities/university.entity");
const university_user_entity_1 = require("./entities/university-user.entity");
const batch_entity_1 = require("./entities/batch.entity");
const student_enrollment_entity_1 = require("./entities/student-enrollment.entity");
const discussion_entity_1 = require("./entities/discussion.entity");
const discussion_reply_entity_1 = require("./entities/discussion-reply.entity");
const audit_log_entity_1 = require("./entities/audit-log.entity");
const email_job_entity_1 = require("./entities/email-job.entity");
const exam_session_entity_1 = require("./entities/exam-session.entity");
const exam_security_event_entity_1 = require("./entities/exam-security-event.entity");
const cognitive_game_attempt_entity_1 = require("./entities/cognitive-game-attempt.entity");
const cognitive_game_entity_1 = require("./entities/cognitive-game.entity");
const entities = [
    user_entity_1.User,
    problem_entity_1.Problem,
    problem_metadata_entity_1.ProblemMetadata,
    problem_statement_entity_1.ProblemStatement,
    problem_config_entity_1.ProblemConfig,
    problem_testcase_entity_1.ProblemTestCase,
    question_entity_1.Question,
    question_bank_entity_1.QuestionBank,
    assessment_entity_1.Assessment,
    assessment_attempt_entity_1.AssessmentAttempt,
    submission_entity_1.Submission,
    contest_entity_1.Contest,
    contest_attempt_entity_1.ContestAttempt,
    company_entity_1.Company,
    company_user_entity_1.CompanyUser,
    job_entity_1.Job,
    application_entity_1.Application,
    university_entity_1.University,
    university_user_entity_1.UniversityUser,
    batch_entity_1.Batch,
    student_enrollment_entity_1.StudentEnrollment,
    discussion_entity_1.Discussion,
    discussion_reply_entity_1.DiscussionReply,
    audit_log_entity_1.AuditLog,
    email_job_entity_1.EmailJob,
    exam_session_entity_1.ExamSession,
    exam_security_event_entity_1.ExamSecurityEvent,
    cognitive_game_attempt_entity_1.CognitiveGameAttempt,
    cognitive_game_entity_1.CognitiveGame,
];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const url = configService.get('database.postgres.url');
                    if (url) {
                        return {
                            type: 'postgres',
                            url,
                            autoLoadEntities: true,
                            synchronize: process.env.NODE_ENV !== 'production',
                            invalidWhereValuesBehavior: {
                                null: 'ignore',
                            },
                        };
                    }
                    return {
                        type: 'postgres',
                        host: configService.get('database.postgres.host'),
                        port: configService.get('database.postgres.port'),
                        username: configService.get('database.postgres.username'),
                        password: configService.get('database.postgres.password'),
                        database: configService.get('database.postgres.database'),
                        ssl: configService.get('database.postgres.ssl')
                            ? { rejectUnauthorized: false }
                            : false,
                        autoLoadEntities: true,
                        synchronize: process.env.NODE_ENV !== 'production',
                        invalidWhereValuesBehavior: {
                            null: 'ignore',
                        },
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature(entities),
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map