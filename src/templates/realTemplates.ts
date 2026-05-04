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

function serviceCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  return `/* === Template: Service Pro ================================== */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
:root{--color-primary:${primary};--color-secondary:${secondary};--color-on-primary:${onPrimary};--color-accent:${primary};--color-bg:#f5f7fb;--color-surface:#fff;--color-ink:#101828;--color-ink-2:#475467;--color-line:#d8dee8;--max:1180px;--pad:clamp(1rem,3vw,2rem)}
${visuallyHiddenCss()}
body{font-family:Inter,system-ui,sans-serif;background:var(--color-bg);color:var(--color-ink);line-height:1.58}
h1,h2,h3{font-weight:900;letter-spacing:0;line-height:1.02}
h1{font-size:clamp(2.5rem,6vw,5.6rem)}
h2{font-size:clamp(1.9rem,4vw,3.4rem)}
section{padding-block:clamp(3rem,7vw,6rem)}
.sp-header{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid var(--color-line)}
.sp-header__inner{height:76px;display:grid;grid-template-columns:auto 1fr auto;gap:1rem;align-items:center}
.brand-mark{font-weight:900}.brand-mark img{max-height:40px;width:auto}
[data-nav]{display:none;position:fixed;inset:76px 0 auto 0;background:#fff;border-bottom:1px solid var(--color-line);padding:1rem var(--pad)}
[data-nav][data-open="true"]{display:block}[data-nav] ul{display:grid;gap:.25rem}[data-nav] a{display:block;padding:.75rem;font-weight:800;color:var(--color-ink-2)}
@media(min-width:880px){[data-nav]{display:block;position:static;padding:0;border:0}[data-nav] ul{display:flex;justify-content:end;gap:.5rem}[data-nav] a{padding:.5rem .65rem;font-size:.9rem}}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:6px}.cta--ghost{border:1px solid var(--color-line);border-radius:6px;color:var(--color-ink);background:#fff}
.sp-hero{padding:0;background:#fff;border-bottom:1px solid var(--color-line)}
.sp-hero__grid{display:grid}
@media(min-width:960px){.sp-hero__grid{grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);min-height:calc(100vh - 76px)}}
.sp-hero__copy{padding:clamp(2rem,6vw,5rem) var(--pad);display:flex;flex-direction:column;justify-content:center;gap:1.25rem}
.sp-eyebrow{display:inline-flex;width:max-content;border:1px solid ${tint(primary, 0.6)};background:${tint(primary, 0.9)};color:${shade(primary, 0.2)};border-radius:999px;padding:.4rem .7rem;font-weight:900;font-size:.8rem}
.sp-hero__sub{font-size:1.16rem;max-width:55ch}
.sp-hero__actions{display:flex;flex-wrap:wrap;gap:.75rem}
.sp-hero__panel{background:var(--color-secondary);color:#fff;padding:var(--pad);display:grid;align-content:end;gap:1rem;position:relative;overflow:hidden}
.sp-hero__panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.18}
.sp-quote{position:relative;background:#fff;color:var(--color-ink);border-radius:10px;padding:1.25rem;box-shadow:0 24px 70px rgba(0,0,0,.24)}
.sp-quote h2{font-size:1.4rem}.sp-quote ul{margin-top:1rem;display:grid;gap:.65rem}.sp-quote li{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid var(--color-line);padding-top:.65rem;color:var(--color-ink-2)}.sp-quote strong{color:var(--color-ink)}
.sp-strip{background:var(--color-primary);color:var(--color-on-primary);padding:.9rem 0}.sp-strip__inner{display:flex;gap:1rem;justify-content:space-between;flex-wrap:wrap;font-weight:900}
.sp-section-head{display:flex;justify-content:space-between;gap:2rem;align-items:end;margin-bottom:1.5rem}.sp-section-head p{max-width:45ch}
.sp-services{background:#fff}.sp-services__grid{display:grid;gap:1rem}@media(min-width:760px){.sp-services__grid{grid-template-columns:repeat(3,1fr)}}
.sp-service{border:1px solid var(--color-line);border-radius:10px;padding:1.25rem;background:#fff}.sp-service__num{font-weight:900;color:var(--color-primary)}.sp-service h3{margin:.7rem 0 .5rem}.sp-service__price{display:inline-flex;margin-top:1rem;font-weight:900}
.sp-process__grid,.sp-proof__grid{display:grid;gap:1rem}@media(min-width:760px){.sp-process__grid,.sp-proof__grid{grid-template-columns:repeat(3,1fr)}}
.sp-card{background:#fff;border:1px solid var(--color-line);border-radius:10px;padding:1.25rem}
.sp-contact{background:#101828;color:#fff}.sp-contact h2,.sp-contact p{color:#fff}.sp-contact__grid{display:grid;gap:1.5rem}@media(min-width:900px){.sp-contact__grid{grid-template-columns:.8fr 1.2fr}}
.contact-line{display:flex;flex-direction:column;border-bottom:1px solid rgba(255,255,255,.16);padding:.75rem 0}.contact-line strong{font-size:.75rem;text-transform:uppercase;color:rgba(255,255,255,.62)}.contact-line span{color:#fff}
.hours-list,.contact-form{background:#fff;color:var(--color-ink);border-radius:10px;padding:1rem}.hours-row{display:flex;justify-content:space-between;padding:.35rem 0}.contact-form{display:grid;gap:1rem}.contact-form__row{display:grid;gap:1rem}@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}.contact-form__field{display:grid;gap:.4rem;font-weight:800}.contact-form input,.contact-form textarea{border:1px solid var(--color-line);border-radius:6px;padding:.75rem}
.map-embed{margin-top:1rem;aspect-ratio:16/9;border-radius:10px;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}
.sp-footer{background:#fff;border-top:1px solid var(--color-line);padding:2rem 0}.sp-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links a{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--color-line);border-radius:999px}.social-links svg{width:16px;height:16px}
/* Art direction layer */
body{background:
  radial-gradient(900px 420px at 7% -8%,${tint(primary, 0.76)} 0%,transparent 60%),
  linear-gradient(180deg,#f7f9fd 0%,#edf2f7 100%)}
.sp-header{background:rgba(255,255,255,.86);backdrop-filter:blur(18px);box-shadow:0 18px 60px rgba(16,24,40,.06)}
.sp-header__inner{height:82px}.sp-header .cta{box-shadow:0 14px 34px ${tint(primary, 0.38)}}
.sp-hero{position:relative;background:linear-gradient(135deg,#fff 0%,${tint(primary, 0.95)} 100%)}
.sp-hero::after{content:"";position:absolute;inset:auto 0 0 0;height:1px;background:linear-gradient(90deg,transparent,var(--color-primary),transparent)}
.sp-hero__copy{position:relative}.sp-hero__copy::before{content:"";width:72px;height:6px;background:var(--color-primary);border-radius:999px;margin-bottom:.4rem}
.sp-hero__sub{font-size:clamp(1.08rem,1.6vw,1.35rem);color:#344054}
.sp-hero__panel{min-height:620px;background:linear-gradient(155deg,var(--color-secondary),${shade(secondary, 0.35)})}
.sp-hero__panel::before{content:"";position:absolute;inset:var(--pad);border:1px solid rgba(255,255,255,.18);pointer-events:none}
.sp-quote{margin-inline:auto;max-width:440px;border:1px solid rgba(255,255,255,.5);border-radius:18px;padding:1.4rem;background:rgba(255,255,255,.94);backdrop-filter:blur(16px)}
.sp-quote h2{font-size:clamp(1.45rem,2vw,2rem)}
.sp-strip{box-shadow:0 18px 50px ${tint(primary, 0.5)} inset}.sp-strip__inner span{display:inline-flex;align-items:center;gap:.45rem}.sp-strip__inner span::before{content:"";width:8px;height:8px;border-radius:999px;background:currentColor}
.sp-section-head{align-items:start}.sp-section-head h2{max-width:11ch}.sp-section-head p{font-size:1.05rem;color:#526071}
.sp-service,.sp-card{border:0;border-radius:18px;box-shadow:0 20px 60px rgba(16,24,40,.08);transition:transform .18s ease,box-shadow .18s ease}.sp-service:hover,.sp-card:hover{transform:translateY(-4px);box-shadow:0 28px 80px rgba(16,24,40,.14)}
.sp-service:first-child{background:var(--color-primary);color:var(--color-on-primary)}.sp-service:first-child p,.sp-service:first-child .sp-service__num,.sp-service:first-child .sp-service__price{color:color-mix(in srgb,var(--color-on-primary) 86%,transparent)}
.sp-card h3,.sp-service h3{font-size:1.35rem}.sp-contact{background:linear-gradient(135deg,#101828 0%,${shade(primary, 0.45)} 100%)}.sp-contact__grid{align-items:start}.contact-form{box-shadow:0 26px 90px rgba(0,0,0,.25);border-radius:18px}.hours-list{border-radius:18px}.map-embed{border-radius:18px}
@media(min-width:960px){.sp-hero__copy{padding-left:clamp(2rem,7vw,6.5rem)}.sp-quote{transform:translateY(8vh)}}`;
}

function serviceBody(project: SiteProject): string {
  const image = firstImage(project);
  const services = servicesList(project.content.services);
  const steps = processSteps(project);
  const proof = credentials(project);
  const servicePreview = services.slice(0, 4);
  return `
    <header class="sp-header" id="top">
      <div class="container sp-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul><li><a href="#services">Services</a></li><li><a href="#process">Process</a></li><li><a href="#contact">Contact</a></li></ul>
        </nav>
        <a class="cta cta--primary header-cta" href="#contact">Get a quote</a>
      </div>
    </header>
    <main id="main">
      <section class="sp-hero" aria-labelledby="hero-title">
        <div class="sp-hero__grid">
          <div class="sp-hero__copy">
            <span class="sp-eyebrow">${escapeHtml(project.seo.cityRegion || 'Local')} ${escapeHtml(industryLabel(project))}</span>
            <h1 id="hero-title">${escapeHtml(project.business.name)}</h1>
            <p class="sp-hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="sp-hero__actions"><a class="cta cta--primary" href="#contact">Request a quote</a><a class="cta cta--ghost" href="#services">See services</a></div>
          </div>
          <aside class="sp-hero__panel">
            ${image ? imgTag(image, { loading: 'eager' }) : ''}
            <div class="sp-quote">
              <h2>Fast enquiry. Clear next step.</h2>
              <ul>
                ${servicePreview.map((s) => `<li><strong>${escapeHtml(s.name)}</strong>${s.price ? `<span>${escapeHtml(s.price)}</span>` : ''}</li>`).join('')}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <div class="sp-strip"><div class="container sp-strip__inner"><span>Free enquiry</span><span>Local team</span><span>Clear pricing</span></div></div>
      <section class="sp-services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="sp-section-head"><div><p class="sp-eyebrow">Services</p><h2 id="services-title">What we can help with</h2></div><p>${escapeHtml(project.content.about)}</p></div>
          <div class="sp-services__grid">${services.map((s, i) => `<article class="sp-service"><span class="sp-service__num">${String(i + 1).padStart(2, '0')}</span><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p>${s.price ? `<span class="sp-service__price">${escapeHtml(s.price)}</span>` : ''}</article>`).join('')}</div>
        </div>
      </section>
      ${steps.length ? `<section id="process"><div class="container"><div class="sp-section-head"><div><p class="sp-eyebrow">Process</p><h2>Simple from start to finish</h2></div></div><div class="sp-process__grid">${steps.map((s) => `<article class="sp-card"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p></article>`).join('')}</div></div></section>` : ''}
      ${proof.length ? `<section><div class="container"><div class="sp-section-head"><div><p class="sp-eyebrow">Proof</p><h2>Trust signals</h2></div></div><div class="sp-proof__grid">${proof.map((item) => `<article class="sp-card"><h3>${escapeHtml(item.label)}</h3><p>${escapeHtml(item.detail)}</p></article>`).join('')}</div></div></section>` : ''}
      <section class="sp-contact" id="contact" aria-labelledby="contact-title"><div class="container"><div class="sp-contact__grid"><div><p class="sp-eyebrow">Contact</p><h2 id="contact-title">Tell us what you need</h2>${contactBlock(project)}${hoursList(project)}${mapEmbed(project)}</div><div>${netlifyFormFields(project)}</div></div></div></section>
    </main>
    ${footer(project, 'sp-footer', 'sp-footer__inner')}`;
}

function hospitalityCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const onPrimary = readableOn(primary);
  return `/* === Template: Hospitality Editorial ======================== */
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&display=swap");
:root{--color-primary:${primary};--color-on-primary:${onPrimary};--color-accent:${primary};--color-bg:#f8efe3;--color-surface:#fffaf2;--color-ink:#2b1b12;--color-ink-2:#6c5140;--color-line:#d8b996;--max:1180px;--pad:clamp(1.25rem,4vw,3rem)}
${visuallyHiddenCss()}
body{font-family:"DM Sans",system-ui,sans-serif;background:var(--color-bg);color:var(--color-ink);line-height:1.7}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:700;letter-spacing:0;line-height:.98}h1{font-size:clamp(3rem,9vw,8rem)}h2{font-size:clamp(2.2rem,5vw,5rem)}
.he-header{position:fixed;left:0;top:0;bottom:0;width:86px;z-index:60;background:var(--color-ink);color:#fff;display:none;place-items:center;border-right:1px solid rgba(255,255,255,.15)}@media(min-width:980px){.he-header{display:grid}.he-page{padding-left:86px}}
.he-header .brand-mark{writing-mode:vertical-rl;transform:rotate(180deg);font-family:Fraunces,Georgia,serif;font-size:1.1rem}.he-header img{max-width:44px;max-height:120px}
.he-mobile{position:sticky;top:0;z-index:50;background:var(--color-bg);border-bottom:1px solid var(--color-line)}.he-mobile__inner{height:72px;display:flex;align-items:center;justify-content:space-between}
@media(min-width:980px){.he-mobile{display:none}}
[data-nav]{display:none;position:fixed;inset:72px 0 auto 0;background:var(--color-bg);padding:1rem var(--pad);border-bottom:1px solid var(--color-line)}[data-nav][data-open="true"]{display:block}[data-nav] a{display:block;padding:.7rem 0;font-weight:700}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:999px}.cta--ghost{border:1px solid var(--color-line);border-radius:999px}
.he-hero{min-height:100vh;display:grid;align-items:end;padding:var(--pad);position:relative;overflow:hidden}.he-hero::before{content:"";position:absolute;inset:var(--pad);border:1px solid var(--color-line);pointer-events:none}.he-hero__image{position:absolute;right:var(--pad);top:var(--pad);width:min(48vw,620px);height:72vh;overflow:hidden}.he-hero__image img{width:100%;height:100%;object-fit:cover}.he-hero__copy{position:relative;max-width:880px;z-index:2}.he-kicker{text-transform:uppercase;letter-spacing:.14em;font-weight:700;color:var(--color-primary);font-size:.78rem}.he-hero p{font-size:clamp(1.05rem,1.4vw,1.3rem);max-width:44rem}
@media(max-width:860px){.he-hero{min-height:auto;padding-block:4rem}.he-hero::before{display:none}.he-hero__image{position:relative;inset:auto;width:100%;height:340px;margin-bottom:2rem}}
.he-menu{background:var(--color-ink);color:#fff}.he-menu p{color:rgba(255,255,255,.7)}.he-menu__grid{display:grid;gap:1rem}@media(min-width:820px){.he-menu__grid{grid-template-columns:1fr 1fr}}
.he-menu-item{border-top:1px solid rgba(255,255,255,.25);padding:1rem 0;display:grid;grid-template-columns:1fr auto;gap:1rem}.he-menu-item p{grid-column:1/-1}.he-menu-item strong{font-family:Fraunces,Georgia,serif;font-size:1.4rem}.he-menu-item span{color:#fff;font-weight:700}
section{padding:clamp(4rem,8vw,8rem) 0}.he-split{display:grid;gap:2rem}@media(min-width:900px){.he-split{grid-template-columns:.85fr 1.15fr;align-items:start}}.he-lead{font-family:Fraunces,Georgia,serif;font-size:clamp(1.8rem,3vw,3rem);line-height:1.14;color:var(--color-ink)}
.he-gallery{display:grid;gap:.75rem;grid-template-columns:repeat(2,1fr)}@media(min-width:860px){.he-gallery{grid-template-columns:repeat(4,1fr)}.he-gallery figure:first-child{grid-column:span 2;grid-row:span 2}}.he-gallery figure{min-height:220px;overflow:hidden}.he-gallery img{width:100%;height:100%;object-fit:cover}
.he-testimonials{background:#fff4e4}.he-quote{font-family:Fraunces,Georgia,serif;font-size:clamp(1.4rem,2.5vw,2.4rem);line-height:1.2;border-top:1px solid var(--color-line);padding-top:1.25rem}.he-quote cite{display:block;font-family:"DM Sans";font-size:.9rem;font-style:normal;margin-top:1rem;color:var(--color-ink-2)}
.he-contact{background:var(--color-surface)}.he-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.he-contact__grid{grid-template-columns:1fr 1fr}}.contact-line{display:block;border-bottom:1px solid var(--color-line);padding:.75rem 0}.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase;color:var(--color-ink-2)}.hours-list{border:1px solid var(--color-line);padding:1rem;margin-top:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem}.contact-form__row{display:grid;gap:1rem}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid var(--color-line);background:#fffaf2;padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.he-footer{background:var(--color-ink);color:#fff;padding:2rem 0}.he-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}
/* Art direction layer */
body{background:
  radial-gradient(700px 360px at 92% 8%,${tint(primary, 0.72)} 0%,transparent 58%),
  linear-gradient(180deg,#f9eddf 0%,#fff8ed 54%,#f5e0c8 100%)}
.he-header{box-shadow:18px 0 80px rgba(43,27,18,.18)}
.he-mobile{background:rgba(248,239,227,.86);backdrop-filter:blur(16px)}
.he-hero{isolation:isolate}.he-hero::before{border-color:rgba(43,27,18,.22)}.he-hero::after{content:"";position:absolute;left:calc(var(--pad) * 1.5);bottom:calc(var(--pad) * 1.2);width:min(34vw,420px);aspect-ratio:1/1;border:1px solid rgba(43,27,18,.18);border-radius:999px;z-index:-1}
.he-hero__image{border-radius:999px 999px 10px 10px;box-shadow:0 34px 100px rgba(43,27,18,.28)}
.he-hero__image::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(43,27,18,.28))}
.he-hero h1{max-width:9ch;text-wrap:balance;text-shadow:0 8px 50px rgba(255,250,242,.78)}
.he-hero__copy{padding-top:22vh}.he-hero__copy > p:last-child{margin-top:1.5rem}
.he-kicker{display:inline-flex;gap:.6rem;align-items:center}.he-kicker::before{content:"";width:40px;height:1px;background:currentColor}
.he-menu{background:linear-gradient(135deg,var(--color-ink),#3b2418);position:relative;overflow:hidden}.he-menu::after{content:"MENU";position:absolute;right:-.08em;bottom:-.22em;font-family:Fraunces,Georgia,serif;font-size:22vw;color:rgba(255,255,255,.04);line-height:1}
.he-menu-item{position:relative;padding:1.25rem 0}.he-menu-item strong{font-size:clamp(1.45rem,2vw,2.05rem)}.he-menu-item span{border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:.25rem .75rem}
.he-split{align-items:center}.he-lead{position:relative;padding-left:1.2rem;border-left:1px solid var(--color-line)}
.he-split article{padding:1rem 0;border-top:1px solid var(--color-line)}
.he-gallery{gap:clamp(.6rem,1.5vw,1rem)}.he-gallery figure{border-radius:999px 999px 12px 12px;box-shadow:0 20px 70px rgba(43,27,18,.16)}.he-gallery figure:nth-child(even){border-radius:12px 12px 999px 999px}
.he-testimonials{background:linear-gradient(180deg,#fff7e9,#f1dcc4)}.he-quote{border-top:0;position:relative;padding-left:clamp(1rem,3vw,3rem)}.he-quote::before{content:"“";position:absolute;left:0;top:-.2em;font-size:4rem;color:var(--color-primary)}
.he-contact{background:#fff8ed}.he-contact__grid{background:rgba(255,250,242,.72);border:1px solid var(--color-line);padding:clamp(1.25rem,3vw,2rem);box-shadow:0 28px 90px rgba(43,27,18,.12)}.contact-form input,.contact-form textarea{border-radius:999px}.contact-form textarea{border-radius:24px}.map-embed{border-radius:999px 999px 12px 12px}
@media(max-width:860px){.he-hero__copy{padding-top:0}.he-hero__image{border-radius:180px 180px 12px 12px}}`;
}

function hospitalityBody(project: SiteProject): string {
  const image = firstImage(project);
  const menuItems = products(project).length ? products(project) : servicesList(project.content.services);
  const gallery = project.content.gallery;
  const quotes = testimonialsList(project.content.testimonials);
  return `
    <div class="he-page">
      <header class="he-header" id="top">${logoOrName(project)}</header>
      <header class="he-mobile"><div class="container he-mobile__inner">${logoOrName(project)}<button type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button><nav id="primary-nav" data-nav data-open="false"><a href="#menu">Menu</a><a href="#story">Story</a><a href="#contact">Visit</a></nav></div></header>
      <main id="main">
        <section class="he-hero"><div class="he-hero__image">${image ? imgTag(image, { loading: 'eager' }) : ''}</div><div class="he-hero__copy"><p class="he-kicker">${escapeHtml(project.seo.cityRegion || industryLabel(project))}</p><h1>${escapeHtml(project.business.name)}</h1><p>${escapeHtml(project.business.tagline)}</p><p><a class="cta cta--primary" href="#contact">Plan a visit</a></p></div></section>
        <section class="he-menu" id="menu"><div class="container"><p class="he-kicker">Menu / Offers</p><h2>Things people come for</h2><div class="he-menu__grid">${menuItems.map((item) => `<article class="he-menu-item"><strong>${escapeHtml(item.name)}</strong>${item.price ? `<span>${escapeHtml(item.price)}</span>` : ''}<p>${escapeHtml(item.description)}</p></article>`).join('')}</div></div></section>
        <section id="story"><div class="container he-split"><p class="he-lead">${escapeHtml(project.content.about)}</p><div>${features(project).map((f) => `<article><p class="he-kicker">${escapeHtml(f.title)}</p><p>${escapeHtml(f.description)}</p></article>`).join('')}</div></div></section>
        ${gallery.length ? `<section><div class="container"><p class="he-kicker">Gallery</p><div class="he-gallery">${gallery.map((g) => `<figure>${imgTag(g)}</figure>`).join('')}</div></div></section>` : ''}
        ${quotes.length ? `<section class="he-testimonials"><div class="container">${quotes.slice(0, 2).map((q) => `<blockquote class="he-quote">${escapeHtml(q.quote)}<cite>${escapeHtml(q.customerName)}</cite></blockquote>`).join('')}</div></section>` : ''}
        <section class="he-contact" id="contact"><div class="container he-contact__grid"><div><p class="he-kicker">Visit / Contact</p><h2>Make a plan</h2>${contactBlock(project)}${hoursList(project)}${mapEmbed(project)}</div>${netlifyFormFields(project)}</div></section>
      </main>
      ${footer(project, 'he-footer', 'he-footer__inner')}
    </div>`;
}

function portfolioCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  const onPrimary = readableOn(primary);
  return `/* === Template: Portfolio Studio ============================= */
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap");
:root{--color-primary:${primary};--color-on-primary:${onPrimary};--color-accent:${primary};--color-bg:#0b0b0c;--color-surface:#161719;--color-ink:#f5f5f0;--color-ink-2:#b6b7bb;--color-line:#303236;--max:1340px;--pad:clamp(1rem,3vw,2rem)}
${visuallyHiddenCss()}
body{font-family:"Space Grotesk",system-ui,sans-serif;background:var(--color-bg);color:var(--color-ink);line-height:1.55}p{color:var(--color-ink-2)}h1,h2,h3{font-weight:800;letter-spacing:0;line-height:.92}h1{font-size:clamp(3.2rem,11vw,10rem);text-transform:uppercase}h2{font-size:clamp(2.1rem,6vw,6rem);text-transform:uppercase}
.ps-header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(11,11,12,.84);backdrop-filter:blur(16px);border-bottom:1px solid var(--color-line)}.ps-header__inner{height:72px;display:flex;align-items:center;justify-content:space-between}.brand-mark{font-weight:800}.brand-mark img{max-height:38px;width:auto}[data-nav]{display:none;position:fixed;inset:72px 0 auto 0;background:#0b0b0c;padding:1rem var(--pad)}[data-nav][data-open="true"]{display:block}[data-nav] a{display:block;padding:.7rem 0;color:#fff;font-weight:700}@media(min-width:860px){[data-nav]{display:block;position:static;padding:0;background:transparent}[data-nav] ul{display:flex;gap:1rem}}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:0}.cta--ghost{border:1px solid var(--color-line);border-radius:0;color:#fff}
.ps-hero{min-height:100vh;padding-top:72px;display:grid;align-items:end}.ps-hero__inner{padding-block:clamp(3rem,7vw,6rem)}.ps-hero__top{display:grid;gap:1.5rem}@media(min-width:900px){.ps-hero__top{grid-template-columns:1fr 360px;align-items:end}}.ps-hero__image{aspect-ratio:1/1;overflow:hidden;background:var(--color-surface)}.ps-hero__image img{width:100%;height:100%;object-fit:cover}.ps-kicker{color:var(--color-primary);text-transform:uppercase;letter-spacing:.14em;font-weight:800;font-size:.8rem}
.ps-gallery{padding:0 0 5rem}.ps-grid{display:grid;gap:.5rem;grid-template-columns:repeat(2,1fr)}@media(min-width:900px){.ps-grid{grid-template-columns:repeat(6,1fr)}.ps-grid figure:nth-child(1){grid-column:span 3;grid-row:span 2}.ps-grid figure:nth-child(2){grid-column:span 2}.ps-grid figure:nth-child(3){grid-column:span 1}.ps-grid figure:nth-child(4){grid-column:span 2}.ps-grid figure:nth-child(5){grid-column:span 2}.ps-grid figure:nth-child(6){grid-column:span 2}}.ps-grid figure{min-height:240px;overflow:hidden;background:var(--color-surface)}.ps-grid img{width:100%;height:100%;object-fit:cover;filter:saturate(.95)}
section{padding-block:clamp(4rem,8vw,7rem)}.ps-section-head{display:grid;gap:1rem;margin-bottom:2rem}@media(min-width:900px){.ps-section-head{grid-template-columns:.8fr 1.2fr}}
.ps-services{background:#f5f5f0;color:#0b0b0c}.ps-services p{color:#3f4248}.ps-services__grid{display:grid;gap:1px;background:#d7d7d0}@media(min-width:760px){.ps-services__grid{grid-template-columns:repeat(3,1fr)}}.ps-service{background:#f5f5f0;padding:1.5rem}.ps-service h3{margin-bottom:1rem}
.ps-about__grid{display:grid;gap:2rem}@media(min-width:900px){.ps-about__grid{grid-template-columns:1fr 1fr}}.ps-about__lead{font-size:clamp(1.3rem,2vw,2rem);color:#fff}
.ps-team{display:grid;gap:1rem}@media(min-width:760px){.ps-team{grid-template-columns:repeat(3,1fr)}}.ps-person{background:var(--color-surface);padding:1rem}.ps-person figure{aspect-ratio:1/1;overflow:hidden;margin-bottom:1rem;background:#25262a}.ps-person img{width:100%;height:100%;object-fit:cover}.ps-person strong{display:block;color:var(--color-primary)}
.ps-contact{background:var(--color-primary);color:var(--color-on-primary)}.ps-contact p,.ps-contact h2{color:var(--color-on-primary)}.ps-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.ps-contact__grid{grid-template-columns:.9fr 1.1fr}}.contact-line{display:block;border-bottom:1px solid color-mix(in srgb,var(--color-on-primary) 28%,transparent);padding:.75rem 0}.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase}.hours-list,.contact-form{background:#0b0b0c;color:#fff;padding:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem}.contact-form__row{display:grid;gap:1rem}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid #333;background:#111;color:#fff;padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.ps-footer{background:#0b0b0c;color:#fff;border-top:1px solid var(--color-line);padding:2rem 0}.ps-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}
/* Art direction layer */
body{background:
  radial-gradient(900px 520px at 75% -10%,${tint(primary, 0.35)}22 0%,transparent 60%),
  linear-gradient(180deg,#050506 0%,#0b0b0c 45%,#121317 100%)}
.ps-header{background:rgba(5,5,6,.72);box-shadow:0 18px 70px rgba(0,0,0,.35)}
.ps-header .brand-mark{letter-spacing:.08em;text-transform:uppercase}
.ps-hero{position:relative;overflow:hidden}.ps-hero::before{content:"";position:absolute;left:var(--pad);right:var(--pad);top:72px;bottom:0;border-left:1px solid rgba(255,255,255,.08);border-right:1px solid rgba(255,255,255,.08);pointer-events:none}.ps-hero::after{content:"SELECTED WORK";position:absolute;left:-.04em;bottom:-.18em;font-size:13vw;font-weight:800;line-height:1;color:rgba(255,255,255,.035);white-space:nowrap}
.ps-hero__inner{position:relative;z-index:1}.ps-hero h1{max-width:9ch;text-shadow:0 16px 70px rgba(0,0,0,.65)}
.ps-hero__image{border-radius:0;box-shadow:0 30px 100px rgba(0,0,0,.55);outline:1px solid rgba(255,255,255,.12);transform:rotate(2deg)}.ps-hero__image img{filter:saturate(.85) contrast(1.08)}
.ps-kicker{display:inline-flex;align-items:center;gap:.65rem}.ps-kicker::after{content:"";width:56px;height:1px;background:currentColor}
.ps-grid{gap:clamp(.45rem,1vw,.8rem)}.ps-grid figure{position:relative;min-height:280px;outline:1px solid rgba(255,255,255,.08)}.ps-grid figure::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.28));opacity:0;transition:opacity .25s}.ps-grid figure:hover::after{opacity:1}.ps-grid img{transition:transform .55s ease,filter .55s ease}.ps-grid figure:hover img{transform:scale(1.055);filter:saturate(1.1) contrast(1.05)}
.ps-about{background:linear-gradient(180deg,#0b0b0c,#17181d)}.ps-about__lead{font-size:clamp(1.45rem,2.4vw,2.7rem);line-height:1.13}.ps-about article{border-top:1px solid var(--color-line);padding:1rem 0}
.ps-services{background:#f3f1eb}.ps-services__grid{box-shadow:0 24px 80px rgba(0,0,0,.18)}.ps-service{min-height:240px;display:flex;flex-direction:column;justify-content:space-between;transition:background .2s,color .2s}.ps-service:hover{background:#0b0b0c;color:#fff}.ps-service:hover p{color:rgba(255,255,255,.7)}
.ps-person{border:1px solid var(--color-line);box-shadow:0 22px 70px rgba(0,0,0,.28)}.ps-person figure{filter:grayscale(.25)}
.ps-contact{background:linear-gradient(135deg,var(--color-primary),#0b0b0c)}.ps-contact__grid{align-items:start}.contact-form{border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 100px rgba(0,0,0,.35)}.contact-form input,.contact-form textarea{border-radius:0}.map-embed{outline:1px solid rgba(255,255,255,.16)}
@media(min-width:900px){.ps-grid figure:nth-child(1){min-height:620px}.ps-grid figure:nth-child(4){min-height:420px}}`;
}

function portfolioBody(project: SiteProject): string {
  const image = firstImage(project);
  const gallery = project.content.gallery;
  const team = project.content.team.filter((item) => item.name.trim());
  return `
    <header class="ps-header" id="top"><div class="container ps-header__inner">${logoOrName(project)}<button type="button" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button><nav id="primary-nav" data-nav data-open="false"><ul><li><a href="#work">Work</a></li><li><a href="#services">Services</a></li><li><a href="#contact">Contact</a></li></ul></nav></div></header>
    <main id="main">
      <section class="ps-hero"><div class="container ps-hero__inner"><p class="ps-kicker">${escapeHtml(industryLabel(project))}</p><div class="ps-hero__top"><div><h1>${escapeHtml(project.business.name)}</h1><p>${escapeHtml(project.business.tagline)}</p></div><figure class="ps-hero__image">${image ? imgTag(image, { loading: 'eager' }) : ''}</figure></div></div></section>
      ${gallery.length ? `<section class="ps-gallery" id="work"><div class="container"><div class="ps-grid">${gallery.slice(0, 9).map((g) => `<figure>${imgTag(g)}</figure>`).join('')}</div></div></section>` : ''}
      <section class="ps-about"><div class="container ps-about__grid"><p class="ps-about__lead">${escapeHtml(project.content.about)}</p><div>${features(project).map((f) => `<article><p class="ps-kicker">${escapeHtml(f.title)}</p><p>${escapeHtml(f.description)}</p></article>`).join('')}</div></div></section>
      <section class="ps-services" id="services"><div class="container"><div class="ps-section-head"><h2>Services</h2><p>Focused offers, cleanly packaged for the kind of work this business wants more of.</p></div><div class="ps-services__grid">${servicesList(project.content.services).map((s) => `<article class="ps-service"><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p>${s.price ? `<strong>${escapeHtml(s.price)}</strong>` : ''}</article>`).join('')}</div></div></section>
      ${team.length ? `<section><div class="container"><div class="ps-section-head"><h2>People</h2></div><div class="ps-team">${team.map((m) => `<article class="ps-person"><figure>${m.photo ? imgTag(m.photo) : ''}</figure><h3>${escapeHtml(m.name)}</h3><strong>${escapeHtml(m.role)}</strong><p>${escapeHtml(m.bio)}</p></article>`).join('')}</div></div></section>` : ''}
      <section class="ps-contact" id="contact"><div class="container ps-contact__grid"><div><p class="ps-kicker">Start</p><h2>Talk about the next project</h2>${contactBlock(project)}${hoursList(project)}${mapEmbed(project)}</div>${netlifyFormFields(project)}</div></section>
    </main>
    ${footer(project, 'ps-footer', 'ps-footer__inner')}`;
}

function expertCss(project: SiteProject): string {
  const primary = project.brand.primaryColor;
  return `/* === Template: Expert Firm ================================== */
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;500;600;700;800&display=swap");
:root{--color-primary:${primary};--color-accent:${primary};--color-bg:#f4f6f8;--color-surface:#fff;--color-ink:#14213d;--color-ink-2:#536173;--color-line:#d8dee8;--max:1180px;--pad:clamp(1rem,3vw,2.5rem)}
${visuallyHiddenCss()}
body{font-family:"Source Sans 3",system-ui,sans-serif;background:var(--color-bg);color:var(--color-ink);line-height:1.7}h1,h2,h3{font-family:"Libre Baskerville",Georgia,serif;letter-spacing:0;line-height:1.08}h1{font-size:clamp(2.5rem,5vw,5.2rem)}h2{font-size:clamp(2rem,3.8vw,3.5rem)}
.ef-layout{display:grid}@media(min-width:1060px){.ef-layout{grid-template-columns:280px 1fr}.ef-sidebar{position:sticky;top:0;height:100vh}}
.ef-sidebar{background:var(--color-ink);color:#fff;padding:1.5rem;z-index:50}.ef-sidebar .brand-mark{font-family:"Libre Baskerville";font-size:1.2rem}.ef-sidebar img{max-width:160px;max-height:70px}.ef-sidebar nav{margin-top:2rem}.ef-sidebar a{display:block;color:rgba(255,255,255,.75);padding:.55rem 0;font-weight:700}.ef-sidebar a:hover{color:#fff}
.ef-main{min-width:0}.ef-hero{background:#fff;border-bottom:1px solid var(--color-line);padding:clamp(4rem,8vw,8rem) var(--pad)}.ef-hero__inner{max-width:980px}.ef-kicker{text-transform:uppercase;letter-spacing:.14em;font-weight:800;color:var(--color-primary);font-size:.8rem}.ef-hero p{font-size:1.2rem;max-width:58ch}.cta--primary{background:var(--color-primary);color:#fff;border-radius:3px}.cta--ghost{border:1px solid var(--color-line);border-radius:3px}
section{padding:clamp(3.5rem,7vw,6rem) var(--pad)}.ef-section{border-bottom:1px solid var(--color-line)}.ef-grid{display:grid;gap:2rem}@media(min-width:900px){.ef-grid{grid-template-columns:.72fr 1.28fr}}.ef-lead{font-size:1.2rem;color:var(--color-ink-2)}
.ef-services{display:grid;gap:1rem}.ef-service{background:#fff;border-left:4px solid var(--color-primary);padding:1.25rem;box-shadow:0 8px 24px rgba(20,33,61,.06)}.ef-service h3{font-family:"Source Sans 3";font-size:1.35rem}.ef-price{font-weight:800;color:var(--color-primary)}
.ef-proof{display:grid;gap:1rem}@media(min-width:760px){.ef-proof{grid-template-columns:repeat(3,1fr)}}.ef-card{background:#fff;border:1px solid var(--color-line);padding:1.25rem}.ef-card strong{display:block;font-family:"Libre Baskerville";font-size:1.2rem;margin-bottom:.45rem}
.ef-faq details{background:#fff;border:1px solid var(--color-line);padding:1rem;margin-bottom:.75rem}.ef-faq summary{font-weight:800;cursor:pointer}.ef-faq p{margin-top:.6rem}
.ef-contact{background:#fff}.ef-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.ef-contact__grid{grid-template-columns:1fr 1fr}}.contact-line{display:block;border-bottom:1px solid var(--color-line);padding:.75rem 0}.contact-line strong{display:block;text-transform:uppercase;font-size:.75rem;color:var(--color-ink-2)}.hours-list{border:1px solid var(--color-line);padding:1rem;margin-top:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem;border:1px solid var(--color-line);padding:1.25rem}.contact-form__row{display:grid;gap:1rem}@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid var(--color-line);padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.ef-footer{background:var(--color-ink);color:#fff;padding:2rem var(--pad)}.ef-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}
/* Art direction layer */
body{background:linear-gradient(180deg,#f5f7fa 0%,#eef2f6 100%)}
.ef-layout{background:
  linear-gradient(90deg,rgba(20,33,61,.045) 1px,transparent 1px),
  linear-gradient(180deg,rgba(20,33,61,.035) 1px,transparent 1px);
  background-size:72px 72px}
.ef-sidebar{background:linear-gradient(180deg,#101a30 0%,#162642 70%,${shade(primary, 0.45)} 100%);box-shadow:18px 0 80px rgba(20,33,61,.18)}
.ef-sidebar::after{content:"";display:block;margin-top:auto;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)}
.ef-sidebar nav a{border-bottom:1px solid rgba(255,255,255,.08)}
.ef-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#fff 0%,#f7f9fc 62%,${tint(primary, 0.9)} 100%)}.ef-hero::after{content:"ADVISORY";position:absolute;right:-.08em;bottom:-.25em;font-family:"Libre Baskerville",Georgia,serif;font-size:12vw;color:rgba(20,33,61,.045);line-height:1;pointer-events:none}
.ef-hero__inner{position:relative;z-index:1}.ef-hero h1{max-width:12ch}.ef-hero p{font-size:clamp(1.1rem,1.5vw,1.35rem)}
.ef-kicker{display:inline-flex;align-items:center;gap:.65rem}.ef-kicker::before{content:"";width:38px;height:1px;background:var(--color-primary)}
.ef-section{background:rgba(255,255,255,.52);backdrop-filter:blur(2px)}.ef-section:nth-of-type(odd){background:rgba(244,246,248,.68)}
.ef-grid{align-items:start}.ef-lead{font-family:"Libre Baskerville",Georgia,serif;font-size:clamp(1.35rem,2.2vw,2.25rem);line-height:1.28;color:var(--color-ink)}
.ef-service{position:relative;border-left:0;border-top:3px solid var(--color-primary);box-shadow:0 22px 70px rgba(20,33,61,.08);transition:transform .18s ease,box-shadow .18s ease}.ef-service::before{content:"";position:absolute;left:1.25rem;top:1.25rem;width:34px;height:34px;border:1px solid ${tint(primary, 0.45)};border-radius:999px}.ef-service h3{padding-left:3.25rem}.ef-service:hover{transform:translateY(-3px);box-shadow:0 30px 90px rgba(20,33,61,.13)}
.ef-card{box-shadow:0 18px 55px rgba(20,33,61,.07);border-color:#e1e6ee}.ef-card strong{color:var(--color-primary)}
.ef-faq details{box-shadow:0 12px 38px rgba(20,33,61,.055);transition:border-color .18s}.ef-faq details[open]{border-color:var(--color-primary)}
.ef-contact{background:linear-gradient(135deg,#fff,#f1f5f9)}.ef-contact__grid{max-width:1180px;margin-inline:auto;border:1px solid var(--color-line);background:#fff;padding:clamp(1.25rem,3vw,2rem);box-shadow:0 28px 90px rgba(20,33,61,.1)}
.contact-form{box-shadow:0 18px 60px rgba(20,33,61,.08);background:#fbfcfe}.contact-form input,.contact-form textarea{background:#fff;border-radius:3px}.hours-list{background:#fbfcfe}.map-embed{border:1px solid var(--color-line)}
@media(max-width:1059px){.ef-sidebar{position:sticky;top:0}.ef-sidebar nav{display:flex;gap:1rem;overflow:auto;margin-top:1rem}.ef-sidebar nav a{white-space:nowrap}}`;
}

function expertBody(project: SiteProject): string {
  const proof = credentials(project);
  const faqItems = faqs(project);
  return `
    <div class="ef-layout">
      <aside class="ef-sidebar" id="top">${logoOrName(project)}<nav aria-label="Primary"><a href="#expertise">Expertise</a><a href="#proof">Credentials</a><a href="#faqs">FAQs</a><a href="#contact">Contact</a></nav></aside>
      <div class="ef-main">
        <main id="main">
          <section class="ef-hero"><div class="ef-hero__inner"><p class="ef-kicker">${escapeHtml(industryLabel(project))}</p><h1>${escapeHtml(project.business.name)}</h1><p>${escapeHtml(project.business.tagline)}</p><p><a class="cta cta--primary" href="#contact">Start a consultation</a></p></div></section>
          <section class="ef-section"><div class="ef-grid"><div><p class="ef-kicker">Overview</p><h2>Clear guidance, built on trust.</h2></div><p class="ef-lead">${escapeHtml(project.content.about)}</p></div></section>
          <section class="ef-section" id="expertise"><div class="ef-grid"><div><p class="ef-kicker">Expertise</p><h2>How we can help</h2></div><div class="ef-services">${servicesList(project.content.services).map((s) => `<article class="ef-service"><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p>${s.price ? `<p class="ef-price">${escapeHtml(s.price)}</p>` : ''}</article>`).join('')}</div></div></section>
          ${proof.length ? `<section class="ef-section" id="proof"><div class="ef-grid"><div><p class="ef-kicker">Credentials</p><h2>Reasons to feel confident</h2></div><div class="ef-proof">${proof.map((p) => `<article class="ef-card"><strong>${escapeHtml(p.label)}</strong><p>${escapeHtml(p.detail)}</p></article>`).join('')}</div></div></section>` : ''}
          ${faqItems.length ? `<section class="ef-section ef-faq" id="faqs"><div class="ef-grid"><div><p class="ef-kicker">FAQs</p><h2>Common questions</h2></div><div>${faqItems.map((f) => `<details><summary>${escapeHtml(f.question)}</summary><p>${escapeHtml(f.answer)}</p></details>`).join('')}</div></div></section>` : ''}
          <section class="ef-contact" id="contact"><div class="ef-contact__grid"><div><p class="ef-kicker">Contact</p><h2>Speak with us</h2>${contactBlock(project)}${hoursList(project)}${mapEmbed(project)}</div>${netlifyFormFields(project)}</div></section>
        </main>
        ${footer(project, 'ef-footer', 'ef-footer__inner')}
      </div>
    </div>`;
}

function footer(project: SiteProject, footerClass: string, innerClass: string): string {
  return `<footer class="${footerClass}">
    <div class="container ${innerClass}">
      <div><strong>${escapeHtml(project.business.name)}</strong><p>${escapeHtml(project.business.tagline)}</p></div>
      <div>${socialLinks(project)}</div>
      <div><span>Copyright <span data-year>${new Date().getFullYear()}</span></span></div>
    </div>
  </footer>`;
}
