import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';
export declare class SubmissionRateLimitGuard implements CanActivate {
    private readonly redisService;
    private readonly configService;
    private readonly logger;
    private readonly maxPerMinute;
    private readonly maxConcurrent;
    constructor(redisService: RedisService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
