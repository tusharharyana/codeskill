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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AzureExecutionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureExecutionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const JUDGE0_LANG_IDS = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
    typescript: 74,
    go: 60,
    rust: 73,
    csharp: 51,
    kotlin: 78,
    swift: 83,
    sql: 82,
};
let AzureExecutionService = AzureExecutionService_1 = class AzureExecutionService {
    logger = new common_1.Logger(AzureExecutionService_1.name);
    azureUrl;
    azureKey;
    isConfigured;
    constructor() {
        this.azureUrl = process.env.AZURE_COMPILER_URL || '';
        this.azureKey = process.env.AZURE_COMPILER_KEY || '';
        this.isConfigured = !!(this.azureUrl && this.azureKey);
        if (this.isConfigured) {
            this.logger.log(`Azure Execution Service connected to: ${this.azureUrl}`);
        }
        else {
            this.logger.warn('Azure Execution Service: No AZURE_COMPILER_URL/KEY set. Will use local executor.');
        }
    }
    get isAvailable() {
        return this.isConfigured;
    }
    async execute(req) {
        if (!this.isConfigured) {
            throw new Error('Azure execution service is not configured. Set AZURE_COMPILER_URL and AZURE_COMPILER_KEY.');
        }
        const langId = JUDGE0_LANG_IDS[req.language?.toLowerCase()];
        if (!langId) {
            return {
                stdout: '',
                stderr: `Unsupported language: ${req.language}`,
                status: 'system_error',
            };
        }
        try {
            const submitRes = await axios_1.default.post(`${this.azureUrl}/submissions?base64_encoded=false&wait=true`, {
                source_code: req.code,
                language_id: langId,
                stdin: req.stdin || '',
                expected_output: req.expectedOutput || undefined,
                cpu_time_limit: (req.timeoutMs || 5000) / 1000,
                memory_limit: (req.memoryMB || 256) * 1024,
            }, {
                headers: {
                    'X-RapidAPI-Key': this.azureKey,
                    'X-RapidAPI-Host': this.extractHost(this.azureUrl),
                    'Content-Type': 'application/json',
                },
                timeout: 30000,
            });
            const result = submitRes.data;
            return this.mapJudge0Result(result, req.expectedOutput);
        }
        catch (err) {
            this.logger.error('Azure execution error:', err.message);
            return {
                stdout: '',
                stderr: err.message || 'Execution failed',
                status: 'system_error',
            };
        }
    }
    async executeWithTestCases(code, language, testCases, options) {
        const results = await Promise.allSettled(testCases.map((tc) => this.execute({
            code,
            language,
            stdin: tc.input,
            expectedOutput: tc.expected,
            ...options,
        })));
        return results.map((result, idx) => {
            const tc = testCases[idx];
            if (result.status === 'fulfilled') {
                return {
                    ...result.value,
                    id: tc.id,
                    passed: result.value.status === 'accepted',
                };
            }
            return {
                stdout: '',
                stderr: 'Execution failed',
                status: 'system_error',
                id: tc.id,
                passed: false,
            };
        });
    }
    mapJudge0Result(data, expectedOutput) {
        const statusId = data.status?.id;
        const stdout = (data.stdout || '').trim();
        const stderr = data.stderr || data.compile_output || '';
        let status = 'system_error';
        let passed = false;
        if (statusId === 3) {
            status = 'accepted';
            if (!expectedOutput) {
                passed = true;
            }
            else {
                passed = stdout === expectedOutput.trim();
                status = passed ? 'accepted' : 'wrong_answer';
            }
        }
        else if (statusId === 4) {
            status = 'wrong_answer';
        }
        else if (statusId === 5) {
            status = 'time_limit';
        }
        else if (statusId === 6) {
            status = 'compile_error';
        }
        else if (statusId >= 7 && statusId <= 12) {
            status = 'runtime_error';
        }
        else if (statusId === 14) {
            status = 'memory_limit';
        }
        return {
            stdout,
            stderr,
            status,
            passed,
            executionTimeMs: data.time
                ? Math.round(parseFloat(data.time) * 1000)
                : undefined,
            memoryUsedKB: data.memory,
        };
    }
    extractHost(url) {
        try {
            return new URL(url).hostname;
        }
        catch {
            return '';
        }
    }
    getSupportedLanguages() {
        return Object.keys(JUDGE0_LANG_IDS);
    }
    getLanguageId(language) {
        return JUDGE0_LANG_IDS[language?.toLowerCase()] ?? null;
    }
};
exports.AzureExecutionService = AzureExecutionService;
exports.AzureExecutionService = AzureExecutionService = AzureExecutionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzureExecutionService);
//# sourceMappingURL=azure-execution.service.js.map