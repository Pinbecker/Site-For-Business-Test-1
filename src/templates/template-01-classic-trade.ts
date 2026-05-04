import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { escapeHtml } from '@/engine/escape';
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
  professionalOverhaulCss,
} from './shared';

const META: TemplateMeta = {
  id: 'classic-trade',
  name: 'Classic Trade',
  description:
    'Sturdy, trustworthy two-column hero with a stacked services grid. Built for trades, contractors, and professional services.',
  bestFor: ['trades-contractor', 'professional-services'],
  vibe: 'Sturdy · Trustworthy · No-nonsense',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    { head: '"DM Serif Display", Georgia, serif', body: 'Inter, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap' },
    { head: 'Manrope, system-ui, sans-serif', body: 'Manrope, system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;800&display=swap' },
    { head: '"Plus Jakarta Sans", system-ui, sans-serif', body: '"Plus Jakarta Sans", system-ui, sans-serif', url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;800&display=swap' },
  ];
  return rng.pick(pairs);
}

function css(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const f = fontPair(rng);
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  const accentPattern = rng.pick(['solid', 'edge', 'block'] as const);
  return `/* === Template 01: Classic Trade ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-ink:#0e1116;
  --color-ink-2:#3a4250;
  --color-mute:#6b7585;
  --color-line:#e6e8ee;
  --color-bg:#ffffff;
  --color-soft:${tint(primary, 0.94)};
  --max:1200px;
  --pad:clamp(1.25rem,3vw,2.5rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};color:var(--color-ink);background:var(--color-bg);line-height:1.55;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:${f.head};line-height:1.15;letter-spacing:-.01em;color:var(--color-ink)}
h1{font-size:clamp(2.25rem,5vw,3.75rem);font-weight:700}
h2{font-size:clamp(1.5rem,3vw,2.25rem);font-weight:700}
h3{font-size:1.125rem;font-weight:700}
.container{max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
section{padding-block:clamp(3rem,7vw,5.5rem)}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);box-shadow:0 6px 20px ${tint(primary, 0.6)}}
.cta--primary:hover{background:${shade(primary, 0.1)}}
.cta--ghost{background:transparent;color:var(--color-ink);border:1.5px solid var(--color-ink)}
.cta--ghost:hover{background:var(--color-ink);color:#fff}
/* --- Header --- */
.site-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--color-line)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:72px;gap:1rem}
.brand-mark{font-family:${f.head};font-weight:700;font-size:1.125rem;letter-spacing:-.01em}
.brand-mark img{max-height:36px;width:auto}
[data-nav]{position:fixed;inset:72px 0 0 0;background:#fff;padding:1.5rem var(--pad);transform:translateY(-100%);transition:transform .25s ease;border-bottom:1px solid var(--color-line)}
[data-nav][data-open="true"]{transform:none}
[data-nav] ul{display:flex;flex-direction:column;gap:1.25rem;font-size:1.25rem;font-weight:600}
@media(min-width:880px){
  [data-nav]{position:static;transform:none;padding:0;background:transparent;border:0}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2rem;font-size:.95rem;font-weight:500}
}
[data-nav] a{padding:.5rem 0}
[data-nav] a:hover{color:var(--color-primary)}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex}}
/* --- Hero --- */
.hero{position:relative;padding-block:clamp(2.5rem,6vw,5rem);overflow:hidden}
.hero__inner{display:grid;gap:clamp(1.5rem,3vw,3rem);grid-template-columns:1fr;align-items:center}
@media(min-width:880px){.hero__inner{grid-template-columns:1.05fr .95fr}}
.hero__eyebrow{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .75rem;border-radius:999px;background:var(--color-soft);color:${shade(primary, 0.2)};font-size:.8125rem;font-weight:600;margin-bottom:1.25rem}
.hero__eyebrow::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--color-primary)}
.hero__title{margin-bottom:1rem}
.hero__sub{font-size:clamp(1.05rem,1.5vw,1.25rem);color:var(--color-ink-2);max-width:32em;margin-bottom:2rem}
.hero__ctas{display:flex;flex-wrap:wrap;gap:.75rem}
.hero__media{position:relative;aspect-ratio:4/5;border-radius:18px;overflow:hidden;background:var(--color-soft)}
.hero__media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero__badge{position:absolute;${accentPattern === 'edge' ? 'right:-1rem;bottom:2rem' : accentPattern === 'block' ? 'left:1rem;bottom:1rem' : 'right:1rem;top:1rem'};background:var(--color-secondary);color:${readableOn(secondary)};padding:.85rem 1rem;border-radius:12px;font-weight:700;font-size:.875rem;box-shadow:0 12px 30px rgba(15,17,26,.18)}
/* --- About --- */
.about{background:var(--color-soft)}
.about__grid{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:880px){.about__grid{grid-template-columns:1fr 1fr;gap:4rem;align-items:center}}
.about__lead{font-size:1.125rem;color:var(--color-ink-2);white-space:pre-wrap}
.about__stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
.about__stat{background:#fff;border-radius:14px;padding:1.25rem;border:1px solid var(--color-line)}
.about__stat strong{display:block;font-family:${f.head};font-size:1.75rem;color:var(--color-primary)}
/* --- Services --- */
.services__head{display:grid;gap:1rem;grid-template-columns:1fr;margin-bottom:2.5rem}
@media(min-width:880px){.services__head{grid-template-columns:1.4fr 1fr;align-items:end;gap:3rem}}
.services__grid{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.services__grid{grid-template-columns:repeat(3,1fr)}}
.service{background:#fff;border:1px solid var(--color-line);border-radius:16px;padding:1.5rem;display:flex;flex-direction:column;gap:.5rem;transition:transform .2s ease,box-shadow .2s ease}
.service:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,17,26,.06)}
.service__num{font-family:${f.head};color:var(--color-primary);font-size:.875rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.service__name{font-size:1.25rem}
.service__desc{color:var(--color-ink-2)}
.service__price{margin-top:auto;padding-top:1rem;font-weight:700;color:var(--color-ink)}
/* --- Gallery --- */
.gallery{background:var(--color-ink);color:#fff}
.gallery h2{color:#fff}
.gallery__sub{color:rgba(255,255,255,.7);margin-bottom:2rem}
.gallery__grid{display:grid;gap:.75rem;grid-template-columns:repeat(2,1fr)}
@media(min-width:640px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.gallery__grid{grid-template-columns:repeat(4,1fr)}}
.gallery__item{aspect-ratio:1/1;overflow:hidden;border-radius:10px;background:#222}
.gallery__item img{width:100%;height:100%;object-fit:cover;cursor:zoom-in;transition:transform .4s ease}
.gallery__item:hover img{transform:scale(1.05)}
/* --- Testimonials --- */
.testimonials__grid{display:grid;gap:1.25rem;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{background:#fff;border:1px solid var(--color-line);border-radius:16px;padding:1.75rem;position:relative}
.testimonial::before{content:"\\201C";position:absolute;top:.5rem;left:1rem;font-size:5rem;font-family:${f.head};color:var(--color-primary);opacity:.18;line-height:1}
.testimonial__quote{font-size:1.0625rem;color:var(--color-ink-2);position:relative;z-index:1}
.testimonial__name{margin-top:1rem;font-weight:700;color:var(--color-ink)}
/* --- Contact --- */
.contact{background:var(--color-soft)}
.contact__grid{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr;gap:3rem}}
.contact-line{display:flex;flex-direction:column;padding:.75rem 0;border-bottom:1px solid var(--color-line)}
.contact-line strong{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--color-mute);margin-bottom:.25rem}
.hours-list{margin-top:1.5rem;background:#fff;border-radius:12px;padding:1rem 1.25rem;border:1px solid var(--color-line)}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.95rem}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.contact-form{display:flex;flex-direction:column;gap:1rem;background:#fff;border:1px solid var(--color-line);border-radius:18px;padding:1.5rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.875rem;color:var(--color-ink-2)}
.contact-form__field input,.contact-form__field textarea{font:inherit;color:var(--color-ink);border:1px solid var(--color-line);border-radius:8px;padding:.7rem .85rem;background:#fff;transition:border-color .15s ease,box-shadow .15s ease}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px ${tint(primary, 0.7)}}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;border-radius:12px;overflow:hidden;border:1px solid var(--color-line)}
.map-embed iframe{width:100%;height:100%;border:0}
/* --- Footer --- */
.site-footer{background:var(--color-ink);color:#fff;padding:3rem 0 1.5rem}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:640px){.site-footer__inner{grid-template-columns:repeat(3,1fr)}}
.site-footer h3{color:#fff;font-size:.875rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem}
.site-footer a:hover{color:${tint(primary, 0.5)}}
.site-footer__bottom{margin-top:2rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;color:rgba(255,255,255,.6);font-size:.875rem}
.social-links{display:flex;gap:.5rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border-radius:8px;background:rgba(255,255,255,.08);transition:background .15s ease}
.social-links a:hover{background:rgba(255,255,255,.18)}
.social-links svg{width:18px;height:18px}
${professionalOverhaulCss({ primary, secondary, head: f.head })}
`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const eyebrow = project.seo.cityRegion ? `${escapeHtml(project.seo.cityRegion)} · Local experts` : 'Local experts';
  const yearsBadge = `${rng.int(15) + 8}+ years`;

  // Subtle randomization: shuffle service display order on some seeds.
  const orderedServices = rng.bool(0.4) ? rng.shuffle(services) : services;

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Work</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a href="#contact" class="cta cta--primary header-cta">Get a quote</a>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__inner">
          <div class="hero__copy" data-reveal>
            <span class="hero__eyebrow">${eyebrow}</span>
            <h1 id="hero-title" class="hero__title">${escapeHtml(project.business.name)}</h1>
            <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="hero__ctas">
              <a href="#contact" class="cta cta--primary">Get a free quote</a>
              <a href="#services" class="cta cta--ghost">Our services</a>
            </div>
          </div>
          <div class="hero__media" data-reveal>
            ${heroImage ? imgTag(heroImage, { className: 'hero__img', loading: 'eager' }) : ''}
            <div class="hero__badge" aria-hidden="true">${escapeHtml(yearsBadge)} · trusted</div>
          </div>
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div data-reveal>
            <h2 id="about-title">About ${escapeHtml(project.business.name)}</h2>
            <p class="about__lead">${escapeHtml(project.content.about)}</p>
          </div>
          <div class="about__stats" data-reveal>
            <div class="about__stat"><strong>${escapeHtml(yearsBadge)}</strong><span>Experience</span></div>
            <div class="about__stat"><strong>5★</strong><span>Average rating</span></div>
            <div class="about__stat"><strong>100%</strong><span>Local & insured</span></div>
            <div class="about__stat"><strong>Free</strong><span>Quotes & callouts</span></div>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="services__head">
            <div data-reveal>
              <h2 id="services-title">What we do</h2>
            </div>
            <p class="services__sub" data-reveal>Honest pricing, dependable craftsmanship, and a straightforward process from first call to last detail.</p>
          </div>
          <div class="services__grid">
${orderedServices
  .map(
    (s, i) => `            <article class="service" data-reveal>
              <span class="service__num">No. ${String(i + 1).padStart(2, '0')}</span>
              <h3 class="service__name">${escapeHtml(s.name)}</h3>
              <p class="service__desc">${escapeHtml(s.description)}</p>
              ${s.price ? `<div class="service__price">${escapeHtml(s.price)}</div>` : ''}
            </article>`,
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
          <h2 id="gallery-title">Recent work</h2>
          <p class="gallery__sub">A glimpse at some of our most recent projects.</p>
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
          ? `<section class="testimonials" id="testimonials" aria-labelledby="testimonials-title">
        <div class="container">
          <h2 id="testimonials-title">What clients say</h2>
          <div class="testimonials__grid">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <p class="testimonial__quote">${escapeHtml(t.quote)}</p>
              <p class="testimonial__name">— ${escapeHtml(t.customerName)}</p>
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
          <div data-reveal>
            <h2 id="contact-title">Get in touch</h2>
            <p class="contact__sub">Tell us about your project and we’ll get back to you within one working day.</p>
            <div class="contact__details">
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
          <h3>${escapeHtml(project.business.name)}</h3>
          <p style="color:rgba(255,255,255,.7);max-width:28em">${escapeHtml(project.business.tagline)}</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;color:rgba(255,255,255,.85)">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Follow</h3>
          ${socialLinks(project) || '<p style="color:rgba(255,255,255,.6)">—</p>'}
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}. All rights reserved.</span>
        <span>${escapeHtml(project.seo.cityRegion || '')}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_01: TemplateModule = { meta: META, css, body };
