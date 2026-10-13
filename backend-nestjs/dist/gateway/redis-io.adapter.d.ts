import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { INestApplicationContext } from '@nestjs/common';
export declare class RedisIoAdapter extends IoAdapter {
    private adapterConstructor;
    constructor(app: INestApplicationContext);
    connectToRedis(configService: ConfigService): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): any;
}
