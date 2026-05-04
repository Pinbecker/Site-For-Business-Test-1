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
.sp-footer{background:#fff;border-top:1px solid var(--color-line);padding:2rem 0}.sp-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links a{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--color-line);border-radius:999px}.social-links svg{width:16px;height:16px}`;
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
.he-contact{background:var(--color-surface)}.he-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.he-contact__grid{grid-template-columns:1fr 1fr}}.contact-line{display:block;border-bottom:1px solid var(--color-line);padding:.75rem 0}.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase;color:var(--color-ink-2)}.hours-list{border:1px solid var(--color-line);padding:1rem;margin-top:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem}.contact-form__row{display:grid;gap:1rem}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid var(--color-line);background:#fffaf2;padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.he-footer{background:var(--color-ink);color:#fff;padding:2rem 0}.he-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}`;
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
.ps-contact{background:var(--color-primary);color:var(--color-on-primary)}.ps-contact p,.ps-contact h2{color:var(--color-on-primary)}.ps-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.ps-contact__grid{grid-template-columns:.9fr 1.1fr}}.contact-line{display:block;border-bottom:1px solid color-mix(in srgb,var(--color-on-primary) 28%,transparent);padding:.75rem 0}.contact-line strong{display:block;font-size:.75rem;text-transform:uppercase}.hours-list,.contact-form{background:#0b0b0c;color:#fff;padding:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem}.contact-form__row{display:grid;gap:1rem}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid #333;background:#111;color:#fff;padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.ps-footer{background:#0b0b0c;color:#fff;border-top:1px solid var(--color-line);padding:2rem 0}.ps-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}`;
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
.ef-contact{background:#fff}.ef-contact__grid{display:grid;gap:2rem}@media(min-width:900px){.ef-contact__grid{grid-template-columns:1fr 1fr}}.contact-line{display:block;border-bottom:1px solid var(--color-line);padding:.75rem 0}.contact-line strong{display:block;text-transform:uppercase;font-size:.75rem;color:var(--color-ink-2)}.hours-list{border:1px solid var(--color-line);padding:1rem;margin-top:1rem}.hours-row{display:flex;justify-content:space-between}.contact-form{display:grid;gap:1rem;border:1px solid var(--color-line);padding:1.25rem}.contact-form__row{display:grid;gap:1rem}@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}.contact-form__field{display:grid;gap:.4rem;font-weight:700}.contact-form input,.contact-form textarea{border:1px solid var(--color-line);padding:.8rem}.map-embed{margin-top:1rem;aspect-ratio:16/9;overflow:hidden}.map-embed iframe{width:100%;height:100%;border:0}.ef-footer{background:var(--color-ink);color:#fff;padding:2rem var(--pad)}.ef-footer__inner{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.social-links{display:flex;gap:.5rem}.social-links svg{width:16px;height:16px}`;
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
