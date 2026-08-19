#!/usr/bin/env node
/**
 * generate-cover-letter-docx.mjs — Markdown-ish cover letter → .docx
 * Usage: node generate-cover-letter-docx.mjs <input.md> <output.docx>
 */

import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

const inputPath = resolve(process.argv[2]);
const outputPath = resolve(process.argv[3]);
mkdirSync(dirname(outputPath), { recursive: true });

const raw = readFileSync(inputPath, 'utf8').trim();
const lines = raw.split(/\r?\n/);

const children = [];

for (const line of lines) {
  const trimmed = line.trim();

  if (trimmed === '') {
    children.push(new Paragraph({ spacing: { after: 120 } }));
    continue;
  }

  const isBold = /^\*\*.*\*\*$/.test(trimmed);
  const cleanText = trimmed.replace(/\*\*/g, '').replace(/\\$/g, '');

  children.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: cleanText,
          font: 'Calibri',
          size: 22,
          bold: isBold,
        }),
      ],
    })
  );
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
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
