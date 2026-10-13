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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService {
    configService;
    client;
    logger = new common_1.Logger(RedisService_1.name);
    constructor(configService) {
        this.configService = configService;
        const url = this.configService.get('redis.url');
        const options = {
            host: this.configService.get('redis.host') || '127.0.0.1',
            port: this.configService.get('redis.port') || 6379,
            password: this.configService.get('redis.password'),
            enableOfflineQueue: false,
            connectTimeout: 2000,
            commandTimeout: 1000,
            maxRetriesPerRequest: 1,
            retryStrategy(times) {
                if (times > 3)
                    return null;
                const delay = Math.min(times * 100, 1000);
                return delay;
            },
        };
        const isCluster = process.env.NODE_ENV === 'production';
        if (isCluster) {
            this.client = new ioredis_1.Redis.Cluster([{ host: options.host, port: options.port }], {
                redisOptions: {
                    password: options.password,
                },
            });
        }
        else if (url) {
            this.client = new ioredis_1.Redis(url, options);
        }
        else {
            this.client = new ioredis_1.Redis(options);
        }
        this.client.on('connect', () => this.logger.log('Redis successfully connected'));
        this.client.on('error', (err) => {
            if (err.code !== 'ECONNREFUSED') {
                this.logger.warn(`Redis notice: ${err.message}`);
            }
        });
    }
    getClient() {
        return this.client;
    }
    async set(key, value, ttlSeconds) {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            if (ttlSeconds) {
                await Promise.race([
                    this.client.set(key, stringValue, 'EX', ttlSeconds),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500)),
                ]);
            }
            else {
                await Promise.race([
                    this.client.set(key, stringValue),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500)),
                ]);
            }
        }
        catch {
        }
    }
    async get(key) {
        try {
            const value = await Promise.race([
                this.client.get(key),
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500)),
            ]);
            if (!value)
                return null;
            try {
                return JSON.parse(value);
            }
            catch {
                return value;
            }
        }
        catch {
            return null;
        }
    }
    async del(key) {
        try {
            const keys = Array.isArray(key) ? key : [key];
            if (keys.length > 0) {
                await Promise.race([
                    this.client.del(...keys),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500)),
                ]);
            }
        }
        catch {
        }
    }
    async onModuleDestroy() {
        try {
            this.logger.log('Closing Redis connection...');
            await this.client.quit();
        }
        catch {
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map