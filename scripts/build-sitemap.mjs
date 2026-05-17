#!/usr/bin/env node
/**
 * Generate sitemap.xml covering all top-level pages and city pages.
 * Re-run after adding new pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const BASE = 'https://autobodysandiego.com';
const today = new Date().toISOString().slice(0, 10);

const corePages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/bumper-repair-san-diego', priority: '0.9', changefreq: 'monthly' },
  { loc: '/paint-repair-san-diego', priority: '0.9', changefreq: 'monthly' },
  { loc: '/collision-repair-san-diego', priority: '0.9', changefreq: 'monthly' },
  { loc: '/accident-repair-help-san-diego', priority: '0.9', changefreq: 'monthly' },
  { loc: '/insurance-auto-body-repair-san-diego', priority: '0.9', changefreq: 'monthly' },
  { loc: '/get-a-quote', priority: '0.85', changefreq: 'monthly' },
  { loc: '/service-areas', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const cities = JSON.parse(fs.readFileSync(path.join(root, 'data', 'cities.json'), 'utf8'));
const cityPages = cities.map(c => ({
  loc: `/auto-body-repair-${c.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const all = [...corePages, ...cityPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    p => `  <url>
    <loc>${BASE}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log(`Wrote sitemap.xml (${all.length} URLs).`);
