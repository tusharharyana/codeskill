import { RedisService } from './redis.service';
export declare class CacheService {
    private readonly redisService;
    constructor(redisService: RedisService);
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: any, ttlSeconds?: number): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}
