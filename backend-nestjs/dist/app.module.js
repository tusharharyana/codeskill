"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const s3_module_1 = require("./s3/s3.module");
const reports_module_1 = require("./reports/reports.module");
const ioredis_1 = require("ioredis");
const analytics_module_1 = require("./analytics/analytics.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const config_2 = require("./config");
const database_module_1 = require("./database/database.module");
const redis_module_1 = require("./redis/redis.module");
const email_module_1 = require("./emails/email.module");
const auth_module_1 = require("./auth/auth.module");
const problems_module_1 = require("./problems/problems.module");
const submissions_module_1 = require("./submissions/submissions.module");
const execution_module_1 = require("./execution/execution.module");
const users_module_1 = require("./users/users.module");
const contests_module_1 = require("./contests/contests.module");
const admin_module_1 = require("./admin/admin.module");
const companies_module_1 = require("./companies/companies.module");
const campus_module_1 = require("./campus/campus.module");
const gateway_module_1 = require("./gateway/gateway.module");
const health_module_1 = require("./health/health.module");
const discussions_module_1 = require("./discussions/discussions.module");
const students_module_1 = require("./students/students.module");
const questions_module_1 = require("./questions/questions.module");
const assessments_module_1 = require("./assessments/assessments.module");
const bullmq_1 = require("@nestjs/bullmq");
const config_3 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const exam_security_module_1 = require("./exam-security/exam-security.module");
const games_module_1 = require("./games/games.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    config_2.appConfig,
                    config_2.databaseConfig,
                    config_2.redisConfig,
                    config_2.jwtConfig,
                    config_2.awsConfig,
                    config_2.oauthConfig,
                    config_2.adminConfig,
                ],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                playground: false,
            }),
            database_module_1.DatabaseModule,
            email_module_1.EmailModule,
            redis_module_1.RedisModule,
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const isCluster = process.env.NODE_ENV === 'production';
                    const host = configService.get('redis.host') || '127.0.0.1';
                    const port = Number(configService.get('redis.port')) || 6379;
                    const password = configService.get('redis.password') || undefined;
                    if (isCluster) {
                        return {
                            prefix: '{bull}',
                            connection: new ioredis_1.Cluster([{ host, port }], {
                                redisOptions: { password },
                            }),
                        };
                    }
                    return {
                        prefix: '{bull}',
                        connection: {
                            host,
                            port,
                            password,
                            maxRetriesPerRequest: null,
                            connectTimeout: 5000,
                        },
                    };
                },
                inject: [config_3.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            auth_module_1.AuthModule,
            problems_module_1.ProblemsModule,
            submissions_module_1.SubmissionsModule,
            execution_module_1.ExecutionModule,
            users_module_1.UsersModule,
            contests_module_1.ContestsModule,
            admin_module_1.AdminModule,
            companies_module_1.CompaniesModule,
            campus_module_1.CampusModule,
            gateway_module_1.GatewayModule,
            health_module_1.HealthModule,
            discussions_module_1.DiscussionsModule,
            s3_module_1.S3Module,
            students_module_1.StudentsModule,
            questions_module_1.QuestionsModule,
            assessments_module_1.AssessmentsModule,
            exam_security_module_1.ExamSecurityModule,
            games_module_1.GamesModule,
            analytics_module_1.AnalyticsModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map