# SESSION 6 — Admin Dashboard + Lead Intake System (Supabase-backed)

## What it is

A real backend for AutoBody San Diego. The public site keeps serving as a static HTML site on Vercel, but the quote funnel now writes to a Postgres database via Supabase, and there is a private admin portal at `/admin/` for reviewing leads, updating their status, and replying to customers from David's Gmail.

This replaces the FormSubmit-to-Gmail flow from Session 5 with a real CRM.

---

## Architecture at a glance

| Layer | Tech | Where |
|---|---|---|
| Static site + admin pages | HTML + vanilla JS | Vercel (same project as before) |
| Database | Supabase Postgres | Project `opwpvpxgjgdnfckhxzyu` (autobodysd) in us-west-1 |
| Photo storage | Supabase Storage | Bucket `lead-photos`, private |
| Authentication | Supabase Auth (email + password) | Admin allowlist enforced via RLS |
| Public form submit | Direct from browser → Supabase REST API | Anon key + RLS allow INSERT only |
| Admin reply path | Gmail web compose URL (prefilled) | Opens David's signed-in Gmail in a new tab |
| Analytics | Vercel Analytics (from Session 5) | Unchanged |

No new server-side code. Everything is static HTML + JavaScript talking directly to Supabase.

---

## Database schema (`public.leads`)

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key, auto-generated |
| `created_at` / `updated_at` | timestamptz | auto-set + trigger-updated |
| `name` | text | required |
| `phone` | text | required |
| `email` | text | optional |
| `preferred_contact` | enum: `text` / `call` / `email` | default `text` |
| `vehicle_year` / `vehicle_make` / `vehicle_model` | text | optional |
| `city` | text | one of the SD-area dropdown values |
| `damage_type` | enum: `bumper` / `paint` / `collision` / `insurance` / `not_sure` | |
| `pay_type` | enum: `customer_pay` / `insurance` / `not_sure` | |
| `drivable` | enum: `yes` / `no` / `not_sure` | |
| `what_happened` | text | the free-text description |
| `photo_paths` | text[] | array of paths inside `lead-photos` bucket |
| `status` | enum: `new` / `contacted` / `need_more_photos` / `needs_inspection` / `quoted` / `scheduled` / `won` / `lost` / `bad_lead` / `out_of_area` | default `new` |
| `notes` | text | admin-only free-form notes |
| `source_url`, `user_agent`, `ip_hint` | text | provenance |

Indexes: `created_at desc`, `status`, `damage_type`.

---

## Row-Level Security

| Role | Table action | Policy |
|---|---|---|
| `anon` (public site) | INSERT into `leads` | ✅ allowed |
| `anon` (public site) | upload to `lead-photos` storage | ✅ allowed |
| `anon` (public site) | SELECT / UPDATE / DELETE leads | ❌ denied (no policy) |
| `authenticated` (any signed-in user) | SELECT / UPDATE leads | ✅ allowed **only if** `auth.jwt() ->> 'email'` is in the admin allowlist (`davidraymurillo@gmail.com`) |
| `authenticated` (admin) | read / delete `lead-photos` | ✅ allowed |
| Anyone | DELETE leads | ❌ no policy — leads are immutable historical records |

To add another admin email, edit both `admin_can_select_leads`, `admin_can_update_leads`, `admin_can_read_lead_photos`, and `admin_can_delete_lead_photos` policies in Supabase and append the new email to the allowlist.

---

## Files added in this session

```
admin/login.html         Sign in (and first-time sign up) for the admin
admin/index.html         Dashboard: stats + filtered lead list
admin/lead.html          Lead detail: photos, status update, Gmail reply, notes

assets/supabase-config.js   Public URL + anon key + init helper
assets/quote-form.js        Hijacks the quote form, writes to Supabase
assets/admin.js             Auth guard, formatters, toast notifications
assets/admin.css            Admin-specific styling (cards, table, badges, form)
```

Migrations applied to Supabase (under the project's migrations dashboard):
- `create_leads_table` — schema + indexes + RLS scaffold + updated-at trigger
- `create_photos_bucket` — `lead-photos` bucket with anon-upload policy
- `scope_admin_to_email_allowlist` — restricts SELECT/UPDATE to the admin email

---

## First-time activation

1. Visit `https://autobodysandiego.com/admin/login` once.
2. Enter the admin email (`davidraymurillo@gmail.com`) and a password (8+ chars).
3. Click **Create Account (first time)**.
4. Check the inbox for a Supabase confirmation email — click the link.
5. Return to `/admin/login` and sign in.
6. Land on the dashboard at `/admin/`.

Subsequent sessions: just sign in.

---

## Customer reply flow (the "send from your Gmail" piece)

From the lead detail page, the **Reply via Gmail** button opens
`https://mail.google.com/mail/?view=cm&fs=1&to=<email>&su=<subject>&body=<draft>`
in a new tab. If David is signed into Gmail in that browser, this opens
a fresh compose window in his Gmail, **From: davidraymurillo@gmail.com**,
**To: customer's email**, with subject and a starter draft already filled
in. He edits, hits Send — the customer gets a real email from David's
real Gmail, and any reply comes back to that inbox.

Fallback: **Reply via default mail app** uses a `mailto:` link for browsers
where Gmail compose URLs don't work.

For phone-based customers: **Text the customer** uses `sms:`,
**Call the customer** uses `tel:` — opens whatever messaging/dialer the
device is set up with.

---

## What's NOT in this session (intentional v1 scope)

- **Real-time updates** — dashboard requires a refresh to see new leads. Future iteration could use Supabase Realtime subscriptions.
- **Email notifications on new lead** — David needs to check the dashboard. A future Supabase Edge Function could fire an email via Resend/Sendgrid when a new lead INSERTs.
- **Multi-user admin** — only `davidraymurillo@gmail.com` is on the allowlist. Adding more admins is an RLS policy edit.
- **Lead search / pagination** — current view loads all leads at once and filters client-side. Fine until there are thousands of leads.
- **Photo deletion UX** — photos can only be deleted via the Supabase storage dashboard for now.
- **Reply tracking** — when David replies via Gmail, there's no automatic write-back to the lead saying "responded at X." He should bump the status to `contacted` manually.

---

## Operational notes

### Costs

Free tier across the board: Supabase free plan (500MB DB / 1GB storage / unlimited API requests for moderate volume), Vercel hobby plan. No recurring costs.

### Backup

Supabase keeps daily Postgres backups on free tier (7-day retention). The `leads` table is the source of truth; everything else is regeneratable.

### Security

- Anon publishable key is in client-side JS (safe — RLS is the gate).
- Admin email allowlist enforced at the database level, not just in the UI.
- Photos bucket is private; the admin dashboard fetches signed URLs (1-hour expiry) on each view.
- `/admin/*` pages are `noindex, nofollow` and disallowed in `robots.txt`.

### Switching the admin email

If David ever moves off davidraymurillo@gmail.com, run a one-line migration:

```sql
-- Replace the email in all four admin policies
-- (see docs for full migration template)
```

---

## Session 6 Locked Decision

The site now has a real backend. Leads land in Postgres, photos in object storage, and the admin reviews them in a private portal. Reply happens via the admin's existing Gmail.

Next session: **Session 7 — Service Page Buildouts** (deepen bumper, paint, collision, accident, insurance pages with real damage-type FAQ, before/after content, local SEO depth).
