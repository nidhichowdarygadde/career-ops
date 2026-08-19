#!/usr/bin/env node
/**
 * generate-apply-pack.mjs — CSV → light fit score → tailored CV PDF + cover letter
 *
 * Usage:
 *   node generate-apply-pack.mjs --csv data/jobs.csv
 *   node generate-apply-pack.mjs --csv templates/jobs.example.csv --dry-run
 *   node generate-apply-pack.mjs --csv data/jobs.csv --limit 3 --parallel 2
 *
 * Requires GEMINI_API_KEY in .env (not needed for --dry-run / --help).
 */

import { spawn } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { dirname, isAbsolute, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

try {
  const { config } = await import('dotenv');
  config({ path: join(ROOT, '.env') });
} catch {
  // dotenv optional
}

const PATHS = {
  applyPack: join(ROOT, 'modes', 'apply-pack.md'),
  profileMd: join(ROOT, 'modes', '_profile.md'),
  profileYml: join(ROOT, 'config', 'profile.yml'),
  cvMaster: join(ROOT, 'cv-master'),
  cvMd: join(ROOT, 'cv.md'),
  coverMaster: join(ROOT, 'cover-letter-master.md'),
  gold: {
    'business-analyst': join(ROOT, 'cv-allegra-consulting-ba.md'),
    'bi-reporting': join(ROOT, 'cv-saltus-data-reporting-analyst.md'),
    'data-analyst': join(ROOT, 'cv-amp-pc-analyst.md'),
    'graduate-analyst': join(ROOT, 'cv-amp-pc-analyst.md'),
    'data-engineering': join(ROOT, 'cv-saltus-data-reporting-analyst.md'),
    'ml-modelling': join(ROOT, 'cv-amp-pc-analyst.md'),
    other: join(ROOT, 'cv-amp-pc-analyst.md'),
  },
  goldCover: {
    'business-analyst': join(ROOT, 'cover-letter-allegra-consulting.md'),
    'bi-reporting': join(ROOT, 'cover-letter-amp.md'),
    'data-analyst': join(ROOT, 'cover-letter-amp.md'),
    other: join(ROOT, 'cover-letter-amp.md'),
  },
  buildCv: join(ROOT, 'build-cv-from-md.mjs'),
  generatePdf: join(ROOT, 'generate-pdf.mjs'),
  generateDocx: join(ROOT, 'generate-cover-letter-docx.mjs'),
};

const FIT_THRESHOLD = 3.5;
const DEFAULT_MIN_SALARY = 80000;
const DEFAULT_PARALLEL = 3;
const DEFAULT_SCORE_MODEL = process.env.GEMINI_SCORE_MODEL || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const DEFAULT_TAILOR_MODEL = process.env.GEMINI_TAILOR_MODEL || process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function printHelp() {
  console.log(`
career-ops — Fast Apply Packs

  CSV of jobs (company, role, url, location, salary, jd_text) → light fit
  score → tailored CV PDF + cover letter DOCX. Does not submit applications.

USAGE
  node generate-apply-pack.mjs --csv <path> [options]
  npm run apply-pack -- --csv data/jobs.csv

OPTIONS
  --csv <path>         Job CSV (required except --help)
  --parallel N         Concurrent jobs (default: ${DEFAULT_PARALLEL})
  --limit N            Process only the first N rows
  --dry-run            Parse CSV and print the plan; no API calls
  --include-stretch    Keep adjacent stretch roles (do not skip 3.0–3.4 or coordinator-style)
  --out <dir>          Output root (default: output/apply-packs)
  --model-score <id>   Gemini model for scoring (default: ${DEFAULT_SCORE_MODEL})
  --model-tailor <id>  Gemini model for tailoring (default: ${DEFAULT_TAILOR_MODEL})
  --skip-compile       Write markdown only (no PDF/DOCX)
  --help               Show this help

CSV COLUMNS
  company, role, url, location, salary, jd_text
  jd_text may be the full JD, or a relative path to a .txt/.md file
  (e.g. jds/amp-pc-analyst.txt). See templates/jobs.example.csv.

SETUP
  GEMINI_API_KEY in .env  (same key as gemini-eval.mjs)
`);
}

function parseArgs(argv) {
  const opts = {
    csv: null,
    parallel: DEFAULT_PARALLEL,
    limit: null,
    dryRun: false,
    includeStretch: false,
    out: join(ROOT, 'output', 'apply-packs'),
    modelScore: DEFAULT_SCORE_MODEL,
    modelTailor: DEFAULT_TAILOR_MODEL,
    skipCompile: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') opts.help = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--include-stretch') opts.includeStretch = true;
    else if (a === '--skip-compile') opts.skipCompile = true;
    else if (a === '--csv' && argv[i + 1]) opts.csv = argv[++i];
    else if (a === '--parallel' && argv[i + 1]) opts.parallel = Math.max(1, parseInt(argv[++i], 10) || DEFAULT_PARALLEL);
    else if (a === '--limit' && argv[i + 1]) opts.limit = Math.max(1, parseInt(argv[++i], 10) || 1);
    else if (a === '--out' && argv[i + 1]) opts.out = resolve(argv[++i]);
    else if (a === '--model-score' && argv[i + 1]) opts.modelScore = argv[++i];
    else if (a === '--model-tailor' && argv[i + 1]) opts.modelTailor = argv[++i];
    else if (!a.startsWith('--') && !opts.csv) opts.csv = a;
    else throw new Error(`Unknown or incomplete argument: ${a}`);
  }
  return opts;
}

// ── CSV ──────────────────────────────────────────────────────────

function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field.replace(/\r$/, ''));
      field = '';
      if (row.some((cell) => String(cell).trim() !== '')) rows.push(row);
      row = [];
    } else if (c !== '\r') {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => String(cell).trim() !== '')) rows.push(row);
  }
  return rows;
}

function csvEscape(value) {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function loadJobs(csvPath) {
  const raw = readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
  const table = parseCsv(raw).filter((r) => r.length && !String(r[0]).trim().startsWith('#'));
  if (table.length < 2) throw new Error('CSV needs a header row and at least one job row');
  const header = table[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  const idx = (name) => header.indexOf(name);
  const required = ['company', 'role', 'jd_text'];
  for (const col of required) {
    if (idx(col) < 0) throw new Error(`CSV missing required column: ${col}`);
  }
  const jobs = [];
  table.slice(1).forEach((cells, i) => {
    const get = (name) => {
      const n = idx(name);
      return n < 0 ? '' : (cells[n] || '').trim();
    };
    const company = get('company');
    const role = get('role');
    if (!company && !role) return;
    jobs.push({
      index: i + 1,
      company,
      role,
      url: get('url'),
      location: get('location'),
      salary: get('salary'),
      jdRaw: get('jd_text'),
    });
  });
  return jobs;
}

function resolveJd(job) {
  const raw = job.jdRaw || '';
  const looksLikePath = !raw.includes('\n') && /\.(txt|md)$/i.test(raw) && raw.length < 260;
  if (!looksLikePath) {
    if (!raw.trim()) throw new Error(`Row ${job.index} (${job.company}): jd_text is empty`);
    return raw.trim();
  }
  const filePath = isAbsolute(raw) ? raw : join(ROOT, raw);
  if (!existsSync(filePath)) {
    throw new Error(`Row ${job.index} (${job.company}): JD file not found: ${raw}`);
  }
  const text = readFileSync(filePath, 'utf8').trim();
  if (!text) throw new Error(`Row ${job.index} (${job.company}): JD file is empty: ${raw}`);
  return text;
}

function slugify(s) {
  return String(s || 'unknown')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'item';
}

function kebabName(fullName) {
  return slugify(fullName || 'candidate');
}

function readOptional(path) {
  return existsSync(path) ? readFileSync(path, 'utf8').trim() : '';
}

function readRequired(path, label) {
  if (!existsSync(path)) throw new Error(`Missing ${label}: ${path}`);
  return readFileSync(path, 'utf8').trim();
}

function parseAudAmount(s) {
  const m = String(s || '').match(/(\d[\d,]*(?:\.\d+)?)\s*([kK])?/);
  if (!m) return DEFAULT_MIN_SALARY;
  let n = parseFloat(m[1].replace(/,/g, ''));
  if (m[2] || n < 1000) n *= 1000;
  return n;
}

function statedSalaryCeiling(salaryField, jd) {
  const text = `${salaryField || ''}\n${jd || ''}`;
  if (/not listed|not disclosed|competitive/i.test(salaryField || '')) return null;
  const amounts = [];
  const patterns = [
    /\$\s*(\d{2,3}(?:,\d{3})+)/g,
    /(?:AUD|A\$)\s*(\d{2,3}(?:[,\s]\d{3})+|\d{2,3}\s*[kK])/g,
    /(\d{2,3})\s*[-–]\s*(\d{2,3})\s*[kK]/g,
    /(\d{2,3})\s*[kK]/g,
  ];
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      if (m[2]) amounts.push(parseAudAmount(`${m[2]}k`));
      if (m[1]) amounts.push(parseAudAmount(m[1]));
    }
  }
  const reasonable = amounts.filter((n) => n >= 40000 && n <= 400000);
  if (!reasonable.length) return null;
  return Math.max(...reasonable);
}

function splitModeSections(md) {
  const scoreIdx = md.search(/^## SCORE\s*$/m);
  const tailorIdx = md.search(/^## TAILOR\s*$/m);
  if (scoreIdx < 0 || tailorIdx < 0) {
    throw new Error('modes/apply-pack.md must contain ## SCORE and ## TAILOR sections');
  }
  const preamble = md.slice(0, scoreIdx).trim();
  return {
    preamble,
    score: md.slice(scoreIdx, tailorIdx).trim(),
    tailor: md.slice(tailorIdx).trim(),
  };
}

function fillTemplate(text, vars) {
  return text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{{${key}}}`
  );
}

function pickGold(map, archetype, role) {
  const key = String(archetype || '').toLowerCase();
  const blob = `${key} ${role || ''}`;
  if (/business.?analyst|\bba\b/.test(blob) && existsSync(map['business-analyst'])) {
    return readOptional(map['business-analyst']);
  }
  if (/bi|reporting|dashboard|power bi/.test(blob) && existsSync(map['bi-reporting'])) {
    return readOptional(map['bi-reporting']);
  }
  const path = map[key] || map.other;
  return path && existsSync(path) ? readOptional(path) : '';
}

function extractJson(text) {
  const stripped = String(text || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('No JSON object in model output');
  return JSON.parse(stripped.slice(start, end + 1));
}

function extractBlocks(text) {
  const cv = text.match(/---CV_MARKDOWN---\s*([\s\S]*?)---COVER_LETTER---/);
  const cover = text.match(/---COVER_LETTER---\s*([\s\S]*?)---META---/);
  const meta = text.match(/---META---\s*([\s\S]*)$/);
  if (!cv || !cover) {
    throw new Error('Tailor output missing ---CV_MARKDOWN--- / ---COVER_LETTER--- blocks');
  }
  let metaObj = {};
  if (meta) {
    try {
      metaObj = extractJson(meta[1]);
    } catch {
      metaObj = {};
    }
  }
  return {
    cvMarkdown: cv[1].trim(),
    coverMarkdown: cover[1].trim(),
    meta: metaObj,
  };
}

async function geminiJson({ apiKey, modelName, system, user, temperature, maxOutputTokens }) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature,
      maxOutputTokens,
      responseMimeType: 'application/json',
    },
  });
  const result = await model.generateContent([{ text: system }, { text: user }]);
  return extractJson(result.response.text());
}

async function geminiText({ apiKey, modelName, system, user, temperature, maxOutputTokens }) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  });
  const result = await model.generateContent([{ text: system }, { text: user }]);
  return result.response.text();
}

async function withRetry(fn, attempts = 2) {
  let last;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw last;
}

function runNode(script, args) {
  return new Promise((resolveP, reject) => {
    const child = spawn(process.execPath, [script, ...args], {
      cwd: ROOT,
      windowsHide: true,
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => {
      stdout += d;
    });
    child.stderr.on('data', (d) => {
      stderr += d;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error((stderr || stdout || `exit ${code}`).trim().slice(0, 2000)));
      } else {
        resolveP({ stdout, stderr });
      }
    });
  });
}

function parsePageCount(stdout) {
  const m = String(stdout || '').match(/Pages:\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSection(md, title) {
  const re = new RegExp(`## ${escapeRegExp(title)}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`);
  return md.match(re)?.[1]?.trim() || '';
}

function dropSection(md, title) {
  const re = new RegExp(`\\n## ${escapeRegExp(title)}\\s*\\n[\\s\\S]*?(?=\\n## |$)`);
  return md.replace(re, '\n');
}

function dropRole(md, roleRe) {
  const experience = getSection(md, 'PROFESSIONAL EXPERIENCE');
  if (!experience) return md;
  const blocks = experience.split(/\n(?=\*\*)/).filter(Boolean);
  const kept = blocks.filter((b) => !roleRe.test(b.split('\n')[0] || ''));
  if (kept.length === blocks.length) return md;
  return md.replace(experience, kept.join('\n').trim());
}

function trimLongestRoleBullet(md) {
  const experience = getSection(md, 'PROFESSIONAL EXPERIENCE');
  if (!experience) return md;
  const blocks = experience.split(/\n(?=\*\*)/).filter(Boolean);
  let bestIdx = -1;
  let bestCount = 0;
  blocks.forEach((b, i) => {
    const n = (b.match(/^- /gm) || []).length;
    if (n > bestCount) {
      bestCount = n;
      bestIdx = i;
    }
  });
  if (bestIdx < 0 || bestCount <= 3) return md;
  const lines = blocks[bestIdx].split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('- ')) {
      lines.splice(i, 1);
      break;
    }
  }
  blocks[bestIdx] = lines.join('\n');
  return md.replace(experience, blocks.join('\n').trim());
}

function autoTrim(md, jdText) {
  let next = md;
  if (/## COMMUNITY LEADERSHIP/i.test(next)) {
    next = dropSection(next, 'COMMUNITY LEADERSHIP');
    return { md: next, action: 'dropped Community Leadership' };
  }
  if (/Machine Learning Engineer/i.test(next)) {
    next = dropRole(next, /Machine Learning Engineer/);
    return { md: next, action: 'dropped Machine Learning Engineer' };
  }
  if (
    /Research Data Analyst/i.test(next) &&
    !/research|public health|health|ndis|policy|epidemiolog/i.test(jdText)
  ) {
    next = dropRole(next, /Research Data Analyst/);
    return { md: next, action: 'dropped Research Data Analyst' };
  }
  const trimmed = trimLongestRoleBullet(next);
  if (trimmed !== next) return { md: trimmed, action: 'dropped one bullet from longest role' };
  return { md: next, action: 'no further trim available' };
}

function allowedOrgs(cvMaster) {
  const orgs = new Set([
    'Monash University',
    'Cognizant',
    'Phoenix Global',
    'Grad Girls Tech Program',
    'Women4STEM',
    'Gandhi Institute of Technology & Management',
  ]);
  const blob = `${getSection(cvMaster, 'PROFESSIONAL EXPERIENCE')}\n${getSection(cvMaster, 'COMMUNITY LEADERSHIP')}\n${getSection(cvMaster, 'EDUCATION')}`;
  for (const line of blob.split(/\r?\n/)) {
    const t = line.replace(/\*\*/g, '').trim();
    if (
      /University|Cognizant|Phoenix|Women4STEM|Grad Girls|Gandhi Institute/i.test(t) &&
      !/Analyst|Engineer|Developer|Lead|Coordinator|Scientist/.test(t)
    ) {
      orgs.add(t.split(',')[0].trim());
    }
  }
  return [...orgs].filter(Boolean);
}

function stripAiPunctuation(text) {
  return String(text || '')
    .replace(/\u2014/g, ', ')
    .replace(/\u2013/g, '-')
    .replace(/\u2192/g, ' to ')
    .replace(/\u2026/g, '...')
    .replace(/[\u2022\u00B7\u2605]/g, '')
    .replace(/ +,/g, ',')
    .replace(/, ,/g, ',')
    .replace(/  +/g, ' ');
}

function qaPack({ cvMarkdown, coverMarkdown, keywords, cvMaster }) {
  const warnings = [];
  const errors = [];
  const cvLower = cvMarkdown.toLowerCase();
  const kw = (keywords || []).filter(Boolean);
  const hits = kw.filter((k) => cvLower.includes(String(k).toLowerCase()));
  const coverage = kw.length ? hits.length / kw.length : 1;
  if (kw.length && coverage < 0.4) {
    warnings.push(`keyword coverage ${(coverage * 100).toFixed(0)}% (${hits.length}/${kw.length})`);
  }
  if (/zara/i.test(cvMarkdown)) errors.push('mentions Zara (must not appear on tailored CVs)');
  if (/FIT\d{4}/i.test(cvMarkdown)) warnings.push('contains unit codes (FIT####)');
  const allow = allowedOrgs(cvMaster).map((o) => o.toLowerCase());
  const experience = getSection(cvMarkdown, 'PROFESSIONAL EXPERIENCE') + '\n' + getSection(cvMarkdown, 'COMMUNITY LEADERSHIP');
  const blocks = experience.split(/\n(?=\*\*)/).filter(Boolean);
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const roleLine = lines[0] || 'role';
    const bullets = lines.filter((l) => l.startsWith('- ')).length;
    if (/^\*\*.+\*\*\s*\|/.test(roleLine) && bullets < 3) {
      errors.push(`fewer than 3 bullets: ${roleLine.slice(0, 80)} (${bullets})`);
    }
    const companyLine = lines.find((l, i) => i > 0 && !l.startsWith('- ') && !l.includes('|'));
    if (!companyLine) continue;
    const org = companyLine.replace(/\*\*/g, '').split(',')[0].trim();
    if (org.length < 3) continue;
    const ok = allow.some((a) => org.toLowerCase().includes(a) || a.includes(org.toLowerCase()));
    if (!ok && !/melbourne|australia|hyderabad|visakhapatnam|india/i.test(org)) {
      errors.push(`unrecognised employer: ${org}`);
    }
  }
  const summary = getSection(cvMarkdown, 'PROFESSIONAL SUMMARY');
  if (summary && !/\bI\b/.test(summary)) {
    errors.push('Professional Summary is not first person (missing "I")');
  }
  if (/\b(Brings|Holds|Possesses|Seasoned|Passionate|Results-driven|Eager)\b/.test(summary)) {
    errors.push('Professional Summary uses third-person or junior/AI phrasing');
  }
  const dashScan = `${cvMarkdown}\n${coverMarkdown || ''}`;
  if (/[\u2014\u2013]/.test(dashScan)) {
    warnings.push('em dash or en dash still present after sanitise');
  }
  return { warnings, errors, keywordCoverage: coverage, keywordsMatched: hits.length, keywordsTotal: kw.length };
}

function jobContextUser({ job, jd, profileYml, profileMd, cvMaster, goldCv, goldCover, coverMaster }) {
  return [
    `COMPANY: ${job.company}`,
    `ROLE: ${job.role}`,
    `URL: ${job.url || ''}`,
    `LOCATION: ${job.location || ''}`,
    `SALARY FIELD: ${job.salary || ''}`,
    '',
    '═══════════════════════════════════════════════════════',
    'JOB DESCRIPTION',
    '═══════════════════════════════════════════════════════',
    jd,
    '',
    '═══════════════════════════════════════════════════════',
    'PROFILE YML',
    '═══════════════════════════════════════════════════════',
    profileYml || '[missing]',
    '',
    '═══════════════════════════════════════════════════════',
    'PROFILE MD (follow these CV rules)',
    '═══════════════════════════════════════════════════════',
    profileMd || '[missing]',
    '',
    '═══════════════════════════════════════════════════════',
    'CV MASTER (source of truth — do not invent beyond this)',
    '═══════════════════════════════════════════════════════',
    cvMaster,
    goldCv
      ? `\n═══════════════════════════════════════════════════════\nGOLD CV (layout and voice only)\n═══════════════════════════════════════════════════════\n${goldCv}`
      : '',
    coverMaster
      ? `\n═══════════════════════════════════════════════════════\nCOVER MASTER (slots + structure)\n═══════════════════════════════════════════════════════\n${coverMaster}`
      : '',
    goldCover
      ? `\n═══════════════════════════════════════════════════════\nGOLD COVER (shape to imitate)\n═══════════════════════════════════════════════════════\n${goldCover}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  const n = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

function loadMinSalary(profileYmlText) {
  try {
    // Avoid a hard yaml parse failure if js-yaml shape differs
    const m = profileYmlText.match(/minimum:\s*"?([^"\n]+)"?/);
    return parseAudAmount(m?.[1] || '');
  } catch {
    return DEFAULT_MIN_SALARY;
  }
}

function candidateName(profileYmlText) {
  const m = profileYmlText.match(/full_name:\s*"?([^"\n]+)"?/);
  return (m?.[1] || 'Nidhi Chowdary Gadde').trim();
}

async function processJob(job, ctx) {
  const started = Date.now();
  const slug = `${slugify(job.company)}-${slugify(job.role)}`;
  const dir = join(ctx.outDir, slug);
  mkdirSync(dir, { recursive: true });

  const result = {
    company: job.company,
    role: job.role,
    url: job.url,
    slug,
    dir,
    score: '',
    decision: 'ERROR',
    reason: '',
    cvPdf: '',
    coverDocx: '',
    pages: '',
    qa: '',
    elapsedMs: 0,
  };

  try {
    const jd = resolveJd(job);
    const vars = {
      FIT_THRESHOLD: String(ctx.fitThreshold),
      MIN_SALARY_AUD: String(ctx.minSalary),
      INCLUDE_STRETCH: ctx.includeStretch ? 'true' : 'false',
    };
    const scoreSystem = fillTemplate(`${ctx.sections.preamble}\n\n${ctx.sections.score}`, vars);
    const user = jobContextUser({
      job,
      jd,
      profileYml: ctx.profileYml,
      profileMd: ctx.profileMd,
      cvMaster: ctx.cvMaster,
      goldCv: '',
      goldCover: '',
      coverMaster: '',
    });

    const score = await withRetry(() =>
      geminiJson({
        apiKey: ctx.apiKey,
        modelName: ctx.modelScore,
        system: scoreSystem,
        user: `Score this job. Return JSON only.\n\n${user}`,
        temperature: 0.2,
        maxOutputTokens: 2048,
      })
    );

    let decision = String(score.decision || '').toUpperCase() === 'APPLY' ? 'APPLY' : 'SKIP';
    let reason = score.reason || '';
    const numericScore = Number(score.score);
    const skipFlags = Array.isArray(score.skip_flags) ? score.skip_flags : [];

    if (!ctx.includeStretch && Number.isFinite(numericScore) && numericScore < ctx.fitThreshold) {
      decision = 'SKIP';
      if (!skipFlags.includes('low-score')) skipFlags.push('low-score');
      reason = reason || `Score ${numericScore} below ${ctx.fitThreshold}`;
    }

    const ceiling = statedSalaryCeiling(job.salary, jd);
    if (!ctx.includeStretch && ceiling && ceiling < ctx.minSalary) {
      decision = 'SKIP';
      if (!skipFlags.includes('comp-floor')) skipFlags.push('comp-floor');
      reason = reason || `Stated salary ceiling ${ceiling} below ${ctx.minSalary}`;
    }

    const scorePayload = {
      ...score,
      decision,
      reason,
      skip_flags: skipFlags,
      score: Number.isFinite(numericScore) ? numericScore : score.score,
    };
    writeFileSync(join(dir, 'score.json'), JSON.stringify(scorePayload, null, 2), 'utf8');

    result.score = Number.isFinite(numericScore) ? numericScore.toFixed(1) : String(score.score || '');
    result.decision = decision;
    result.reason = reason;

    if (decision !== 'APPLY') {
      result.elapsedMs = Date.now() - started;
      writeFileSync(
        join(dir, 'SKIP.md'),
        `# SKIP ${job.company} — ${job.role}\n\n**Score:** ${result.score}/5\n**Reason:** ${reason}\n`,
        'utf8'
      );
      return result;
    }

    const archetype = score.archetype || 'data-analyst';
    const goldCv = pickGold(PATHS.gold, archetype, job.role);
    const goldCover = pickGold(PATHS.goldCover, archetype, job.role);
    const tailorSystem = fillTemplate(`${ctx.sections.preamble}\n\n${ctx.sections.tailor}`, vars);
    const tailorUser = jobContextUser({
      job,
      jd,
      profileYml: ctx.profileYml,
      profileMd: ctx.profileMd,
      cvMaster: ctx.cvMaster,
      goldCv,
      goldCover,
      coverMaster: ctx.coverMaster,
    });

    const tailorText = await withRetry(() =>
      geminiText({
        apiKey: ctx.apiKey,
        modelName: ctx.modelTailor,
        system: tailorSystem,
        user: `Tailor the CV and cover letter for this job. Output the three blocks exactly.\n\n${tailorUser}`,
        temperature: 0.35,
        maxOutputTokens: 16384,
      })
    );

    let { cvMarkdown, coverMarkdown, meta } = extractBlocks(tailorText);
    cvMarkdown = stripAiPunctuation(cvMarkdown);
    coverMarkdown = stripAiPunctuation(coverMarkdown);
    const candidate = kebabName(ctx.fullName);
    const cvBase = `cv-${candidate}-${slug}`;
    const coverBase = `cover-letter-${slug}`;
    const cvMdPath = join(dir, `${cvBase}.md`);
    const coverMdPath = join(dir, `${coverBase}.md`);
    writeFileSync(cvMdPath, cvMarkdown.endsWith('\n') ? cvMarkdown : `${cvMarkdown}\n`, 'utf8');
    writeFileSync(coverMdPath, coverMarkdown.endsWith('\n') ? coverMarkdown : `${coverMarkdown}\n`, 'utf8');

    const extraWarnings = [];
    let pages = null;

    if (!ctx.skipCompile) {
      const htmlPath = join(dir, `${cvBase}.html`);
      const pdfPath = join(dir, `${cvBase}.pdf`);
      const docxPath = join(dir, `${coverBase}.docx`);

      await runNode(PATHS.buildCv, [cvMdPath, htmlPath]);
      const pdfRun = await runNode(PATHS.generatePdf, [htmlPath, pdfPath, '--format=a4']);
      pages = parsePageCount(pdfRun.stdout);

      if (pages != null && pages > 2) {
        const trimmed = autoTrim(cvMarkdown, jd);
        if (trimmed.action !== 'no further trim available') {
          cvMarkdown = trimmed.md;
          writeFileSync(cvMdPath, cvMarkdown.endsWith('\n') ? cvMarkdown : `${cvMarkdown}\n`, 'utf8');
          await runNode(PATHS.buildCv, [cvMdPath, htmlPath]);
          const pdfRun2 = await runNode(PATHS.generatePdf, [htmlPath, pdfPath, '--format=a4']);
          pages = parsePageCount(pdfRun2.stdout);
          extraWarnings.push(`auto-trim: ${trimmed.action}; pages now ${pages ?? '?'}`);
        } else {
          extraWarnings.push(`PDF is ${pages} pages; no further trim available`);
        }
      }

      try {
        await runNode(PATHS.generateDocx, [coverMdPath, docxPath]);
        result.coverDocx = docxPath;
      } catch (err) {
        extraWarnings.push(`cover DOCX failed: ${err.message}`);
      }

      result.cvPdf = pdfPath;
      result.pages = pages == null ? '' : String(pages);
      if (pages != null && pages > 2) extraWarnings.push(`still ${pages} pages after trim`);
    }

    const qa = {
      ...qaPack({ cvMarkdown, coverMarkdown, keywords: score.keywords || [], cvMaster: ctx.cvMaster }),
      pages,
      meta,
    };
    qa.warnings = [...(qa.warnings || []), ...extraWarnings];
    writeFileSync(join(dir, 'qa.json'), JSON.stringify(qa, null, 2), 'utf8');
    const qaBits = [];
    if (qa.errors?.length) qaBits.push(`errors:${qa.errors.length}`);
    if (qa.warnings?.length) qaBits.push(`warn:${qa.warnings.length}`);
    if (qa.keywordsTotal) qaBits.push(`kw:${qa.keywordsMatched}/${qa.keywordsTotal}`);
    result.qa = qaBits.join(' ') || 'ok';
    result.elapsedMs = Date.now() - started;
    return result;
  } catch (err) {
    result.reason = (err.message || String(err)).replace(/\s+/g, ' ').slice(0, 300);
    result.elapsedMs = Date.now() - started;
    writeFileSync(
      join(dir, 'error.txt'),
      `${result.reason}\n`,
      'utf8'
    );
    return result;
  }
}

async function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`❌  ${err.message}`);
    printHelp();
    process.exit(1);
  }

  if (opts.help || !opts.csv) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }

  const csvPath = resolve(opts.csv);
  if (!existsSync(csvPath)) {
    console.error(`❌  CSV not found: ${csvPath}`);
    process.exit(1);
  }

  let jobs = loadJobs(csvPath);
  if (opts.limit) jobs = jobs.slice(0, opts.limit);

  console.log(`\n📦  Apply Packs  |  ${jobs.length} job(s) from ${csvPath}`);
  console.log(`    parallel=${opts.parallel}  dry-run=${opts.dryRun}  stretch=${opts.includeStretch}\n`);

  if (opts.dryRun) {
    for (const job of jobs) {
      let jdNote = 'inline JD';
      try {
        const jd = resolveJd(job);
        jdNote = `${jd.length} chars`;
      } catch (err) {
        jdNote = `ERROR: ${err.message}`;
      }
      console.log(`  ${job.index}. ${job.company} — ${job.role}  [${jdNote}]`);
      if (job.url) console.log(`     ${job.url}`);
    }
    console.log('\nDry run complete. Re-run without --dry-run to generate packs.\n');
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(`
❌  GEMINI_API_KEY not found.

   1. Get a key at https://aistudio.google.com/apikey
   2. Add it to .env:   GEMINI_API_KEY=your_key_here
`);
    process.exit(1);
  }

  const profileYml = readOptional(PATHS.profileYml);
  const profileMd = readOptional(PATHS.profileMd);
  const cvMaster = existsSync(PATHS.cvMaster)
    ? readRequired(PATHS.cvMaster, 'cv-master')
    : readRequired(PATHS.cvMd, 'cv.md');
  const coverMaster = readOptional(PATHS.coverMaster);
  const sections = splitModeSections(readRequired(PATHS.applyPack, 'modes/apply-pack.md'));
  const minSalary = loadMinSalary(profileYml);
  const fullName = candidateName(profileYml);

  mkdirSync(opts.out, { recursive: true });

  const ctx = {
    apiKey,
    outDir: opts.out,
    modelScore: opts.modelScore,
    modelTailor: opts.modelTailor,
    includeStretch: opts.includeStretch,
    skipCompile: opts.skipCompile,
    fitThreshold: FIT_THRESHOLD,
    minSalary,
    fullName,
    profileYml,
    profileMd,
    cvMaster,
    coverMaster,
    sections,
  };

  console.log(`🤖  score=${opts.modelScore}  tailor=${opts.modelTailor}\n`);

  const results = await mapPool(jobs, opts.parallel, async (job) => {
    process.stdout.write(`→  ${job.company} — ${job.role}\n`);
    const row = await processJob(job, ctx);
    const mark = row.decision === 'APPLY' ? '✅' : row.decision === 'SKIP' ? '⏭ ' : '❌';
    console.log(
      `${mark} ${job.company}  ${row.decision}  ${row.score || '—'}/5  ${(row.elapsedMs / 1000).toFixed(1)}s  ${row.reason || row.qa}`
    );
    return row;
  });

  const indexPath = join(opts.out, '_index.csv');
  const header = [
    'company',
    'role',
    'url',
    'score',
    'decision',
    'reason',
    'cv_pdf',
    'cover_docx',
    'pages',
    'qa',
    'elapsed_ms',
    'folder',
  ];
  const lines = [header.join(',')];
  for (const r of results) {
    lines.push(
      [
        csvEscape(r.company),
        csvEscape(r.role),
        csvEscape(r.url),
        csvEscape(r.score),
        csvEscape(r.decision),
        csvEscape(r.reason),
        csvEscape(r.cvPdf),
        csvEscape(r.coverDocx),
        csvEscape(r.pages),
        csvEscape(r.qa),
        csvEscape(r.elapsedMs),
        csvEscape(r.dir),
      ].join(',')
    );
  }
  writeFileSync(indexPath, `${lines.join('\n')}\n`, 'utf8');

  const applied = results.filter((r) => r.decision === 'APPLY').length;
  const skipped = results.filter((r) => r.decision === 'SKIP').length;
  const errors = results.filter((r) => r.decision === 'ERROR').length;
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  APPLY ${applied}  |  SKIP ${skipped}  |  ERROR ${errors}  |  ${results.length} total`);
  console.log(`  Index: ${indexPath}`);
  console.log(`${'─'.repeat(60)}\n`);
  console.log('Review APPLY rows, then upload the PDF and DOCX yourself. This script does not submit applications.\n');

  if (errors) process.exit(1);
}

main().catch((err) => {
  console.error('❌  Apply pack failed:', err.message);
  process.exit(1);
});
