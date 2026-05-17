# AutoBody San Diego

Regional SEO authority and traffic-capture portal for San Diego auto body searches.
Routes visitors to the right specialist brand: BumperFix USA, PaintFix USA,
CollisionFix USA, CrashFix USA.

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

## Configuration TODOs

- **Quote form endpoint** — `get-a-quote.html` and home quote form post to
  `https://formspree.io/f/YOUR_FORMSPREE_ID_HERE`. Sign up at
  https://formspree.io, paste your real form ID in those two files.
- **Specialist brand URLs** — service-page CTAs that route to BumperFix USA,
  PaintFix USA, CollisionFix USA, CrashFix USA currently use `#` placeholders.
  Search the repo for `data-route="specialist"` to swap in real URLs.
