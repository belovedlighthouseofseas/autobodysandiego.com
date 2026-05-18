# SESSION 5 — Universal Quote Funnel + Lead Intake System

## Turning Website Visitors Into Organized Repair Leads

> Status: Locked, v1.0. Canonical reference for the `/get-a-quote` page, the `/thank-you` page, the form structure, lead routing, and analytics events. Read before editing the quote form, changing field labels, or adjusting submission flow.

Session 5 builds the conversion core. The homepage brings traffic. Service pages educate and route. The **quote funnel** is where a visitor becomes a real lead.

Most auto body websites fail at intake — generic contact form (Name / Email / Message) is weak. AutoBody San Diego needs better signal. The goal is not just *more leads* — it is *cleaner leads*.

---

## 1. Funnel Purpose

> Let customers send damage photos and basic repair information so AutoBody San Diego can organize the request into the right repair path.

Every major page leads here: homepage, service pages, city pages, blog/help, contact. The universal action across the entire site is:

**Send Photos for Repair Direction**

---

## 2. URL & Page Titles

- **Quote page URL:** `/get-a-quote`
- **Thank-you page URL:** `/thank-you`
- **Page H1:** Send Photos for Auto Body Repair Direction
- **Subheadline:** Upload photos of the damage, tell us what happened, and choose the repair category that best fits your situation. If you are not sure, start with photos and we'll help point the request in the right direction.

Avoid: `/contact-us` · `/estimate` · `/free-estimate` · `/request-service`.

---

## 3. Funnel Psychology

Customers arrive uncertain. They may not know:

- What type of damage they have
- Whether repair or replacement is needed
- Whether it will be expensive
- Whether insurance should be involved
- Whether the vehicle is safe to drive
- Whether photos are enough

The quote page should calm that uncertainty:

> You do not need to know the technical repair category. Start with what happened and send photos.

That removes friction. The customer does not have to be an expert — they just have to send the damage.

---

## 4. Page Structure — 10 sections in order

1. **Header** (sitewide)
2. **Quote hero** — H1, subheadline, primary + secondary CTAs, micro-points
3. **Quick reassurance strip** — "Not sure what repair you need? That is okay."
4. **Main intake form** — 8 grouped sections (see §5)
5. **Photo instructions** — what photos to send (5-item checklist)
6. **What happens after you submit** — 4-step process
7. **Repair path explanation** — why the form asks about damage type, mini cards
8. **FAQ** — 5 questions specific to the quote process
9. **Final contact CTA** — call/text fallback
10. **Footer** (sitewide)

---

## 5. Main Intake Form — 8 grouped sections

### Section 1 — Contact Information
- Name (required)
- Phone (required)
- Email (optional)
- Preferred contact method: **Text** (default) / Call / Email

### Section 2 — Vehicle Information
- Vehicle year (required)
- Vehicle make (required)
- Vehicle model (required)

(Trim, color, license plate intentionally omitted in v1 — keep it simple.)

### Section 3 — Location
- City / Area dropdown: San Diego · Lemon Grove · Spring Valley · La Mesa · El Cajon · National City · Chula Vista · Mira Mesa · Kearny Mesa · Santee · Poway · Other

### Section 4 — Damage Type (card-style radios)
- Bumper damage
- Paint damage
- Collision damage
- Accident / insurance help
- Not sure

### Section 5 — Insurance or Customer-Pay
- Customer-pay / out of pocket
- Insurance claim
- Not sure yet

### Section 6 — Vehicle Drivability
- Yes
- No
- Not sure

### Section 7 — What Happened
Textarea. Placeholder: *"Example: The rear bumper was hit in a parking lot. The bumper has a crack and paint damage on the right corner."*

### Section 8 — Photo Upload
- Multiple file input
- Helper: "Upload close-up photos, wider angles, and any photos showing where the damage is located on the vehicle."

**Submit button:** Send Photos for Repair Direction

**Form action:** Formspree endpoint, with hidden `_next` redirecting to `/thank-you`.

---

## 6. Form Button Language (rule)

Don't use: Submit · Send · Contact Us

Use: **Send Photos for Repair Direction** (primary) or **Send My Repair Request** (alternate).

---

## 7. Photo Instructions Section

**Headline:** What Photos Should You Send?
**Copy:** Clear photos help organize the repair request. You do not need professional pictures. Just take a few angles in good lighting.

**Checklist:**
1. **Close-up of the damage** — scratches, cracks, dents, peeling paint, impact marks.
2. **Wider photo of the damaged area** — shows where the damage is located on the vehicle.
3. **Side angle** — helps show dents, panel gaps, shape distortion.
4. **Full vehicle angle if possible** — panel location, overall area.
5. **Insurance or estimate documents if available** — only if the customer already has them.

**Reassurance:** *If you are not sure what to send, upload what you have. The request can still start with basic photos.*

---

## 8. What Happens After Submission (4 steps)

**Headline:** What Happens After You Send the Request?

| Step | Title | Body |
|---|---|---|
| 01 | Your damage type is reviewed | Request is organized into bumper, paint, collision, insurance, or not-sure category. |
| 02 | Photos help guide the next step | Some damage may be reviewable from photos. Some may need in-person inspection. |
| 03 | You receive repair direction | Depending on the damage, next step may be a quote, inspection, scheduling, or more photos. |
| 04 | You move into the right repair path | Bumper, paint, collision, or insurance-related repair direction. |

---

## 9. Repair Path Explanation (mini cards)

**Headline:** Why We Ask About the Damage Type
**Copy:** A bumper scuff, peeling clear coat, and collision-damaged panel do not follow the same repair path. Choosing the closest damage type helps organize the request faster. If you are unsure, select "not sure" and send photos first.

5 mini cards: Bumper Damage · Paint Damage · Collision Damage · Accident / Insurance Help · Not Sure.

---

## 10. Thank-You Page

**URL:** `/thank-you`
**Indexing:** `<meta name="robots" content="noindex">` — do not index, this is a conversion confirmation.

**H1:** Your Repair Request Was Sent
**Copy:** Thank you. Your photos and repair details have been submitted. If more information is needed, you may be contacted by your preferred contact method.
**Secondary:** If your damage is urgent or you want to send additional photos, call or text us directly.

**CTAs:** Call Now · Text More Photos · Back to Home

---

## 11. SMS / Text Path

Photo-based repair leads are natural over text. Throughout the site, include:

- **Text Photos Instead** CTA on quote page, mobile sticky bar, contact page, after form submission, thank-you page.
- **SMS prefill copy:** *"Hi, I found AutoBody San Diego and want repair direction. I can send photos of the damage."*

Phone number TBD — placeholder until set.

---

## 12. Call Path

Use **Call for Repair Direction**. Do NOT make phone calls the only path. Photo-based form is better for body damage because you need visuals. Call CTA is secondary.

---

## 13. Lead Routing Categories

| Damage type selected | Route | Likely services |
|---|---|---|
| Bumper damage | BumperFix path | Scuffs, cracks, dents, corner repair, bumper repaint |
| Paint damage | PaintFix path | Paint scratches, clear coat peeling, faded paint, panel repaint, full paint job |
| Collision damage | CollisionFix path | Panel repair, door, fender, quarter panel, impact damage |
| Accident / insurance help | CrashFix / insurance path | Claim repair, estimate review, supplement support, accident guidance |
| Not sure | Manual review | Review photos and decide category |

---

## 14. Email Notification Format (Formspree)

Subject: **New AutoBody SD Lead — [Damage Type] — [City]**

Body:
```
New AutoBody San Diego repair request

Name:
Phone:
Email:
Preferred Contact:

Vehicle:
Year:
Make:
Model:

City / Area:

Damage Type:
Insurance or Customer-Pay:
Vehicle Drivable:

What Happened:

Photos: [attached or linked]

Recommended Routing: Bumper / Paint / Collision / Insurance / Not Sure
```

---

## 15. CRM / Spreadsheet (v1 launch)

Google Sheet is enough at launch. Columns:

Date · Name · Phone · Email · City · Vehicle · Damage type · Insurance/customer-pay · Drivable · Lead source page · Status · Notes · Photos link · Follow-up date · Converted? · Job value

---

## 16. Lead Status System

New · Contacted · Need more photos · Needs inspection · Quoted · Scheduled · Won · Lost · Bad lead · Out of area.

---

## 17. Quote Page FAQ (5 questions)

1. **Can I get a quote from photos?** — Photos can help start the repair direction for visible bumper, paint, and exterior damage. Some collision or insurance-related damage may still need in-person inspection before a final repair plan can be confirmed.
2. **What if I am not sure what damage type to choose?** — Choose "not sure" and upload photos. The request can still be reviewed and organized toward the correct repair path.
3. **Should I send insurance information?** — If the repair may involve insurance and you already have claim information or an estimate, you can mention that in the form. You do not need to have everything ready before starting.
4. **How many photos should I upload?** — Three to five photos is usually a good start: one close-up, one wider view, one side angle, and any additional photos showing cracks, dents, paint damage, or panel gaps.
5. **Can I text photos instead?** — Yes, if texting is available, you can text photos directly. The form is helpful because it also organizes vehicle info, city, damage type, and contact preference.

---

## 18. Mobile Rules

- Inputs must be large
- Photo upload must be easy
- Avoid tiny dropdowns where possible
- Card-style radios for damage type
- Easy phone field
- Sticky or repeated CTA
- Short instructions above the form; longer explanations below

**Mobile form order:** Name → Phone → Vehicle → City → Damage type → Insurance/customer-pay → What happened → Photos → Submit.

---

## 19. One-Step or Multi-Step?

**v1 launch:** Single-page form with grouped sections. Easier to build, test, debug.
**Future:** Multi-step (Damage type → Vehicle info → Photos → Contact info). Not v1.

---

## 20. SEO

- **Meta title:** Get an Auto Body Quote in San Diego | Send Damage Photos
- **Meta description:** Send photos for auto body repair direction in San Diego. Get help organizing bumper damage, paint damage, collision damage, insurance repairs, and quote requests.
- **H1:** Send Photos for Auto Body Repair Direction
- **H2 chain:** Not Sure What Repair You Need? · Repair Request Intake · What Photos Should You Send? · What Happens After You Submit? · Why We Ask About Damage Type · Auto Body Quote Questions

---

## 21. Tracking Events (placeholders via `data-track` attributes)

Track these via whatever analytics platform gets wired up (GA4 / Plausible / Fathom):

- `quote_form_started`
- `quote_form_submitted`
- `photo_upload_clicked`
- `damage_type_selected`
- `call_clicked`
- `text_clicked`
- `thank_you_page_viewed`

**Top conversion event:** `quote_form_submitted`. Second: `text_clicked`. Third: `call_clicked`.

---

## 22. Session 5 Locked Decision

The quote funnel is the **main lead intake system**. Every page pushes toward **Send Photos for Repair Direction**.

The form collects: contact info · vehicle info · city · damage type · insurance/customer-pay · drivability · description · photos.

Leads route into: Bumper · Paint · Collision · Accident/Insurance · Not Sure.

This turns AutoBody San Diego from a website into a working lead machine.

Next session: **Session 6 — Bumper Repair San Diego Service Page** (full bumper page with SEO structure, copy, damage examples, CTA flow, FAQ, Claude-ready prompt).
