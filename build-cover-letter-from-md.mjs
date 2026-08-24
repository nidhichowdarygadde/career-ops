#!/usr/bin/env node
/**
 * Build a clean, one-page HTML cover letter from cover-letter markdown.
 * Usage: node build-cover-letter-from-md.mjs <input.md> <output.html>
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const inputPath = resolve(process.argv[2] || 'cover-letter-master.md');
const outputPath = resolve(process.argv[3] || 'output/cover-letter-master.html');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderText(text) {
  return escapeHtml(text.replace(/\s{2,}$/gm, '').trim())
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\r?\n/g, '<br>');
}

const raw = readFileSync(inputPath, 'utf8')
  .replace(/^\uFEFF/, '')
  .replace(/^# .+\r?\n+/, '')
  .trim();

const blocks = raw.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
if (blocks.length < 7) {
  throw new Error('Cover letter needs a header, subject, greeting, body, and sign-off.');
}

const headerLines = blocks.shift().split(/\r?\n/).map((line) => line.replace(/\s{2,}$/, '').trim());
const [name, contact, links] = headerLines;
if (!name || !contact || !links) {
  throw new Error('Cover letter header needs name, contact details, and profile links on separate lines.');
}
const letterBlocks = blocks;
const letterHtml = letterBlocks
  .map((block) => {
    const className = block.startsWith('Re:') ? 'subject' : block.startsWith('Yours sincerely') ? 'signoff' : '';
    return `    <p${className ? ` class="${className}"` : ''}>${renderText(block)}</p>`;
  })
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${renderText(name)} - Cover Letter</title>
<style>
  @font-face {
    font-family: 'Space Grotesk';
    src: url('./fonts/space-grotesk-latin.woff2') format('woff2');
    font-weight: 300 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'DM Sans';
    src: url('./fonts/dm-sans-latin.woff2') format('woff2');
    font-weight: 100 1000;
    font-style: normal;
  }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0;
    color: #1a1a2e;
    background: #fff;
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }
  .page { width: 100%; max-width: 210mm; margin: 0 auto; }
  h1 {
    margin: 0 0 6px;
    color: #1a1a2e;
    font-family: 'Space Grotesk', Arial, sans-serif;
    font-size: 28px;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .gradient {
    height: 2px;
    margin-bottom: 9px;
    border-radius: 1px;
    background: linear-gradient(to right, hsl(187, 74%, 32%), hsl(270, 70%, 45%));
  }
  .contact, .links { color: #555; font-size: 11.5px; line-height: 1.45; }
  .links { color: hsl(187, 74%, 28%); margin-top: 1px; }
  .header { margin-bottom: 24px; }
  p { margin: 0 0 15px; }
  .subject {
    margin-bottom: 20px;
    color: hsl(187, 74%, 28%);
    font-size: 13.5px;
    font-weight: 700;
  }
  .signoff { margin-top: 22px; margin-bottom: 0; }
</style>
</head>
<body>
<main class="page">
  <header class="header">
    <h1>${renderText(name)}</h1>
    <div class="gradient"></div>
    <div class="contact">${renderText(contact)}</div>
    <div class="links">${renderText(links)}</div>
  </header>
${letterHtml}
</main>
</body>
</html>
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, html);
console.log(`✅ HTML written: ${outputPath}`);
