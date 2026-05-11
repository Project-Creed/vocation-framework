import { Chapter } from './chapters';

const CSS = `
* {
  box-sizing: border-box;
}

@page {
  size: 6in 9in;
  margin: 0.875in 0.75in 1in 0.875in;
}

body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 11.5pt;
  line-height: 1.65;
  color: #111;
}

.toc-page {
  page-break-after: always;
  padding-top: 0.5in;
}

.toc-heading {
  font-size: 14pt;
  font-weight: normal;
  font-variant: small-caps;
  letter-spacing: 0.15em;
  text-align: center;
  margin-bottom: 1.75rem;
}

.toc-entry {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.35rem;
  font-size: 9.5pt;
  line-height: 1.35;
}

.toc-title {
  flex-shrink: 0;
  max-width: 78%;
}

.toc-leader {
  flex-grow: 1;
  margin: 0 0.3rem;
  border-bottom: 1px dotted #aaa;
  position: relative;
  top: -0.2em;
  min-width: 1rem;
}

.toc-num {
  flex-shrink: 0;
  font-size: 9pt;
  color: #444;
}

section.title-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  page-break-after: always;
}

.title-page .book-title {
  font-size: 32pt;
  font-weight: normal;
  letter-spacing: 0.04em;
  margin-bottom: 1.25rem;
}

.title-page .book-subtitle {
  font-size: 13pt;
  font-style: italic;
  color: #444;
  margin-bottom: 3rem;
  max-width: 4in;
  line-height: 1.45;
}

.title-page .book-author {
  font-size: 12pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chapter {
  page-break-before: always;
}

.chapter:first-of-type {
  page-break-before: auto;
}

.chapter h1 {
  font-size: 19pt;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.02em;
  padding-top: 0.3in;
  margin-bottom: 0.6rem;
}

.chapter h2 {
  font-size: 11pt;
  font-weight: normal;
  font-variant: small-caps;
  letter-spacing: 0.1em;
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 0.6rem;
}

.chapter p {
  text-indent: 1.5em;
  margin: 0;
  text-align: justify;
  hyphens: auto;
}

.chapter h1 + p,
.chapter h2 + p,
.chapter hr + p,
.chapter blockquote + p {
  text-indent: 0;
}

.chapter strong {
  font-weight: bold;
}

.chapter em {
  font-style: italic;
}

.chapter hr {
  border: none;
  text-align: center;
  margin: 1.75rem 0;
}

.chapter hr::after {
  content: '* * *';
  font-size: 9.5pt;
  color: #888;
  letter-spacing: 0.35em;
}

.chapter blockquote {
  margin: 1rem 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid #ccc;
  font-style: italic;
  color: #444;
}

.chapter blockquote p {
  text-indent: 0;
}
`;

const TITLE_PAGE = `
<section class="title-page">
  <div class="book-title">The Vocation Framework</div>
  <div class="book-subtitle">A Practical Guide to Useful Work and Durable Contribution</div>
  <div class="book-author">Charlie Greenman</div>
</section>
`;

export function buildHtml(chapters: Chapter[], tocHtml = ''): string {
  const chaptersHtml = chapters
    .map((ch) => `<div class="chapter">${ch.html}</div>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>${CSS}</style>
</head>
<body>
  ${TITLE_PAGE}
  ${tocHtml}
  ${chaptersHtml}
</body>
</html>`;
}
