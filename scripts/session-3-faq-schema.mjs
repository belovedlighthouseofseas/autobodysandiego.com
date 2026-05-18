#!/usr/bin/env node
/**
 * Session 3 phase 2 migration:
 * 1. Add FAQ section + FAQPage JSON-LD schema to each of the 5 service pages.
 * 2. Add AutoRepair + BreadcrumbList JSON-LD schema to all main pages.
 * 3. Add Service schema to each service page.
 *
 * Each FAQ set is custom per page (real questions with real answers).
 * Idempotent — only injects if not already present.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// FAQ content per service page
const FAQS = {
  'bumper-repair-san-diego.html': {
    serviceName: 'Bumper Repair',
    serviceDesc: 'Cosmetic bumper repair for scratches, cracks, dents, scuffs, paint transfer, and plastic damage.',
    canonical: 'https://autobodysandiego.com/bumper-repair-san-diego',
    breadcrumbName: 'Bumper Repair San Diego',
    items: [
      { q: 'How much does bumper repair cost in San Diego?', a: 'Most cosmetic bumper repairs run a few hundred dollars depending on damage type, bumper material, and paint match complexity. Photos let us give a realistic range up front.' },
      { q: 'Do I need to replace the bumper or can it be repaired?', a: 'Most plastic bumper damage — scratches, scuffs, small cracks, paint transfer — can be repaired without replacement. Severe structural damage or cracks longer than a few inches usually need replacement. Send photos and we will tell you which path fits.' },
      { q: 'How long does bumper repair take?', a: 'Most cosmetic bumper repairs finish in two to four business days. Color matching for metallic or pearl paints can add a day. Replacement bumpers depend on parts availability.' },
      { q: 'Does insurance cover bumper repair?', a: 'Collision and comprehensive coverage typically apply, but for minor cosmetic damage, customer-pay is often cheaper than meeting your deductible. We can help you evaluate which path makes sense for your situation.' },
      { q: 'What is the difference between bumper repair and bumper painting?', a: 'Bumper repair fixes the underlying damage — fills cracks, smooths scratches, repairs broken tabs. Bumper painting matches the factory color and refinishes the surface. Most jobs need both. The bumper specialist handles the full workflow.' },
      { q: 'Can I drive my car with a damaged bumper?', a: 'Usually yes for cosmetic damage. If the bumper is hanging loose, blocking lights, dragging on the ground, or affecting the parking sensors, get it stabilized before driving. Send photos and we will tell you if it is safe.' },
    ],
  },
  'paint-repair-san-diego.html': {
    serviceName: 'Paint Repair',
    serviceDesc: 'Paint refinishing, clear coat correction, panel repaints, color matching, and full vehicle repaints.',
    canonical: 'https://autobodysandiego.com/paint-repair-san-diego',
    breadcrumbName: 'Paint Repair San Diego',
    items: [
      { q: 'How much does paint repair cost in San Diego?', a: 'It depends entirely on whether the damage is a single panel, multi-panel, or full repaint. Daylight photos help us tell you up front whether you are looking at a small touch-up or a larger refinish.' },
      { q: 'Can clear coat peeling be repaired without a full repaint?', a: 'Often yes — if the peeling is contained to one or two panels, those panels can be sanded, primed, repainted, and blended into the surrounding panels. Full-vehicle clear coat failure usually needs a full repaint.' },
      { q: 'How do you match the color exactly?', a: 'The paint specialist uses your vehicle\'s factory paint code combined with computerized color matching. Modern color tools account for the way paint shifts in San Diego sun. The result blends seamlessly into adjoining panels.' },
      { q: 'How long does a paint repair take?', a: 'Single-panel paint repairs typically finish in three to five business days. Multi-panel refinishes run a week or more. Full vehicle repaints can take two to three weeks including proper cure time.' },
      { q: 'Will the repaired paint match the rest of the car?', a: 'A specialist paint shop blends the new paint into adjacent panels rather than stopping at the panel edge. Done properly, the repair is visually invisible. Done poorly, it shows up under sunlight.' },
      { q: 'Does San Diego sun damage paint differently?', a: 'Yes. Coastal sun, salt air, and parking outdoors accelerate clear coat failure, oxidation, and fading — especially on roofs, hoods, and trunk lids. Hot spots near the coast see more paint work than inland areas.' },
    ],
  },
  'collision-repair-san-diego.html': {
    serviceName: 'Collision Repair',
    serviceDesc: 'Panel replacement, frame work, structural repair, paint refinish, and ADAS calibration after a collision.',
    canonical: 'https://autobodysandiego.com/collision-repair-san-diego',
    breadcrumbName: 'Collision Repair San Diego',
    items: [
      { q: 'How do I know if my collision damage is serious?', a: 'Visible body damage is one thing. Frame damage, suspension misalignment, and bent inner panels often hide behind a "fixable" exterior. A teardown estimate at a certified collision shop is the only reliable way to know what is actually under the panels.' },
      { q: 'Does insurance always cover collision repair?', a: 'If you carry collision coverage, yes — minus your deductible. If you are not at fault, the at-fault driver\'s liability insurance should cover it. We help San Diego drivers navigate which policy applies and how the claim process starts.' },
      { q: 'Can I drive my car after a collision?', a: 'If the vehicle drives straight, brakes normally, and has all lights working, usually yes. If the steering pulls, brakes feel different, anything is dragging, or warning lights are on, get it towed. Send photos and we will tell you if it is safe.' },
      { q: 'What is ADAS calibration and why does it matter after a collision?', a: 'Modern cars have driver assistance systems — cameras, radar, lane keep, automatic braking. After collision repair (or even a windshield replacement), those systems need to be recalibrated. Skipping this is a safety risk and can fail inspection.' },
      { q: 'How long does collision repair take in San Diego?', a: 'Light collision (single panel) can be one to two weeks. Major collision with structural work, parts on order, and ADAS calibration can run four to six weeks or longer. We give realistic timelines based on the damage scope, not optimistic ones.' },
      { q: 'Do I have to use the insurance company\'s recommended shop?', a: 'In California, no. You choose where your vehicle is repaired. Direct Repair Program (DRP) shops can move faster on insurer paperwork, but they have a volume contract with the insurer. An independent shop works for you.' },
    ],
  },
  'accident-repair-help-san-diego.html': {
    serviceName: 'Accident Repair Help',
    serviceDesc: 'Post-accident guidance, repair-path direction, and routing to certified collision and insurance specialists.',
    canonical: 'https://autobodysandiego.com/accident-repair-help-san-diego',
    breadcrumbName: 'Accident Repair Help San Diego',
    items: [
      { q: 'What should I do right after a car accident in San Diego?', a: 'Document everything: photos of all vehicles, license plates, license, insurance card, and the surrounding intersection. Get a police report — even for minor accidents. Do not admit fault. Notify your insurer to open the claim. You do not have to commit to a shop yet.' },
      { q: 'Do I have to use the body shop my insurance recommends?', a: 'No. California law lets you choose where your vehicle is repaired. Insurance recommendations are optional. Direct Repair Program shops have a volume contract with the insurer — useful for speed, but the shop\'s loyalty is to the contract, not always to you.' },
      { q: 'Should I get a quick settlement check from the other driver\'s insurance?', a: 'Be careful. Quick settlements often require you to sign away your right to future claims. Hidden vehicle damage and medical issues can surface days or weeks later. Get a real teardown estimate before signing anything.' },
      { q: 'What if I think the insurance estimate is too low?', a: 'Initial estimates almost always miss damage. Shops write "supplements" once the car is torn down and inner damage is visible. Insurers usually pay supplements, but the back-and-forth can delay your car. A specialist accident-help service walks you through it.' },
      { q: 'How do I know if the damage is more than what\'s visible?', a: 'You usually do not until teardown. Bent inner panels, broken brackets, deformed reinforcement bars, and hidden structural damage are common. Insist on a teardown estimate, not a walk-around estimate.' },
      { q: 'Can I send photos before deciding what to do?', a: 'Yes — that is the fastest path. A few photos let us tell you whether this is a cosmetic repair, a collision repair, or an insurance-claim path before you commit to anything.' },
    ],
  },
  'insurance-auto-body-repair-san-diego.html': {
    serviceName: 'Insurance Auto Body Repair Help',
    serviceDesc: 'Insurance claim guidance, estimate review, supplement help, OEM parts advocacy, and shop selection.',
    canonical: 'https://autobodysandiego.com/insurance-auto-body-repair-san-diego',
    breadcrumbName: 'Insurance Auto Body Repair San Diego',
    items: [
      { q: 'What does an insurance auto body repair estimate include?', a: 'Insurance-related repairs often begin with damage photos, claim information, and an initial estimate. The estimate may cover visible damage only — if additional damage is found later during teardown, the repair process may require further documentation through a supplement.' },
      { q: 'What is a supplement on an auto body claim?', a: 'A supplement is a follow-up estimate requesting additional parts or labor after the shop tears the vehicle down and finds damage the original estimate missed. This is normal. Most insurers pay supplements, but the back-and-forth can delay your repair.' },
      { q: 'Can I request OEM parts on an insurance repair?', a: 'You can ask. OEM parts (original equipment from the vehicle manufacturer) fit better and last longer than most aftermarket alternatives, especially for structural and safety parts. Some policies cover OEM by default, some do not — review your policy or ask before approving the estimate.' },
      { q: 'What is diminished value and do I qualify?', a: 'Diminished value is the drop in your vehicle\'s resale value caused by being in a documented accident — even after a complete repair. If you were not at fault, California allows you to claim diminished value against the at-fault party\'s insurance. The amount depends on the vehicle\'s age, value, and damage history.' },
      { q: 'How long do insurance auto body repairs take in San Diego?', a: 'Depends on the damage scope, parts availability, and how quickly the insurer approves supplements. Light claims run one to two weeks. Larger claims with structural work and parts on order run four to eight weeks. We give realistic windows up front.' },
      { q: 'Can I dispute a total-loss valuation?', a: 'Yes. The first total-loss valuation is rarely final. You can counter with comparable San Diego market data (similar year, make, model, mileage, condition). Many drivers raise their settlement by negotiating with real comparable sales.' },
    ],
  },
};

function buildFaqSection(faqs) {
  const items = faqs.items.map(({ q, a }) => `          <details class="faq-item">
            <summary>${q}</summary>
            <div class="faq-body">${a}</div>
          </details>`).join('\n');
  return `    <section id="faq">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">Common Questions</span>
          <h2 class="h2">${faqs.serviceName} FAQ.</h2>
        </div>
        <div class="faq-list">
${items}
        </div>
      </div>
    </section>

`;
}

function buildSchemaBlock(faqs) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: faqs.serviceName,
    description: faqs.serviceDesc,
    areaServed: { '@type': 'AdministrativeArea', name: 'San Diego County, California' },
    provider: { '@type': 'AutoRepair', name: 'AutoBody San Diego', url: 'https://autobodysandiego.com/' },
    url: faqs.canonical,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://autobodysandiego.com/' },
      { '@type': 'ListItem', position: 2, name: faqs.breadcrumbName, item: faqs.canonical },
    ],
  };
  return `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
`;
}

// Homepage schema (no FAQ on homepage, just AutoRepair + LocalBusiness)
const homeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'LocalBusiness'],
    name: 'AutoBody San Diego',
    url: 'https://autobodysandiego.com/',
    image: 'https://autobodysandiego.com/assets/logo.png',
    description: 'Regional auto body repair guidance and routing for San Diego drivers — bumper, paint, collision, and insurance-related damage.',
    areaServed: { '@type': 'AdministrativeArea', name: 'San Diego County, California' },
    serviceArea: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 32.7157, longitude: -117.1611 }, geoRadius: 50000 },
  },
];

let touched = 0;

// Inject FAQ + schema into 5 service pages
for (const [fileName, faqs] of Object.entries(FAQS)) {
  const filePath = path.join(root, fileName);
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;

  // Skip if FAQ already injected (idempotency)
  if (html.includes('class="faq-item"')) {
    console.log(`  skip (FAQ already present): ${fileName}`);
    continue;
  }

  // Insert FAQ section right before the final "Get Started" quote-section
  // i.e. right before the LAST <section class="quote-section">
  const faqHtml = buildFaqSection(faqs);
  const lastQuoteIdx = html.lastIndexOf('<section class="quote-section">');
  if (lastQuoteIdx === -1) {
    console.log(`  WARN: no quote-section found in ${fileName}`);
    continue;
  }
  // Find start of the line (look back for whitespace)
  let insertAt = lastQuoteIdx;
  while (insertAt > 0 && html[insertAt - 1] !== '\n') insertAt--;
  html = html.slice(0, insertAt) + faqHtml + html.slice(insertAt);

  // Inject JSON-LD schemas right before </head>
  const schemaBlock = buildSchemaBlock(faqs);
  html = html.replace('</head>', schemaBlock + '</head>');

  fs.writeFileSync(filePath, html, 'utf8');
  touched++;
  console.log(`  updated ${fileName}`);
}

// Inject homepage AutoRepair / LocalBusiness schema
const homePath = path.join(root, 'index.html');
let homeHtml = fs.readFileSync(homePath, 'utf8');
if (!homeHtml.includes('"@type":["AutoRepair","LocalBusiness"]') && !homeHtml.includes('"@type": ["AutoRepair"')) {
  const block = homeSchemas.map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n') + '\n';
  homeHtml = homeHtml.replace('</head>', block + '</head>');
  fs.writeFileSync(homePath, homeHtml, 'utf8');
  touched++;
  console.log('  updated index.html (homepage schema)');
}

console.log(`\nTouched ${touched} files.`);
