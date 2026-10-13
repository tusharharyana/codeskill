"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_LANGUAGES = exports.Status = void 0;
exports.canonicalLanguage = canonicalLanguage;
exports.Status = {
    ACCEPTED: 'accepted',
    WRONG_ANSWER: 'wrong_answer',
    COMPILATION_ERROR: 'compile_error',
    RUNTIME_ERROR: 'runtime_error',
    TIME_LIMIT_EXCEEDED: 'time_limit',
    MEMORY_LIMIT_EXCEEDED: 'memory_limit',
    SYSTEM_ERROR: 'system_error',
};
exports.SUPPORTED_LANGUAGES = [
    'c',
    'cpp',
    'c++',
    'java',
    'python',
    'python3',
    'py',
    'javascript',
    'js',
    'node',
    'typescript',
    'ts',
];
function canonicalLanguage(language) {
    switch (language.toLowerCase()) {
        case 'c':
            return 'c';
        case 'cpp':
        case 'c++':
            return 'cpp';
        case 'java':
            return 'java';
        case 'python':
        case 'python3':
        case 'py':
            return 'python';
        case 'javascript':
        case 'js':
        case 'node':
            return 'javascript';
        case 'typescript':
        case 'ts':
            return 'typescript';
        default:
            return undefined;
    }
}
//# sourceMappingURL=execution.types.js.map