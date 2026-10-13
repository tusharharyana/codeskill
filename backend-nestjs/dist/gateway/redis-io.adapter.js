"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const ioredis_1 = require("ioredis");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    adapterConstructor;
    constructor(app) {
        super(app);
    }
    async connectToRedis(configService) {
        const url = configService.get('redis.url');
        const options = {
            host: configService.get('redis.host') || '127.0.0.1',
            port: configService.get('redis.port') || 6379,
            password: configService.get('redis.password'),
        };
        let pubClient;
        let subClient;
        if (url) {
            pubClient = new ioredis_1.Redis(url, options);
            subClient = new ioredis_1.Redis(url, options);
        }
        else {
            pubClient = new ioredis_1.Redis(options);
            subClient = new ioredis_1.Redis(options);
        }
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map