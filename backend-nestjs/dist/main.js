"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const config_1 = require("@nestjs/config");
const redis_io_adapter_1 = require("./gateway/redis-io.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const configService = app.get(config_1.ConfigService);
    const redisIoAdapter = new redis_io_adapter_1.RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis(configService);
    app.useWebSocketAdapter(redisIoAdapter);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CodeSkill API')
        .setDescription('CodeSkill Online Judge — Chandigarh University Assessment Platform')
        .setVersion('2.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 5001;
    await app.listen(port);
    console.log(`\n🚀 CodeSkill NestJS API running on port ${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📖 Swagger docs: http://localhost:${port}/api/docs\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map