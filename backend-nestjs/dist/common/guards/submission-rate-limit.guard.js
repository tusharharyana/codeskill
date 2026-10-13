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
var SubmissionRateLimitGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../../redis/redis.service");
let SubmissionRateLimitGuard = SubmissionRateLimitGuard_1 = class SubmissionRateLimitGuard {
    redisService;
    configService;
    logger = new common_1.Logger(SubmissionRateLimitGuard_1.name);
    maxPerMinute;
    maxConcurrent;
    constructor(redisService, configService) {
        this.redisService = redisService;
        this.configService = configService;
        this.maxPerMinute =
            this.configService.get('runner.rateLimitPerMin') ||
                parseInt(process.env.SUBMISSION_RATE_LIMIT_PER_MINUTE || '15', 10);
        this.maxConcurrent =
            this.configService.get('runner.maxConcurrentPerUser') ||
                parseInt(process.env.MAX_CONCURRENT_JOBS_PER_USER || '2', 10);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?._id || request.user?.id || 'anonymous';
        const clientIp = request.headers['x-forwarded-for']?.split(',')[0] ||
            request.socket?.remoteAddress ||
            'unknown-ip';
        const client = this.redisService.getClient();
        if (!client) {
            return true;
        }
        const now = Date.now();
        const windowSec = 60;
        const rateLimitKey = `ratelimit:submissions:${userId !== 'anonymous' ? userId : clientIp}`;
        const activeJobsKey = `active:submissions:${userId}`;
        try {
            if (userId !== 'anonymous') {
                const activeCount = parseInt((await client.get(activeJobsKey)) || '0', 10);
                if (activeCount >= this.maxConcurrent) {
                    throw new common_1.HttpException({
                        success: false,
                        statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                        error: 'Too Many Requests',
                        message: `You have ${activeCount} active code execution(s) in progress. Please wait for them to finish.`,
                    }, common_1.HttpStatus.TOO_MANY_REQUESTS);
                }
            }
            const multi = client.multi();
            multi.zremrangebyscore(rateLimitKey, 0, now - windowSec * 1000);
            multi.zcard(rateLimitKey);
            multi.zadd(rateLimitKey, now, `${now}-${Math.random()}`);
            multi.expire(rateLimitKey, windowSec);
            const results = await multi.exec();
            const currentCount = results?.[1]?.[1] || 0;
            if (currentCount >= this.maxPerMinute) {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                    error: 'Too Many Requests',
                    message: `Rate limit exceeded. Maximum ${this.maxPerMinute} submissions per minute allowed. Please try again shortly.`,
                }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            return true;
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            this.logger.warn(`Rate limiter check error: ${err.message}`);
            return true;
        }
    }
};
exports.SubmissionRateLimitGuard = SubmissionRateLimitGuard;
exports.SubmissionRateLimitGuard = SubmissionRateLimitGuard = SubmissionRateLimitGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        config_1.ConfigService])
], SubmissionRateLimitGuard);
//# sourceMappingURL=submission-rate-limit.guard.js.map