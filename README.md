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

## Form backend (Supabase)

The quote form on `/get-a-quote` writes directly to Supabase Postgres
(`leads` table) and uploads photos to Supabase Storage (`lead-photos`
bucket). Project: `opwpvpxgjgdnfckhxzyu` (autobodysd, us-west-1).
After successful submission, the visitor is redirected to `/thank-you`.

The `/contact` form keeps using FormSubmit
(`https://formsubmit.co/davidraymurillo@gmail.com`) for general messages.

**Photo storage:** private bucket. The admin dashboard fetches signed
URLs (1-hour expiry) on each view. Anon visitors can only INSERT, never
read.

## Admin dashboard

Live at `/admin/login`. First-time setup:

1. Visit `/admin/login`
2. Enter `davidraymurillo@gmail.com` and a password
3. Click **Create Account (first time)** — Supabase sends a confirmation email
4. Click the confirmation link
5. Return to `/admin/login` and sign in
6. Dashboard at `/admin/` shows lead list, stats, and status filters

Lead detail (`/admin/lead?id=...`) has:
- Customer contact info + tel:/mailto:/sms: shortcuts
- Vehicle + damage info
- "What happened" description
- Photo grid (signed URLs from private bucket)
- **Reply via Gmail** button — opens Gmail web compose in a new tab,
  prefilled with To, Subject, and a starter draft. Sends from your
  signed-in Gmail.
- Status dropdown (10 statuses: new → contacted → quoted → won/lost)
- Admin-only notes field

Admin pages are `noindex`/`nofollow` and disallowed in `robots.txt`.
RLS policies on the database enforce that only the email on the admin
allowlist can read/update leads.

See [`docs/session-6-admin-dashboard.md`](docs/session-6-admin-dashboard.md)
for the full architecture, schema, and operational notes.

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
