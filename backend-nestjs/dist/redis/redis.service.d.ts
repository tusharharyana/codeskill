import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis, Cluster } from 'ioredis';
export declare class RedisService implements OnModuleDestroy {
    private readonly configService;
    private readonly client;
    private readonly logger;
    constructor(configService: ConfigService);
    getClient(): Redis | Cluster;
    set(key: string, value: any, ttlSeconds?: number): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    del(key: string | string[]): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
