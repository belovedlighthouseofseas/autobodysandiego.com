#!/usr/bin/env node
/**
 * Generate one HTML file per entry in data/cities.json using templates/city.html.
 * Writes auto-body-repair-{slug}.html to the repo root.
 *
 * Re-run after editing the template or cities.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const cities = JSON.parse(fs.readFileSync(path.join(root, 'data', 'cities.json'), 'utf8'));
const template = fs.readFileSync(path.join(root, 'templates', 'city.html'), 'utf8');

function nearbyLinksFor(currentSlug) {
  // Pick up to 9 other cities (round-robin from list) for the "nearby coverage" grid.
  const others = cities.filter(c => c.slug !== currentSlug).slice(0, 9);
  return others
    .map(c => `<a href="/auto-body-repair-${c.slug}">${c.name}</a>`)
    .join('\n          ');
}

let written = 0;
for (const city of cities) {
  const html = template
    .replaceAll('{{CITY_NAME}}', city.name)
    .replaceAll('{{CITY_SLUG}}', city.slug)
    .replaceAll('{{CITY_REGION}}', city.region)
    .replaceAll('{{CITY_BLURB}}', city.blurb)
    .replace('{{NEARBY_LINKS}}', nearbyLinksFor(city.slug));

  const outPath = path.join(root, `auto-body-repair-${city.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  written++;
  console.log(`  wrote ${path.basename(outPath)}`);
}

console.log(`\nGenerated ${written} city pages.`);
