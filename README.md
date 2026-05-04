# SiteForge

A personal website builder for spinning up production-ready sites for small local businesses. Two parts in one repo:

1. **The Builder** — a private React + Vite admin app where you fill in a company's details, upload photos, pick a template, and preview the result live.
2. **The Templates** — a small library of distinct, hand-built website templates that get populated with that data and exported as a self-contained, deployable folder.

No backend. No database. State lives in a `project.json` per site, saved to disk.

## Getting started

```bash
npm install
npm run dev          # Builder on http://localhost:5173
npm run build        # Type-check + build the builder
npm run typecheck    # Type-check only
```

## Workflow

1. Open the builder.
2. Fill in **Business info → Brand → Content → SEO**.
3. The **Template** step auto-suggests a layout based on the industry. Override any time — your content carries over.
4. Use **↻ Regenerate** to reshuffle the randomization layer (font pairing, accent placement, section order) without changing your content.
5. Press **↓ project.json** to save the editable source-of-truth.
6. Press **⬇ Export site (.zip)** to get a self-contained, deployable folder:
   - `index.html` — generated, human-readable HTML
   - `assets/css/style.min.css` (+ unminified copy)
   - `assets/js/main.min.js` (+ unminified copy)
   - `assets/images/…`
   - `sitemap.xml`, `robots.txt`
   - `project.json` — re-importable into the builder

Drag the unzipped folder onto [Netlify Drop](https://app.netlify.com/drop) and you're live. The contact form is pre-wired with `data-netlify`.

## Generated site guarantees

Every export is:

- **Mobile-first** — designed from the smallest screen up, hamburger nav, touch targets ≥ 44px, no horizontal scroll.
- **SEO-baked-in** — semantic HTML, auto-generated `<title>` / meta description, Open Graph + Twitter cards, `LocalBusiness` JSON-LD populated from the form, canonical URL, alt text for every image, sitemap.xml, robots.txt.
- **Performant** — lazy-loaded images, minified CSS and JS, no render-blocking dependencies, no third-party frameworks (pure HTML5 + CSS3 + vanilla JS).
- **Accessible** — ARIA labels where needed, keyboard navigable, focus-visible styles, skip-to-content link, reduced-motion handling, and a contrast warning in the builder UI when colours fall below WCAG AA.

## Project structure

```
siteforge/
├── src/
│   ├── builder/                    # The React admin app
│   │   ├── App.tsx
│   │   ├── components/             # Field, Dropzone, PreviewPane…
│   │   ├── sections/               # Multi-step form sections
│   │   ├── defaults.ts
│   │   ├── imageUpload.ts
│   │   └── storage.ts              # localStorage autosave
│   ├── engine/                     # Pure rendering + export logic
│   │   ├── render.ts               # template registry + main HTML render
│   │   ├── preview.ts              # iframe-friendly render with inlined assets
│   │   ├── export.ts               # ZIP packaging
│   │   ├── seo.ts                  # head tags, JSON-LD, sitemap, robots
│   │   ├── sharedCss.ts            # CSS shipped with every template
│   │   ├── clientScript.ts         # vanilla JS shipped with every template
│   │   ├── minify.ts               # conservative CSS / JS minifiers
│   │   ├── color.ts                # hex utils + contrast ratio
│   │   ├── escape.ts               # HTML/attr/JSON-LD escapers
│   │   ├── format.ts               # opening hours, schema.org hours, slugify
│   │   └── random.ts               # deterministic seeded PRNG
│   ├── templates/                  # One module per template
│   │   ├── shared.ts
│   │   ├── template-01-classic-trade.ts
│   │   ├── template-02-editorial-cafe.ts
│   │   ├── template-03-studio-grid.ts
│   │   └── template-04-bold-fitness.ts
│   ├── types/
│   │   └── project.ts              # SiteProject + every nested type
│   ├── styles/
│   │   └── index.css               # Tailwind base for the builder UI
│   └── main.tsx
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Templates at a glance

| ID | Name | Vibe | Best for |
| --- | --- | --- | --- |
| `classic-trade` | Classic Trade | Sturdy · Trustworthy · No-nonsense | Trades / contractor, professional services |
| `editorial-cafe` | Editorial Café | Warm · Editorial · Welcoming | Café / restaurant, retail, hair & beauty |
| `studio-grid` | Studio Grid | Minimal · Editorial · Type-driven | Hair & beauty, professional services, retail |
| `bold-fitness` | Bold Fitness | Bold · Energetic · High-contrast | Fitness / wellness, cafés, anything punchy |

Each template:

- Is structured as a **mobile-first** layout, fully tested across breakpoints down to 320px.
- Renders all required sections: hero, about, services, gallery (CSS grid + lightbox), testimonials, contact (form + address + hours), footer.
- Pulls a font pair, an accent treatment, and (sometimes) a section order from a deterministic seed so two sites built from the same template look meaningfully different.
- Emits semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`) with proper heading hierarchy.

## Adding a new template

A template is just a TypeScript module exporting a `TemplateModule` with three pieces:

```ts
// src/templates/template-05-your-name.ts
import type { TemplateMeta, SiteProject } from '@/types/project';
import type { TemplateModule } from '@/engine/render';

const META: TemplateMeta = {
  id: 'your-name',                  // also add to TemplateId in src/types/project.ts
  name: 'Your Template',
  description: 'One-line description shown in the picker.',
  bestFor: ['retail-shop'],         // industries this template suits
  vibe: 'Calm · Modern',
};

function css(project: SiteProject): string {
  // Return the visual CSS unique to this template.
  // Shared resets, lightbox, mobile nav, and skip-link styles are added automatically.
  return `/* ... */`;
}

function body(project: SiteProject): string {
  // Return the HTML that lives between <body>...</body>.
  // You're given the full SiteProject — use the helpers in templates/shared.ts
  // for the contact form, hours list, social links, image tags, etc.
  return `<header class="site-header" id="top">…</header><main id="main">…</main><footer>…</footer>`;
}

export const TEMPLATE_05: TemplateModule = { meta: META, css, body };
```

Then wire it into the registry:

1. Add `'your-name'` to the `TemplateId` union in [`src/types/project.ts`](src/types/project.ts).
2. Import and register your module in [`src/engine/render.ts`](src/engine/render.ts):
   ```ts
   import { TEMPLATE_05 } from '@/templates/template-05-your-name';
   export const TEMPLATES = {
     'classic-trade': TEMPLATE_01,
     'editorial-cafe': TEMPLATE_02,
     'studio-grid': TEMPLATE_03,
     'bold-fitness': TEMPLATE_04,
     'your-name': TEMPLATE_05,
   };
   ```

That's it — the new template appears in the builder's template picker, can be auto-suggested from any industry you list in `bestFor`, and is included in every export pipeline.

### Tips for new templates

- **Mobile-first.** Start with the smallest layout, add `@media (min-width: …)` queries upward.
- **Use the deterministic randomizer.** Pull two or three variations through `createRng(project.randomization.seed)` so the **Regenerate** button has something to do.
- **Comment your sections.** Use `<!-- HERO -->`, `<!-- ABOUT -->`, etc. The unminified HTML is human-readable on purpose.
- **Use the helpers** in `src/templates/shared.ts` (`netlifyFormFields`, `hoursList`, `socialLinks`, `contactBlock`, `imgTag`) so SEO, accessibility, and Netlify Forms behaviour stays consistent.

## Notes

- The builder writes a working copy to `localStorage` so a refresh doesn't lose state. The exported `project.json` is the canonical store.
- The minifiers are intentionally conservative (no parser, no rename) so the export is auditable and predictable.
- Image WebP conversion isn't done in-browser. The export includes a `<!-- WebP hint -->` comment next to every image reference and a note in `NOTES.md` so you can convert on the way to production.
