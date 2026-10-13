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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var ExecutionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionService = exports.Status = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const crypto_1 = require("crypto");
const language_adapters_1 = require("./language-adapters");
exports.Status = {
    ACCEPTED: 'accepted',
    WRONG_ANSWER: 'wrong_answer',
    COMPILATION_ERROR: 'compile_error',
    RUNTIME_ERROR: 'runtime_error',
    TIME_LIMIT_EXCEEDED: 'time_limit',
    MEMORY_LIMIT_EXCEEDED: 'memory_limit',
    SYSTEM_ERROR: 'system_error',
};
const LANGUAGE_CONFIGS = {
    c: {
        extension: '.c',
        compiled: true,
        compileCommand: (srcPath, outPath) => ({
            cmd: 'gcc',
            args: [
                '-std=c11',
                '-O2',
                '-pipe',
                '-Wall',
                '-o',
                outPath,
                srcPath,
                '-lm',
            ],
        }),
        runCommand: (_src, outPath) => ({
            cmd: outPath,
            args: [],
        }),
    },
    cpp: {
        extension: '.cpp',
        compiled: true,
        compileCommand: (srcPath, outPath) => ({
            cmd: 'g++',
            args: ['-std=c++17', '-O2', '-pipe', '-Wall', '-o', outPath, srcPath],
        }),
        runCommand: (_src, outPath) => ({
            cmd: outPath,
            args: [],
        }),
    },
    'c++': {
        extension: '.cpp',
        compiled: true,
        compileCommand: (srcPath, outPath) => ({
            cmd: 'g++',
            args: ['-std=c++17', '-O2', '-pipe', '-Wall', '-o', outPath, srcPath],
        }),
        runCommand: (_src, outPath) => ({
            cmd: outPath,
            args: [],
        }),
    },
    java: {
        extension: '.java',
        compiled: true,
        preProcess: (code, cwd) => {
            const publicClassMatch = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
            const className = publicClassMatch ? publicClassMatch[1] : 'Main';
            let processedCode = code;
            if (!publicClassMatch && !code.match(/class\s+[A-Za-z_][A-Za-z0-9_]*/)) {
                processedCode = `public class Main {\n${code}\n}`;
            }
            return {
                code: processedCode,
                filename: `${className}.java`,
            };
        },
        compileCommand: (srcPath, _outPath, cwd) => ({
            cmd: 'javac',
            args: ['-d', cwd, srcPath],
        }),
        runCommand: (srcPath, _outPath, cwd) => {
            const basename = path.basename(srcPath, '.java');
            return {
                cmd: 'java',
                args: ['-cp', cwd, basename],
            };
        },
    },
    python: {
        extension: '.py',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'python3',
            args: [srcPath],
        }),
    },
    python3: {
        extension: '.py',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'python3',
            args: [srcPath],
        }),
    },
    py: {
        extension: '.py',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'python3',
            args: [srcPath],
        }),
    },
    javascript: {
        extension: '.js',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'node',
            args: [srcPath],
        }),
    },
    js: {
        extension: '.js',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'node',
            args: [srcPath],
        }),
    },
    node: {
        extension: '.js',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'node',
            args: [srcPath],
        }),
    },
    typescript: {
        extension: '.ts',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'npx',
            args: ['--yes', 'tsx', srcPath],
        }),
    },
    ts: {
        extension: '.ts',
        compiled: false,
        runCommand: (srcPath) => ({
            cmd: 'npx',
            args: ['--yes', 'tsx', srcPath],
        }),
    },
};
const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_COMPILE_TIMEOUT_MS = 15000;
const MAX_OUTPUT_BYTES = 256 * 1024;
let ExecutionService = ExecutionService_1 = class ExecutionService {
    logger = new common_1.Logger(ExecutionService_1.name);
    async runCode(code, language, testCases, config = {}) {
        return this.executeCode(language, code, testCases, config);
    }
    async executeCode(language, code, testCases, config = {}) {
        const langConfig = LANGUAGE_CONFIGS[language.toLowerCase()];
        if (!langConfig) {
            return testCases.map((tc) => ({
                id: tc.id,
                passed: false,
                status: exports.Status.SYSTEM_ERROR,
                output: '',
                expected: String(tc.expected ?? tc.output ?? ''),
                error: `Unsupported language: ${language}`,
            }));
        }
        if (typeof code !== 'string' || !code.trim()) {
            return testCases.map((tc) => ({
                id: tc.id,
                passed: false,
                status: exports.Status.SYSTEM_ERROR,
                output: '',
                expected: String(tc.expected ?? tc.output ?? ''),
                error: 'Source code is required',
            }));
        }
        if (Buffer.byteLength(code, 'utf8') > 1_000_000) {
            return testCases.map((tc) => ({
                id: tc.id,
                passed: false,
                status: exports.Status.SYSTEM_ERROR,
                output: '',
                expected: String(tc.expected ?? tc.output ?? ''),
                error: 'Source code exceeds the 1000000 byte limit',
            }));
        }
        const functionMode = config.executionMode === 'function';
        let sourceCode = code;
        if (functionMode) {
            const adapter = (0, language_adapters_1.getLanguageAdapter)(language);
            if (!adapter) {
                return testCases.map((tc) => ({
                    id: tc.id,
                    passed: false,
                    status: exports.Status.SYSTEM_ERROR,
                    output: '',
                    expected: String(tc.expected ?? tc.output ?? ''),
                    error: `Unsupported language: ${language}`,
                }));
            }
            try {
                sourceCode = adapter.prepare(code, 'function', config.functionSignature).source;
            }
            catch (error) {
                return testCases.map((tc) => ({
                    id: tc.id,
                    passed: false,
                    status: exports.Status.SYSTEM_ERROR,
                    output: '',
                    expected: String(tc.expected ?? tc.output ?? ''),
                    error: error?.message || 'Unable to generate function-mode wrapper',
                }));
            }
        }
        let timeout = DEFAULT_TIMEOUT_MS;
        if (config.executionProfiles?.[language]) {
            timeout *= config.executionProfiles[language].timeLimitMultiplier || 1;
        }
        if (config.timeLimit) {
            timeout = config.timeLimit;
        }
        const runOpts = {
            timeout: Math.max(100, Math.min(60_000, Number(timeout) || DEFAULT_TIMEOUT_MS)),
            memoryLimit: Math.max(32, Math.min(1_024, Number(config.memoryLimit) || 256)),
            cpuLimit: Math.max(0.25, Math.min(2, Number(config.cpuLimit) || 1)),
            language,
            config,
        };
        const normalizedTestCases = testCases.map((tc, i) => ({
            id: tc.id ?? i + 1,
            input: this.normalizeInput(tc.input, functionMode),
            expected: this.normalizeExpected(tc.expected ?? tc.output),
        }));
        if (langConfig.compiled) {
            return this.executeCompiled(langConfig, language, sourceCode, normalizedTestCases, runOpts);
        }
        return this.executeInterpreted(langConfig, language, sourceCode, normalizedTestCases, runOpts);
    }
    async runTestCasesConcurrently(testCases, concurrencyLimit, runFn) {
        const results = new Array(testCases.length);
        let index = 0;
        const workerCount = Math.min(concurrencyLimit, testCases.length);
        const workers = Array.from({ length: workerCount }, async () => {
            while (index < testCases.length) {
                const currentIndex = index++;
                results[currentIndex] = await runFn(testCases[currentIndex]);
            }
        });
        await Promise.all(workers);
        return results;
    }
    async executeCompiled(langConfig, language, code, testCases, opts) {
        const submissionId = (0, crypto_1.randomUUID)();
        const tmpDir = path.join(os.tmpdir(), `codeskill_${submissionId}`);
        fs.mkdirSync(tmpDir, { recursive: true });
        try {
            let processedCode = code;
            let filename = `solution${langConfig.extension}`;
            if (langConfig.preProcess) {
                const result = langConfig.preProcess(code, tmpDir);
                processedCode = result.code;
                filename = result.filename;
            }
            const srcPath = path.join(tmpDir, filename);
            fs.writeFileSync(srcPath, processedCode, 'utf-8');
            const outPath = path.join(tmpDir, 'solution');
            const compileResult = await this.compile(langConfig, srcPath, outPath, tmpDir, opts);
            if (compileResult.error) {
                return testCases.map((tc) => ({
                    id: tc.id,
                    passed: false,
                    status: exports.Status.COMPILATION_ERROR,
                    output: '',
                    expected: tc.expected,
                    error: compileResult.error,
                }));
            }
            return await this.runTestCasesConcurrently(testCases, 8, (tc) => this.runProcess(langConfig, srcPath, outPath, tmpDir, tc, opts));
        }
        finally {
            this.cleanup(tmpDir);
        }
    }
    async executeInterpreted(langConfig, language, code, testCases, opts) {
        const submissionId = (0, crypto_1.randomUUID)();
        const tmpDir = path.join(os.tmpdir(), `codeskill_${submissionId}`);
        fs.mkdirSync(tmpDir, { recursive: true });
        try {
            let processedCode = code;
            let filename = `solution${langConfig.extension}`;
            if (langConfig.preProcess) {
                const result = langConfig.preProcess(code, tmpDir);
                processedCode = result.code;
                filename = result.filename;
            }
            const srcPath = path.join(tmpDir, filename);
            fs.writeFileSync(srcPath, processedCode, 'utf-8');
            const outPath = path.join(tmpDir, 'solution');
            return await this.runTestCasesConcurrently(testCases, 8, (tc) => this.runProcess(langConfig, srcPath, outPath, tmpDir, tc, opts));
        }
        finally {
            this.cleanup(tmpDir);
        }
    }
    compile(langConfig, srcPath, outPath, cwd, opts) {
        if (!langConfig.compileCommand) {
            return Promise.resolve({ success: true });
        }
        const { cmd, args } = langConfig.compileCommand(srcPath, outPath, cwd);
        const securedCommand = this.sandboxCommand(cmd, args, cwd, opts);
        return new Promise((resolve) => {
            const child = (0, child_process_1.execFile)(securedCommand.cmd, securedCommand.args, {
                timeout: DEFAULT_COMPILE_TIMEOUT_MS,
                maxBuffer: MAX_OUTPUT_BYTES,
                cwd,
                env: this.getSafeEnv(),
            }, (error, stdout, stderr) => {
                if (error) {
                    const errorOutput = (stderr ||
                        stdout ||
                        error.message ||
                        '').substring(0, 2000);
                    const sanitized = this.sanitizeCompilerOutput(errorOutput, cwd);
                    resolve({ success: false, error: sanitized });
                }
                else {
                    resolve({ success: true });
                }
            });
        });
    }
    sandboxCommand(cmd, args, cwd, opts) {
        const sandbox = (process.env.JUDGE_SANDBOX ||
            (process.env.NODE_ENV === 'production' ? 'docker' : 'local')).toLowerCase();
        if (sandbox === 'local')
            return { cmd, args };
        if (sandbox !== 'docker') {
            throw new Error(`Unsupported JUDGE_SANDBOX value: ${sandbox}`);
        }
        const adapter = (0, language_adapters_1.getLanguageAdapter)(opts.language);
        const image = opts.config?.sandboxImage || adapter?.sandboxImage;
        if (!image) {
            throw new Error(`No approved sandbox image configured for ${opts.language}`);
        }
        const command = (0, language_adapters_1.commandBasename)({ cmd, args }, cwd);
        const memory = Math.max(32, Math.min(1_024, Number(opts.memoryLimit) || 256));
        const cpu = Math.max(0.25, Math.min(2, Number(opts.cpuLimit) || 1));
        return {
            cmd: 'docker',
            args: [
                'run',
                '--rm',
                '--network',
                'none',
                '--read-only',
                '--tmpfs',
                '/tmp:rw,noexec,nosuid,size=64m',
                '--pids-limit',
                '64',
                '--memory',
                `${memory}m`,
                '--memory-swap',
                `${memory}m`,
                '--cpus',
                String(cpu),
                '--cap-drop',
                'ALL',
                '--security-opt',
                'no-new-privileges',
                '--mount',
                `type=bind,src=${cwd},dst=/workspace`,
                '--workdir',
                '/workspace',
                image,
                command.cmd,
                ...command.args,
            ],
        };
    }
    runProcess(langConfig, srcPath, outPath, cwd, tc, opts) {
        const { cmd, args } = langConfig.runCommand(srcPath, outPath, cwd);
        const securedCommand = this.sandboxCommand(cmd, args, cwd, opts);
        return new Promise((resolve) => {
            const startTime = Date.now();
            let stdout = '';
            let stderr = '';
            let killed = false;
            let finished = false;
            const child = (0, child_process_1.spawn)(securedCommand.cmd, securedCommand.args, {
                cwd,
                env: this.getSafeEnv(),
                stdio: ['pipe', 'pipe', 'pipe'],
                detached: process.platform !== 'win32',
            });
            let outputSize = 0;
            child.stdout.on('data', (data) => {
                outputSize += data.length;
                if (outputSize <= MAX_OUTPUT_BYTES) {
                    stdout += data.toString();
                }
                else if (!killed) {
                    killed = true;
                    this.killProcessTree(child.pid);
                }
            });
            child.stderr.on('data', (data) => {
                stderr += data.toString();
                if (stderr.length > MAX_OUTPUT_BYTES) {
                    stderr = stderr.substring(0, MAX_OUTPUT_BYTES);
                }
            });
            if (tc.input) {
                try {
                    child.stdin.write(tc.input);
                    if (!tc.input.endsWith('\n')) {
                        child.stdin.write('\n');
                    }
                }
                catch {
                }
            }
            try {
                child.stdin.end();
            }
            catch {
            }
            const timer = setTimeout(() => {
                if (!finished) {
                    killed = true;
                    this.killProcessTree(child.pid);
                }
            }, opts.timeout);
            child.on('close', (exitCode, signal) => {
                if (finished)
                    return;
                finished = true;
                clearTimeout(timer);
                const executionTime = Date.now() - startTime;
                if (killed && outputSize > MAX_OUTPUT_BYTES) {
                    resolve({
                        id: tc.id,
                        passed: false,
                        status: exports.Status.RUNTIME_ERROR,
                        output: stdout.substring(0, 500),
                        expected: tc.expected,
                        error: 'Output limit exceeded',
                        executionTime,
                    });
                    return;
                }
                if (killed || signal === 'SIGKILL' || signal === 'SIGTERM') {
                    resolve({
                        id: tc.id,
                        passed: false,
                        status: exports.Status.TIME_LIMIT_EXCEEDED,
                        output: '',
                        expected: tc.expected,
                        error: `Time Limit Exceeded (${opts.timeout / 1000}s)`,
                        executionTime,
                    });
                    return;
                }
                if ((exitCode !== 0 && exitCode !== null) ||
                    (signal &&
                        signal !== 'SIGKILL' &&
                        signal !== 'SIGTERM')) {
                    const errorMsg = this.classifyRuntimeError(stderr, exitCode, signal);
                    resolve({
                        id: tc.id,
                        passed: false,
                        status: exports.Status.RUNTIME_ERROR,
                        output: stdout.trim().substring(0, 500),
                        expected: tc.expected,
                        error: errorMsg,
                        executionTime,
                    });
                    return;
                }
                const actualOutput = stdout.trim();
                const passed = this.compareOutput(actualOutput, tc.expected);
                resolve({
                    id: tc.id,
                    passed,
                    status: passed ? exports.Status.ACCEPTED : exports.Status.WRONG_ANSWER,
                    output: actualOutput.substring(0, 5000),
                    expected: tc.expected,
                    executionTime,
                });
            });
            child.on('error', (err) => {
                if (finished)
                    return;
                finished = true;
                clearTimeout(timer);
                resolve({
                    id: tc.id,
                    passed: false,
                    status: exports.Status.SYSTEM_ERROR,
                    output: '',
                    expected: tc.expected,
                    error: `Failed to start process: ${err.message}`,
                });
            });
        });
    }
    compareOutput(actual, expected) {
        if (actual === expected)
            return true;
        const actualLines = actual.split('\n').map((l) => l.trimEnd());
        const expectedLines = expected.split('\n').map((l) => l.trimEnd());
        while (actualLines.length > 0 &&
            actualLines[actualLines.length - 1] === '') {
            actualLines.pop();
        }
        while (expectedLines.length > 0 &&
            expectedLines[expectedLines.length - 1] === '') {
            expectedLines.pop();
        }
        if (actualLines.length !== expectedLines.length)
            return false;
        for (let i = 0; i < actualLines.length; i++) {
            if (actualLines[i] !== expectedLines[i])
                return false;
        }
        return true;
    }
    normalizeInput(input, functionMode = false) {
        if (input === null || input === undefined)
            return '';
        if (functionMode) {
            if (typeof input === 'string') {
                try {
                    JSON.parse(input);
                    return input;
                }
                catch {
                    return JSON.stringify(input);
                }
            }
            return JSON.stringify(input);
        }
        if (typeof input === 'string')
            return input;
        if (typeof input === 'object' && !Array.isArray(input)) {
            const values = Object.values(input);
            return values
                .map((v) => {
                if (Array.isArray(v))
                    return v.join(' ');
                return String(v);
            })
                .join('\n');
        }
        if (Array.isArray(input)) {
            return input.map((v) => String(v)).join('\n');
        }
        return String(input);
    }
    normalizeExpected(expected) {
        if (expected === null || expected === undefined)
            return '';
        if (typeof expected === 'string')
            return expected.trim();
        if (Array.isArray(expected)) {
            return JSON.stringify(expected);
        }
        if (typeof expected === 'object') {
            return JSON.stringify(expected);
        }
        return String(expected).trim();
    }
    getSafeEnv() {
        return {
            PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
            HOME: os.tmpdir(),
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            ...(process.env.JAVA_HOME ? { JAVA_HOME: process.env.JAVA_HOME } : {}),
        };
    }
    killProcessTree(pid) {
        if (!pid)
            return;
        try {
            process.kill(-pid, 'SIGKILL');
        }
        catch {
            try {
                process.kill(pid, 'SIGKILL');
            }
            catch {
            }
        }
    }
    classifyRuntimeError(stderr, exitCode, signal) {
        const lower = stderr.toLowerCase();
        if (signal === 'SIGSEGV' || lower.includes('segmentation fault')) {
            return 'Segmentation Fault (SIGSEGV)';
        }
        if (signal === 'SIGFPE' || lower.includes('floating point exception')) {
            return 'Floating Point Exception (SIGFPE)';
        }
        if (signal === 'SIGABRT' || lower.includes('abort')) {
            return 'Aborted (SIGABRT)';
        }
        if (lower.includes('out of memory') ||
            lower.includes('java.lang.outofmemoryerror')) {
            return 'Memory Limit Exceeded';
        }
        if (lower.includes('stack overflow') ||
            lower.includes('stackoverflowerror')) {
            return 'Stack Overflow';
        }
        if (lower.includes('exception') ||
            lower.includes('error') ||
            lower.includes('traceback')) {
            return stderr.substring(0, 500);
        }
        return `Runtime Error (exit code ${exitCode})`;
    }
    sanitizeCompilerOutput(output, tmpDir) {
        const escaped = tmpDir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return output.replace(new RegExp(escaped + '/?', 'g'), '');
    }
    cleanup(dir) {
        try {
            if (fs.existsSync(dir)) {
                fs.rmSync(dir, { recursive: true, force: true });
            }
        }
        catch (err) {
            this.logger.warn(`Failed to cleanup temp directory ${dir}: ${err}`);
        }
    }
};
exports.ExecutionService = ExecutionService;
exports.ExecutionService = ExecutionService = ExecutionService_1 = __decorate([
    (0, common_1.Injectable)()
], ExecutionService);
//# sourceMappingURL=execution.service.js.map