"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const s3_module_1 = require("../s3/s3.module");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const user_entity_1 = require("../database/entities/user.entity");
const redis_module_1 = require("../redis/redis.module");
const typeorm_1 = require("@nestjs/typeorm");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            s3_module_1.S3Module,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            redis_module_1.RedisModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('jwt.secret') || 'default',
                    signOptions: {
                        expiresIn: (config.get('jwt.expiresIn') || '30d'),
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map