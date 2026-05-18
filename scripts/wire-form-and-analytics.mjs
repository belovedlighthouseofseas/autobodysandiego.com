#!/usr/bin/env node
/**
 * Wire the two open TODOs from Session 5:
 *
 * 1. Replace the Formspree placeholder form action with a working
 *    FormSubmit endpoint (https://formsubmit.co/{email}).
 *    FormSubmit requires ONE-TIME email confirmation on first submission,
 *    then works forever. Free, supports multipart + file uploads.
 *
 * 2. Inject Vercel Analytics + assets/analytics.js into every page so
 *    page views and custom data-track events are captured.
 *
 * Idempotent — safe to re-run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Form action: FormSubmit with the owner's Gmail. After first submission
// FormSubmit emails a one-click confirmation link — once clicked, all
// subsequent submissions land in inbox. To swap to the hashed endpoint
// later (to hide the email from page source) or to a business email,
// search the repo for "formsubmit.co" and replace.
const OLD_ACTION = 'https://formspree.io/f/YOUR_FORMSPREE_ID_HERE';
const NEW_ACTION = 'https://formsubmit.co/davidraymurillo@gmail.com';
const OLD_TODO_COMMENT = '<!-- TODO: Replace YOUR_FORMSPREE_ID_HERE with your real Formspree form ID. Sign up at https://formspree.io -->';
const NEW_FORM_COMMENT = '<!-- Form posts to FormSubmit. First submission triggers a one-click confirmation email to the recipient address; after that, submissions deliver normally. To hide the email from page source, swap to FormSubmit\'s hashed endpoint after the first confirmation. -->';

const ANALYTICS_SNIPPET = `  <script defer src="/_vercel/insights/script.js"></script>
  <script defer src="/assets/analytics.js"></script>`;

const htmlFiles = [
  ...fs.readdirSync(root).filter(f => f.endsWith('.html')).map(f => path.join(root, f)),
  path.join(root, 'templates', 'city.html'),
];

let touched = 0;
for (const filePath of htmlFiles) {
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  // 1. Form action swap (only affects pages that have the placeholder)
  html = html.replaceAll(OLD_ACTION, NEW_ACTION);
  html = html.replaceAll(OLD_TODO_COMMENT, NEW_FORM_COMMENT);

  // 2. Analytics injection — insert before </head> if not already there
  if (!html.includes('/_vercel/insights/script.js') && !html.includes('/assets/analytics.js')) {
    html = html.replace('</head>', ANALYTICS_SNIPPET + '\n</head>');
  }

  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    touched++;
    console.log(`  updated ${path.relative(root, filePath)}`);
  }
}

console.log(`\nTouched ${touched} files.`);
