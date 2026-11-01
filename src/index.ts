import fs from 'fs';

const example = process.argv[2] || '.env.example';
const envFile = process.argv[3] || '.env';

function parse(p: string): Record<string,string> {
  const out: Record<string,string> = {};
  if (!fs.existsSync(p)) return out;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
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
