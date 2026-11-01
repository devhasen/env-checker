"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const example = process.argv[2] || '.env.example';
const envFile = process.argv[3] || '.env';
function parse(p) {
    const out = {};
    if (!fs_1.default.existsSync(p))
        return out;
    for (const line of fs_1.default.readFileSync(p, 'utf8').split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#'))
            continue;
        const i = t.indexOf('=');
        if (i < 0)
            continue;
        out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
    return out;
}
const required = Object.keys(parse(example));
const actual = parse(envFile);
const missing = required.filter(k => !(k in actual) || actual[k] === '');
if (missing.length) {
    console.error('missing:', missing.join(', '));
    process.exit(1);
}
console.log('all required vars present');
