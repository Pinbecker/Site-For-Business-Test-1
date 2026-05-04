import type {
  DesignSettings,
  GalleryLayout,
  HeroLayout,
  ImageAsset,
  SiteProject,
  TemplateId,
  TemplateMeta,
} from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { escapeAttr, escapeHtml } from '@/engine/escape';
import { createRng } from '@/engine/random';
import { readableOn, shade, tint } from '@/engine/color';
import {
  contactBlock,
  hoursList,
  imgTag,
  logoOrName,
  mapEmbed,
  netlifyFormFields,
  servicesList,
  socialLinks,
  testimonialsList,
  visuallyHiddenCss,
} from './shared';

type SectionId = DesignSettings['sectionOrder'][number];

interface Preset {
  meta: TemplateMeta;
  design: Partial<DesignSettings>;
}

const BASE_DESIGN: DesignSettings = {
  mood: 'assured',
  fontStyle: 'modern',
  heroLayout: 'split',
  navStyle: 'utility',
  sectionLayout: 'balanced',
  serviceLayout: 'cards',
  galleryLayout: 'grid',
  testimonialLayout: 'cards',
  contactLayout: 'split',
  cornerStyle: 'soft',
  depthStyle: 'subtle',
  density: 'comfortable',
  contrast: 'standard',
  sectionOrder: [
    'about',
    'features',
    'services',
    'products',
    'process',
    'gallery',
    'team',
    'credentials',
    'areas',
    'promotion',
    'testimonials',
    'faqs',
    'contact',
  ],
  showStats: true,
  showBadges: true,
  showPricing: true,
  heroImageFirst: false,
  stickyCta: true,
  ctaLabel: 'Get a quote',
  secondaryCtaLabel: 'View services',
};

export const COMPOSABLE_PRESETS: Record<TemplateId, Preset> = {
  'classic-trade': {
    meta: {
      id: 'classic-trade',
      name: 'Local Authority',
      description: 'A practical service-led site for trades, contractors, clinics, and local operators.',
      bestFor: ['trades-contractor', 'professional-services', 'other'],
      vibe: 'Trustworthy / direct / conversion-led',
    },
    design: { heroLayout: 'service-led', serviceLayout: 'cards', mood: 'assured' },
  },
  'editorial-cafe': {
    meta: {
      id: 'editorial-cafe',
      name: 'Editorial Welcome',
      description: 'A warm, image-forward direction for cafes, restaurants, venues, and lifestyle brands.',
      bestFor: ['cafe-restaurant', 'retail-shop', 'hair-beauty'],
      vibe: 'Warm / story-led / atmospheric',
    },
    design: {
      mood: 'warm',
      fontStyle: 'editorial',
      heroLayout: 'editorial',
      serviceLayout: 'price-menu',
      galleryLayout: 'masonry',
      sectionLayout: 'spacious',
    },
  },
  'studio-grid': {
    meta: {
      id: 'studio-grid',
      name: 'Studio Portfolio',
      description: 'A clean portfolio structure for makers, studios, designers, salons, and visual work.',
      bestFor: ['hair-beauty', 'retail-shop', 'professional-services'],
      vibe: 'Visual / precise / portfolio-first',
    },
    design: { mood: 'crisp', fontStyle: 'technical', heroLayout: 'poster', galleryLayout: 'showcase' },
  },
  'bold-fitness': {
    meta: {
      id: 'bold-fitness',
      name: 'Momentum',
      description: 'High-contrast, action-focused pages for fitness, wellness, events, and launches.',
      bestFor: ['fitness-wellness', 'other'],
      vibe: 'Energetic / loud / urgent',
    },
    design: {
      mood: 'expressive',
      fontStyle: 'technical',
      heroLayout: 'poster',
      contrast: 'high',
      density: 'compact',
      serviceLayout: 'feature-grid',
    },
  },
  'executive-consulting': {
    meta: {
      id: 'executive-consulting',
      name: 'Expert Practice',
      description: 'A restrained, credibility-heavy structure for consultants and professional services.',
      bestFor: ['professional-services'],
      vibe: 'Expert / calm / high-trust',
    },
    design: { mood: 'assured', fontStyle: 'classic', navStyle: 'centered', depthStyle: 'flat' },
  },
  'boutique-salon': {
    meta: {
      id: 'boutique-salon',
      name: 'Boutique Booking',
      description: 'A premium appointment-led layout for salons, beauty, wellness, and personal services.',
      bestFor: ['hair-beauty', 'fitness-wellness'],
      vibe: 'Premium / elegant / appointment-led',
    },
    design: {
      mood: 'premium',
      fontStyle: 'editorial',
      heroLayout: 'stacked',
      galleryLayout: 'masonry',
      sectionLayout: 'spacious',
      contactLayout: 'panel',
    },
  },
  'corporate-grid': {
    meta: {
      id: 'corporate-grid',
      name: 'Operations Grid',
      description: 'A dense scanning layout for businesses with many services, proof points, or locations.',
      bestFor: ['professional-services', 'trades-contractor', 'other'],
      vibe: 'Organised / scalable / information-rich',
    },
    design: { mood: 'crisp', sectionLayout: 'compact', serviceLayout: 'feature-grid', density: 'compact' },
  },
  'performance-pro': {
    meta: {
      id: 'performance-pro',
      name: 'Lead Engine',
      description: 'A direct-response site shape for quote requests, campaigns, and service businesses.',
      bestFor: ['trades-contractor', 'fitness-wellness', 'other'],
      vibe: 'Conversion / proof / fast action',
    },
    design: {
      mood: 'expressive',
      heroLayout: 'service-led',
      serviceLayout: 'feature-grid',
      contrast: 'high',
      stickyCta: true,
    },
  },
  'neon-dark': {
    meta: {
      id: 'neon-dark',
      name: 'Night Signal',
      description: 'A dark, high-impact direction for modern venues, creators, and standout brands.',
      bestFor: ['fitness-wellness', 'retail-shop', 'other'],
      vibe: 'Dark / electric / memorable',
    },
    design: { mood: 'expressive', contrast: 'high', depthStyle: 'elevated', cornerStyle: 'rounded' },
  },
  'luxury-minimal': {
    meta: {
      id: 'luxury-minimal',
      name: 'Quiet Premium',
      description: 'Elegant whitespace, refined type, and calmer pacing for premium local businesses.',
      bestFor: ['hair-beauty', 'retail-shop', 'professional-services'],
      vibe: 'Minimal / premium / spacious',
    },
    design: {
      mood: 'premium',
      fontStyle: 'editorial',
      heroLayout: 'split',
      sectionLayout: 'spacious',
      depthStyle: 'flat',
      cornerStyle: 'soft',
    },
  },
  'retro-americana': {
    meta: {
      id: 'retro-americana',
      name: 'Character Shop',
      description: 'A friendly, distinctive shopfront feel for cafes, retail, independents, and makers.',
      bestFor: ['cafe-restaurant', 'retail-shop', 'other'],
      vibe: 'Friendly / characterful / local',
    },
    design: { mood: 'playful', fontStyle: 'friendly', heroLayout: 'poster', cornerStyle: 'sharp' },
  },
  'brutalist-news': {
    meta: {
      id: 'brutalist-news',
      name: 'Bold Notice',
      description: 'A blunt, structured, announcement-style page for brands that need immediate attention.',
      bestFor: ['trades-contractor', 'professional-services', 'other'],
      vibe: 'Sharp / bold / no-nonsense',
    },
    design: { mood: 'crisp', fontStyle: 'technical', heroLayout: 'editorial', cornerStyle: 'sharp', contrast: 'high' },
  },
};

export function createComposableTemplate(preset: Preset): TemplateModule {
  return {
    meta: preset.meta,
    css: (project) => css(project, preset.design),
    body: (project) => body(project, preset.design),
  };
}

function resolveDesign(project: SiteProject, preset: Partial<DesignSettings>): DesignSettings {
  return { ...BASE_DESIGN, ...preset, ...(project.design ?? {}) };
}

function css(project: SiteProject, preset: Partial<DesignSettings>): string {
  const rng = createRng(project.randomization.seed);
  const design = resolveDesign(project, preset);
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  const font = fontPair(design.fontStyle, rng.int(3));
  const mood = moodTokens(design.mood, primary, secondary);
  const radius = design.cornerStyle === 'sharp' ? '0px' : design.cornerStyle === 'rounded' ? '24px' : '12px';
  const radiusLg = design.cornerStyle === 'sharp' ? '0px' : design.cornerStyle === 'rounded' ? '38px' : '20px';
  const shadow =
    design.depthStyle === 'flat'
      ? 'none'
      : design.depthStyle === 'elevated'
        ? `0 26px 80px ${mood.shadow}`
        : `0 14px 40px ${mood.shadow}`;
  const pad =
    design.density === 'compact'
      ? 'clamp(.85rem,2vw,1.55rem)'
      : design.density === 'spacious'
        ? 'clamp(1.75rem,4.5vw,4.5rem)'
        : 'clamp(1.25rem,3vw,3rem)';
  const sectionPad =
    design.sectionLayout === 'compact'
      ? 'clamp(2.75rem,5vw,4.75rem)'
      : design.sectionLayout === 'spacious'
        ? 'clamp(5rem,9vw,8rem)'
        : design.sectionLayout === 'feature'
          ? 'clamp(4.5rem,8vw,7.25rem)'
        : 'clamp(3.75rem,7vw,6.5rem)';
  const bg = design.contrast === 'high' ? '#f7f7f2' : mood.bg;
  const ink = design.contrast === 'high' ? '#090909' : mood.ink;
  const surface = design.contrast === 'soft' ? tint(primary, 0.93) : mood.surface;
  const line = design.contrast === 'high' ? '#111111' : mood.line;
  const accentSoft = design.contrast === 'high' ? tint(primary, 0.72) : mood.soft;
  const cardPad =
    design.density === 'compact'
      ? 'clamp(.9rem,1.6vw,1.15rem)'
      : design.density === 'spacious'
        ? 'clamp(1.45rem,2.5vw,2.1rem)'
        : 'clamp(1.1rem,2vw,1.55rem)';
  const gridGap =
    design.density === 'compact'
      ? 'clamp(.55rem,1.2vw,.85rem)'
      : design.density === 'spacious'
        ? 'clamp(1.15rem,2.4vw,1.85rem)'
        : 'clamp(.85rem,2vw,1.25rem)';

  return `/* === SiteForge Composable System ============================ */
@import url("${font.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-bg:${bg};
  --color-surface:${surface};
  --color-ink:${ink};
  --color-ink-2:${tint(ink, 0.28)};
  --color-muted:${tint(ink, 0.48)};
  --color-line:${line};
  --color-soft:${accentSoft};
  --color-hero:${mood.hero};
  --color-band:${mood.band};
  --font-head:${font.head};
  --font-body:${font.body};
  --radius:${radius};
  --radius-lg:${radiusLg};
  --shadow:${shadow};
  --pad:${pad};
  --card-pad:${cardPad};
  --grid-gap:${gridGap};
  --section-pad:${sectionPad};
  --max:${design.sectionLayout === 'compact' ? '1080px' : design.sectionLayout === 'feature' ? '1320px' : '1240px'};
}
${visuallyHiddenCss()}
body{font-family:var(--font-body);background:var(--color-bg);color:var(--color-ink);line-height:${design.density === 'compact' ? '1.5' : design.density === 'spacious' ? '1.78' : '1.62'};-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--font-head);line-height:${design.fontStyle === 'editorial' ? '1' : '1.04'};letter-spacing:0;font-weight:${design.fontStyle === 'technical' ? 800 : design.fontStyle === 'editorial' ? 650 : 700}}
h1{font-size:${design.density === 'compact' ? 'clamp(2.2rem,6vw,5.6rem)' : 'clamp(2.55rem,7vw,6.6rem)'};max-width:13ch;text-wrap:balance}
h2{font-size:${design.density === 'compact' ? 'clamp(1.7rem,3.8vw,3.4rem)' : 'clamp(2rem,4.5vw,4.5rem)'};max-width:12ch;text-wrap:balance}
h3{font-size:clamp(1.1rem,1.5vw,1.45rem)}
p{color:var(--color-ink-2)}
section{padding-block:var(--section-pad)}
.site-shell{min-height:100dvh}
.site-shell[data-mood="warm"] .site-header{border-bottom-color:${tint(primary, 0.68)}}
.site-shell[data-mood="crisp"] .section-kicker{border-left:4px solid var(--color-primary);padding-left:.65rem}
.site-shell[data-mood="expressive"] h1,.site-shell[data-mood="expressive"] h2{text-transform:uppercase}
.site-shell[data-mood="premium"] .section-kicker{font-family:var(--font-head);font-size:.95rem;text-transform:none;letter-spacing:.03em}
.site-shell[data-mood="playful"] .badge,.site-shell[data-mood="playful"] .cta,.site-shell[data-mood="playful"] .feature__icon{transform:rotate(-1deg)}
.site-shell[data-density="compact"] .section-head{margin-bottom:1.1rem}
.site-shell[data-density="spacious"] .section-head{margin-bottom:clamp(2.25rem,4vw,3.6rem)}
.site-shell[data-section="feature"] section:nth-of-type(even){background:var(--color-band)}
.site-shell[data-section="feature"] .section-head{display:grid;grid-template-columns:1fr;gap:.75rem}
@media(min-width:900px){.site-shell[data-section="feature"] .section-head{grid-template-columns:.72fr 1fr;align-items:start}.site-shell[data-section="feature"] .section-head h2{max-width:9ch}}
.section-kicker{font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;font-weight:800;color:var(--color-primary);margin-bottom:.75rem}
.section-head{display:flex;align-items:end;justify-content:space-between;gap:1.5rem;margin-bottom:clamp(1.5rem,3vw,2.5rem)}
.section-head p{max-width:48ch}
.site-header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--color-bg) 90%,transparent);backdrop-filter:blur(18px);border-bottom:1px solid color-mix(in srgb,var(--color-line) 70%,transparent)}
.site-header__inner{min-height:76px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:1rem}
.brand-mark{font-family:var(--font-head);font-weight:800;font-size:1.02rem;letter-spacing:0}
.brand-mark img{max-height:40px;width:auto}
[data-nav]{display:none;position:fixed;inset:76px 0 auto 0;background:var(--color-bg);border-bottom:1px solid var(--color-line);padding:1rem var(--pad);box-shadow:var(--shadow)}
[data-nav][data-open="true"]{display:block}
[data-nav] ul{display:flex;flex-direction:column;gap:.35rem}
[data-nav] a{display:block;border-radius:calc(var(--radius) * .7);padding:.7rem .85rem;font-weight:700;color:var(--color-muted)}
[data-nav] a:hover{background:var(--color-soft);color:var(--color-ink)}
@media(min-width:900px){
  [data-nav]{display:block;position:static;background:transparent;border:0;padding:0;box-shadow:none}
  [data-nav] ul{flex-direction:row;justify-content:${design.navStyle === 'centered' ? 'center' : 'end'};align-items:center;gap:.15rem}
  [data-nav] a{padding:.5rem .7rem;font-size:.9rem}
  [data-nav-toggle]{display:none}
}
.site-shell[data-nav-style="utility"] [data-nav] a{border:1px solid transparent}
.site-shell[data-nav-style="utility"] [data-nav] a:hover{border-color:var(--color-line)}
.site-shell[data-nav-style="centered"] .site-header__inner{grid-template-columns:1fr auto 1fr}
.site-shell[data-nav-style="centered"] .brand-mark{justify-self:start}
.site-shell[data-nav-style="centered"] .header-cta{justify-self:end}
.header-cta{display:none}
@media(min-width:900px){.header-cta{display:inline-flex}}
${design.navStyle === 'simple' ? '@media(min-width:900px){.site-header__inner{grid-template-columns:auto 1fr}.header-cta{display:none}[data-nav] a{font-weight:600;color:var(--color-ink)}}' : ''}
${design.navStyle === 'drawer' ? '@media(min-width:900px){[data-nav-toggle]{display:inline-grid}[data-nav]{display:none;position:fixed;inset:76px var(--pad) auto auto;width:min(360px,calc(100vw - 2rem));background:var(--color-bg);border:1px solid var(--color-line);border-radius:var(--radius);padding:1rem;box-shadow:var(--shadow)}[data-nav][data-open="true"]{display:block}[data-nav] ul{flex-direction:column;align-items:stretch}.header-cta{display:inline-flex}}' : ''}
.cta{border-radius:var(--radius);border:1px solid transparent}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);box-shadow:${design.depthStyle === 'flat' ? 'none' : '0 12px 30px color-mix(in srgb,var(--color-primary) 20%,transparent)'}}
.cta--primary:hover{background:${shade(primary, 0.1)}}
.cta--ghost{background:transparent;color:var(--color-ink);border-color:color-mix(in srgb,var(--color-line) 80%,transparent)}
.cta--ghost:hover{background:var(--color-ink);color:#fff}
.hero{padding-block:clamp(2rem,5vw,5rem);overflow:hidden;background:var(--color-hero)}
.hero__inner{display:grid;gap:clamp(1.25rem,3vw,3rem);align-items:center}
[data-hero="split"] .hero__inner,[data-hero="service-led"] .hero__inner{grid-template-columns:1fr}
@media(min-width:900px){[data-hero="split"] .hero__inner,[data-hero="service-led"] .hero__inner{grid-template-columns:${design.heroImageFirst ? 'minmax(0,.95fr) minmax(0,1.05fr)' : 'minmax(0,1.05fr) minmax(0,.95fr)'}}}
[data-hero="poster"] .hero__inner,[data-hero="editorial"] .hero__inner,[data-hero="stacked"] .hero__inner{grid-template-columns:1fr}
[data-hero="poster"] .hero{text-align:center}
[data-hero="poster"] .hero h1,[data-hero="poster"] .hero__copy,[data-hero="stacked"] .hero h1,[data-hero="stacked"] .hero__copy{margin-inline:auto}
[data-hero="editorial"] h1{max-width:18ch}
@media(min-width:900px){[data-hero="editorial"] .hero__inner{grid-template-columns:1.35fr .65fr;align-items:end}[data-hero="editorial"] .hero__copy{max-width:none}[data-hero="editorial"] .hero__media{min-height:520px}}
[data-hero="stacked"] .hero__copy{text-align:center}
.hero__copy{display:flex;flex-direction:column;gap:1.3rem;max-width:65ch}
.hero__eyebrow{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
.badge{display:inline-flex;align-items:center;min-height:30px;border:1px solid color-mix(in srgb,var(--color-primary) 22%,var(--color-line));border-radius:999px;padding:.3rem .65rem;background:color-mix(in srgb,var(--color-soft) 70%,white);color:var(--color-ink);font-size:.78rem;font-weight:800}
.hero__sub{font-size:clamp(1.04rem,1.35vw,1.24rem);max-width:54ch}
.hero__ctas{display:flex;flex-wrap:wrap;gap:.75rem}
.hero__media{position:relative;overflow:hidden;border-radius:var(--radius-lg);background:linear-gradient(135deg,var(--color-soft),#fff);box-shadow:var(--shadow);min-height:280px}
.hero__media img{width:100%;height:100%;object-fit:cover}
[data-hero="poster"] .hero__media{max-height:540px;aspect-ratio:16/8}
[data-hero="stacked"] .hero__media{aspect-ratio:16/7}
[data-hero="editorial"] .hero__media{aspect-ratio:5/3}
[data-hero="service-led"] .hero__media{display:grid;align-content:stretch;padding:0;background:var(--color-ink);color:#fff}
.hero__service-panel{position:relative;display:grid;align-content:end;min-height:100%;padding:var(--card-pad);isolation:isolate}
.hero__service-panel img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;opacity:.22}
.hero__service-panel::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent,rgba(0,0,0,.82))}
.hero__service-panel h3{color:#fff;margin-bottom:1rem}
.hero__service-list{display:grid;gap:.65rem}
.hero__service-list li{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid rgba(255,255,255,.2);padding-top:.65rem;color:rgba(255,255,255,.86)}
.hero__service-list strong{color:#fff}
.hero__placeholder{position:absolute;inset:0;background:linear-gradient(145deg,var(--color-soft),#fff 62%,${tint(secondary, 0.86)})}
.hero__proof{display:grid;grid-template-columns:repeat(3,1fr);gap:.65rem;margin-top:.5rem}
.proof-card{border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius);padding:.9rem;background:color-mix(in srgb,var(--color-surface) 90%,white);box-shadow:var(--shadow)}
.proof-card strong{display:block;font-family:var(--font-head);font-size:1.25rem;color:var(--color-ink)}
.proof-card span{font-size:.78rem;font-weight:700;color:var(--color-muted)}
.surface{background:var(--color-surface);border-top:1px solid color-mix(in srgb,var(--color-line) 55%,transparent);border-bottom:1px solid color-mix(in srgb,var(--color-line) 55%,transparent)}
.about__grid,.contact__grid{display:grid;gap:clamp(1.25rem,3vw,3rem)}
@media(min-width:900px){.about__grid,.contact__grid{grid-template-columns:.8fr 1.2fr}}
.about__lead{font-size:clamp(1.03rem,1.3vw,1.2rem);white-space:pre-wrap}
.features__grid,.products__grid,.credentials__grid,.areas__grid{display:grid;gap:var(--grid-gap);grid-template-columns:1fr}
@media(min-width:760px){.features__grid,.products__grid,.credentials__grid{grid-template-columns:repeat(3,1fr)}.areas__grid{grid-template-columns:repeat(4,1fr)}}
.feature,.product,.credential,.area-pill,.process-step,.faq-item,.team-member{border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius-lg);background:var(--color-surface);box-shadow:var(--shadow)}
.feature,.product,.credential,.team-member{padding:var(--card-pad)}
.feature__icon,.process-step__num{display:grid;place-items:center;width:42px;height:42px;border-radius:999px;background:var(--color-soft);color:var(--color-primary);font-weight:900;margin-bottom:1rem}
.product__price{display:inline-flex;margin-top:1rem;font-weight:900;color:var(--color-primary)}
.services__grid{display:grid;gap:var(--grid-gap);grid-template-columns:1fr}
@media(min-width:720px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1060px){[data-services="cards"] .services__grid,[data-services="feature-grid"] .services__grid{grid-template-columns:repeat(3,1fr)}}
.service{border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius-lg);background:var(--color-surface);box-shadow:var(--shadow);padding:var(--card-pad)}
.service__top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:.8rem}
.service__num{font-weight:900;color:var(--color-primary)}
.service__price{font-weight:900;color:var(--color-ink);white-space:nowrap}
[data-services="feature-grid"] .service:first-child{grid-column:1/-1;background:var(--color-primary);color:var(--color-on-primary)}
[data-services="feature-grid"] .service:first-child p,[data-services="feature-grid"] .service:first-child .service__price,[data-services="feature-grid"] .service:first-child .service__num{color:color-mix(in srgb,var(--color-on-primary) 86%,transparent)}
@media(min-width:1060px){[data-services="feature-grid"] .service:first-child{display:grid;grid-template-columns:1fr 1.3fr;gap:2rem;align-items:end}}
[data-services="list"] .services__grid,[data-services="price-menu"] .services__grid{display:block}
[data-services="list"] .service,[data-services="price-menu"] .service{display:grid;grid-template-columns:auto 1fr auto;gap:1rem;align-items:start;border-width:1px 0 0 0;border-radius:0;box-shadow:none;background:transparent;padding:1.1rem 0}
[data-services="list"] .service:last-child,[data-services="price-menu"] .service:last-child{border-bottom:1px solid color-mix(in srgb,var(--color-line) 70%,transparent)}
[data-services="price-menu"] .service{grid-template-columns:1fr auto;border-style:dashed}
[data-services="price-menu"] .service__top{display:contents}
[data-services="price-menu"] .service__num{display:none}
[data-services="price-menu"] .service__price{grid-column:2;grid-row:1;border:1px solid var(--color-line);border-radius:999px;padding:.25rem .65rem;background:var(--color-bg)}
[data-services="price-menu"] .service__name{grid-column:1;grid-row:1}
[data-services="price-menu"] .service__desc{grid-column:1/-1}
.process__grid{display:grid;gap:1rem;counter-reset:process}
@media(min-width:820px){.process__grid{grid-template-columns:repeat(3,1fr)}}
.process-step{padding:var(--card-pad);position:relative}
.process-step__num{font-family:var(--font-head)}
.team__grid{display:grid;gap:1rem}
@media(min-width:760px){.team__grid{grid-template-columns:repeat(3,1fr)}}
.team-member__photo{aspect-ratio:1/1;overflow:hidden;border-radius:calc(var(--radius-lg) * .85);background:var(--color-soft);margin-bottom:1rem}
.team-member__photo img{width:100%;height:100%;object-fit:cover}
.team-member__role{font-weight:900;color:var(--color-primary);margin:.25rem 0 .7rem}
.credential strong{display:block;font-family:var(--font-head);font-size:1.2rem;margin-bottom:.45rem}
.area-pill{padding:.8rem 1rem;text-align:center;font-weight:900;color:var(--color-ink)}
.promotion__box{display:grid;gap:1rem;align-items:center;border-radius:var(--radius-lg);background:linear-gradient(135deg,var(--color-primary),${shade(primary, 0.18)});color:var(--color-on-primary);padding:clamp(1.5rem,4vw,3rem);box-shadow:var(--shadow)}
@media(min-width:840px){.promotion__box{grid-template-columns:1fr auto}}
.promotion__box p,.promotion__box .section-kicker{color:color-mix(in srgb,var(--color-on-primary) 78%,transparent)}
.promotion__box .cta{background:var(--color-on-primary);color:var(--color-primary)}
.faqs__grid{display:grid;gap:.85rem}
@media(min-width:900px){.faqs__grid{grid-template-columns:repeat(2,1fr)}}
.faq-item{padding:1.1rem}
.faq-item summary{cursor:pointer;font-weight:900;color:var(--color-ink)}
.faq-item p{margin-top:.7rem}
.gallery__grid{display:grid;gap:.75rem}
[data-gallery="grid"] .gallery__grid{grid-template-columns:repeat(2,1fr)}
@media(min-width:860px){[data-gallery="grid"] .gallery__grid{grid-template-columns:repeat(4,1fr)}}
[data-gallery="masonry"] .gallery__grid{grid-template-columns:repeat(2,1fr)}
@media(min-width:860px){[data-gallery="masonry"] .gallery__grid{grid-template-columns:repeat(3,1fr)}}
[data-gallery="filmstrip"] .gallery__grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:.6rem}
[data-gallery="showcase"] .gallery__grid{grid-template-columns:1.2fr .8fr}
.gallery__item{overflow:hidden;border-radius:var(--radius);background:var(--color-soft);box-shadow:var(--shadow);min-height:180px}
.gallery__item img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease}
.gallery__item:hover img{transform:scale(1.04)}
[data-gallery="masonry"] .gallery__item:nth-child(3n+1){grid-row:span 2;min-height:380px}
[data-gallery="filmstrip"] .gallery__item{flex:0 0 min(78vw,360px);aspect-ratio:4/5;scroll-snap-align:start}
[data-gallery="showcase"] .gallery__item:first-child{grid-row:span 2;min-height:420px}
.testimonials__grid{display:grid;gap:1rem}
@media(min-width:800px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius-lg);background:var(--color-surface);box-shadow:var(--shadow);padding:clamp(1.1rem,2vw,1.6rem)}
.testimonial__quote{font-size:1.04rem}
.testimonial__name{margin-top:1rem;font-weight:900;color:var(--color-primary)}
[data-testimonials="spotlight"] .testimonials__grid{max-width:760px;margin-inline:auto;grid-template-columns:1fr}
[data-testimonials="spotlight"] .testimonial:first-child{background:var(--color-primary);color:var(--color-on-primary);padding:clamp(1.6rem,4vw,3rem)}
[data-testimonials="spotlight"] .testimonial:first-child p,[data-testimonials="spotlight"] .testimonial:first-child .testimonial__name{color:var(--color-on-primary)}
[data-testimonials="quotes"] .testimonial{box-shadow:none;background:transparent;border-width:0 0 1px 0;border-radius:0}
[data-testimonials="quotes"] .testimonial__quote{font-family:var(--font-head);font-size:clamp(1.25rem,2vw,1.8rem);line-height:1.25}
.contact-form{display:flex;flex-direction:column;gap:1rem;border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius-lg);background:var(--color-surface);box-shadow:var(--shadow);padding:clamp(1.1rem,2vw,1.6rem)}
[data-contact="panel"] .contact{background:linear-gradient(180deg,var(--color-bg),var(--color-soft))}
[data-contact="panel"] .contact__grid{border:1px solid var(--color-line);border-radius:var(--radius-lg);background:#fff;padding:var(--card-pad);box-shadow:var(--shadow)}
[data-contact="panel"] .contact-form,[data-contact="panel"] .hours-list{background:#fff}
[data-contact="stacked"] .contact__grid{grid-template-columns:1fr}
.contact-form__row{display:grid;gap:1rem}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-weight:800;color:var(--color-ink);font-size:.9rem}
.contact-form__field input,.contact-form__field textarea{border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:calc(var(--radius) * .75);background:#fff;padding:.8rem .9rem}
.contact-line{display:flex;flex-direction:column;gap:.18rem;border-bottom:1px solid color-mix(in srgb,var(--color-line) 55%,transparent);padding:.8rem 0}
.contact-line strong{font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;color:var(--color-muted)}
.hours-list{margin-top:1rem;border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent);border-radius:var(--radius);padding:.85rem;background:var(--color-surface)}
.hours-row{display:flex;justify-content:space-between;gap:1rem;padding:.36rem 0;color:var(--color-ink-2)}
.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden;border-radius:var(--radius);border:1px solid color-mix(in srgb,var(--color-line) 70%,transparent)}
.map-embed iframe{width:100%;height:100%;border:0}
.site-footer{background:var(--color-ink);color:rgba(255,255,255,.72);padding:clamp(2.5rem,5vw,4.5rem) 0 1.5rem}
.site-footer__inner{display:grid;gap:1.5rem}
@media(min-width:760px){.site-footer__inner{grid-template-columns:1.5fr 1fr 1fr}}
.site-footer h3{font-family:var(--font-head);color:#fff;margin-bottom:.65rem}
.site-footer a:hover{color:${tint(primary, 0.55)}}
.site-footer__bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-top:2rem;padding-top:1.4rem;border-top:1px solid rgba(255,255,255,.12);font-size:.85rem}
.social-links{display:flex;gap:.5rem;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border-radius:999px;border:1px solid rgba(255,255,255,.15)}
.social-links svg{width:16px;height:16px}
.sticky-action{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:45;display:none}
.sticky-action .cta{width:100%;box-shadow:0 18px 55px rgba(0,0,0,.24)}
@media(max-width:760px){.sticky-action{display:${design.stickyCta ? 'block' : 'none'}}.hero__proof{grid-template-columns:1fr}.section-head{display:block}.hero__media{min-height:230px}}
`;
}

function body(project: SiteProject, preset: Partial<DesignSettings>): string {
  const design = resolveDesign(project, preset);
  const sections = design.sectionOrder.filter((id) => shouldRender(id, project));
  const heroImage = project.content.gallery[0] ?? project.brand.logo;
  const nav = navItems(project);

  return `
    <div class="site-shell" data-mood="${design.mood}" data-density="${design.density}" data-section="${design.sectionLayout}" data-nav-style="${design.navStyle}" data-hero="${design.heroLayout}" data-services="${design.serviceLayout}" data-gallery="${design.galleryLayout}" data-testimonials="${design.testimonialLayout}" data-contact="${design.contactLayout}">
      <header class="site-header" id="top">
        <div class="container site-header__inner">
          ${logoOrName(project)}
          <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
          <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
            <ul>${nav.map((n) => `<li><a href="${n.href}">${escapeHtml(n.label)}</a></li>`).join('')}</ul>
          </nav>
          <a href="#contact" class="cta cta--primary header-cta">${escapeHtml(design.ctaLabel)}</a>
        </div>
      </header>

      <main id="main">
        ${renderHero(project, design, heroImage)}
        ${sections.map((id) => renderSection(id, project, design)).join('\n')}
      </main>

      ${design.stickyCta ? `<div class="sticky-action"><a href="#contact" class="cta cta--primary">${escapeHtml(design.ctaLabel)}</a></div>` : ''}
      ${renderFooter(project)}
    </div>`;
}

function renderHero(project: SiteProject, design: DesignSettings, heroImage: ImageAsset | null): string {
  const city = project.seo.cityRegion || project.business.address || 'Local service';
  const badges = design.showBadges
    ? `<div class="hero__eyebrow">
        <span class="badge">${escapeHtml(city)}</span>
        <span class="badge">${escapeHtml(industryLabel(project.business.industry))}</span>
      </div>`
    : '';
  const proof = design.showStats ? renderProof(project) : '';
  const media = renderHeroMedia(project, heroImage, design.heroLayout);
  const copy = `<div class="hero__copy" data-reveal>
      ${badges}
      <h1>${escapeHtml(project.business.name)}</h1>
      <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
      <div class="hero__ctas">
        <a href="#contact" class="cta cta--primary">${escapeHtml(design.ctaLabel)}</a>
        <a href="#services" class="cta cta--ghost">${escapeHtml(design.secondaryCtaLabel)}</a>
      </div>
      ${proof}
    </div>`;
  const inner = design.heroImageFirst ? media + copy : copy + media;

  return `<section class="hero" aria-labelledby="hero-title">
      <div class="container hero__inner">${inner.replace('<h1>', '<h1 id="hero-title">')}</div>
    </section>`;
}

function renderHeroMedia(project: SiteProject, image: ImageAsset | null, layout: HeroLayout): string {
  if (layout === 'service-led') {
    const services = servicesList(project.content.services).slice(0, 4);
    return `<div class="hero__media" aria-hidden="false">
      <div class="hero__service-panel">
        ${image ? imgTag(image, { loading: 'eager' }) : ''}
        <h3>Most requested</h3>
        <ul class="hero__service-list">
          ${
            services.length
              ? services
                  .map(
                    (s) =>
                      `<li><strong>${escapeHtml(s.name)}</strong>${s.price ? `<span>${escapeHtml(s.price)}</span>` : ''}</li>`,
                  )
                  .join('')
              : `<li><strong>${escapeHtml(project.business.industry.replace(/-/g, ' '))}</strong><span>Available locally</span></li>`
          }
        </ul>
      </div>
    </div>`;
  }
  return `<div class="hero__media" aria-hidden="${image ? 'false' : 'true'}">
      ${image ? imgTag(image, { loading: 'eager' }) : '<div class="hero__placeholder"></div>'}
    </div>`;
}

function renderProof(project: SiteProject): string {
  const services = servicesList(project.content.services).length;
  const testimonials = testimonialsList(project.content.testimonials).length;
  return `<div class="hero__proof" aria-label="Business highlights">
      <div class="proof-card"><strong>${services || '3'}+</strong><span>Core services</span></div>
      <div class="proof-card"><strong>${testimonials || '5'}★</strong><span>Client proof</span></div>
      <div class="proof-card"><strong>Local</strong><span>${escapeHtml(project.seo.cityRegion || 'Area')}</span></div>
    </div>`;
}

function renderSection(id: SectionId, project: SiteProject, design: DesignSettings): string {
  if (id === 'about') return renderAbout(project, design);
  if (id === 'features') return renderFeatures(project);
  if (id === 'services') return renderServices(project, design);
  if (id === 'products') return renderProducts(project);
  if (id === 'process') return renderProcess(project);
  if (id === 'gallery') return renderGallery(project, design.galleryLayout);
  if (id === 'team') return renderTeam(project);
  if (id === 'credentials') return renderCredentials(project);
  if (id === 'areas') return renderAreas(project);
  if (id === 'promotion') return renderPromotion(project);
  if (id === 'testimonials') return renderTestimonials(project, design);
  if (id === 'faqs') return renderFaqs(project);
  return renderContact(project, design);
}

function renderAbout(project: SiteProject, design: DesignSettings): string {
  const surface = design.sectionLayout === 'feature' || design.mood === 'premium' ? ' surface' : '';
  return `<section class="about${surface}" id="about" aria-labelledby="about-title">
      <div class="container about__grid">
        <div data-reveal>
          <p class="section-kicker">About</p>
          <h2 id="about-title">Built around the way clients actually choose.</h2>
        </div>
        <div data-reveal>
          <p class="about__lead">${escapeHtml(project.content.about)}</p>
        </div>
      </div>
    </section>`;
}

function renderServices(project: SiteProject, design: DesignSettings): string {
  const services = servicesList(project.content.services);
  if (!services.length) return '';
  return `<section class="services" id="services" aria-labelledby="services-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Services</p>
            <h2 id="services-title">Clear offers, easy decisions.</h2>
          </div>
          <p>Give visitors enough structure to understand the offer quickly and enough detail to make contact with confidence.</p>
        </div>
        <div class="services__grid">
          ${services
            .map(
              (s, i) => `<article class="service" data-reveal>
              <div class="service__top">
                <span class="service__num">${String(i + 1).padStart(2, '0')}</span>
                ${design.showPricing && s.price ? `<span class="service__price">${escapeHtml(s.price)}</span>` : ''}
              </div>
              <h3 class="service__name">${escapeHtml(s.name)}</h3>
              <p class="service__desc">${escapeHtml(s.description)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderFeatures(project: SiteProject): string {
  const features = project.content.features.filter((item) => item.title.trim());
  if (!features.length) return '';
  return `<section class="features surface" id="features" aria-labelledby="features-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Why choose us</p>
            <h2 id="features-title">Reasons customers feel confident.</h2>
          </div>
        </div>
        <div class="features__grid">
          ${features
            .map(
              (item, i) => `<article class="feature" data-reveal>
              <span class="feature__icon">${String(i + 1).padStart(2, '0')}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderProducts(project: SiteProject): string {
  const products = project.content.products.filter((item) => item.name.trim());
  if (!products.length) return '';
  return `<section class="products" id="products" aria-labelledby="products-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Products</p>
            <h2 id="products-title">Items, packages, and favourites.</h2>
          </div>
        </div>
        <div class="products__grid">
          ${products
            .map(
              (item) => `<article class="product" data-reveal>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.description)}</p>
              ${item.price ? `<span class="product__price">${escapeHtml(item.price)}</span>` : ''}
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderProcess(project: SiteProject): string {
  const steps = project.content.process.filter((item) => item.title.trim());
  if (!steps.length) return '';
  return `<section class="process" id="process" aria-labelledby="process-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">How it works</p>
            <h2 id="process-title">A simple path from enquiry to result.</h2>
          </div>
        </div>
        <div class="process__grid">
          ${steps
            .map(
              (item, i) => `<article class="process-step" data-reveal>
              <span class="process-step__num">${String(i + 1).padStart(2, '0')}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderGallery(project: SiteProject, layout: GalleryLayout): string {
  const gallery = project.content.gallery;
  if (!gallery.length) return '';
  const className = layout === 'filmstrip' ? 'gallery surface' : 'gallery';
  return `<section class="${className}" id="gallery" aria-labelledby="gallery-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Work</p>
            <h2 id="gallery-title">Proof you can see.</h2>
          </div>
          <p>Images help customers understand quality, style, and fit before they ever get in touch.</p>
        </div>
        <div class="gallery__grid" data-lightbox>
          ${gallery.map((g) => `<figure class="gallery__item">${imgTag(g)}</figure>`).join('\n')}
        </div>
      </div>
    </section>`;
}

function renderTestimonials(project: SiteProject, design: DesignSettings): string {
  const testimonials = testimonialsList(project.content.testimonials);
  if (!testimonials.length) return '';
  const title = design.testimonialLayout === 'spotlight' ? 'A few words from clients.' : 'People want to know what working with you feels like.';
  return `<section class="testimonials surface" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Trust</p>
            <h2 id="testimonials-title">${escapeHtml(title)}</h2>
          </div>
        </div>
        <div class="testimonials__grid">
          ${testimonials
            .map(
              (t) => `<article class="testimonial" data-reveal>
              <p class="testimonial__quote">${escapeHtml(t.quote)}</p>
              <p class="testimonial__name">${escapeHtml(t.customerName)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderTeam(project: SiteProject): string {
  const team = project.content.team.filter((item) => item.name.trim());
  if (!team.length) return '';
  return `<section class="team" id="team" aria-labelledby="team-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Team</p>
            <h2 id="team-title">Meet the people behind the work.</h2>
          </div>
        </div>
        <div class="team__grid">
          ${team
            .map(
              (member) => `<article class="team-member" data-reveal>
              ${
                member.photo
                  ? `<figure class="team-member__photo">${imgTag(member.photo)}</figure>`
                  : '<div class="team-member__photo" aria-hidden="true"></div>'
              }
              <h3>${escapeHtml(member.name)}</h3>
              ${member.role ? `<p class="team-member__role">${escapeHtml(member.role)}</p>` : ''}
              <p>${escapeHtml(member.bio)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderCredentials(project: SiteProject): string {
  const credentials = project.content.credentials.filter((item) => item.label.trim());
  if (!credentials.length) return '';
  return `<section class="credentials surface" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Credentials</p>
            <h2 id="credentials-title">Signals that reduce doubt.</h2>
          </div>
        </div>
        <div class="credentials__grid">
          ${credentials
            .map(
              (item) => `<article class="credential" data-reveal>
              <strong>${escapeHtml(item.label)}</strong>
              <p>${escapeHtml(item.detail)}</p>
            </article>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderAreas(project: SiteProject): string {
  const areas = project.content.areasServed.filter((item) => item.name.trim());
  if (!areas.length) return '';
  return `<section class="areas" id="areas" aria-labelledby="areas-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Areas served</p>
            <h2 id="areas-title">Local coverage made clear.</h2>
          </div>
        </div>
        <div class="areas__grid">
          ${areas.map((item) => `<div class="area-pill" data-reveal>${escapeHtml(item.name)}</div>`).join('\n')}
        </div>
      </div>
    </section>`;
}

function renderPromotion(project: SiteProject): string {
  const promo = project.content.promotion;
  if (!promo.enabled || !promo.title.trim()) return '';
  const href = promo.buttonUrl.trim() || '#contact';
  return `<section class="promotion" id="promotion" aria-labelledby="promotion-title">
      <div class="container">
        <div class="promotion__box" data-reveal>
          <div>
            ${promo.eyebrow ? `<p class="section-kicker">${escapeHtml(promo.eyebrow)}</p>` : ''}
            <h2 id="promotion-title">${escapeHtml(promo.title)}</h2>
            <p>${escapeHtml(promo.description)}</p>
          </div>
          ${promo.buttonLabel ? `<a href="${escapeAttr(href)}" class="cta">${escapeHtml(promo.buttonLabel)}</a>` : ''}
        </div>
      </div>
    </section>`;
}

function renderFaqs(project: SiteProject): string {
  const faqs = project.content.faqs.filter((item) => item.question.trim());
  if (!faqs.length) return '';
  return `<section class="faqs" id="faqs" aria-labelledby="faqs-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">FAQs</p>
            <h2 id="faqs-title">Answers before they have to ask.</h2>
          </div>
        </div>
        <div class="faqs__grid">
          ${faqs
            .map(
              (item) => `<details class="faq-item" data-reveal>
              <summary>${escapeHtml(item.question)}</summary>
              <p>${escapeHtml(item.answer)}</p>
            </details>`,
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
}

function renderContact(project: SiteProject, design: DesignSettings): string {
  const stacked = design.contactLayout === 'stacked';
  return `<section class="contact" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="section-head" data-reveal>
          <div>
            <p class="section-kicker">Contact</p>
            <h2 id="contact-title">Make the next step simple.</h2>
          </div>
          <p>Fast forms, visible contact details, and practical location information help turn interest into enquiries.</p>
        </div>
        <div class="contact__grid" style="${stacked ? 'grid-template-columns:1fr' : ''}">
          <div data-reveal>
            ${contactBlock(project)}
            ${hoursList(project)}
            ${mapEmbed(project)}
          </div>
          <div data-reveal>${netlifyFormFields(project)}</div>
        </div>
      </div>
    </section>`;
}

function renderFooter(project: SiteProject): string {
  const gallery = project.content.gallery;
  const testimonials = testimonialsList(project.content.testimonials);
  return `<footer class="site-footer">
      <div class="container site-footer__inner">
        <div>
          <h3>${escapeHtml(project.business.name)}</h3>
          <p>${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Pages</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Work</a></li>' : ''}
            ${testimonials.length ? '<li><a href="#testimonials">Reviews</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Details</h3>
          <ul>
            ${project.business.phone ? `<li>${escapeHtml(project.business.phone)}</li>` : ''}
            ${project.business.email ? `<li>${escapeHtml(project.business.email)}</li>` : ''}
            ${project.business.address ? `<li>${escapeHtml(project.business.address)}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>Copyright <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}</span>
        <span>${escapeHtml(project.seo.cityRegion || '')}</span>
      </div>
    </footer>`;
}

function shouldRender(id: SectionId, project: SiteProject): boolean {
  if (id === 'features') return project.content.features.some((item) => item.title.trim());
  if (id === 'products') return project.content.products.some((item) => item.name.trim());
  if (id === 'process') return project.content.process.some((item) => item.title.trim());
  if (id === 'gallery') return project.content.gallery.length > 0;
  if (id === 'team') return project.content.team.some((item) => item.name.trim());
  if (id === 'credentials') return project.content.credentials.some((item) => item.label.trim());
  if (id === 'areas') return project.content.areasServed.some((item) => item.name.trim());
  if (id === 'promotion') return project.content.promotion.enabled && project.content.promotion.title.trim().length > 0;
  if (id === 'testimonials') return testimonialsList(project.content.testimonials).length > 0;
  if (id === 'faqs') return project.content.faqs.some((item) => item.question.trim());
  return true;
}

function navItems(project: SiteProject): Array<{ href: string; label: string }> {
  return [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    ...(project.content.gallery.length ? [{ href: '#gallery', label: 'Work' }] : []),
    ...(testimonialsList(project.content.testimonials).length ? [{ href: '#testimonials', label: 'Reviews' }] : []),
    { href: '#contact', label: 'Contact' },
  ];
}

function industryLabel(value: SiteProject['business']['industry']): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function moodTokens(
  mood: DesignSettings['mood'],
  primary: string,
  secondary: string,
): { bg: string; surface: string; ink: string; line: string; soft: string; hero: string; band: string; shadow: string } {
  if (mood === 'warm') {
    return {
      bg: '#fff9f1',
      surface: '#fffdf8',
      ink: '#241a12',
      line: '#ead9c4',
      soft: tint(primary, 0.86),
      hero: `linear-gradient(135deg,#fff3df 0%,${tint(primary, 0.9)} 100%)`,
      band: '#fff2df',
      shadow: 'rgba(105,62,28,.13)',
    };
  }
  if (mood === 'crisp') {
    return {
      bg: '#f8fafc',
      surface: '#ffffff',
      ink: '#0f172a',
      line: '#cbd5e1',
      soft: '#e8eef7',
      hero: `linear-gradient(180deg,#ffffff 0%,${tint(secondary, 0.9)} 100%)`,
      band: '#eef3f8',
      shadow: 'rgba(15,23,42,.12)',
    };
  }
  if (mood === 'expressive') {
    return {
      bg: '#fffefe',
      surface: '#ffffff',
      ink: '#111111',
      line: '#151515',
      soft: tint(primary, 0.78),
      hero: `linear-gradient(135deg,${tint(primary, 0.76)} 0%,#ffffff 45%,${tint(secondary, 0.78)} 100%)`,
      band: tint(primary, 0.88),
      shadow: 'rgba(0,0,0,.18)',
    };
  }
  if (mood === 'premium') {
    return {
      bg: '#fbfaf7',
      surface: '#fffefd',
      ink: '#17140f',
      line: '#ddd5c8',
      soft: '#f1ece3',
      hero: 'linear-gradient(135deg,#fbfaf7 0%,#eee7dc 100%)',
      band: '#f4efe7',
      shadow: 'rgba(58,45,28,.1)',
    };
  }
  if (mood === 'playful') {
    return {
      bg: '#fffdf5',
      surface: '#ffffff',
      ink: '#21190f',
      line: '#e6d8b8',
      soft: tint(primary, 0.82),
      hero: `linear-gradient(160deg,#fff7cf 0%,${tint(primary, 0.84)} 52%,#ffffff 100%)`,
      band: '#fff5d9',
      shadow: 'rgba(120,77,23,.14)',
    };
  }
  return {
    bg: '#fbfcff',
    surface: '#ffffff',
    ink: '#121722',
    line: tint(secondary, 0.78),
    soft: tint(primary, 0.88),
    hero: `linear-gradient(135deg,#fbfcff 0%,${tint(primary, 0.92)} 100%)`,
    band: '#f3f6fb',
    shadow: 'rgba(14,20,32,.1)',
  };
}

function fontPair(style: DesignSettings['fontStyle'], variant: number): { head: string; body: string; url: string } {
  const sets: Record<DesignSettings['fontStyle'], Array<{ head: string; body: string; url: string }>> = {
    modern: [
      {
        head: '"Inter Tight", system-ui, sans-serif',
        body: '"Inter", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@600;700;800&display=swap',
      },
      {
        head: '"Manrope", system-ui, sans-serif',
        body: '"Manrope", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
      },
      {
        head: '"Plus Jakarta Sans", system-ui, sans-serif',
        body: '"Plus Jakarta Sans", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      },
    ],
    classic: [
      {
        head: '"Libre Baskerville", Georgia, serif',
        body: '"Source Sans 3", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700&display=swap',
      },
      {
        head: '"Cormorant Garamond", Georgia, serif',
        body: '"Jost", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600;700&display=swap',
      },
      {
        head: '"Lora", Georgia, serif',
        body: '"Nunito Sans", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap',
      },
    ],
    editorial: [
      {
        head: '"Playfair Display", Georgia, serif',
        body: '"Raleway", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Raleway:wght@400;500;600;700&display=swap',
      },
      {
        head: '"Fraunces", Georgia, serif',
        body: '"DM Sans", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,500;9..144,650;9..144,800&display=swap',
      },
      {
        head: '"Newsreader", Georgia, serif',
        body: '"Work Sans", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,650;6..72,800&family=Work+Sans:wght@400;500;600;700&display=swap',
      },
    ],
    technical: [
      {
        head: '"Space Grotesk", system-ui, sans-serif',
        body: '"Space Grotesk", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap',
      },
      {
        head: '"Barlow Condensed", system-ui, sans-serif',
        body: '"Barlow", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap',
      },
      {
        head: '"Sora", system-ui, sans-serif',
        body: '"Sora", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap',
      },
    ],
    friendly: [
      {
        head: '"Cabinet Grotesk", "Trebuchet MS", sans-serif',
        body: '"Nunito Sans", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap',
      },
      {
        head: '"Outfit", system-ui, sans-serif',
        body: '"Outfit", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
      },
      {
        head: '"Urbanist", system-ui, sans-serif',
        body: '"Urbanist", system-ui, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap',
      },
    ],
  };
  return sets[style][variant % sets[style].length]!;
}
