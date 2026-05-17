#!/usr/bin/env node
/**
 * One-off migration: replace the text-based .cmd-brand block with an <img>
 * across every HTML file (root + templates/city.html), and inject favicon
 * + og:image meta tags into each <head>.
 *
 * Idempotent — safe to re-run; swaps and inserts only happen if they haven't
 * already been applied.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const htmlFiles = [
  ...fs.readdirSync(root).filter(f => f.endsWith('.html')).map(f => path.join(root, f)),
  path.join(root, 'templates', 'city.html'),
];

// Matches the entire brand block (header or footer), tolerant of indentation/whitespace.
const brandRegex =
  /<span class="cmd-brand-top">AUTOBODY <span class="accent">SAN DIEGO<\/span><\/span>\s*<span class="cmd-brand-bot">Collision &middot; Paint &middot; Bumper &middot; Insurance<\/span>/g;

const replacement = `<img src="/assets/logo.png" alt="AutoBody San Diego — Collision, Paint, Bumper, Insurance Help" class="cmd-logo" width="180" height="101">`;

const faviconTag = `<link rel="icon" type="image/png" href="/assets/logo.png">`;
const ogImageTag = `<meta property="og:image" content="https://autobodysandiego.com/assets/logo.png">`;

let touched = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = html.replace(brandRegex, replacement);

  // Inject favicon if missing.
  if (!html.includes('rel="icon"')) {
    html = html.replace(/<link rel="stylesheet" href="assets\/styles\.css">/, `${faviconTag}\n  <link rel="stylesheet" href="assets/styles.css">`);
  }

  // Inject og:image if missing.
  if (!html.includes('og:image')) {
    html = html.replace(/(<meta property="og:url"[^>]*>)/, `$1\n  ${ogImageTag}`);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    touched++;
    console.log(`  updated ${path.relative(root, file)}`);
  }
}

console.log(`\nTouched ${touched} files.`);
