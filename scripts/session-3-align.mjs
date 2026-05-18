#!/usr/bin/env node
/**
 * One-off migration: align the live site to session-3-architecture.md.
 *
 * 1. Replace the flat nav with the v3 dropdown-based nav (Repair Types →
 *    dropdown of 5 items; Insurance Help / Service Areas / About / CTA).
 * 2. Rename footer column 4 "Quick Links" → "Start Here" with the v3 link
 *    set (Get a Quote / Send Photos / Contact / About) + footer CTA.
 * 3. Tighten meta titles + descriptions for the homepage + 5 service pages
 *    + service areas to the §17/§18 locked specifications.
 *
 * Idempotent.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Active-page map: which menu item should get class="active" on which page.
const ACTIVE_MAP = {
  'index.html': null,
  'bumper-repair-san-diego.html': 'bumper',
  'paint-repair-san-diego.html': 'paint',
  'collision-repair-san-diego.html': 'collision',
  'accident-repair-help-san-diego.html': 'accident',
  'insurance-auto-body-repair-san-diego.html': 'insurance',
  'service-areas.html': 'service-areas',
  'about.html': 'about',
  'contact.html': null,
  'get-a-quote.html': 'cta',
  // City pages: nothing active
};

function buildNav(activeKey) {
  const isActive = (k) => activeKey === k ? ' class="active"' : '';
  const ctaClass = activeKey === 'cta'
    ? 'btn btn-primary btn-sm active'
    : 'btn btn-primary btn-sm';
  return `<nav class="cmd-nav" id="primaryNav">
        <div class="cmd-nav-dropdown">
          <button class="cmd-nav-toggle" aria-haspopup="true" aria-expanded="false">Repair Types <span class="caret">&#9662;</span></button>
          <div class="cmd-nav-menu">
            <a href="/bumper-repair-san-diego"${isActive('bumper')}>Bumper Repair</a>
            <a href="/paint-repair-san-diego"${isActive('paint')}>Paint Repair</a>
            <a href="/collision-repair-san-diego"${isActive('collision')}>Collision Repair</a>
            <a href="/accident-repair-help-san-diego"${isActive('accident')}>Accident Repair Help</a>
            <a href="/get-a-quote">Not Sure? Start Here</a>
          </div>
        </div>
        <a href="/insurance-auto-body-repair-san-diego"${isActive('insurance')}>Insurance Help</a>
        <a href="/service-areas"${isActive('service-areas')}>Service Areas</a>
        <a href="/about"${isActive('about')}>About</a>
        <a class="${ctaClass}" href="/get-a-quote">Get a Quote</a>
      </nav>`;
}

// Footer column 4 swap: "Quick Links" → "Start Here"
const FOOTER_OLD = `<div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/service-areas">Service Areas</a></li>
            <li><a href="/get-a-quote">Get a Quote</a></li>
          </ul>
        </div>`;

const FOOTER_NEW = `<div>
          <h4>Start Here</h4>
          <ul>
            <li><a href="/get-a-quote">Get a Quote</a></li>
            <li><a href="/get-a-quote">Send Photos</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>`;

// Meta title/description locked per §17, §18.
const META = {
  'index.html': {
    title: 'AutoBody San Diego | Bumper, Paint &amp; Collision Repair Help',
    desc: 'Find the right auto body repair path in San Diego. Get help with bumper damage, paint repair, collision damage, insurance-related repairs, and photo-based quote requests.',
  },
  'bumper-repair-san-diego.html': {
    title: 'Bumper Repair San Diego | Scratches, Cracks, Scuffs &amp; Paint Damage',
    desc: 'Need bumper repair in San Diego? Get help with scratched, cracked, scuffed, dented, or paint-damaged bumpers. Send photos for repair direction.',
  },
  'paint-repair-san-diego.html': {
    title: 'Paint Repair San Diego | Scratches, Clear Coat &amp; Car Paint Help',
    desc: 'Get paint repair help in San Diego for scratches, fading, peeling clear coat, paint chips, panel repainting, and full repaint questions.',
  },
  'collision-repair-san-diego.html': {
    title: 'Collision Repair San Diego | Auto Body Repair After an Accident',
    desc: 'Vehicle hit in an accident? AutoBody San Diego helps organize collision repair requests, damage photos, and repair direction for San Diego drivers.',
  },
  'insurance-auto-body-repair-san-diego.html': {
    title: 'Insurance Auto Body Repair San Diego | Claim &amp; Estimate Help',
    desc: 'Get help with San Diego insurance auto body repair: claims, estimates, supplements, OEM parts, and routing to shops that work for you, not the insurer.',
  },
  'service-areas.html': {
    title: 'Auto Body Repair Service Areas in San Diego County',
    desc: 'AutoBody San Diego service areas across San Diego County: Chula Vista, El Cajon, La Mesa, Escondido, Oceanside, Carlsbad, and more.',
  },
};

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html')).map(f => ({ name: f, path: path.join(root, f) }));
const templatePath = path.join(root, 'templates', 'city.html');
htmlFiles.push({ name: 'templates/city.html', path: templatePath });

let touched = 0;
for (const { name, path: filePath } of htmlFiles) {
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  // 1. Replace nav. The existing nav block starts with <nav class="cmd-nav"
  //    and ends with </nav>. Match and replace.
  const navRe = /<nav class="cmd-nav" id="primaryNav">[\s\S]*?<\/nav>/;
  const activeKey = name in ACTIVE_MAP ? ACTIVE_MAP[name] : null;
  html = html.replace(navRe, buildNav(activeKey));

  // 2. Replace footer column 4
  html = html.replace(FOOTER_OLD, FOOTER_NEW);

  // 3. Meta title + description for tracked pages
  if (META[name]) {
    const { title, desc } = META[name];
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${desc}">`);
  }

  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    touched++;
    console.log(`  updated ${name}`);
  }
}

console.log(`\nTouched ${touched} files.`);
