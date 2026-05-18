#!/usr/bin/env node
/**
 * One-off image processing: crop the Canva export "icon.png" — which has
 * three variants stacked on a 2000x2000 canvas — into clean separate logos.
 *
 * Input layout (eyeballed from the 2000x2000 export):
 *   y ~150  -> ~ 550   "AUTOBODY" + blue slash       (slim horizontal)
 *   y ~700  -> ~1050   "AUTOBODY / SAN DIEGO"        (stacked compact)
 *   y ~1180 -> ~1620   "SD shield + AUTOBODY"        (horizontal lockup)
 *
 * Outputs:
 *   assets/header-logo.png  — bottom variant (SD shield + AUTOBODY)
 *   assets/favicon.png      — just the SD shield from the bottom variant
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'assets', 'icon.png');

if (!fs.existsSync(src)) {
  console.error(`Missing ${src}`);
  process.exit(1);
}

// Header logo: bottom variant of the 2000x2000 source — tight crop of the
// "SD shield + AUTOBODY" lockup.
await sharp(src)
  .extract({ left: 300, top: 1370, width: 1400, height: 360 })
  .toFile(path.join(root, 'assets', 'header-logo.png'));
console.log('  wrote assets/header-logo.png');

// Favicon: just the SD shield from the bottom variant, padded to a square.
await sharp(src)
  .extract({ left: 370, top: 1380, width: 320, height: 340 })
  .resize(512, 512, { fit: 'contain', background: { r: 5, g: 5, b: 5, alpha: 1 } })
  .toFile(path.join(root, 'assets', 'favicon.png'));
console.log('  wrote assets/favicon.png  (512x512)');

// Social profile / og image: same shield, larger square.
await sharp(src)
  .extract({ left: 370, top: 1380, width: 320, height: 340 })
  .resize(1080, 1080, { fit: 'contain', background: { r: 5, g: 5, b: 5, alpha: 1 } })
  .toFile(path.join(root, 'assets', 'social-square.png'));
console.log('  wrote assets/social-square.png  (1080x1080)');
