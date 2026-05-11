import * as fs from 'fs';
import * as path from 'path';
import { loadChapters } from './chapters';
import { generatePdf } from './pdf';
import { generateEpub } from './kindle';

const args = process.argv.slice(2);
const wantPdf = args.includes('--pdf') || args.includes('--all') || args.length === 0;
const wantKindle = args.includes('--kindle') || args.includes('--all') || args.length === 0;

const srcDir = path.join(__dirname, '..', 'chapters');
const outputDir = path.join(__dirname, '..', 'output');
const coverPath = path.join(__dirname, '..', 'media', 'cover.jpg');
const maybeCoverPath = fs.existsSync(coverPath) ? coverPath : undefined;
const epubPath = path.join(outputDir, 'vocation-framework.epub');
const pdfPath = path.join(outputDir, 'vocation-framework.pdf');

async function main(): Promise<void> {
  console.log('Loading chapters from chapters/...');
  const chapters = loadChapters(srcDir);
  console.log(`  ${chapters.length} chapters found.\n`);

  if (wantKindle) {
    console.log('Generating EPUB (Kindle)...');
    await generateEpub(chapters, maybeCoverPath, epubPath);
    console.log(`  EPUB written to:  ${epubPath}\n`);
  }

  if (wantPdf) {
    console.log('Generating PDF (with TOC)...');
    await generatePdf(chapters, maybeCoverPath, pdfPath);
    console.log(`  PDF written to:   ${pdfPath}\n`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
