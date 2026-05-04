import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { escapeHtml } from '@/engine/escape';
import { createRng } from '@/engine/random';
import { readableOn, shade } from '@/engine/color';
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

const META: TemplateMeta = {
  id: 'studio-grid',
  name: 'Studio Grid',
  description:
    'Minimal Swiss grid with type-driven hero and a tight services list. Built for hair, beauty, and design-forward boutiques.',
  bestFor: ['hair-beauty', 'professional-services', 'retail-shop'],
  vibe: 'Minimal · Editorial · Type-driven',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Space Grotesk", system-ui, sans-serif',
      body: '"Space Grotesk", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
    {
      head: '"Archivo", system-ui, sans-serif',
      body: '"Archivo", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&display=swap',
    },
    {
      head: '"Bricolage Grotesque", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Inter:wght@400;500&display=swap',
    },
  ];
  return rng.pick(pairs);
}

function css(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const f = fontPair(rng);
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  // Two color treatments: invert (dark hero) or paper (light hero with primary accents).
  const treatment = rng.pick(['invert', 'paper'] as const);
  return `/* === Template 03: Studio Grid ============================== */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-paper:#f3f1ec;
  --color-ink:#0b0b0b;
  --color-ink-2:#3a3a3a;
  --color-mute:#7a7a7a;
  --color-line:#dddcd8;
  --max:1440px;
  --pad:clamp(1rem,3vw,2.5rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-paper);color:var(--color-ink);line-height:1.5}
h1,h2,h3{font-family:${f.head};letter-spacing:-.025em;line-height:.95;font-weight:700}
h1{font-size:clamp(3rem,12vw,9rem);font-weight:800}
h2{font-size:clamp(2rem,5.5vw,4rem)}
h3{font-size:1rem;font-weight:600;letter-spacing:.02em}
.container{max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
section{padding-block:clamp(3rem,7vw,6rem)}
.cta--primary{background:${treatment === 'invert' ? 'var(--color-primary)' : 'var(--color-ink)'};color:${treatment === 'invert' ? 'var(--color-on-primary)' : '#fff'};border-radius:0;padding:1rem 1.5rem;font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600}
.cta--primary:hover{background:${shade(primary, 0.15)};color:#fff}
.cta--ghost{background:transparent;color:inherit;border:1.5px solid currentColor;border-radius:0;font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600}
.eyebrow{display:inline-block;font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;color:var(--color-mute);font-weight:500}
.col-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:1rem;column-gap:clamp(1rem,2vw,2rem)}
/* --- Header --- */
.site-header{position:sticky;top:0;z-index:50;background:var(--color-paper);border-bottom:1px solid var(--color-line)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand-mark{font-family:${f.head};font-size:.95rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.brand-mark img{max-height:30px;width:auto}
[data-nav]{position:fixed;top:64px;left:0;right:0;background:var(--color-paper);padding:1.5rem var(--pad);transform:translateY(-110%);transition:transform .25s ease;border-bottom:1px solid var(--color-line)}
[data-nav][data-open="true"]{transform:none}
[data-nav] ul{display:flex;flex-direction:column;gap:1rem;font-size:.95rem;font-family:${f.head}}
@media(min-width:880px){
  [data-nav]{position:static;transform:none;padding:0;border:0}
  [data-nav] ul{flex-direction:row;gap:2rem;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
}
[data-nav] a{position:relative;padding:.5rem 0}
[data-nav] a:hover{color:var(--color-primary)}
/* --- Hero --- */
.hero{background:${treatment === 'invert' ? 'var(--color-ink)' : 'var(--color-paper)'};color:${treatment === 'invert' ? '#fff' : 'var(--color-ink)'};padding-block:clamp(3rem,8vw,6rem);position:relative;overflow:hidden}
.hero h1{margin-bottom:1.5rem}
.hero h1 mark{background:var(--color-primary);color:var(--color-on-primary);padding:0 .15em}
.hero__top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:clamp(2rem,4vw,3.5rem);font-size:.75rem;letter-spacing:.15em;text-transform:uppercase}
.hero__meta{display:grid;grid-template-columns:repeat(2,auto);gap:.4rem 2rem;color:${treatment === 'invert' ? 'rgba(255,255,255,.6)' : 'var(--color-mute)'}}
.hero__bottom{display:grid;grid-template-columns:1fr;gap:2rem;align-items:end;margin-top:2rem}
@media(min-width:880px){.hero__bottom{grid-template-columns:1.4fr 1fr;gap:3rem}}
.hero__sub{font-size:1.125rem;max-width:32em;color:${treatment === 'invert' ? 'rgba(255,255,255,.85)' : 'var(--color-ink-2)'}}
.hero__media{aspect-ratio:5/4;overflow:hidden;background:var(--color-line)}
.hero__media img{width:100%;height:100%;object-fit:cover;filter:${treatment === 'invert' ? 'grayscale(.1)' : 'none'}}
.hero__ctas{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}
/* --- Index strip --- */
.index-strip{border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line);background:var(--color-paper)}
.index-strip__inner{display:grid;grid-template-columns:repeat(2,1fr);gap:0;padding:0}
@media(min-width:768px){.index-strip__inner{grid-template-columns:repeat(4,1fr)}}
.index-strip__item{padding:1.5rem;border-right:1px solid var(--color-line);border-bottom:1px solid var(--color-line)}
.index-strip__item:last-child{border-right:0}
@media(min-width:768px){.index-strip__item{border-bottom:0}}
.index-strip__num{font-family:${f.head};font-size:2.5rem;font-weight:700;display:block;color:var(--color-primary)}
.index-strip__label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute);margin-top:.5rem;display:block}
/* --- About --- */
.about{background:var(--color-paper)}
.about__layout{display:grid;grid-template-columns:1fr;gap:2rem}
@media(min-width:880px){.about__layout{grid-template-columns:auto 1fr;gap:5rem}}
.about__num{font-family:${f.head};font-weight:700;font-size:clamp(4rem,10vw,8rem);color:var(--color-primary);line-height:.85;letter-spacing:-.05em}
.about__copy h2{margin-bottom:1.5rem}
.about__lead{font-size:1.125rem;color:var(--color-ink-2);max-width:42em;white-space:pre-wrap}
/* --- Services --- */
.services{background:var(--color-ink);color:#fff}
.services h2{color:#fff;margin-bottom:.5rem}
.services__intro{display:flex;flex-direction:column;gap:1rem;margin-bottom:3rem}
@media(min-width:880px){.services__intro{flex-direction:row;justify-content:space-between;align-items:flex-end}}
.services__intro p{color:rgba(255,255,255,.65);max-width:32em}
.service-row{display:grid;grid-template-columns:1fr;gap:.75rem;padding:1.5rem 0;border-top:1px solid rgba(255,255,255,.15);transition:padding .2s ease}
@media(min-width:768px){.service-row{grid-template-columns:80px 2fr 3fr 1fr;align-items:baseline;gap:2rem}}
.service-row:last-child{border-bottom:1px solid rgba(255,255,255,.15)}
.service-row:hover{padding-left:1rem}
.service-row__num{font-family:${f.head};color:var(--color-primary);font-size:.875rem;font-weight:600;letter-spacing:.1em}
.service-row__name{font-family:${f.head};font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
.service-row__desc{color:rgba(255,255,255,.7)}
.service-row__price{font-family:${f.head};font-weight:700;color:var(--color-primary);text-align:left}
@media(min-width:768px){.service-row__price{text-align:right}}
/* --- Gallery --- */
.gallery{background:var(--color-paper)}
.gallery__head{display:flex;flex-direction:column;gap:1rem;margin-bottom:2rem}
@media(min-width:880px){.gallery__head{flex-direction:row;justify-content:space-between;align-items:flex-end}}
.gallery__grid{display:grid;gap:1rem;grid-template-columns:repeat(2,1fr)}
@media(min-width:768px){.gallery__grid{grid-template-columns:repeat(6,1fr);grid-auto-rows:120px}}
.gallery__item{overflow:hidden;background:var(--color-line);aspect-ratio:1/1}
@media(min-width:768px){.gallery__item{aspect-ratio:auto;grid-column:span 2;grid-row:span 2}
.gallery__item:nth-child(4n+1){grid-column:span 3;grid-row:span 3}
.gallery__item:nth-child(5n+2){grid-column:span 2;grid-row:span 3}}
.gallery__item img{width:100%;height:100%;object-fit:cover;cursor:zoom-in;transition:transform .4s ease}
.gallery__item:hover img{transform:scale(1.04)}
/* --- Testimonials --- */
.testimonials{border-top:1px solid var(--color-line)}
.testimonials__grid{display:grid;gap:0;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(3,1fr);gap:0}}
.testimonial{padding:2rem 0;border-bottom:1px solid var(--color-line)}
@media(min-width:880px){.testimonial{padding:2rem;border-right:1px solid var(--color-line);border-bottom:0}.testimonial:last-child{border-right:0}}
.testimonial__quote{font-family:${f.head};font-size:1.25rem;font-weight:500;line-height:1.4;color:var(--color-ink)}
.testimonial__name{margin-top:1rem;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute)}
/* --- Contact --- */
.contact{background:var(--color-ink);color:#fff}
.contact h2{color:#fff}
.contact__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1.2fr;gap:4rem}}
.contact__lhs span.eyebrow{color:rgba(255,255,255,.5)}
.contact-line{display:block;padding:1rem 0;border-top:1px solid rgba(255,255,255,.15)}
.contact-line strong{display:block;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:.4rem}
.contact-line span{font-family:${f.head};font-size:1.25rem}
.hours-list{margin-top:2rem;border-top:1px solid rgba(255,255,255,.15)}
.hours-row{display:flex;justify-content:space-between;padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.1);font-size:.95rem}
.hours-row[data-open="false"] .hours-row__time{color:rgba(255,255,255,.4)}
.contact-form{display:flex;flex-direction:column;gap:1.25rem;background:#fff;color:var(--color-ink);padding:2rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute)}
.contact-form__field input,.contact-form__field textarea{font:400 1rem ${f.body};color:var(--color-ink);border:0;border-bottom:1.5px solid var(--color-line);background:transparent;padding:.5rem 0;border-radius:0;letter-spacing:normal;text-transform:none}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary)}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:1px solid rgba(255,255,255,.15)}
.map-embed iframe{width:100%;height:100%;border:0;filter:invert(.92) hue-rotate(180deg)}
/* --- Footer --- */
.site-footer{background:var(--color-paper);color:var(--color-ink);padding:3rem 0 1.5rem;border-top:1px solid var(--color-line)}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:768px){.site-footer__inner{grid-template-columns:repeat(4,1fr)}}
.site-footer h3{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute);margin-bottom:.75rem;font-weight:500}
.site-footer ul{display:flex;flex-direction:column;gap:.5rem;font-size:.95rem;font-family:${f.head}}
.site-footer__bottom{margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid var(--color-line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--color-mute)}
.social-links{display:flex;gap:.5rem;margin-top:.75rem}
.social-links a{display:grid;place-items:center;width:36px;height:36px;background:var(--color-ink);color:var(--color-paper)}
.social-links a:hover{background:var(--color-primary);color:var(--color-on-primary)}
.social-links svg{width:16px;height:16px}
`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const today = new Date();
  const date = today.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  // randomize highlight word in title
  const words = project.business.name.split(' ');
  const idx = words.length > 1 ? rng.int(words.length) : 0;
  const stylizedTitle = words
    .map((w, i) => (i === idx ? `<mark>${escapeHtml(w)}</mark>` : escapeHtml(w)))
    .join(' ');

  const orderedServices = rng.bool(0.5) ? rng.shuffle(services) : services;

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#about">Index 01</a></li>
            <li><a href="#services">Index 02</a></li>
            <li><a href="#gallery">Index 03</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="container">
          <div class="hero__top">
            <div class="hero__meta">
              <span>Index</span><span>${escapeHtml(project.seo.cityRegion || 'Studio')}</span>
              <span>Issue</span><span>${escapeHtml(date)}</span>
            </div>
            <span class="eyebrow">${escapeHtml(project.business.tagline)}</span>
          </div>
          <h1 id="hero-title">${stylizedTitle}</h1>
          <div class="hero__bottom" data-reveal>
            <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
            ${heroImage ? `<div class="hero__media">${imgTag(heroImage, { loading: 'eager' })}</div>` : ''}
          </div>
          <div class="hero__ctas">
            <a href="#contact" class="cta cta--primary">Book a session</a>
            <a href="#services" class="cta cta--ghost">Services</a>
          </div>
        </div>
      </section>

      <!-- INDEX STRIP ======================================================== -->
      <section class="index-strip" aria-label="At a glance">
        <div class="index-strip__inner">
          <div class="index-strip__item">
            <span class="index-strip__num">01</span>
            <span class="index-strip__label">About</span>
          </div>
          <div class="index-strip__item">
            <span class="index-strip__num">02</span>
            <span class="index-strip__label">Services</span>
          </div>
          <div class="index-strip__item">
            <span class="index-strip__num">03</span>
            <span class="index-strip__label">Gallery</span>
          </div>
          <div class="index-strip__item">
            <span class="index-strip__num">04</span>
            <span class="index-strip__label">Contact</span>
          </div>
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__layout">
          <div class="about__num" aria-hidden="true">01</div>
          <div class="about__copy" data-reveal>
            <span class="eyebrow">About</span>
            <h2 id="about-title">A studio with a point of view.</h2>
            <p class="about__lead">${escapeHtml(project.content.about)}</p>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="services__intro">
            <div>
              <span class="eyebrow" style="color:rgba(255,255,255,.5)">02 — Services</span>
              <h2 id="services-title">What's on offer.</h2>
            </div>
            <p>A focused list. Each one delivered with the same care, whether you booked it on a whim or planned it for months.</p>
          </div>
          <div role="list">
${orderedServices
  .map(
    (s, i) => `            <div class="service-row" role="listitem" data-reveal>
              <span class="service-row__num">${String(i + 1).padStart(2, '0')}</span>
              <h3 class="service-row__name">${escapeHtml(s.name)}</h3>
              <p class="service-row__desc">${escapeHtml(s.description)}</p>
              <span class="service-row__price">${escapeHtml(s.price || '—')}</span>
            </div>`,
  )
  .join('\n')}
          </div>
        </div>
      </section>

      <!-- GALLERY =========================================================== -->
      ${
        gallery.length
          ? `<section class="gallery" id="gallery" aria-labelledby="gallery-title">
        <div class="container">
          <div class="gallery__head">
            <div>
              <span class="eyebrow">03 — Gallery</span>
              <h2 id="gallery-title">Selected work.</h2>
            </div>
            <p style="color:var(--color-mute);max-width:24em">A small archive of recent projects, moments, and details.</p>
          </div>
          <div class="gallery__grid" data-lightbox>
${gallery.map((g) => `            <figure class="gallery__item">${imgTag(g)}</figure>`).join('\n')}
          </div>
        </div>
      </section>`
          : ''
      }

      <!-- TESTIMONIALS ====================================================== -->
      ${
        testimonials.length
          ? `<section class="testimonials" aria-labelledby="testimonials-title">
        <div class="container">
          <span class="eyebrow">04 — Words</span>
          <h2 id="testimonials-title" style="margin:.5rem 0 2rem">From clients.</h2>
          <div class="testimonials__grid">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <p class="testimonial__quote">"${escapeHtml(t.quote)}"</p>
              <p class="testimonial__name">${escapeHtml(t.customerName)}</p>
            </article>`,
  )
  .join('\n')}
          </div>
        </div>
      </section>`
          : ''
      }

      <!-- CONTACT =========================================================== -->
      <section class="contact" id="contact" aria-labelledby="contact-title">
        <div class="container contact__grid">
          <div class="contact__lhs" data-reveal>
            <span class="eyebrow">05 — Contact</span>
            <h2 id="contact-title" style="margin:.5rem 0 1.5rem">Say hello.</h2>
            <div>
              ${contactBlock(project)}
            </div>
            ${hoursList(project)}
            ${mapEmbed(project)}
          </div>
          <div data-reveal>
            ${netlifyFormFields(project)}
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER ============================================================== -->
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div>
          <h3>Studio</h3>
          <p style="font-family:${'inherit'};font-size:.95rem">${escapeHtml(project.business.name)}</p>
          <p style="font-size:.85rem;color:var(--color-mute);max-width:24em;margin-top:.5rem">${escapeHtml(project.business.tagline)}</p>
        </div>
        <div>
          <h3>Browse</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Visit</h3>
          <p style="font-size:.95rem;font-family:${'inherit'}">${escapeHtml(project.business.address)}</p>
          ${project.business.phone ? `<p style="font-size:.95rem;margin-top:.5rem">${escapeHtml(project.business.phone)}</p>` : ''}
        </div>
        <div>
          <h3>Follow</h3>
          ${socialLinks(project)}
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}</span>
        <span>${escapeHtml(project.seo.cityRegion || '')}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_03: TemplateModule = { meta: META, css, body };
