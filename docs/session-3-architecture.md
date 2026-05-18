# SESSION 3 — AutoBody San Diego Website Architecture + Page Map

## Building the Traffic Machine Before Claude Builds the Website

> Status: Locked, v1.0. Canonical reference for site architecture, URL structure, navigation, internal linking, page-by-page section specs, SEO meta, and JSON-LD schema. Read this before adding pages, changing URLs, or restructuring nav.

Session 1 locked **brand identity**. Session 2 locked the **visual system**. Session 3 locks the actual **website architecture**.

A weak website has pages. A strong website has a **routing system**.

AutoBody San Diego is built like a controlled map:

> Customer lands → identifies what happened → enters the correct service path → gets educated → submits photos → becomes a lead → lead routes into the right repair category.

That is the whole system.

---

## 1. Core Website Mission

**Capture San Diego auto body search traffic and convert confused drivers into organized repair leads.**

Three jobs the site does simultaneously:

1. **Rank** for broad and local search terms.
2. **Guide** visitors into the correct damage category.
3. **Convert** visitors through photo-based quote requests.

Every page must answer:

- What search intent is this page capturing?
- What customer problem is this page solving?
- Where does this page send the customer next?
- How does this page create a lead?

If a page does not answer those questions, it does not belong in the first version.

---

## 2. Main Site Structure

### Primary Pages (launch set)

1. **Home** — `/`
2. **Get a Quote** — `/get-a-quote`
3. **Bumper Repair San Diego** — `/bumper-repair-san-diego`
4. **Paint Repair San Diego** — `/paint-repair-san-diego`
5. **Collision Repair San Diego** — `/collision-repair-san-diego`
6. **Accident Repair Help San Diego** — `/accident-repair-help-san-diego`
7. **Insurance Auto Body Repair San Diego** — `/insurance-auto-body-repair-san-diego`
8. **Service Areas** — `/service-areas`
9. **About AutoBody San Diego** — `/about`
10. **Contact** — `/contact`

Do not start with 50 pages before the structure is proven. Start with core pages, then expand into city pages and blog/help pages.

### URL slug rule

Keep them simple, readable, SEO-friendly. Avoid messy slugs like `/services/auto-body-san-diego-repair-shop-service-options`.

---

## 3. Website Navigation

### Desktop nav

Logo left: **AutoBody SD** (or full lockup on wide screens)

Menu items:
- **Repair Types** (dropdown)
- **Insurance Help**
- **Service Areas**
- **About**

Right side CTA: **Get a Quote**

#### Dropdown under Repair Types

- Bumper Repair
- Paint Repair
- Collision Repair
- Accident Repair Help
- Not Sure? Start Here

### Mobile nav

Even simpler:
- Logo
- Menu icon
- Sticky CTA button: **Get Quote**

When menu opens:
- Get a Quote
- Bumper Repair
- Paint Repair
- Collision Repair
- Insurance Help
- Service Areas
- Contact

**Mobile visitors should never have to hunt for the quote button.**

---

## 4. Homepage Architecture — 8 sections in order

The homepage is the command center. Its job is not to explain everything — its job is to route.

### §1 Hero

Headline: **San Diego Auto Body Help, Matched to the Right Repair Solution**

Subheadline: *From bumper damage and paint repair to collision work and insurance-related repairs, AutoBody San Diego helps drivers find the right repair path without confusion, pressure, or unnecessary work.*

Buttons: **Send Photos for Repair Direction** · **Choose Your Repair Type**

### §2 Damage Selector

Headline: **What happened to your vehicle?**

5 cards:
- "My bumper is scratched, cracked, or dented" → `/bumper-repair-san-diego`
- "My paint is faded, peeling, scratched, or damaged" → `/paint-repair-san-diego`
- "My vehicle was hit in a collision" → `/collision-repair-san-diego`
- "I need help with an accident or insurance claim" → `/accident-repair-help-san-diego`
- "I'm not sure what repair I need" → `/get-a-quote`

### §3 Service Gateway Cards

- **Bumper Repair San Diego** — scuffs, scratches, dents, cracks, bumper paint damage
- **Paint Repair San Diego** — scratches, peeling clear coat, fading, repainting, finish correction
- **Collision Repair San Diego** — accident damage, body panels, larger impacts, repair planning
- **Insurance Auto Body Help** — claims, estimates, accident guidance

### §4 Photo Quote CTA (mid-funnel reinforcement)

Headline: **Not sure what repair path fits your vehicle? Send photos first.**

Copy: *Upload clear photos of the damage and share what happened. AutoBody San Diego helps organize the repair request so you can start with the right direction.*

Button: **Send Damage Photos**

### §5 Why Repair Type Matters

*A scratched bumper, peeling clear coat, and collision-damaged panel are not the same repair. Some damage can be repaired cosmetically. Some damage may need paint refinishing. Some collision damage needs deeper inspection. AutoBody San Diego helps separate the repair paths before you waste time guessing.*

### §6 San Diego Service Coverage

City grid linking to `/service-areas` and individual city pages.

### §7 How It Works

1. Choose your damage type
2. Send photos of the vehicle
3. Get repair direction
4. Move toward the right repair path

### §8 Final CTA

Headline: **Start with photos. Get pointed in the right direction.**

Buttons: **Get a Quote** · **Call or Text**

---

## 5. Service Page Architecture (shared spine)

Each service page follows this skeleton:

1. Hero with CTA
2. Damage types covered
3. Repair vs replacement explanation (or equivalent education)
4. Photo quote instructions
5. Specialist routing block (generic until brand reveal)
6. Areas served
7. **FAQ** section
8. Final CTA

### Per-page specifics

| Page | URL | Search intent anchor |
|---|---|---|
| Bumper Repair | `/bumper-repair-san-diego` | bumper scratch / crack / dent / paint repair, mobile bumper repair |
| Paint Repair | `/paint-repair-san-diego` | clear coat peeling, faded paint, full repaint, scratch repair |
| Collision Repair | `/collision-repair-san-diego` | collision, body shop, panel repair, accident repair |
| Accident Help | `/accident-repair-help-san-diego` | what to do after car accident, estimate after accident |
| Insurance Help | `/insurance-auto-body-repair-san-diego` | insurance claim, estimate, supplement, DRP shop choice |

CTAs (per page):
- Bumper: **Send Bumper Damage Photos**
- Paint: **Send Paint Damage Photos**
- Collision: **Start Collision Repair Request**
- Accident: **Get Accident Repair Direction**
- Insurance: **Start Insurance Repair Request**

### Tone rule for insurance/accident pages

Do not overpromise. Avoid legal claims like "You can force insurance to pay anything." Instead: *Insurance-related repairs often begin with damage photos, claim information, and an estimate process. If additional damage is found later, the repair process may require further documentation.*

---

## 6. Get a Quote Page (the conversion engine)

URL: `/get-a-quote`

Headline: **Send Photos for Auto Body Repair Direction**

Subheadline: *Upload photos of the damage, tell us what happened, and choose the repair category that best fits your situation.*

### Form fields

- Name
- Phone
- Email
- Vehicle year / make / model
- City / area
- Damage type (Bumper / Paint / Collision / Insurance claim / Not sure)
- What happened?
- Insurance or customer-pay? (Insurance claim / Customer-pay / Not sure)
- Can the vehicle drive?
- Upload photos
- Preferred contact method (Text / Call / Email)

**Default preferred contact: Text** — most people sending photos want SMS.

CTA button: **Send Photos for Repair Direction**

---

## 7. Service Areas Page

URL: `/service-areas`

Headline: **Auto Body Repair Help Across San Diego County**

City cards group: San Diego · Lemon Grove · Spring Valley · La Mesa · El Cajon · National City · Chula Vista · Mira Mesa · Kearny Mesa · Santee · Poway · Escondido · Carlsbad · Oceanside · Mission Valley · Clairemont · Pacific Beach · North Park · Downtown San Diego

City cards link to individual `/auto-body-repair-{slug}` pages.

---

## 8. About Page

URL: `/about`

Headline: **Built to Make Auto Body Repair Easier to Understand**

Subheadline: *AutoBody San Diego was created to help local drivers organize bumper, paint, collision, and insurance-related repair needs before wasting time in the wrong direction.*

Sections:
1. Why the site exists
2. What problems it solves
3. How repair routing works
4. Local San Diego focus
5. Quote CTA

Build trust through clarity.

---

## 9. Contact Page

URL: `/contact`

Headline: **Contact AutoBody San Diego**

Options: Call · Text · Send photos · Request repair direction · Ask a question

**Push toward photo submission** — most repair inquiries are better handled with photos.

CTA: **Send Photos Instead**

---

## 10. Internal Linking Map

| From | To |
|---|---|
| Homepage | Get a Quote, all 5 service pages, Service Areas |
| Bumper Page | Get a Quote, Paint (if paint damage), Collision (if deeper damage), Service Areas |
| Paint Page | Get a Quote, Bumper (if bumper paint), Collision (if panel damage), Service Areas |
| Collision Page | Get a Quote, Accident Help, Insurance Help, Service Areas |
| Accident Page | Insurance Help, Collision Repair, Get a Quote |
| Insurance Page | Accident Help, Collision Repair, Get a Quote |
| Service Areas | All main service pages, Get a Quote, city pages |

This creates a strong internal web without keyword stuffing.

---

## 11. Footer Architecture

### Column 1 — Brand

AutoBody San Diego + description: *Local auto body repair guidance for bumper, paint, collision, and insurance-related vehicle damage in San Diego.*

### Column 2 — Repair Types

- Bumper Repair
- Paint Repair
- Collision Repair
- Accident Repair Help
- Insurance Repair Help

### Column 3 — Service Areas

- San Diego · Lemon Grove · Spring Valley · La Mesa · El Cajon · Chula Vista · National City

### Column 4 — Start Here

- Get a Quote
- Send Photos
- Contact
- About

**Footer CTA:** Send Photos for Repair Direction

---

## 12. City Page Expansion Strategy

Do not launch 40 weak city pages. Launch a strong structure first, then expand.

### Phase 1 batch (8–10 cities)

San Diego · Lemon Grove · Spring Valley · La Mesa · El Cajon · National City · Chula Vista · Mira Mesa · Kearny Mesa · Santee

### URL pattern

`/auto-body-repair-{city-slug}` — e.g. `/auto-body-repair-lemon-grove`

### Per-city structure

- Hero
- Local repair explanation
- Damage selector
- Service cards
- Nearby area mentions
- Photo quote CTA
- FAQ

City pages must include unique local relevance — not just swapped city names.

---

## 13. Blog / Help Content Expansion

After core pages and city pages, build help content for question-based searches.

### First 10 help articles

1. Can I Get an Auto Body Quote From Photos?
2. Bumper Repair vs Bumper Replacement
3. Paint Repair vs Full Repaint
4. What to Do After a Car Accident in San Diego
5. How Insurance Auto Body Estimates Work
6. Why Body Shop Estimates Can Be Different
7. How to Know if Collision Damage May Be More Serious
8. Should I Repair a Scratched Bumper Before Selling My Car?
9. What Photos Should I Send for an Auto Body Quote?
10. Customer-Pay vs Insurance Auto Body Repair

All articles link back to `/get-a-quote`.

---

## 14. Lead Routing Logic

Form submissions identify:
- Damage type
- City
- Insurance vs customer-pay
- Vehicle info
- Vehicle drivable?
- Photos uploaded?
- Preferred contact

Routes:
- Bumper Lead → BumperFix path
- Paint Lead → PaintFix path
- Collision Lead → CollisionFix path
- Insurance/Accident Lead → CrashFix or insurance-help path
- Not Sure Lead → manual review

---

## 15. Tracking & Analytics

Track:
- Form submissions
- Click-to-call
- Click-to-text
- Photo upload starts
- Photo upload completions
- Service card clicks
- Damage selector clicks
- City page quote clicks
- Mobile CTA clicks

Top 5 conversion events:
1. Quote form submitted
2. Phone call clicked
3. Text button clicked
4. Photo upload submitted
5. Damage type selected

---

## 16. Schema / SEO Technical Structure

JSON-LD per page:

- **AutoRepair** + **LocalBusiness** — homepage, service pages
- **Service** — each service page
- **FAQPage** — pages with FAQ
- **BreadcrumbList** — every page below the homepage

Each service page also needs:
- Meta title
- Meta description
- H1
- H2 structure
- Internal links
- FAQ section

---

## 17. Locked Meta Titles

- Homepage: **AutoBody San Diego | Bumper, Paint & Collision Repair Help**
- Bumper: **Bumper Repair San Diego | Scratches, Cracks, Scuffs & Paint Damage**
- Paint: **Paint Repair San Diego | Scratches, Clear Coat & Car Paint Help**
- Collision: **Collision Repair San Diego | Auto Body Repair After an Accident**
- Insurance: **Insurance Auto Body Repair San Diego | Claim & Estimate Help**
- Service Areas: **Auto Body Repair Service Areas in San Diego County**

---

## 18. Locked Meta Descriptions

- Homepage: *Find the right auto body repair path in San Diego. Get help with bumper damage, paint repair, collision damage, insurance-related repairs, and photo-based quote requests.*
- Bumper: *Need bumper repair in San Diego? Get help with scratched, cracked, scuffed, dented, or paint-damaged bumpers. Send photos for repair direction.*
- Paint: *Get paint repair help in San Diego for scratches, fading, peeling clear coat, paint chips, panel repainting, and full repaint questions.*
- Collision: *Vehicle hit in an accident? AutoBody San Diego helps organize collision repair requests, damage photos, and repair direction for San Diego drivers.*

---

## 19. Build Order

1. Global layout (header, footer, theme, fonts, colors, reusable components)
2. Homepage
3. Quote page
4. Core service pages (bumper, paint, collision, accident, insurance)
5. Service areas hub
6. About / Contact
7. SEO metadata and schema
8. Mobile polish
9. Analytics / tracking placeholders
10. City page template

---

## 20. Session 3 Locked Decision

**AutoBody San Diego is built as a hub-and-spoke SEO/conversion system.**

The hub: Homepage + Get a Quote
The spokes: Bumper · Paint · Collision · Accident · Insurance · Service Areas · City Pages · Help Articles

Every path leads back to: **Send Photos for Repair Direction**

That is the conversion core.

Next session: **Session 4 — Homepage Full Buildout** (final copy, layout notes, CTA wording, design instructions, SEO structure, Claude-ready implementation direction).
