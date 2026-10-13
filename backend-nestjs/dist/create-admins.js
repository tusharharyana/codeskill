"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./database/entities/user.entity");
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userRepository = app.get((0, typeorm_1.getRepositoryToken)(user_entity_1.User));
    console.log('Generating 5 admin accounts...');
    const admins = [];
    for (let i = 1; i <= 5; i++) {
        const password = crypto.randomBytes(8).toString('hex');
        const email = `admin${i}@codeskill.com`;
        const name = `System Admin ${i}`;
        let admin = await userRepository.findOne({ where: { email } });
        if (!admin) {
            admin = userRepository.create({
                name,
                email,
                password,
                role: 'admin',
                isAdmin: true,
                uid: `ADM00${i}`,
                isActive: true,
                forcePasswordChange: true
            });
            await userRepository.save(admin);
            admins.push({ name, email, password, uid: admin.uid });
            console.log(`Created admin: ${email}`);
        }
        else {
            console.log(`Admin ${email} already exists.`);
        }
    }
    if (admins.length > 0) {
        const csvHeader = 'Name,Email,UID,InitialPassword\n';
        const csvContent = admins.map(a => `${a.name},${a.email},${a.uid},${a.password}`).join('\n');
        fs.writeFileSync('admins.csv', csvHeader + csvContent);
        console.log('Credentials saved to admins.csv (KEEP THIS SECURE AND DO NOT COMMIT TO GIT)');
    }
    await app.close();
    process.exit(0);
}
bootstrap();
//# sourceMappingURL=create-admins.js.map