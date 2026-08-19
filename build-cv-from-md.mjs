#!/usr/bin/env node
/**
 * build-cv-from-md.mjs — Master CV: cv.md → filled HTML template
 * Usage: node build-cv-from-md.mjs [output.html]
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function mdInline(text) {
  return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function getSection(md, title) {
  const re = new RegExp(`## ${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`);
  return md.match(re)?.[1]?.trim() || '';
}

function parseHighlights(section) {
  return section
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => `      <li>${mdInline(line.slice(2).trim())}</li>`)
    .join('\n');
}

function parseExperience(section) {
  const jobs = [];
  const blocks = section.split(/\n(?=\*\*)/).filter(Boolean);

  for (const block of blocks) {
    const header = block.match(/^\*\*([^*]+)\*\*\s*\|\s*(.+)/);
    if (!header) continue;

    const [, role, period] = header;
    const rest = block.slice(header[0].length).trim().split('\n');
    const meta = [];
    const bullets = [];

    for (const line of rest) {
      if (line.startsWith('- ')) bullets.push(line.slice(2).trim());
      else if (line.trim()) meta.push(line.trim());
    }

    const company = meta[0] || '';
    const location = meta[1] || '';

    const bulletHtml = bullets
      .map((b) => `      <li>${mdInline(b)}</li>`)
      .join('\n');

    jobs.push(`    <div class="job">
      <div class="job-header">
        <div class="job-role">${escapeHtml(role.trim())}</div>
        <div class="job-period">${escapeHtml(period.trim())}</div>
      </div>
      <div class="job-company">${escapeHtml(company)}</div>
      ${location ? `<div class="job-location">${escapeHtml(location)}</div>` : ''}
      <ul>
${bulletHtml}
      </ul>
    </div>`);
  }

  return jobs.join('\n');
}

function parseEducation(section) {
  const items = [];
  const blocks = section.split(/\n(?=\*\*)/).filter(Boolean);

  for (const block of blocks) {
    const header = block.match(/^\*\*([^*]+)\*\*\s*\|\s*(.+)/);
    if (!header) continue;
    const [, title, year] = header;
    const rest = block
      .slice(header[0].length)
      .trim()
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const orgLine = rest[0] || '';
    const desc = rest.slice(1).join(' ');

    items.push(`    <div class="edu-item">
      <div class="edu-header">
        <div class="edu-title">${escapeHtml(title.trim())}</div>
        <div class="edu-year">${escapeHtml(year.trim())}</div>
      </div>
      ${orgLine ? `<div class="edu-org">${escapeHtml(orgLine)}</div>` : ''}
      ${desc ? `<div class="edu-desc">${escapeHtml(desc)}</div>` : ''}
    </div>`);
  }

  return items.join('\n');
}

function parseCertifications(section) {
  return section
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const text = line.slice(2).trim();
      // "DataCamp (2023-2026): course, course, ..."
      const m = text.match(/^(.+?)\s+(\([^)]+\):)\s*(.*)$/);
      if (m) {
        const [, org, years, courses] = m;
        return `      <li><span class="cert-org">${escapeHtml(org)}</span> ${escapeHtml(years)} ${escapeHtml(courses)}</li>`;
      }
      return `      <li>${mdInline(text)}</li>`;
    })
    .join('\n');
}

function parseSkills(section) {
  return section
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => `      <div class="skill-item">${mdInline(line)}</div>`)
    .join('\n');
}

/** Render CORE COMPETENCIES from the markdown (tags, not a hardcoded list). */
function parseCompetencies(section) {
  if (!section) return '';
  const bullets = section
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim().replace(/\*\*/g, ''));
  const tags = bullets.length
    ? bullets
    : section
        .replace(/\r?\n/g, ' ')
        .split(/\s*[|,]\s*/)
        .map((s) => s.replace(/\*\*/g, '').trim())
        .filter((s) => s && !s.startsWith('#'));
  return tags
    .slice(0, 10)
    .map((t) => `      <span class="competency-tag">${escapeHtml(t)}</span>`)
    .join('\n');
}

function extractContactBlock(md) {
  const fenced = md.match(/```[\r\n]+([\s\S]*?)[\r\n]+```/);
  if (fenced?.[1]?.includes('|')) return fenced[1].trim();
  const afterTitle = md.replace(/^# .+\r?\n+/, '');
  const firstPipe = afterTitle.split(/\r?\n/).map((l) => l.trim()).find((l) => l.includes('|'));
  if (firstPipe) return firstPipe.replace(/^`+|`+$/g, '');
  throw new Error('Contact block not found (need a fenced pipe-separated line or a contact line after the title)');
}

async function main() {
  const arg1 = process.argv[2];
  const arg2 = process.argv[3];
  const mdPath = resolve(root, arg1?.endsWith('.md') ? arg1 : 'cv.md');
  const outPath = resolve(
    root,
    arg1?.endsWith('.md') ? (arg2 || 'output/cv.html') : (arg1 || 'output/cv-nidhi-gadde-master.html')
  );
  mkdirSync(dirname(outPath), { recursive: true });

  const md = readFileSync(mdPath, 'utf8');
  let template = readFileSync(resolve(root, 'templates/cv-template.html'), 'utf8');

  const name = md.match(/^# (.+)/m)[1].trim();
  const contactBlock = extractContactBlock(md);
  const contactParts = contactBlock.split('|').map((s) => s.trim());
  const linkedinIdx = contactParts.findIndex((p) => /linkedin\.com/i.test(p));
  const emailIdx = contactParts.findIndex((p) => p.includes('@'));
  const phoneIdx = contactParts.findIndex((p) => /^\+?\d/.test(p));
  const phone = phoneIdx >= 0 ? contactParts[phoneIdx] : contactParts[0] || '';
  const email = emailIdx >= 0 ? contactParts[emailIdx] : contactParts[1] || '';
  const linkedinUrl = linkedinIdx >= 0 ? contactParts[linkedinIdx] : contactParts[2] || '';
  const remaining = contactParts.filter((_, i) => !([phoneIdx, emailIdx, linkedinIdx].includes(i)));
  const cityLocation = remaining.find((p) => !/work rights|visa|graduate/i.test(p)) || remaining[0] || '';
  const visa = remaining.find((p) => /work rights|visa|graduate/i.test(p)) || remaining[1] || '';

  const summary = getSection(md, 'PROFESSIONAL SUMMARY').replace(/\s+/g, ' ').trim();
  const highlights = getSection(md, 'KEY HIGHLIGHTS');
  const competencyHtml = parseCompetencies(getSection(md, 'CORE COMPETENCIES'));
  const skills = getSection(md, 'SKILLS');
  const experience = getSection(md, 'PROFESSIONAL EXPERIENCE');
  const community = getSection(md, 'COMMUNITY LEADERSHIP');
  const education = getSection(md, 'EDUCATION');
  const certifications = getSection(md, 'CERTIFICATIONS & PROFESSIONAL DEVELOPMENT');

  const linkedinDisplay = linkedinUrl.includes('linkedin.com')
    ? 'LinkedIn'
    : linkedinUrl;

  const replacements = {
    '{{LANG}}': 'en',
    '{{PAGE_WIDTH}}': '210mm',
    '{{NAME}}': escapeHtml(name),
    '{{PHONE}}': escapeHtml(phone),
    '{{EMAIL}}': escapeHtml(email),
    '{{LINKEDIN_URL}}': escapeHtml(linkedinUrl),
    '{{LINKEDIN_DISPLAY}}': escapeHtml(linkedinDisplay),
    '{{PORTFOLIO_URL}}': '#',
    '{{PORTFOLIO_DISPLAY}}': '',
    '{{LOCATION}}': escapeHtml(cityLocation),
    '{{VISA_STATUS}}': escapeHtml(visa),
    '{{SECTION_SUMMARY}}': 'Professional Summary',
    '{{SUMMARY_TEXT}}': escapeHtml(summary),
    '{{SECTION_HIGHLIGHTS}}': 'Key Highlights',
    '{{HIGHLIGHTS}}': parseHighlights(highlights),
    '{{SECTION_SKILLS}}': 'Skills',
    '{{SKILLS}}': parseSkills(skills),
    '{{SECTION_COMPETENCIES}}': competencyHtml ? 'Core Competencies' : '',
    '{{COMPETENCIES}}': competencyHtml,
    '{{SECTION_EXPERIENCE}}': 'Professional Experience',
    '{{EXPERIENCE}}': parseExperience(experience),
    '{{SECTION_PROJECTS}}': community ? 'Community Leadership' : '',
    '{{PROJECTS}}': community ? parseExperience(community) : '',
    '{{SECTION_EDUCATION}}': 'Education',
    '{{EDUCATION}}': parseEducation(education),
    '{{SECTION_CERTIFICATIONS}}': 'Certifications & Professional Development',
    '{{CERTIFICATIONS}}': `<ul class="cert-list">\n${parseCertifications(certifications)}\n    </ul>`,
  };

  // Hide empty projects section (Community Leadership reuses this block when present)
  if (!community) {
    template = template.replace(
      /  <!-- PROJECTS -->[\s\S]*?{{PROJECTS}}\s*\r?\n  <\/div>\r?\n\r?\n/,
      ''
    );
  }

  if (!highlights) {
    template = template.replace(
      /  <!-- KEY HIGHLIGHTS -->[\s\S]*?{{HIGHLIGHTS}}\s*\r?\n    <\/ul>\r?\n  <\/div>\r?\n\r?\n/,
      ''
    );
  }

  const competenciesBlockRe =
    /  <!-- CORE COMPETENCIES \(optional; hidden when empty\) -->[\s\S]*?{{COMPETENCIES}}\s*\r?\n    <\/div>\r?\n  <\/div>\r?\n\r?\n/;
  if (!competencyHtml) {
    template = template.replace(competenciesBlockRe, '');
  } else {
    const block = template.match(competenciesBlockRe)?.[0];
    if (block) {
      template = template.replace(competenciesBlockRe, '');
      template = template.replace(
        /(  <!-- PROFESSIONAL SUMMARY -->[\s\S]*?<\/div>\r?\n  <\/div>\r?\n\r?\n)/,
        `$1${block}`
      );
    }
  }

  // Remove portfolio link; keep city on the contact row
  template = template.replace(
    /\s*<span class="separator">\|<\/span>\s*\r?\n\s*<a href="{{PORTFOLIO_URL}}">{{PORTFOLIO_DISPLAY}}<\/a>/,
    ''
  );

  // Visa status on second contact row when present
  if (visa) {
    template = template.replace(
      /<\/div>\r?\n  <\/div>\r?\n\r?\n  <!-- PROFESSIONAL SUMMARY -->/,
      `</div>\r\n    <div class="contact-row contact-row-secondary">{{VISA_STATUS}}</div>\r\n  </div>\r\n\r\n  <!-- PROFESSIONAL SUMMARY -->`
    );
  }

  for (const [key, value] of Object.entries(replacements)) {
    template = template.split(key).join(value);
  }

  writeFileSync(outPath, template);
  console.log(`✅ HTML written: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
