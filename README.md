# AutoBody San Diego

Regional SEO authority and traffic-capture portal for San Diego auto body searches.
Routes visitors to the right specialist brand: BumperFix USA, PaintFix USA,
CollisionFix USA, CrashFix USA.

> **Read first:** [`docs/brand-identity.md`](docs/brand-identity.md) is the
> locked source of truth for everything brand-related — tone, color, logo
> rules, taglines, conversion voice, out-of-bounds. Read it before writing
> copy, designing assets, or adding pages.

## Stack

- Static HTML, one stylesheet (`assets/styles.css`).
- Deployed on Vercel with `cleanUrls` enabled (URLs drop `.html`).
- City pages are generated from `data/cities.json` + `templates/city.html` via
  `scripts/build-city-pages.mjs`.

## Local preview

Any static server works:

```sh
npx serve .
# or
python -m http.server 5500
```

## Regenerate city pages

```sh
node scripts/build-city-pages.mjs
```

Edit `templates/city.html` or `data/cities.json` then re-run. Do not hand-edit
individual `auto-body-repair-*.html` files at the repo root — they are
regenerated.

## Regenerate sitemap

```sh
node scripts/build-sitemap.mjs
```

## Form backend (FormSubmit)

Forms on `/get-a-quote` and `/contact` post to
`https://formsubmit.co/davidraymurillo@gmail.com`.

**One-time activation:** The first time someone submits any form, FormSubmit
will email davidraymurillo@gmail.com asking to confirm the address. Click
the confirmation link in that email — once. After that, every future
submission delivers directly to your inbox with all fields, attached
photos, and the subject line `New AutoBody SD Lead`.

To **swap the recipient address** (e.g., to a business email) or move to
FormSubmit's hashed endpoint (to hide the email from page source), edit
`scripts/wire-form-and-analytics.mjs` and re-run, or do a sitewide find-
and-replace on `formsubmit.co/davidraymurillo@gmail.com`.

## Analytics (Vercel Analytics)

Page views and custom events ship to Vercel Analytics, which is included
with the Vercel project. No setup needed beyond visiting the project's
Analytics tab in the Vercel dashboard once the site has live traffic.

Custom events are wired through `data-track="event_name"` attributes and
fire via [`assets/analytics.js`](assets/analytics.js). Events tracked:
`quote_form_started`, `quote_form_submitted`, `damage_type_selected`
(includes the selected value), `photo_upload_clicked`, `call_clicked`,
`text_clicked`, `call_or_text_clicked`, `thank_you_page_viewed`.

In local dev (localhost), events log to the browser console instead of
Vercel — useful for debugging.

## Remaining TODO

- **Specialist brand URLs** — service-page CTAs that route to BumperFix
  USA, PaintFix USA, CollisionFix USA, CrashFix USA currently use `#`
  placeholders. Search the repo for `data-route="specialist"` to swap
  in real URLs when those specialist sites go live.
