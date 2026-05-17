#!/usr/bin/env node
/**
 * One-off migration: align the live site to brand-identity.md v1.
 *
 * 1. Replace the "Specialist Network" footer column with a "Quick Links"
 *    column on every page (per v1 §3 — hide network names initially).
 * 2. Replace named specialist references in route blocks and ecosystem
 *    cards with generic descriptors (Bumper Specialist, Paint Specialist,
 *    Collision Specialist, Accident & Insurance Specialist).
 * 3. Keep data-route="specialist" attributes intact so the eventual
 *    reveal is one search-and-replace.
 *
 * Idempotent.
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

const FOOTER_OLD = `<div>
          <h4>Specialist Network</h4>
          <ul>
            <li><a href="#" data-route="specialist">BumperFix USA</a></li>
            <li><a href="#" data-route="specialist">PaintFix USA</a></li>
            <li><a href="#" data-route="specialist">CollisionFix USA</a></li>
            <li><a href="#" data-route="specialist">CrashFix USA</a></li>
            <li><a href="/get-a-quote">Get a Quote</a></li>
          </ul>
        </div>`;

const FOOTER_NEW = `<div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/service-areas">Service Areas</a></li>
            <li><a href="/get-a-quote">Get a Quote</a></li>
          </ul>
        </div>`;

// Route-block replacements (page-specific)
const ROUTE_REPLACEMENTS = [
  // BumperFix → Bumper Specialist
  {
    from: 'Routed to <span class="accent">BumperFix USA</span>',
    to: 'Routed to a <span class="accent">Bumper Specialist</span>',
  },
  {
    from: 'BumperFix USA is the bumper repair specialist in the AutoBody San Diego network. Plastic repair, color-matched refinishing, and a focused workflow that doesn\'t drag in unnecessary body work.',
    to: 'Your repair is matched to a bumper specialist in our San Diego network. Plastic repair, color-matched refinishing, and a focused workflow that doesn\'t drag in unnecessary body work.',
  },
  {
    from: 'Continue to BumperFix &rarr;',
    to: 'Continue to a Bumper Specialist &rarr;',
  },
  {
    from: 'You\'re routed to BumperFix USA &mdash; the bumper specialist in our network.',
    to: 'You\'re routed to a bumper specialist in our San Diego network.',
  },

  // PaintFix → Paint Specialist
  {
    from: 'Routed to <span class="accent">PaintFix USA</span>',
    to: 'Routed to a <span class="accent">Paint Specialist</span>',
  },
  {
    from: 'PaintFix USA is the paint specialist in the AutoBody San Diego network. Refinishing, color matching, panel blending, and full repaints &mdash; done by a team that paints all day, every day.',
    to: 'Your repair is matched to a paint specialist in our San Diego network. Refinishing, color matching, panel blending, and full repaints &mdash; done by a team that paints all day, every day.',
  },
  {
    from: 'Continue to PaintFix &rarr;',
    to: 'Continue to a Paint Specialist &rarr;',
  },
  {
    from: 'You\'re handed off to the paint specialist in our network with all your context already attached.',
    to: 'You\'re handed off to a paint specialist in our network with all your context already attached.',
  },

  // CollisionFix → Collision Specialist
  {
    from: 'Routed to <span class="accent">CollisionFix USA</span>',
    to: 'Routed to a <span class="accent">Collision Specialist</span>',
  },
  {
    from: 'CollisionFix USA is the collision repair specialist in the AutoBody San Diego network. Frame work, panel replacement, paint refinish, and ADAS calibration by certified collision shops.',
    to: 'Your repair is matched to a collision specialist in our San Diego network. Frame work, panel replacement, paint refinish, and ADAS calibration by certified collision shops.',
  },
  {
    from: 'Continue to CollisionFix &rarr;',
    to: 'Continue to a Collision Specialist &rarr;',
  },
  {
    from: 'Routed to CollisionFix USA',
    to: 'Routed to a Collision Specialist',
  },
  {
    from: 'You\'re handed to certified collision shops in our network &mdash; not a referral lottery.',
    to: 'You\'re handed to a certified collision shop in our network &mdash; not a referral lottery.',
  },

  // CrashFix → Accident & Insurance Specialist
  {
    from: 'Routed to <span class="accent">CrashFix USA</span>',
    to: 'Routed to an <span class="accent">Accident &amp; Insurance Specialist</span>',
  },
  {
    from: 'CrashFix USA is the accident and insurance specialist in the AutoBody San Diego network. Customer advocacy, estimate review, supplement help, and routing to certified shops &mdash; built for drivers, not insurers.',
    to: 'Your repair is matched to an accident & insurance specialist in our San Diego network. Customer advocacy, estimate review, supplement help, and routing to certified shops &mdash; built for drivers, not insurers.',
  },
  {
    from: 'CrashFix USA is the accident and insurance specialist in the AutoBody San Diego network. Estimate review, supplement guidance, OEM advocacy, and routing to shops that protect your repair &mdash; not the insurer\'s loss ratio.',
    to: 'Your repair is matched to an accident & insurance specialist in our San Diego network. Estimate review, supplement guidance, OEM advocacy, and routing to shops that protect your repair &mdash; not the insurer\'s loss ratio.',
  },
  {
    from: 'Continue to CrashFix &rarr;',
    to: 'Continue to a Specialist &rarr;',
  },
];

// City-template ecosystem cards (the "Specialist Routing" 4-card grid)
const CITY_ECO_OLD = `<div class="eco-card">
            <div class="label">Bumper Specialist</div>
            <h4>BumperFix <span class="accent">USA</span></h4>
            <p>Cosmetic bumper work, plastic repair, and color-matched refinish for {{CITY_NAME}} drivers.</p>
            <a class="arrow" href="#" data-route="specialist">Route to BumperFix &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Paint Specialist</div>
            <h4>PaintFix <span class="accent">USA</span></h4>
            <p>Refinish, panel paint, and full repaints with color matching done right.</p>
            <a class="arrow" href="#" data-route="specialist">Route to PaintFix &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Collision Specialist</div>
            <h4>CollisionFix <span class="accent">USA</span></h4>
            <p>Panel replacement, frame work, and ADAS calibration by certified collision shops.</p>
            <a class="arrow" href="#" data-route="specialist">Route to CollisionFix &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Accident &amp; Insurance</div>
            <h4>CrashFix <span class="accent">USA</span></h4>
            <p>Insurance claim help, estimate review, and customer advocacy for {{CITY_NAME}}.</p>
            <a class="arrow" href="#" data-route="specialist">Route to CrashFix &rarr;</a>
          </div>`;

const CITY_ECO_NEW = `<div class="eco-card">
            <div class="label">Bumper Damage</div>
            <h4>Bumper <span class="accent">Specialist</span></h4>
            <p>Cosmetic bumper work, plastic repair, and color-matched refinish for {{CITY_NAME}} drivers.</p>
            <a class="arrow" href="/bumper-repair-san-diego">Route to Bumper Repair &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Paint Damage</div>
            <h4>Paint <span class="accent">Specialist</span></h4>
            <p>Refinish, panel paint, and full repaints with color matching done right.</p>
            <a class="arrow" href="/paint-repair-san-diego">Route to Paint Repair &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Collision Damage</div>
            <h4>Collision <span class="accent">Specialist</span></h4>
            <p>Panel replacement, frame work, and ADAS calibration by certified collision shops.</p>
            <a class="arrow" href="/collision-repair-san-diego">Route to Collision Repair &rarr;</a>
          </div>
          <div class="eco-card">
            <div class="label">Accident / Insurance</div>
            <h4>Accident &amp; Insurance <span class="accent">Help</span></h4>
            <p>Insurance claim help, estimate review, and customer advocacy for {{CITY_NAME}}.</p>
            <a class="arrow" href="/accident-repair-help-san-diego">Route to Accident Help &rarr;</a>
          </div>`;

let touched = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Footer column swap
  html = html.replaceAll(FOOTER_OLD, FOOTER_NEW);

  // Service-page route block swaps
  for (const { from, to } of ROUTE_REPLACEMENTS) {
    html = html.replaceAll(from, to);
  }

  // City template ecosystem card swap
  if (file.endsWith('city.html')) {
    html = html.replace(CITY_ECO_OLD, CITY_ECO_NEW);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    touched++;
    console.log(`  updated ${path.relative(root, file)}`);
  }
}

console.log(`\nTouched ${touched} files.`);
