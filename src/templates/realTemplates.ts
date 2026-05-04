import type { ImageAsset, SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { escapeHtml } from '@/engine/escape';
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

/* ─── Template metadata ──────────────────────────────────────────────────── */

const SERVICE_META: TemplateMeta = {
  id: 'service-pro',
  name: 'Service Pro',
  description:
    'A lead-generation template for trades, contractors, home services, clinics, and practical local businesses.',
  bestFor: ['trades-contractor', 'professional-services', 'fitness-wellness', 'other'],
  vibe: 'Direct / trustworthy / quote-focused',
};

const HOSPITALITY_META: TemplateMeta = {
  id: 'hospitality-editorial',
  name: 'Hospitality Editorial',
  description:
    'A magazine-like template for restaurants, cafes, salons, boutiques, venues, and experience-led businesses.',
  bestFor: ['cafe-restaurant', 'hair-beauty', 'retail-shop'],
  vibe: 'Editorial / warm / image-led',
};

const PORTFOLIO_META: TemplateMeta = {
  id: 'portfolio-studio',
  name: 'Portfolio Studio',
  description:
    'A bold visual portfolio for studios, makers, creatives, fitness brands, stylists, and work that needs to be seen.',
  bestFor: ['hair-beauty', 'retail-shop', 'fitness-wellness', 'other'],
  vibe: 'Visual / dramatic / gallery-first',
};

const EXPERT_META: TemplateMeta = {
  id: 'expert-firm',
  name: 'Expert Firm',
  description:
    'A calm authority template for consultants, advisors, professional services, agencies, and specialist practices.',
  bestFor: ['professional-services', 'other'],
  vibe: 'Credible / structured / expert-led',
};

/* ─── Module exports ─────────────────────────────────────────────────────── */

export const TEMPLATE_SERVICE_PRO: TemplateModule = {
  meta: SERVICE_META,
  css: serviceCss,
  body: serviceBody,
};

export const TEMPLATE_HOSPITALITY: TemplateModule = {
  meta: HOSPITALITY_META,
  css: hospitalityCss,
  body: hospitalityBody,
};

export const TEMPLATE_PORTFOLIO: TemplateModule = {
  meta: PORTFOLIO_META,
  css: portfolioCss,
  body: portfolioBody,
};

export const TEMPLATE_EXPERT: TemplateModule = {
  meta: EXPERT_META,
  css: expertCss,
  body: expertBody,
};

/* ─── Shared mini-utilities ──────────────────────────────────────────────── */

function firstImage(project: SiteProject): ImageAsset | null {
  return project.content.gallery[0] ?? project.brand.logo;
}

function industryLabel(project: SiteProject): string {
  return project.business.industry
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function features(project: SiteProject) {
  return project.content.features.filter((item) => item.title.trim());
}

function products(project: SiteProject) {
  return project.content.products.filter((item) => item.name.trim());
}

function processSteps(project: SiteProject) {
  return project.content.process.filter((item) => item.title.trim());
}

function credentials(project: SiteProject) {
  return project.content.credentials.filter((item) => item.label.trim());
}

function faqs(project: SiteProject) {
  return project.content.faqs.filter((item) => item.question.trim());
}

/* ════════════════════════════════════════════════════════════════════════════
   SERVICE PRO
   Concept: Bold, confident lead-gen site. White body, dark hero + contact,
   Outfit display type, numbered service cards, trust signals.
════════════════════════════════════════════════════════════════════════════ */

function serviceCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  const primaryMid = tint(primary, 0.5);
  const primaryLight = tint(primary, 0.88);
  const primaryDark = shade(primary, 0.22);
  return `/* === Service Pro ========================================== */
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap");
${visuallyHiddenCss()}
:root{
  --c-primary:${primary};
  --c-primary-light:${primaryLight};
  --c-primary-dark:${primaryDark};
  --c-on-primary:${onPrimary};
  --c-secondary:${secondary};
  --c-dark:#080d1c;
  --c-bg:#f7f8fb;
  --c-surface:#ffffff;
  --c-ink:#0d1526;
  --c-ink-2:#5c6880;
  --c-line:#e4e9f0;
  --max:1200px;
  --pad:clamp(1.5rem,4vw,3rem);
  --sh-sm:0 1px 3px rgba(0,0,0,.04),0 6px 18px rgba(0,0,0,.07);
  --sh-md:0 2px 6px rgba(0,0,0,.04),0 14px 40px rgba(0,0,0,.10);
  --sh-lg:0 4px 10px rgba(0,0,0,.04),0 24px 70px rgba(0,0,0,.14);
}
body{font-family:Inter,system-ui,sans-serif;background:var(--c-bg);color:var(--c-ink);line-height:1.65;font-size:1.0625rem}
h1,h2,h3,h4{font-family:Outfit,system-ui,sans-serif;font-weight:800;letter-spacing:-0.03em;line-height:1.04}
h1{font-size:clamp(2.8rem,7vw,6.5rem)}
h2{font-size:clamp(2rem,4.5vw,3.8rem)}
h3{font-size:clamp(1.1rem,1.6vw,1.3rem);font-weight:700}
p{color:var(--c-ink-2);line-height:1.72}

/* Header */
.sp-header{
  position:sticky;top:0;z-index:100;
  background:rgba(247,248,251,0.82);
  backdrop-filter:blur(22px) saturate(180%);
  -webkit-backdrop-filter:blur(22px) saturate(180%);
  border-bottom:1px solid rgba(0,0,0,.07);
  transition:background .3s,box-shadow .3s
}
.sp-header[data-scrolled="true"]{background:rgba(255,255,255,.94);box-shadow:0 1px 0 rgba(0,0,0,.06),0 8px 32px rgba(0,0,0,.07)}
.sp-header__inner{height:80px;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.brand-mark{font-family:Outfit,system-ui,sans-serif;font-weight:800;font-size:1.2rem;letter-spacing:-0.02em;color:var(--c-ink)}
.brand-mark img{max-height:40px;width:auto}
[data-nav]{display:none;position:fixed;inset:80px 0 auto 0;background:#fff;border-bottom:1px solid var(--c-line);padding:1.25rem var(--pad);box-shadow:0 16px 48px rgba(0,0,0,.12)}
[data-nav][data-open="true"]{display:block}
[data-nav] ul{display:grid;gap:.25rem}
[data-nav] a{display:block;padding:.7rem 0;font-weight:600;font-size:1.05rem;color:var(--c-ink);border-bottom:1px solid var(--c-line)}
@media(min-width:880px){
  [data-nav]{display:block;position:static;padding:0;border:0;background:transparent;box-shadow:none}
  [data-nav] ul{display:flex;gap:.25rem}
  [data-nav] a{padding:.45rem .75rem;font-size:.9rem;border:0;color:var(--c-ink-2)}
  [data-nav] a:hover{color:var(--c-ink)}
}
.sp-header .cta--primary{background:var(--c-primary);color:var(--c-on-primary);border-radius:10px;padding:.65rem 1.35rem;font-size:.9rem}
.sp-header .cta--primary:hover{box-shadow:0 6px 24px ${primaryMid}55}

/* Buttons */
.cta--primary{background:var(--c-primary);color:var(--c-on-primary);border-radius:10px}
.cta--primary:hover{background:var(--c-primary-dark);box-shadow:0 8px 28px ${primaryMid}44}
.cta--ghost{border:1.5px solid var(--c-line);border-radius:10px;color:var(--c-ink);background:rgba(255,255,255,.7)}
.cta--ghost:hover{border-color:var(--c-primary);color:var(--c-primary);background:#fff}

/* Hero */
.sp-hero{padding:0;background:var(--c-dark);overflow:hidden;position:relative}
.sp-hero::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(900px 700px at 20% 50%,${tint(primary, 0.2)}22 0%,transparent 65%),
             radial-gradient(600px 400px at 80% 80%,${tint(secondary, 0.3)}18 0%,transparent 60%);
  pointer-events:none
}
.sp-hero__grid{display:grid;position:relative;z-index:1}
@media(min-width:960px){.sp-hero__grid{grid-template-columns:1.1fr .9fr;min-height:calc(100vh - 80px)}}

.sp-hero__copy{
  padding:clamp(3rem,7vw,6rem) var(--pad);
  display:flex;flex-direction:column;justify-content:center;gap:1.5rem;
  color:#fff
}
.sp-hero__copy p{color:rgba(255,255,255,.68);line-height:1.72}
.sp-hero__copy h1{color:#fff;letter-spacing:-0.035em}

.sp-eyebrow{
  display:inline-flex;align-items:center;gap:.6rem;
  width:max-content;
  border:1px solid rgba(255,255,255,.14);
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(8px);
  color:rgba(255,255,255,.85);
  border-radius:999px;
  padding:.4rem .9rem;
  font-size:.82rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase
}
.sp-eyebrow--light{
  border-color:${primaryLight}66;
  background:${primaryLight}22;
  color:${primaryDark};
}
.sp-eyebrow::before{content:"";width:6px;height:6px;border-radius:999px;background:currentColor;flex-shrink:0}

.sp-hero__sub{font-size:clamp(1.05rem,1.6vw,1.3rem);max-width:46ch;color:rgba(255,255,255,.72)!important}
.sp-hero__actions{display:flex;flex-wrap:wrap;gap:.875rem;margin-top:.5rem}
.sp-hero__actions .cta--primary{background:var(--c-primary);color:var(--c-on-primary);border-radius:10px;padding:.9rem 2rem;font-size:1rem;font-weight:700}
.sp-hero__actions .cta--secondary{border:1.5px solid rgba(255,255,255,.22);border-radius:10px;color:#fff;padding:.9rem 1.75rem;font-size:1rem;font-weight:600}
.sp-hero__actions .cta--secondary:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.08)}

.sp-hero__trust{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:.75rem}
.sp-trust-item{display:flex;align-items:center;gap:.5rem;color:rgba(255,255,255,.6);font-size:.875rem;font-weight:500}
.sp-trust-item::before{content:"✓";color:${primary};font-weight:700;font-size:1rem}

.sp-hero__panel{
  position:relative;overflow:hidden;
  background:linear-gradient(160deg,${shade(secondary, 0.1)} 0%,${shade(secondary, 0.4)} 100%);
  min-height:480px
}
.sp-hero__panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.28;mix-blend-mode:luminosity}
.sp-hero__panel::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.35) 100%)}
.sp-quote-card{
  position:relative;z-index:2;
  margin:auto var(--pad) var(--pad);
  background:rgba(255,255,255,.96);
  backdrop-filter:blur(20px);
  border-radius:20px;
  padding:1.75rem;
  box-shadow:0 24px 80px rgba(0,0,0,.35),0 0 0 1px rgba(255,255,255,.5) inset;
  color:var(--c-ink)
}
.sp-quote-card h3{font-size:1.1rem;margin-bottom:1rem;color:var(--c-ink)}
.sp-quote-card ul{display:grid;gap:.65rem}
.sp-quote-card li{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;padding:.6rem 0;border-bottom:1px solid var(--c-line)}
.sp-quote-card li:last-child{border-bottom:0}
.sp-quote-card strong{color:var(--c-ink);font-weight:600;font-size:.95rem}
.sp-quote-card span{color:var(--c-primary);font-weight:700;font-size:.9rem;white-space:nowrap}
@media(min-width:960px){.sp-hero__panel{display:flex;align-items:flex-end}.sp-quote-card{min-width:340px;max-width:420px;transform:translateY(-5vh)}}

/* Strip */
.sp-strip{background:var(--c-primary);padding:.95rem 0;overflow:hidden}
.sp-strip__inner{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;font-family:Outfit,sans-serif;font-weight:700;font-size:.9rem;color:var(--c-on-primary);letter-spacing:.02em}
.sp-strip__item{display:inline-flex;align-items:center;gap:.5rem}
.sp-strip__item::before{content:"";width:6px;height:6px;border-radius:999px;background:rgba(255,255,255,.5);flex-shrink:0}

/* Section layout */
section{padding-block:clamp(4.5rem,9vw,8rem)}
.sp-section-label{display:flex;align-items:center;gap:.75rem;margin-bottom:2.5rem}
.sp-section-label .sp-eyebrow--light{margin-bottom:0}
.sp-section-intro{max-width:42ch}
.sp-section-head{display:grid;gap:1.5rem;margin-bottom:clamp(2rem,4vw,3.5rem)}
@media(min-width:820px){.sp-section-head{grid-template-columns:1fr 1fr;align-items:end}.sp-section-head p{text-align:right}}

/* Services */
.sp-services{background:var(--c-surface)}
.sp-services__grid{display:grid;gap:1.25rem}
@media(min-width:640px){.sp-services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.sp-services__grid{grid-template-columns:repeat(3,1fr)}}

.sp-service{
  background:#fff;border-radius:18px;padding:1.75rem;
  border:1px solid var(--c-line);
  box-shadow:var(--sh-sm);
  display:flex;flex-direction:column;gap:1rem;
  transition:transform .22s cubic-bezier(.22,.68,0,1.2),box-shadow .22s ease,border-color .22s ease
}
.sp-service:hover{transform:translateY(-4px);box-shadow:var(--sh-lg);border-color:${primaryLight}}
.sp-service__num{
  font-family:Outfit,sans-serif;font-weight:900;font-size:2.5rem;
  letter-spacing:-0.05em;line-height:1;
  color:${primaryLight};
  transition:color .22s
}
.sp-service:hover .sp-service__num{color:var(--c-primary)}
.sp-service h3{color:var(--c-ink);margin:0}
.sp-service p{font-size:.9375rem;color:var(--c-ink-2);flex:1}
.sp-service__price{
  display:inline-flex;align-items:center;
  font-family:Outfit,sans-serif;font-weight:700;font-size:1rem;
  color:var(--c-primary);margin-top:.25rem
}

/* First service gets primary treatment */
.sp-service:first-child{
  background:linear-gradient(145deg,var(--c-primary) 0%,${primaryDark} 100%);
  border-color:transparent;
  color:var(--c-on-primary);
  box-shadow:0 4px 10px rgba(0,0,0,.06),0 20px 60px ${primaryMid}44
}
.sp-service:first-child .sp-service__num{color:rgba(255,255,255,.25)}
.sp-service:first-child h3{color:${onPrimary}}
.sp-service:first-child p{color:color-mix(in srgb,${onPrimary} 75%,transparent)}
.sp-service:first-child .sp-service__price{color:${onPrimary}}
.sp-service:first-child:hover{transform:translateY(-4px);box-shadow:0 8px 16px rgba(0,0,0,.08),0 28px 80px ${primaryMid}55}

/* Process */
.sp-process{background:var(--c-bg)}
.sp-process__grid{display:grid;gap:1.25rem}
@media(min-width:760px){.sp-process__grid{grid-template-columns:repeat(3,1fr)}}
.sp-card{
  background:#fff;border-radius:18px;padding:1.75rem;
  border:1px solid var(--c-line);
  box-shadow:var(--sh-sm);
  transition:transform .22s cubic-bezier(.22,.68,0,1.2),box-shadow .22s ease
}
.sp-card:hover{transform:translateY(-3px);box-shadow:var(--sh-md)}
.sp-card__step{
  font-family:Outfit,sans-serif;font-weight:900;font-size:3rem;
  letter-spacing:-0.05em;line-height:1;
  color:var(--c-line);margin-bottom:.875rem
}
.sp-card h3{font-size:1.15rem;color:var(--c-ink);margin-bottom:.5rem}

/* Testimonials */
.sp-testimonials{background:var(--c-dark);overflow:hidden;position:relative}
.sp-testimonials::before{content:"";position:absolute;inset:0;background:radial-gradient(1000px 600px at 50% 0%,${tint(primary, 0.15)}18 0%,transparent 65%);pointer-events:none}
.sp-testimonials h2{color:#fff}
.sp-testimonials .sp-eyebrow{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14);color:rgba(255,255,255,.7)}
.sp-testimonials__grid{display:grid;gap:1.25rem;position:relative;z-index:1}
@media(min-width:760px){.sp-testimonials__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1100px){.sp-testimonials__grid{grid-template-columns:repeat(3,1fr)}}
.sp-testimonial{
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1);
  border-radius:18px;
  padding:1.75rem;
  backdrop-filter:blur(12px);
  transition:background .22s,border-color .22s
}
.sp-testimonial:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18)}
.sp-testimonial__quote{
  font-size:1.5rem;font-weight:700;
  color:var(--c-primary);line-height:1;
  margin-bottom:.75rem;font-family:Georgia,serif
}
.sp-testimonial p{color:rgba(255,255,255,.72);font-size:.9375rem;line-height:1.72;font-style:italic}
.sp-testimonial cite{display:block;margin-top:1.25rem;font-style:normal;font-weight:600;font-size:.85rem;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.06em}

/* Contact */
.sp-contact{background:var(--c-surface);border-top:1px solid var(--c-line)}
.sp-contact__grid{display:grid;gap:2.5rem}
@media(min-width:900px){.sp-contact__grid{grid-template-columns:1fr 1.1fr;align-items:start}}
.sp-contact h2{color:var(--c-ink)}
.sp-contact .sp-eyebrow--light{margin-bottom:1.5rem}
.contact-details{display:grid;gap:.25rem;margin-top:1.5rem}
.contact-line{display:flex;flex-direction:column;gap:.2rem;padding:.875rem 0;border-bottom:1px solid var(--c-line)}
.contact-line:last-child{border-bottom:0}
.contact-line strong{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--c-ink-2);font-weight:600}
.contact-line span,.contact-line a{color:var(--c-ink);font-weight:500;font-size:1rem}
.contact-line a:hover{color:var(--c-primary)}

.hours-list{background:var(--c-bg);border-radius:14px;padding:1.25rem;margin-top:1.25rem;border:1px solid var(--c-line)}
.hours-row{display:flex;justify-content:space-between;align-items:center;padding:.45rem 0;font-size:.9375rem}
.hours-row__day{color:var(--c-ink);font-weight:500}
.hours-row__time{color:var(--c-ink-2)}
.hours-row[data-open="false"] .hours-row__time{color:var(--c-ink-2);opacity:.5}

.map-embed{margin-top:1.25rem;aspect-ratio:16/9;border-radius:14px;overflow:hidden;border:1px solid var(--c-line)}
.map-embed iframe{width:100%;height:100%;border:0}

.contact-form{display:grid;gap:1.25rem;background:#fff;border-radius:20px;padding:2rem;border:1px solid var(--c-line);box-shadow:var(--sh-md)}
.contact-form__row{display:grid;gap:1.25rem}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:grid;gap:.5rem}
.contact-form__field span{font-size:.875rem;font-weight:600;color:var(--c-ink);letter-spacing:.01em}
.contact-form input,.contact-form textarea{
  border:1.5px solid var(--c-line);border-radius:10px;
  padding:.8rem 1rem;font-size:.9375rem;
  background:#fff;color:var(--c-ink);
  transition:border-color .18s,box-shadow .18s
}
.contact-form input:hover,.contact-form textarea:hover{border-color:#b8c4d4}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--c-primary);box-shadow:0 0 0 4px ${primaryLight}55;outline:none}
.contact-form button[type="submit"]{background:var(--c-primary);color:var(--c-on-primary);border-radius:10px;padding:1rem 2rem;font-size:1rem;font-weight:700;font-family:Outfit,sans-serif;transition:transform .2s,box-shadow .2s,background .2s}
.contact-form button[type="submit"]:hover{background:${primaryDark};box-shadow:0 8px 28px ${primaryMid}44;transform:translateY(-2px)}

/* Footer */
.sp-footer{background:var(--c-dark);color:rgba(255,255,255,.7);padding:clamp(2rem,4vw,3.5rem) 0}
.sp-footer__inner{display:grid;gap:1.5rem}
@media(min-width:640px){.sp-footer__inner{grid-template-columns:1fr 1fr 1fr;align-items:center}}
.sp-footer strong{color:#fff;font-family:Outfit,sans-serif;font-weight:700;font-size:1.05rem;letter-spacing:-0.01em}
.sp-footer p{font-size:.875rem;color:rgba(255,255,255,.5);margin-top:.3rem}
.social-links{display:flex;gap:.625rem}
.social-links a{
  display:grid;place-items:center;width:40px;height:40px;
  border:1px solid rgba(255,255,255,.14);border-radius:999px;
  color:rgba(255,255,255,.6);
  transition:background .18s,border-color .18s,color .18s
}
.social-links a:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.28);color:#fff}
.social-links svg{width:16px;height:16px}
.sp-footer__copy{font-size:.8125rem;color:rgba(255,255,255,.35)}`;
}

function serviceBody(project: SiteProject): string {
  const image = firstImage(project);
  const services = servicesList(project.content.services);
  const steps = processSteps(project);
  const testimonials = testimonialsList(project.content.testimonials);
  const servicePreview = services.slice(0, 4);

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="sp-header" id="top" data-header>
      <div class="container sp-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#services">Services</a></li>
            ${steps.length ? '<li><a href="#process">Process</a></li>' : ''}
            ${testimonials.length ? '<li><a href="#testimonials">Reviews</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a class="cta cta--primary" href="#contact">Get a quote</a>
      </div>
    </header>

    <main id="main">
      <section class="sp-hero" aria-labelledby="hero-title">
        <div class="sp-hero__grid">
          <div class="sp-hero__copy">
            <span class="sp-eyebrow">${escapeHtml(project.seo.cityRegion || 'Local')} ${escapeHtml(industryLabel(project))}</span>
            <h1 id="hero-title">${escapeHtml(project.business.name)}</h1>
            <p class="sp-hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="sp-hero__actions">
              <a class="cta cta--primary" href="#contact">Request a quote</a>
              <a class="cta cta--secondary" href="#services">See services</a>
            </div>
            <div class="sp-hero__trust">
              <span class="sp-trust-item">Free enquiry</span>
              <span class="sp-trust-item">Local team</span>
              <span class="sp-trust-item">Clear pricing</span>
            </div>
          </div>
          <aside class="sp-hero__panel">
            ${image ? imgTag(image, { loading: 'eager' }) : ''}
            <div class="sp-quote-card">
              <h3>What we offer</h3>
              <ul>
                ${servicePreview.map((s) => `<li><strong>${escapeHtml(s.name)}</strong>${s.price ? `<span>${escapeHtml(s.price)}</span>` : ''}</li>`).join('')}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div class="sp-strip">
        <div class="container sp-strip__inner">
          <span class="sp-strip__item">Free enquiry</span>
          <span class="sp-strip__item">Local team</span>
          <span class="sp-strip__item">Clear pricing</span>
          <span class="sp-strip__item">Trusted professionals</span>
        </div>
      </div>

      <section class="sp-services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="sp-section-head" data-reveal>
            <div>
              <span class="sp-eyebrow--light">Services</span>
              <h2 id="services-title" style="margin-top:.75rem">What we can help with</h2>
            </div>
            <p>${escapeHtml(project.content.about)}</p>
          </div>
          <div class="sp-services__grid">
            ${services.map((s, i) => `
              <article class="sp-service" data-reveal data-delay="${i * 60}">
                <span class="sp-service__num">${String(i + 1).padStart(2, '0')}</span>
                <h3>${escapeHtml(s.name)}</h3>
                <p>${escapeHtml(s.description)}</p>
                ${s.price ? `<span class="sp-service__price">${escapeHtml(s.price)}</span>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>

      ${steps.length ? `
      <section class="sp-process" id="process" aria-labelledby="process-title">
        <div class="container">
          <div class="sp-section-head" data-reveal>
            <div>
              <span class="sp-eyebrow--light">Process</span>
              <h2 id="process-title" style="margin-top:.75rem">Simple from start to finish</h2>
            </div>
          </div>
          <div class="sp-process__grid">
            ${steps.map((s, i) => `
              <article class="sp-card" data-reveal data-delay="${i * 80}">
                <div class="sp-card__step">${String(i + 1).padStart(2, '0')}</div>
                <h3>${escapeHtml(s.title)}</h3>
                <p>${escapeHtml(s.description)}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>` : ''}

      ${testimonials.length ? `
      <section class="sp-testimonials" id="testimonials" aria-labelledby="testimonials-title">
        <div class="container">
          <div data-reveal>
            <span class="sp-eyebrow">Reviews</span>
            <h2 id="testimonials-title" style="margin-top:.75rem;margin-bottom:2.5rem">What our clients say</h2>
          </div>
          <div class="sp-testimonials__grid">
            ${testimonials.map((t, i) => `
              <article class="sp-testimonial" data-reveal data-delay="${i * 70}">
                <div class="sp-testimonial__quote">"</div>
                <p>${escapeHtml(t.quote)}</p>
                <cite>${escapeHtml(t.customerName)}</cite>
              </article>`).join('')}
          </div>
        </div>
      </section>` : ''}

      <section class="sp-contact" id="contact" aria-labelledby="contact-title">
        <div class="container">
          <div class="sp-contact__grid">
            <div data-reveal="left">
              <span class="sp-eyebrow--light">Get in touch</span>
              <h2 id="contact-title" style="margin-top:.75rem;margin-bottom:.75rem">Tell us what you need</h2>
              <p>Reach out and we'll get back to you within 24 hours.</p>
              <div class="contact-details">
                ${contactBlock(project)}
              </div>
              ${hoursList(project)}
              ${mapEmbed(project)}
            </div>
            <div data-reveal="right">
              ${netlifyFormFields(project)}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="sp-footer">
      <div class="container sp-footer__inner">
        <div>
          <strong>${escapeHtml(project.business.name)}</strong>
          <p>${escapeHtml(project.business.tagline)}</p>
        </div>
        <div>${socialLinks(project)}</div>
        <p class="sp-footer__copy">© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}. All rights reserved.</p>
      </div>
    </footer>`;
}

/* ════════════════════════════════════════════════════════════════════════════
   HOSPITALITY EDITORIAL
   Concept: Warm luxury editorial. Cormorant Garamond serifs, cream palette,
   full-bleed imagery, generous whitespace, organic shapes.
════════════════════════════════════════════════════════════════════════════ */

function hospitalityCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const onPrimary = readableOn(primary);
  const primaryLight = tint(primary, 0.85);
  const primaryDark = shade(primary, 0.18);
  return `/* === Hospitality Editorial ================================ */
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap");
${visuallyHiddenCss()}
:root{
  --c-primary:${primary};
  --c-primary-light:${primaryLight};
  --c-primary-dark:${primaryDark};
  --c-on-primary:${onPrimary};
  --c-cream:#fbf7f2;
  --c-cream-2:#f4ede3;
  --c-espresso:#1e1208;
  --c-ink:#2c1a0e;
  --c-ink-2:#7a6050;
  --c-line:#dfd0bf;
  --max:1180px;
  --pad:clamp(1.5rem,4vw,3rem);
}
body{font-family:"Jost",system-ui,sans-serif;background:var(--c-cream);color:var(--c-ink);line-height:1.72;-webkit-font-smoothing:antialiased}
h1,h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;line-height:.96;letter-spacing:-0.01em}
h3{font-family:"Jost",sans-serif;font-weight:600;letter-spacing:.02em;line-height:1.2}
h1{font-size:clamp(3.5rem,10vw,9rem)}
h2{font-size:clamp(2.5rem,6vw,5.5rem)}
h3{font-size:clamp(1rem,1.4vw,1.2rem)}
p{color:var(--c-ink-2);line-height:1.75}
section{padding-block:clamp(4rem,9vw,8rem)}

/* Header */
.he-header{
  position:sticky;top:0;z-index:100;
  background:rgba(251,247,242,.88);
  backdrop-filter:blur(20px) saturate(160%);
  -webkit-backdrop-filter:blur(20px) saturate(160%);
  border-bottom:1px solid var(--c-line);
  transition:background .3s,box-shadow .3s
}
.he-header[data-scrolled="true"]{background:rgba(251,247,242,.97);box-shadow:0 1px 0 var(--c-line),0 8px 32px rgba(30,18,8,.06)}
.he-header__inner{height:78px;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.brand-mark{font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:1.4rem;letter-spacing:.02em;color:var(--c-espresso)}
.brand-mark img{max-height:42px;width:auto}
[data-nav]{display:none;position:fixed;inset:78px 0 auto 0;background:var(--c-cream);border-bottom:1px solid var(--c-line);padding:1.25rem var(--pad);box-shadow:0 16px 48px rgba(30,18,8,.1)}
[data-nav][data-open="true"]{display:block}
[data-nav] ul{display:grid;gap:.25rem}
[data-nav] a{display:block;padding:.7rem 0;font-weight:500;font-size:1rem;color:var(--c-ink);border-bottom:1px solid var(--c-line)}
@media(min-width:880px){
  [data-nav]{display:block;position:static;padding:0;border:0;background:transparent;box-shadow:none}
  [data-nav] ul{display:flex;gap:.5rem}
  [data-nav] a{padding:.4rem .75rem;border:0;font-size:.9rem;color:var(--c-ink-2);letter-spacing:.04em}
  [data-nav] a:hover{color:var(--c-ink)}
}
.cta--primary{background:var(--c-espresso);color:#fff;border-radius:999px;letter-spacing:.04em}
.cta--primary:hover{background:var(--c-ink)}
.cta--ghost{border:1px solid var(--c-line);border-radius:999px;color:var(--c-ink);background:transparent;letter-spacing:.04em}
.cta--ghost:hover{border-color:var(--c-ink)}
.he-header .cta--primary{padding:.6rem 1.35rem;font-size:.85rem}

/* Kicker / eyebrow */
.he-kicker{
  display:inline-flex;align-items:center;gap:.75rem;
  font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  color:var(--c-primary)
}
.he-kicker::before{content:"";width:36px;height:1px;background:currentColor;flex-shrink:0}

/* Hero */
.he-hero{
  min-height:100svh;display:grid;align-items:end;
  padding:var(--pad);padding-top:0;position:relative;overflow:hidden;
  background:var(--c-cream)
}
.he-hero__bg{
  position:absolute;inset:0;z-index:0;
  background:radial-gradient(ellipse 80% 90% at 75% 40%,var(--c-cream-2) 0%,transparent 70%)
}
.he-hero__image{
  position:absolute;right:0;top:0;bottom:0;
  width:min(55vw,680px);overflow:hidden;z-index:0
}
.he-hero__image img{width:100%;height:100%;object-fit:cover}
.he-hero__image::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to right,var(--c-cream) 0%,transparent 30%),
             linear-gradient(to top,var(--c-cream) 0%,transparent 20%)
}
.he-hero__copy{
  position:relative;z-index:2;
  max-width:900px;padding-top:clamp(8rem,15vw,14rem);padding-bottom:clamp(4rem,6vw,6rem)
}
.he-hero h1{color:var(--c-espresso);max-width:10ch;margin:.75rem 0 1.5rem}
.he-hero__sub{font-size:clamp(1rem,1.3vw,1.2rem);max-width:44ch;margin-bottom:2rem}
.he-hero__ctas{display:flex;flex-wrap:wrap;gap:.875rem}
@media(max-width:860px){
  .he-hero{min-height:auto;padding-top:0;align-items:start}
  .he-hero__image{position:relative;inset:auto;width:100%;height:360px;right:auto}
  .he-hero__image::after{background:linear-gradient(to top,var(--c-cream) 0%,transparent 40%)}
  .he-hero__copy{padding-top:2.5rem}
}

/* Menu / offerings */
.he-menu{background:var(--c-espresso);color:#fff;overflow:hidden;position:relative}
.he-menu::after{
  content:"MENU";position:absolute;right:-.04em;bottom:-.18em;
  font-family:"Cormorant Garamond",Georgia,serif;font-size:20vw;font-weight:700;
  color:rgba(255,255,255,.04);line-height:1;pointer-events:none;white-space:nowrap
}
.he-menu h2{color:#fff}
.he-menu .he-kicker{color:rgba(255,255,255,.5)}
.he-menu .he-kicker::before{background:rgba(255,255,255,.3)}
.he-menu__grid{display:grid;gap:0;position:relative;z-index:1}
@media(min-width:820px){.he-menu__grid{grid-template-columns:1fr 1fr}}
.he-menu-item{
  padding:1.5rem 0;
  border-bottom:1px solid rgba(255,255,255,.12);
  display:grid;grid-template-columns:1fr auto;gap:.75rem 1.5rem;
  align-items:baseline
}
.he-menu-item h3{
  font-family:"Cormorant Garamond",Georgia,serif;
  font-size:clamp(1.4rem,2vw,1.9rem);font-weight:500;
  color:#fff;letter-spacing:0;line-height:1.1;grid-column:1
}
.he-menu-item__price{
  font-size:.9rem;font-weight:600;color:rgba(255,255,255,.5);
  border:1px solid rgba(255,255,255,.18);border-radius:999px;
  padding:.25rem .75rem;white-space:nowrap
}
.he-menu-item p{grid-column:1/-1;color:rgba(255,255,255,.55);font-size:.9rem;margin-top:.25rem}

/* Story / About */
.he-story{background:var(--c-cream)}
.he-story__grid{display:grid;gap:3rem}
@media(min-width:900px){.he-story__grid{grid-template-columns:.85fr 1.15fr;align-items:start;gap:5rem}}
.he-lead{
  font-family:"Cormorant Garamond",Georgia,serif;
  font-size:clamp(1.7rem,3vw,2.8rem);font-weight:500;font-style:italic;
  line-height:1.2;color:var(--c-espresso);
  position:relative;padding-left:1.5rem
}
.he-lead::before{content:"";position:absolute;left:0;top:.25em;bottom:.25em;width:2px;background:var(--c-primary)}
.he-feature{padding:1.25rem 0;border-bottom:1px solid var(--c-line)}
.he-feature:first-child{border-top:1px solid var(--c-line)}

/* Gallery */
.he-gallery-section{background:var(--c-cream-2)}
.he-gallery{
  display:grid;gap:clamp(.6rem,1.2vw,1rem);
  grid-template-columns:repeat(2,1fr)
}
@media(min-width:860px){
  .he-gallery{grid-template-columns:repeat(4,1fr)}
  .he-gallery figure:first-child{grid-column:span 2;grid-row:span 2}
}
.he-gallery figure{
  overflow:hidden;min-height:200px;
  border-radius:999px 999px 14px 14px;
  position:relative
}
.he-gallery figure:nth-child(even){border-radius:14px 14px 999px 999px}
.he-gallery img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.he-gallery figure:hover img{transform:scale(1.06)}

/* Testimonials */
.he-testimonials{background:var(--c-cream)}
.he-testimonials__inner{max-width:760px;margin-inline:auto;text-align:center}
.he-quote{
  font-family:"Cormorant Garamond",Georgia,serif;
  font-size:clamp(1.5rem,3vw,2.5rem);font-weight:500;font-style:italic;
  line-height:1.25;color:var(--c-espresso);
  position:relative;padding:2.5rem 0 0
}
.he-quote::before{
  content:'"';
  position:absolute;top:-.2em;left:50%;transform:translateX(-50%);
  font-size:6rem;line-height:1;color:var(--c-primary);opacity:.3;
  font-family:"Cormorant Garamond",Georgia,serif
}
.he-quote + .he-quote{margin-top:3rem;padding-top:3rem;border-top:1px solid var(--c-line)}
.he-quote cite{
  display:block;margin-top:1.25rem;
  font-family:"Jost",sans-serif;font-style:normal;
  font-size:.82rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
  color:var(--c-ink-2)
}

/* Contact */
.he-contact{background:var(--c-cream-2)}
.he-contact__grid{display:grid;gap:3rem}
@media(min-width:900px){.he-contact__grid{grid-template-columns:1fr 1fr;align-items:start}}
.contact-line{display:block;border-bottom:1px solid var(--c-line);padding:.875rem 0}
.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--c-ink-2);font-weight:600;margin-bottom:.2rem}
.contact-line span,.contact-line a{color:var(--c-ink);font-weight:400}
.hours-list{border:1px solid var(--c-line);border-radius:14px;padding:1.25rem;margin-top:1.25rem;background:#fff}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.9375rem}
.hours-row__day{font-weight:500;color:var(--c-ink)}
.hours-row__time{color:var(--c-ink-2)}
.map-embed{margin-top:1.25rem;aspect-ratio:16/9;border-radius:14px;overflow:hidden;border:1px solid var(--c-line)}
.map-embed iframe{width:100%;height:100%;border:0}
.contact-form{display:grid;gap:1.25rem;padding:2rem;background:#fff;border-radius:20px;border:1px solid var(--c-line);box-shadow:0 16px 60px rgba(30,18,8,.08)}
.contact-form__row{display:grid;gap:1.25rem}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:grid;gap:.45rem}
.contact-form__field span{font-size:.8125rem;font-weight:600;color:var(--c-ink);letter-spacing:.04em;text-transform:uppercase}
.contact-form input,.contact-form textarea{
  border:1px solid var(--c-line);border-radius:999px;
  padding:.8rem 1.1rem;background:#fff;color:var(--c-ink);font-size:.9375rem;
  transition:border-color .18s
}
.contact-form textarea{border-radius:14px}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--c-primary);outline:none}
.contact-form button[type="submit"]{
  background:var(--c-espresso);color:#fff;
  border-radius:999px;padding:1rem 2.25rem;
  font-size:.9375rem;font-weight:600;letter-spacing:.04em;
  transition:background .2s,transform .2s
}
.contact-form button[type="submit"]:hover{background:var(--c-ink);transform:translateY(-2px)}

/* Footer */
.he-footer{background:var(--c-espresso);color:rgba(255,255,255,.6);padding:clamp(2rem,4vw,3.5rem) 0}
.he-footer__inner{display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap}
.he-footer strong{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.2rem;font-weight:600;color:#fff}
.he-footer p{font-size:.8125rem;color:rgba(255,255,255,.4);margin-top:.2rem}
.social-links{display:flex;gap:.5rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border:1px solid rgba(255,255,255,.14);border-radius:999px;color:rgba(255,255,255,.5);transition:background .18s,color .18s}
.social-links a:hover{background:rgba(255,255,255,.1);color:#fff}
.social-links svg{width:16px;height:16px}`;
}

function hospitalityBody(project: SiteProject): string {
  const image = firstImage(project);
  const menuItems = products(project).length ? products(project) : servicesList(project.content.services);
  const gallery = project.content.gallery;
  const quotes = testimonialsList(project.content.testimonials);
  const featureItems = features(project);

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="he-header" id="top" data-header>
      <div class="container he-header__inner">
        ${logoOrName(project)}
        <button type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#menu">Menu</a></li>
            ${featureItems.length ? '<li><a href="#story">Story</a></li>' : ''}
            ${gallery.length ? '<li><a href="#gallery">Gallery</a></li>' : ''}
            <li><a href="#contact">Visit</a></li>
          </ul>
        </nav>
        <a class="cta cta--primary" href="#contact">Plan a visit</a>
      </div>
    </header>

    <main id="main">
      <section class="he-hero" aria-labelledby="hero-title">
        <div class="he-hero__bg"></div>
        <div class="he-hero__image">
          ${image ? imgTag(image, { loading: 'eager' }) : ''}
        </div>
        <div class="container he-hero__copy">
          <p class="he-kicker">${escapeHtml(project.seo.cityRegion || industryLabel(project))}</p>
          <h1 id="hero-title">${escapeHtml(project.business.name)}</h1>
          <p class="he-hero__sub">${escapeHtml(project.business.tagline)}</p>
          <div class="he-hero__ctas">
            <a class="cta cta--primary" href="#contact">Plan a visit</a>
            <a class="cta cta--ghost" href="#menu">View menu</a>
          </div>
        </div>
      </section>

      <section class="he-menu" id="menu" aria-labelledby="menu-title">
        <div class="container">
          <p class="he-kicker" data-reveal="fade">Our offering</p>
          <h2 id="menu-title" style="margin:.75rem 0 2.5rem;color:#fff" data-reveal>Things people come for</h2>
          <div class="he-menu__grid">
            ${menuItems.map((item, i) => `
              <article class="he-menu-item" data-reveal data-delay="${i * 60}">
                <h3>${escapeHtml(item.name)}</h3>
                ${item.price ? `<span class="he-menu-item__price">${escapeHtml(item.price)}</span>` : ''}
                <p>${escapeHtml(item.description)}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>

      ${featureItems.length ? `
      <section class="he-story" id="story" aria-labelledby="story-title">
        <div class="container">
          <div class="he-story__grid">
            <div data-reveal="left">
              <p class="he-kicker">Our story</p>
              <p class="he-lead" style="margin-top:1rem">${escapeHtml(project.content.about)}</p>
            </div>
            <div data-reveal="right">
              ${featureItems.map((f) => `
                <div class="he-feature">
                  <p class="he-kicker">${escapeHtml(f.title)}</p>
                  <p style="margin-top:.5rem">${escapeHtml(f.description)}</p>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </section>` : ''}

      ${gallery.length ? `
      <section class="he-gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div class="container">
          <p class="he-kicker" data-reveal="fade">Gallery</p>
          <h2 id="gallery-title" style="margin:.75rem 0 2rem" data-reveal>The experience</h2>
          <div class="he-gallery" data-lightbox>
            ${gallery.map((g) => `<figure>${imgTag(g)}</figure>`).join('')}
          </div>
        </div>
      </section>` : ''}

      ${quotes.length ? `
      <section class="he-testimonials" aria-label="Reviews">
        <div class="container he-testimonials__inner">
          <p class="he-kicker" style="justify-content:center" data-reveal="fade">Reviews</p>
          ${quotes.slice(0, 3).map((q, i) => `
            <blockquote class="he-quote" data-reveal data-delay="${i * 80}">
              ${escapeHtml(q.quote)}
              <cite>${escapeHtml(q.customerName)}</cite>
            </blockquote>`).join('')}
        </div>
      </section>` : ''}

      <section class="he-contact" id="contact" aria-labelledby="contact-title">
        <div class="container">
          <div class="he-contact__grid">
            <div data-reveal="left">
              <p class="he-kicker">Visit &amp; contact</p>
              <h2 id="contact-title" style="margin:.75rem 0 1.5rem">Make a plan</h2>
              ${contactBlock(project)}
              ${hoursList(project)}
              ${mapEmbed(project)}
            </div>
            <div data-reveal="right">
              ${netlifyFormFields(project)}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="he-footer">
      <div class="container he-footer__inner">
        <div>
          <strong>${escapeHtml(project.business.name)}</strong>
          <p>${escapeHtml(project.business.tagline)}</p>
        </div>
        <div>${socialLinks(project)}</div>
        <p style="font-size:.8125rem;color:rgba(255,255,255,.35)">© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}</p>
      </div>
    </footer>`;
}

/* ════════════════════════════════════════════════════════════════════════════
   PORTFOLIO STUDIO
   Concept: Dark, dramatic, gallery-first. Space Grotesk, near-black palette,
   editorial image grid, bold uppercase type, striking hover states.
════════════════════════════════════════════════════════════════════════════ */

function portfolioCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const onPrimary = readableOn(primary);
  const primaryGlow = tint(primary, 0.6) + '28';
  return `/* === Portfolio Studio ====================================== */
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");
${visuallyHiddenCss()}
:root{
  --c-primary:${primary};
  --c-on-primary:${onPrimary};
  --c-bg:#080a0f;
  --c-surface:#101217;
  --c-surface-2:#171a21;
  --c-ink:#f0f0ee;
  --c-ink-2:#888b96;
  --c-line:#252830;
  --max:1340px;
  --pad:clamp(1.25rem,3.5vw,2.5rem);
}
body{font-family:"Space Grotesk",system-ui,sans-serif;background:var(--c-bg);color:var(--c-ink);line-height:1.58;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-weight:700;letter-spacing:-0.02em;line-height:.95}
h1{font-size:clamp(3rem,11vw,10rem);text-transform:uppercase;letter-spacing:-0.04em}
h2{font-size:clamp(2rem,6vw,5.5rem);text-transform:uppercase;letter-spacing:-0.03em}
h3{font-size:clamp(1rem,1.5vw,1.2rem);letter-spacing:.01em}
p{color:var(--c-ink-2);line-height:1.7}
section{padding-block:clamp(4rem,8vw,7rem)}

/* Header */
.ps-header{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:rgba(8,10,15,.7);backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  border-bottom:1px solid var(--c-line);
  transition:background .3s
}
.ps-header[data-scrolled="true"]{background:rgba(8,10,15,.92)}
.ps-header__inner{height:72px;display:flex;align-items:center;justify-content:space-between;gap:2rem}
.brand-mark{font-weight:700;font-size:1.05rem;letter-spacing:.08em;text-transform:uppercase;color:var(--c-ink)}
.brand-mark img{max-height:36px;width:auto}
[data-nav]{display:none;position:fixed;inset:72px 0 auto 0;background:var(--c-bg);border-bottom:1px solid var(--c-line);padding:1.25rem var(--pad)}
[data-nav][data-open="true"]{display:block}
[data-nav] a{display:block;padding:.75rem 0;font-weight:600;color:var(--c-ink);font-size:1rem;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--c-line)}
@media(min-width:860px){
  [data-nav]{display:block;position:static;padding:0;border:0;background:transparent}
  [data-nav] ul{display:flex;gap:1.5rem}
  [data-nav] a{padding:0;border:0;font-size:.82rem;color:var(--c-ink-2);letter-spacing:.1em}
  [data-nav] a:hover{color:var(--c-ink)}
}
.cta--primary{background:var(--c-primary);color:var(--c-on-primary);border-radius:0;letter-spacing:.06em;font-size:.85rem;text-transform:uppercase}
.cta--primary:hover{opacity:.85}
.cta--ghost{border:1px solid var(--c-line);border-radius:0;color:var(--c-ink);letter-spacing:.06em;font-size:.85rem;text-transform:uppercase}
.cta--ghost:hover{border-color:var(--c-ink-2)}
.ps-header .cta--primary{padding:.55rem 1.25rem}

/* Kicker */
.ps-kicker{
  display:inline-flex;align-items:center;gap:.75rem;
  font-size:.75rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
  color:var(--c-primary)
}
.ps-kicker::after{content:"";width:48px;height:1px;background:currentColor;flex-shrink:0}

/* Hero */
.ps-hero{
  min-height:100svh;padding-top:72px;
  position:relative;overflow:hidden;
  display:flex;align-items:flex-end
}
.ps-hero::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(1200px 800px at 70% 20%,${primaryGlow} 0%,transparent 60%)
}
.ps-hero::after{
  content:attr(data-bg-text);
  position:absolute;left:-.03em;bottom:-.22em;
  font-size:14vw;font-weight:700;line-height:1;
  color:rgba(255,255,255,.025);white-space:nowrap;text-transform:uppercase;
  pointer-events:none
}
.ps-hero__inner{position:relative;z-index:1;padding-block:clamp(3rem,7vw,6rem);width:100%}
.ps-hero__top{display:grid;gap:2.5rem}
@media(min-width:900px){.ps-hero__top{grid-template-columns:1fr auto;align-items:flex-end}}
.ps-hero h1{color:var(--c-ink);max-width:10ch}
.ps-hero__meta{display:flex;flex-direction:column;gap:1.25rem;padding-bottom:.5rem}
@media(min-width:900px){.ps-hero__meta{align-items:flex-end;text-align:right;min-width:280px}}
.ps-hero__meta p{font-size:1rem;color:var(--c-ink-2);max-width:28ch}
.ps-hero__image{
  margin-top:2rem;
  aspect-ratio:16/9;overflow:hidden;
  border:1px solid var(--c-line);
  position:relative
}
.ps-hero__image img{width:100%;height:100%;object-fit:cover;filter:saturate(.85);transition:filter .8s}
.ps-hero__image:hover img{filter:saturate(1)}

/* Gallery */
.ps-gallery{padding-block:0 clamp(4rem,8vw,7rem)}
.ps-grid{
  display:grid;gap:2px;
  grid-template-columns:repeat(2,1fr)
}
@media(min-width:900px){
  .ps-grid{grid-template-columns:repeat(12,1fr)}
  .ps-grid figure:nth-child(1){grid-column:span 7;grid-row:span 2}
  .ps-grid figure:nth-child(2){grid-column:span 5}
  .ps-grid figure:nth-child(3){grid-column:span 5}
  .ps-grid figure:nth-child(4){grid-column:span 4}
  .ps-grid figure:nth-child(5){grid-column:span 4}
  .ps-grid figure:nth-child(6){grid-column:span 4}
}
.ps-grid figure{
  overflow:hidden;min-height:280px;
  background:var(--c-surface);position:relative;
  outline:1px solid rgba(255,255,255,.04)
}
.ps-grid figure::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.4));
  opacity:0;transition:opacity .3s
}
.ps-grid figure:hover::after{opacity:1}
.ps-grid img{width:100%;height:100%;object-fit:cover;filter:saturate(.9);transition:transform .65s ease,filter .65s ease}
.ps-grid figure:hover img{transform:scale(1.06);filter:saturate(1.05)}
@media(min-width:900px){.ps-grid figure:nth-child(1){min-height:680px}}

/* About */
.ps-about{background:linear-gradient(180deg,var(--c-bg) 0%,var(--c-surface) 100%)}
.ps-about__grid{display:grid;gap:3rem}
@media(min-width:900px){.ps-about__grid{grid-template-columns:1fr 1fr;align-items:start;gap:5rem}}
.ps-about__lead{font-size:clamp(1.25rem,2.2vw,2.2rem);font-weight:500;color:var(--c-ink);line-height:1.3;letter-spacing:-.01em}
.ps-about article{border-top:1px solid var(--c-line);padding:1.25rem 0}
.ps-about article:first-child{border-top:0;padding-top:0}

/* Services */
.ps-services{background:var(--c-surface-2)}
.ps-section-head{margin-bottom:clamp(2rem,4vw,3.5rem)}
.ps-services__grid{display:grid;gap:1px;background:var(--c-line)}
@media(min-width:760px){.ps-services__grid{grid-template-columns:repeat(3,1fr)}}
.ps-service{
  background:var(--c-surface);padding:clamp(1.5rem,2.5vw,2.25rem);
  min-height:260px;display:flex;flex-direction:column;gap:1rem;
  transition:background .2s
}
.ps-service:hover{background:var(--c-surface-2)}
.ps-service h3{color:var(--c-ink);font-size:1.15rem;letter-spacing:-.01em}
.ps-service p{font-size:.9rem;flex:1}
.ps-service strong{color:var(--c-primary);font-size:.9375rem;font-weight:600}

/* Team */
.ps-team{display:grid;gap:1.25rem}
@media(min-width:760px){.ps-team{grid-template-columns:repeat(3,1fr)}}
.ps-person{background:var(--c-surface);border:1px solid var(--c-line);padding:1.25rem}
.ps-person figure{aspect-ratio:3/4;overflow:hidden;margin-bottom:1rem;background:var(--c-surface-2)}
.ps-person img{width:100%;height:100%;object-fit:cover;filter:grayscale(.3);transition:filter .4s}
.ps-person:hover img{filter:grayscale(0)}
.ps-person h3{color:var(--c-ink);margin-bottom:.25rem}
.ps-person strong{display:block;color:var(--c-primary);font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem}

/* Contact */
.ps-contact{background:var(--c-primary);overflow:hidden;position:relative}
.ps-contact::before{
  content:"";position:absolute;right:-10%;bottom:-20%;
  width:min(600px,60vw);aspect-ratio:1/1;
  background:radial-gradient(circle,rgba(0,0,0,.25) 0%,transparent 70%);
  pointer-events:none
}
.ps-contact h2,.ps-contact p,.ps-contact h2 *{color:var(--c-on-primary)}
.ps-contact p{color:color-mix(in srgb,var(--c-on-primary) 72%,transparent)}
.ps-contact__grid{display:grid;gap:3rem;position:relative;z-index:1}
@media(min-width:900px){.ps-contact__grid{grid-template-columns:.9fr 1.1fr;align-items:start}}
.contact-line{display:block;border-bottom:1px solid color-mix(in srgb,var(--c-on-primary) 22%,transparent);padding:.875rem 0}
.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;color:color-mix(in srgb,var(--c-on-primary) 55%,transparent);margin-bottom:.2rem}
.contact-line span,.contact-line a{color:var(--c-on-primary);font-weight:500}
.hours-list,.contact-form{background:var(--c-bg);color:var(--c-ink);padding:1.5rem;border-radius:0}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.9375rem}
.hours-row__day{font-weight:500;color:var(--c-ink)}
.hours-row__time{color:var(--c-ink-2)}
.hours-list{margin-top:1.25rem}
.contact-form{display:grid;gap:1.25rem;margin-top:0}
.contact-form__row{display:grid;gap:1.25rem}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:grid;gap:.4rem}
.contact-form__field span{font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--c-ink-2)}
.contact-form input,.contact-form textarea{
  border:0;border-bottom:1px solid var(--c-line);border-radius:0;
  padding:.75rem 0;background:transparent;color:var(--c-ink);
  transition:border-color .18s
}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--c-primary);outline:none}
.contact-form button[type="submit"]{
  background:var(--c-primary);color:var(--c-on-primary);border-radius:0;
  padding:1rem 2rem;font-size:.875rem;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;
  transition:opacity .2s,transform .2s
}
.contact-form button[type="submit"]:hover{opacity:.85;transform:translateY(-2px)}
.map-embed{margin-top:1.25rem;aspect-ratio:16/9;outline:1px solid var(--c-line)}
.map-embed iframe{width:100%;height:100%;border:0}

/* Footer */
.ps-footer{background:var(--c-bg);border-top:1px solid var(--c-line);padding:clamp(2rem,4vw,3rem) 0}
.ps-footer__inner{display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap}
.ps-footer strong{font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:.9rem;color:var(--c-ink)}
.ps-footer p{font-size:.8rem;color:var(--c-ink-2);margin-top:.2rem}
.social-links{display:flex;gap:.5rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border:1px solid var(--c-line);border-radius:0;color:var(--c-ink-2);transition:border-color .18s,color .18s}
.social-links a:hover{border-color:var(--c-ink);color:var(--c-ink)}
.social-links svg{width:16px;height:16px}`;
}

function portfolioBody(project: SiteProject): string {
  const image = firstImage(project);
  const gallery = project.content.gallery;
  const team = project.content.team.filter((item) => item.name.trim());
  const featureItems = features(project);

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="ps-header" id="top" data-header>
      <div class="container ps-header__inner">
        ${logoOrName(project)}
        <button type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            ${gallery.length ? '<li><a href="#work">Work</a></li>' : ''}
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a class="cta cta--primary" href="#contact">Let's talk</a>
      </div>
    </header>

    <main id="main">
      <section class="ps-hero" data-bg-text="${escapeHtml(project.business.name)}" aria-labelledby="hero-title">
        <div class="container ps-hero__inner">
          <p class="ps-kicker">${escapeHtml(industryLabel(project))}</p>
          <div class="ps-hero__top">
            <h1 id="hero-title">${escapeHtml(project.business.name)}</h1>
            <div class="ps-hero__meta">
              <p>${escapeHtml(project.business.tagline)}</p>
              <div style="display:flex;gap:.75rem;flex-wrap:wrap">
                <a class="cta cta--primary" href="#work">View work</a>
                <a class="cta cta--ghost" href="#contact">Get in touch</a>
              </div>
            </div>
          </div>
          ${image ? `<div class="ps-hero__image">${imgTag(image, { loading: 'eager' })}</div>` : ''}
        </div>
      </section>

      ${gallery.length ? `
      <section class="ps-gallery" id="work" aria-labelledby="gallery-title">
        <div class="container" style="padding-top:0">
          <h2 id="gallery-title" class="visually-hidden">Selected work</h2>
          <div class="ps-grid" data-lightbox>
            ${gallery.slice(0, 9).map((g) => `<figure>${imgTag(g)}</figure>`).join('')}
          </div>
        </div>
      </section>` : ''}

      <section class="ps-about" aria-labelledby="about-title">
        <div class="container">
          <div class="ps-about__grid">
            <div data-reveal="left">
              <p class="ps-kicker">About</p>
              <p class="ps-about__lead" style="margin-top:1rem">${escapeHtml(project.content.about)}</p>
            </div>
            <div data-reveal="right">
              ${featureItems.map((f) => `
                <article class="ps-about-feature">
                  <p class="ps-kicker">${escapeHtml(f.title)}</p>
                  <p style="margin-top:.5rem">${escapeHtml(f.description)}</p>
                </article>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="ps-services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="ps-section-head" data-reveal>
            <p class="ps-kicker">Services</p>
            <h2 id="services-title" style="margin-top:.75rem">What we do</h2>
          </div>
          <div class="ps-services__grid">
            ${servicesList(project.content.services).map((s, i) => `
              <article class="ps-service" data-reveal data-delay="${i * 60}">
                <h3>${escapeHtml(s.name)}</h3>
                <p>${escapeHtml(s.description)}</p>
                ${s.price ? `<strong>${escapeHtml(s.price)}</strong>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>

      ${team.length ? `
      <section aria-labelledby="team-title">
        <div class="container">
          <div class="ps-section-head" data-reveal>
            <p class="ps-kicker">People</p>
            <h2 id="team-title" style="margin-top:.75rem">The team</h2>
          </div>
          <div class="ps-team">
            ${team.map((m, i) => `
              <article class="ps-person" data-reveal data-delay="${i * 80}">
                <figure>${m.photo ? imgTag(m.photo) : ''}</figure>
                <h3>${escapeHtml(m.name)}</h3>
                <strong>${escapeHtml(m.role)}</strong>
                <p>${escapeHtml(m.bio)}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>` : ''}

      <section class="ps-contact" id="contact" aria-labelledby="contact-title">
        <div class="container">
          <div class="ps-contact__grid">
            <div data-reveal="left">
              <p class="ps-kicker">Start</p>
              <h2 id="contact-title" style="margin-top:.75rem;margin-bottom:1.5rem">Next project</h2>
              ${contactBlock(project)}
              ${hoursList(project)}
              ${mapEmbed(project)}
            </div>
            <div data-reveal="right">
              ${netlifyFormFields(project)}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="ps-footer">
      <div class="container ps-footer__inner">
        <div>
          <strong>${escapeHtml(project.business.name)}</strong>
          <p>${escapeHtml(project.business.tagline)}</p>
        </div>
        <div>${socialLinks(project)}</div>
        <p style="font-size:.8rem;color:var(--c-ink-2)">© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}</p>
      </div>
    </footer>`;
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPERT FIRM
   Concept: Calm authority. Sidebar nav, Playfair Display + Inter, clean white
   sections with precise grid, left-border service cards, stat displays.
════════════════════════════════════════════════════════════════════════════ */

function expertCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const primaryLight = tint(primary, 0.9);
  const primaryMid = tint(primary, 0.5);
  const primaryDark = shade(primary, 0.18);
  return `/* === Expert Firm =========================================== */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap");
${visuallyHiddenCss()}
:root{
  --c-primary:${primary};
  --c-primary-light:${primaryLight};
  --c-primary-dark:${primaryDark};
  --c-dark:#0e1624;
  --c-bg:#f5f7fa;
  --c-surface:#ffffff;
  --c-ink:#0e1624;
  --c-ink-2:#536172;
  --c-line:#dde3ec;
  --max:1200px;
  --pad:clamp(1.5rem,4vw,3rem);
  --sh:0 1px 3px rgba(14,22,36,.04),0 8px 24px rgba(14,22,36,.08);
  --sh-lg:0 2px 6px rgba(14,22,36,.04),0 20px 60px rgba(14,22,36,.12);
}
body{font-family:Inter,system-ui,sans-serif;background:var(--c-bg);color:var(--c-ink);line-height:1.72;-webkit-font-smoothing:antialiased}
h1,h2{font-family:"Playfair Display",Georgia,serif;font-weight:600;letter-spacing:-.01em;line-height:1.05}
h3,h4{font-family:Inter,sans-serif;font-weight:700;letter-spacing:-.01em;line-height:1.15}
h1{font-size:clamp(2.5rem,5.5vw,5.5rem)}
h2{font-size:clamp(2rem,4vw,3.8rem)}
h3{font-size:clamp(1.05rem,1.4vw,1.2rem)}
p{color:var(--c-ink-2);line-height:1.75}

/* Sidebar layout */
.ef-layout{display:grid;min-height:100svh}
@media(min-width:1060px){.ef-layout{grid-template-columns:272px 1fr}}
.ef-sidebar{
  background:linear-gradient(175deg,var(--c-dark) 0%,color-mix(in srgb,var(--c-dark) 92%,${primary}) 100%);
  color:#fff;padding:2rem 1.75rem;z-index:50;
  display:flex;flex-direction:column;gap:0
}
.ef-sidebar img{max-width:140px;max-height:60px;margin-bottom:.5rem}
.brand-mark{font-family:"Playfair Display",Georgia,serif;font-size:1.25rem;font-weight:600;color:#fff;letter-spacing:-.01em;line-height:1.15}
.ef-sidebar nav{margin-top:2.5rem;flex:1}
.ef-sidebar nav a{
  display:flex;align-items:center;gap:.75rem;
  color:rgba(255,255,255,.6);padding:.65rem 0;
  font-size:.875rem;font-weight:500;letter-spacing:.01em;
  border-bottom:1px solid rgba(255,255,255,.07);
  transition:color .18s
}
.ef-sidebar nav a::before{content:"";width:16px;height:1px;background:currentColor;flex-shrink:0;transition:width .2s}
.ef-sidebar nav a:hover{color:#fff}
.ef-sidebar nav a:hover::before{width:24px}
.ef-sidebar__footer{margin-top:auto;padding-top:2rem;border-top:1px solid rgba(255,255,255,.1)}
.ef-sidebar__footer p{font-size:.78rem;color:rgba(255,255,255,.35);line-height:1.6}
@media(min-width:1060px){.ef-sidebar{position:sticky;top:0;height:100svh;overflow:auto}}
@media(max-width:1059px){
  .ef-sidebar{padding:1.25rem var(--pad);flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap;position:sticky;top:0}
  .ef-sidebar nav{margin:0;width:100%}
  .ef-sidebar nav[data-open="false"]{display:none}
  .ef-sidebar nav[data-open="true"]{display:block}
  .ef-sidebar nav a{display:inline-flex;margin-right:1rem;border:0;padding:.35rem 0}
  .ef-sidebar__footer{display:none}
}

/* Kicker */
.ef-kicker{
  display:inline-flex;align-items:center;gap:.6rem;
  font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--c-primary)
}
.ef-kicker::before{content:"";width:28px;height:2px;background:var(--c-primary);flex-shrink:0}

/* Hero */
.ef-hero{
  background:var(--c-surface);border-bottom:1px solid var(--c-line);
  padding:clamp(4rem,9vw,8rem) var(--pad);position:relative;overflow:hidden
}
.ef-hero::after{
  content:"";position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 80% at 90% 50%,${primaryLight}60 0%,transparent 65%);
  pointer-events:none
}
.ef-hero__inner{max-width:900px;position:relative;z-index:1}
.ef-hero h1{max-width:14ch;margin:.875rem 0 1.25rem;color:var(--c-ink)}
.ef-hero p{font-size:clamp(1.05rem,1.4vw,1.25rem);max-width:54ch;line-height:1.72;margin-bottom:2rem}
.cta--primary{background:var(--c-primary);color:#fff;border-radius:8px}
.cta--primary:hover{background:var(--c-primary-dark);box-shadow:0 8px 28px ${primaryMid}44}
.cta--ghost{border:1.5px solid var(--c-line);border-radius:8px;color:var(--c-ink)}
.cta--ghost:hover{border-color:var(--c-primary);color:var(--c-primary)}

/* Sections */
.ef-main section{padding:clamp(3.5rem,7vw,6rem) var(--pad);border-bottom:1px solid var(--c-line)}
.ef-main section:last-child{border-bottom:0}
.ef-section__grid{display:grid;gap:2.5rem}
@media(min-width:900px){.ef-section__grid{grid-template-columns:.6fr 1.4fr;align-items:start;gap:4rem}}
.ef-section__intro{position:sticky;top:2rem}
.ef-section__intro h2{margin-top:.875rem;line-height:1.08}
.ef-lead{
  font-family:"Playfair Display",Georgia,serif;
  font-size:clamp(1.3rem,2vw,2rem);font-weight:400;font-style:italic;
  line-height:1.35;color:var(--c-ink)
}

/* Services */
.ef-services{display:grid;gap:1rem}
.ef-service{
  background:#fff;border-radius:12px;
  border-top:3px solid var(--c-primary);
  padding:1.5rem 1.5rem 1.5rem 1.75rem;
  box-shadow:var(--sh);
  transition:transform .2s cubic-bezier(.22,.68,0,1.2),box-shadow .2s ease
}
.ef-service:hover{transform:translateY(-3px);box-shadow:var(--sh-lg)}
.ef-service h3{color:var(--c-ink);margin-bottom:.5rem}
.ef-service p{font-size:.9375rem}
.ef-price{font-weight:700;color:var(--c-primary);font-size:.9375rem;margin-top:.75rem;display:block}

/* Credentials / stats */
.ef-proof{display:grid;gap:1rem}
@media(min-width:640px){.ef-proof{grid-template-columns:repeat(2,1fr)}}
@media(min-width:960px){.ef-proof{grid-template-columns:repeat(3,1fr)}}
.ef-card{
  background:#fff;border-radius:12px;
  border:1px solid var(--c-line);
  padding:1.5rem;box-shadow:var(--sh);
  transition:transform .2s,box-shadow .2s
}
.ef-card:hover{transform:translateY(-2px);box-shadow:var(--sh-lg)}
.ef-card strong{
  display:block;font-family:"Playfair Display",Georgia,serif;
  font-size:1.5rem;font-weight:600;color:var(--c-primary);margin-bottom:.5rem
}
.ef-card p{font-size:.9rem}

/* FAQs */
.ef-faq details{
  background:#fff;border:1px solid var(--c-line);border-radius:12px;
  padding:1.25rem 1.5rem;margin-bottom:.75rem;
  box-shadow:var(--sh);transition:border-color .18s
}
.ef-faq details[open]{border-color:var(--c-primary)}
.ef-faq summary{
  font-weight:600;cursor:pointer;list-style:none;
  display:flex;justify-content:space-between;align-items:center;gap:1rem;
  color:var(--c-ink)
}
.ef-faq summary::-webkit-details-marker{display:none}
.ef-faq summary::after{
  content:"+";font-size:1.25rem;font-weight:300;flex-shrink:0;
  color:var(--c-primary);transition:transform .2s
}
.ef-faq details[open] summary::after{transform:rotate(45deg)}
.ef-faq p{margin-top:.875rem;font-size:.9375rem;border-top:1px solid var(--c-line);padding-top:.875rem}

/* Contact */
.ef-contact{background:var(--c-surface)}
.ef-contact__grid{display:grid;gap:3rem}
@media(min-width:900px){.ef-contact__grid{grid-template-columns:1fr 1fr;align-items:start}}
.contact-line{display:flex;flex-direction:column;gap:.2rem;padding:.875rem 0;border-bottom:1px solid var(--c-line)}
.contact-line strong{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--c-ink-2);font-weight:600}
.contact-line span,.contact-line a{color:var(--c-ink);font-weight:500}
.contact-line a:hover{color:var(--c-primary)}
.hours-list{background:var(--c-bg);border:1px solid var(--c-line);border-radius:12px;padding:1.25rem;margin-top:1.25rem}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.9375rem}
.hours-row__day{font-weight:500;color:var(--c-ink)}
.hours-row__time{color:var(--c-ink-2)}
.map-embed{margin-top:1.25rem;aspect-ratio:16/9;border-radius:12px;overflow:hidden;border:1px solid var(--c-line)}
.map-embed iframe{width:100%;height:100%;border:0}
.contact-form{
  display:grid;gap:1.25rem;background:#fff;
  border-radius:16px;padding:2rem;
  border:1px solid var(--c-line);box-shadow:var(--sh-lg)
}
.contact-form__row{display:grid;gap:1.25rem}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:grid;gap:.4rem}
.contact-form__field span{font-size:.8125rem;font-weight:600;color:var(--c-ink);letter-spacing:.02em}
.contact-form input,.contact-form textarea{
  border:1.5px solid var(--c-line);border-radius:8px;
  padding:.8rem 1rem;background:#fff;color:var(--c-ink);font-size:.9375rem;
  transition:border-color .18s,box-shadow .18s
}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--c-primary);box-shadow:0 0 0 4px ${primaryLight}66;outline:none}
.contact-form button[type="submit"]{
  background:var(--c-primary);color:#fff;border-radius:8px;
  padding:1rem 2rem;font-size:.9375rem;font-weight:600;
  transition:background .2s,transform .2s,box-shadow .2s
}
.contact-form button[type="submit"]:hover{background:var(--c-primary-dark);transform:translateY(-2px);box-shadow:0 8px 28px ${primaryMid}44}

/* Footer */
.ef-footer{background:var(--c-dark);color:rgba(255,255,255,.55);padding:clamp(2rem,4vw,3rem) var(--pad)}
.ef-footer__inner{display:flex;justify-content:space-between;align-items:center;gap:1.5rem;flex-wrap:wrap}
.ef-footer strong{font-family:"Playfair Display",Georgia,serif;font-size:1.1rem;color:#fff}
.ef-footer p{font-size:.8125rem;margin-top:.2rem;color:rgba(255,255,255,.35)}
.social-links{display:flex;gap:.5rem}
.social-links a{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:rgba(255,255,255,.5);transition:background .18s,color .18s,border-color .18s}
.social-links a:hover{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.24)}
.social-links svg{width:15px;height:15px}`;
}

function expertBody(project: SiteProject): string {
  const proof = credentials(project);
  const faqItems = faqs(project);

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <div class="ef-layout">
      <aside class="ef-sidebar" id="top">
        ${logoOrName(project)}
        <nav aria-label="Primary" id="primary-nav">
          <a href="#expertise">Expertise</a>
          ${proof.length ? '<a href="#proof">Credentials</a>' : ''}
          ${faqItems.length ? '<a href="#faqs">FAQs</a>' : ''}
          <a href="#contact">Contact</a>
        </nav>
        <div class="ef-sidebar__footer">
          <p>${escapeHtml(project.business.tagline)}</p>
        </div>
      </aside>

      <div class="ef-main">
        <main id="main">
          <section class="ef-hero">
            <div class="ef-hero__inner">
              <p class="ef-kicker">${escapeHtml(industryLabel(project))}</p>
              <h1>${escapeHtml(project.business.name)}</h1>
              <p>${escapeHtml(project.business.tagline)}</p>
              <div style="display:flex;gap:.875rem;flex-wrap:wrap">
                <a class="cta cta--primary" href="#contact">Start a conversation</a>
                <a class="cta cta--ghost" href="#expertise">Our expertise</a>
              </div>
            </div>
          </section>

          <section>
            <div class="ef-section__grid" data-reveal>
              <div class="ef-section__intro">
                <p class="ef-kicker">Overview</p>
                <h2 style="margin-top:.875rem">Clear guidance built on trust</h2>
              </div>
              <p class="ef-lead">${escapeHtml(project.content.about)}</p>
            </div>
          </section>

          <section id="expertise">
            <div class="ef-section__grid">
              <div class="ef-section__intro" data-reveal="left">
                <p class="ef-kicker">Expertise</p>
                <h2 style="margin-top:.875rem">How we help</h2>
              </div>
              <div class="ef-services" data-reveal="right">
                ${servicesList(project.content.services).map((s) => `
                  <article class="ef-service">
                    <h3>${escapeHtml(s.name)}</h3>
                    <p>${escapeHtml(s.description)}</p>
                    ${s.price ? `<span class="ef-price">${escapeHtml(s.price)}</span>` : ''}
                  </article>`).join('')}
              </div>
            </div>
          </section>

          ${proof.length ? `
          <section id="proof">
            <div class="ef-section__grid">
              <div class="ef-section__intro" data-reveal="left">
                <p class="ef-kicker">Credentials</p>
                <h2 style="margin-top:.875rem">Reasons to feel confident</h2>
              </div>
              <div class="ef-proof" data-reveal="right">
                ${proof.map((p) => `
                  <article class="ef-card">
                    <strong>${escapeHtml(p.label)}</strong>
                    <p>${escapeHtml(p.detail)}</p>
                  </article>`).join('')}
              </div>
            </div>
          </section>` : ''}

          ${faqItems.length ? `
          <section id="faqs">
            <div class="ef-section__grid">
              <div class="ef-section__intro" data-reveal="left">
                <p class="ef-kicker">FAQs</p>
                <h2 style="margin-top:.875rem">Common questions</h2>
              </div>
              <div class="ef-faq" data-reveal="right">
                ${faqItems.map((f) => `
                  <details>
                    <summary>${escapeHtml(f.question)}</summary>
                    <p>${escapeHtml(f.answer)}</p>
                  </details>`).join('')}
              </div>
            </div>
          </section>` : ''}

          <section class="ef-contact" id="contact">
            <div class="ef-contact__grid">
              <div data-reveal="left">
                <p class="ef-kicker">Contact</p>
                <h2 style="margin-top:.875rem;margin-bottom:1.5rem">Speak with us</h2>
                ${contactBlock(project)}
                ${hoursList(project)}
                ${mapEmbed(project)}
              </div>
              <div data-reveal="right">
                ${netlifyFormFields(project)}
              </div>
            </div>
          </section>
        </main>

        <footer class="ef-footer">
          <div class="ef-footer__inner">
            <div>
              <strong>${escapeHtml(project.business.name)}</strong>
              <p>© <span data-year>${new Date().getFullYear()}</span>. All rights reserved.</p>
            </div>
            <div>${socialLinks(project)}</div>
          </div>
        </footer>
      </div>
    </div>`;
}
