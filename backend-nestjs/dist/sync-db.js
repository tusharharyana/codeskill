"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
async function bootstrap() {
    console.log('Connecting to app module to sync database...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    console.log('Synchronizing database schema...');
    await dataSource.synchronize();
    console.log('Schema synchronized successfully!');
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=sync-db.js.map