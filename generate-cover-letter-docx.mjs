#!/usr/bin/env node
/**
 * generate-cover-letter-docx.mjs — Markdown-ish cover letter → .docx
 * Usage: node generate-cover-letter-docx.mjs <input.md> <output.docx>
 */

import { Document, Packer, Paragraph, TextRun } from 'docx';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const inputPath = resolve(process.argv[2]);
const outputPath = resolve(process.argv[3]);
mkdirSync(dirname(outputPath), { recursive: true });

const raw = readFileSync(inputPath, 'utf8')
  .replace(/^\uFEFF/, '')
  .replace(/^# .+\r?\n+/, '')
  .trim();
const lines = raw.split(/\r?\n/);

const children = [];
let contentLineIndex = 0;

for (const line of lines) {
  const trimmed = line.trim();

  if (trimmed === '') {
    children.push(new Paragraph({ spacing: { after: 40 } }));
    continue;
  }

  const isBold = /^\*\*.*\*\*$/.test(trimmed);
  const cleanText = trimmed.replace(/\*\*/g, '').replace(/\s{2,}$/g, '');
  const isName = contentLineIndex === 0;
  const isHeader = contentLineIndex === 1 || contentLineIndex === 2;
  const isSubject = cleanText.startsWith('Re:');
  const isSignoff = cleanText.startsWith('Yours sincerely');
  const isClosingName = isSignoff ? false : contentLineIndex > 2 && cleanText === 'Nidhi Chowdary Gadde';
  const fontSize = isName ? 40 : isHeader ? 19 : isSubject ? 22 : 21;
  const color = isSubject ? '176C73' : isHeader ? '555555' : '1A1A2E';

  children.push(
    new Paragraph({
      spacing: {
        after: isName ? 90 : isHeader ? 35 : isSubject ? 210 : isSignoff ? 20 : isClosingName ? 0 : 135,
        line: isHeader ? 240 : 276,
      },
      children: [
        new TextRun({
          text: cleanText,
          font: isName ? 'Aptos Display' : 'Aptos',
          size: fontSize,
          bold: isBold || isName || isSubject,
          color,
        }),
      ],
    })
  );
  contentLineIndex += 1;
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Aptos',
          size: 21,
          color: '1A1A2E',
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: {
            width: 11906,
            height: 16838,
          },
          margin: {
            top: 936,
            right: 936,
            bottom: 936,
            left: 936,
          },
        },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(outputPath, buffer);
console.log(`✅ DOCX written: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
