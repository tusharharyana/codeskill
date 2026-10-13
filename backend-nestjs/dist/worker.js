"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrapWorker() {
    if (process.env.PROCESS_ROLE !== 'judge') {
        throw new Error('The judge worker must start with PROCESS_ROLE=judge');
    }
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    app.enableShutdownHooks();
    common_1.Logger.log('CodeSkill judge worker is ready', 'JudgeWorker');
}
bootstrapWorker().catch((error) => {
    common_1.Logger.error(error, 'JudgeWorker');
    process.exitCode = 1;
});
//# sourceMappingURL=worker.js.map