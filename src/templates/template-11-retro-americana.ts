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
} from './shared';

const META: TemplateMeta = {
  id: 'retro-americana',
  name: 'Retro Americana',
  description:
    'Warm parchment tones, vintage serif type, and ornamental details. For cafés, shops, and local businesses with character and history.',
  bestFor: ['cafe-restaurant', 'retail-shop', 'trades-contractor'],
  vibe: 'Warm · Nostalgic · Handcrafted',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Playfair Display", Georgia, serif',
      body: '"Lora", Georgia, serif',
      url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    },
    {
      head: '"Libre Baskerville", Georgia, serif',
      body: '"Merriweather", Georgia, serif',
      url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap',
    },
    {
      head: '"Spectral", Georgia, serif',
      body: '"Crimson+Pro", Georgia, serif',
      url: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,700;0,800;1,400;1,700&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    },
  ];
  return rng.pick(pairs);
}

function romanNumeral(n: number): string {
  const map: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  let num = n;
  for (const [val, sym] of map) {
    while (num >= val) { result += sym; num -= val; }
  }
  return result;
}

function css(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const f = fontPair(rng);
  const primary = project.brand.primaryColor;
  const secondary = project.brand.secondaryColor;
  const onPrimary = readableOn(primary);
  const onSecondary = readableOn(secondary);

  return `/* === Template 11: Retro Americana ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-on-secondary:${onSecondary};
  --color-accent:${primary};
  --color-bg:#f7ede0;
  --color-surface:#efe4cf;
  --color-ink:#231b0e;
  --color-ink-2:#5c4a30;
  --color-mute:#8c7658;
  --color-line:#d6c8b0;
  --max:1160px;
  --pad:clamp(1.25rem,3vw,2.5rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-bg);color:var(--color-ink);line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:${f.head};line-height:1.12;letter-spacing:-.01em}
h1{font-size:clamp(2.25rem,5.5vw,4.5rem);font-weight:700}
h2{font-size:clamp(1.75rem,3.5vw,3rem);font-weight:700}
h3{font-size:1.25rem;font-weight:700}
section{padding-block:clamp(3.5rem,7vw,5.5rem)}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:2px;font-family:${f.head};letter-spacing:.04em;box-shadow:3px 3px 0 ${shade(primary, 0.3)}}
.cta--primary:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 ${shade(primary, 0.3)}}
.cta--ghost{background:transparent;color:var(--color-ink);border:1.5px solid var(--color-ink);border-radius:2px;font-family:${f.head};letter-spacing:.04em}
.cta--ghost:hover{background:var(--color-ink);color:var(--color-bg)}
/* --- Header --- */
.site-header{position:sticky;top:0;z-index:50;background:var(--color-ink);border-bottom:3px solid var(--color-primary)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:72px;gap:1rem}
.brand-mark{font-family:${f.head};font-weight:700;font-size:1.125rem;color:#fff;letter-spacing:.02em}
.brand-mark img{max-height:36px;width:auto;filter:brightness(0) invert(1)}
[data-nav]{display:none;position:fixed;inset:72px 0 0 0;background:var(--color-ink);padding:2rem var(--pad);transform:translateY(-100%);transition:transform .25s ease;border-bottom:2px solid var(--color-primary);visibility:hidden;pointer-events:none}
[data-nav][data-open="true"]{display:block;transform:none;visibility:visible;pointer-events:auto}
[data-nav] ul{display:flex;flex-direction:column;gap:1.25rem;font-family:${f.head};font-size:1.25rem}
@media(min-width:880px){
  [data-nav]{display:block;position:static;transform:none;padding:0;background:transparent;border:0;visibility:visible;pointer-events:auto}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2rem;font-size:.9375rem}
}
[data-nav] a{color:rgba(255,255,255,.75);transition:color .15s}
[data-nav] a:hover{color:${tint(primary, 0.5)}}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex}}
/* --- Hero --- */
.hero{background:var(--color-bg);text-align:center;padding-block:clamp(3rem,8vw,6rem);border-bottom:2px solid var(--color-line)}
.hero__inner{max-width:680px;margin:0 auto}
.hero__badge-ring{width:clamp(90px,14vw,130px);height:clamp(90px,14vw,130px);border:1.5px solid var(--color-mute);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.75rem;position:relative}
.hero__badge-ring::before{content:"";position:absolute;inset:7px;border:1px dashed var(--color-mute);border-radius:50%;opacity:.5}
.hero__est{font-family:${f.body};font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mute)}
.hero__eyebrow{display:block;font-family:${f.body};font-size:.75rem;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mute);margin-bottom:1.25rem}
.hero__title{margin-bottom:1rem}
.hero__ornament{font-size:1.25rem;color:var(--color-primary);margin:1rem 0;letter-spacing:.5em}
.hero__sub{font-size:1.125rem;color:var(--color-ink-2);line-height:1.75;max-width:38em;margin:0 auto 2rem}
.hero__ctas{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center}
.hero__media{margin-top:3rem;aspect-ratio:16/7;overflow:hidden;position:relative;border:2px solid var(--color-line)}
.hero__media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
/* --- About --- */
.about{background:var(--color-surface);border-top:2px solid var(--color-line);border-bottom:2px solid var(--color-line)}
.about__inner{text-align:center;max-width:800px;margin:0 auto}
.about__ornament{font-size:1rem;color:var(--color-primary);letter-spacing:.5em;margin-bottom:1.5rem}
.about__lead{font-size:1.125rem;color:var(--color-ink-2);line-height:1.8;white-space:pre-wrap;margin-top:1.25rem}
.about__stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:2.5rem}
@media(min-width:640px){.about__stats{grid-template-columns:repeat(4,1fr)}}
.about__stat{background:var(--color-bg);border:1.5px solid var(--color-line);padding:1.25rem 1rem;text-align:center;box-shadow:2px 2px 0 var(--color-line)}
.about__stat strong{display:block;font-family:${f.head};font-size:1.75rem;color:var(--color-primary)}
.about__stat span{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--color-mute);display:block;margin-top:.25rem}
/* --- Services --- */
.services__intro{text-align:center;margin-bottom:3rem}
.services__ornament{font-size:1rem;color:var(--color-primary);letter-spacing:.5em;margin-bottom:1rem;display:block}
.services h2{margin-bottom:.75rem}
.services__sub{color:var(--color-ink-2);max-width:46ch;margin:0 auto;line-height:1.75}
.services__grid{display:grid;gap:1.25rem;grid-template-columns:1fr}
@media(min-width:640px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.services__grid{grid-template-columns:repeat(3,1fr)}}
.service{background:var(--color-bg);border:1.5px solid var(--color-line);padding:1.75rem 1.5rem;box-shadow:3px 3px 0 var(--color-line);transition:transform .18s,box-shadow .18s}
.service:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--color-line)}
.service__num{font-family:${f.head};font-size:1.5rem;color:${tint(primary, 0.5)};display:block;margin-bottom:.75rem;font-style:italic}
.service__name{font-size:1.125rem;margin-bottom:.5rem}
.service__desc{font-size:.9375rem;color:var(--color-ink-2);line-height:1.68}
.service__price{margin-top:1rem;font-family:${f.head};font-style:italic;color:var(--color-primary);font-size:1.125rem}
/* --- Gallery --- */
.gallery{background:var(--color-ink);border-top:3px solid var(--color-primary)}
.gallery h2{color:var(--color-bg);margin-bottom:.75rem}
.gallery__sub{color:rgba(247,237,224,.6);margin-bottom:2rem}
.gallery__grid{display:grid;gap:.75rem;grid-template-columns:repeat(2,1fr)}
@media(min-width:640px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.gallery__grid{grid-template-columns:repeat(4,1fr)}}
.gallery__item{aspect-ratio:1/1;overflow:hidden;border:1px solid rgba(255,255,255,.08);position:relative}
.gallery__item::after{content:"";position:absolute;inset:0;background:${primary};opacity:0;mix-blend-mode:multiply;transition:opacity .25s;pointer-events:none}
.gallery__item:hover::after{opacity:.35}
.gallery__item img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease;cursor:zoom-in;filter:sepia(.12)}
.gallery__item:hover img{transform:scale(1.06);filter:sepia(0)}
/* --- Testimonials --- */
.testimonials{background:var(--color-surface);border-top:2px solid var(--color-line);border-bottom:2px solid var(--color-line)}
.testimonials__head{text-align:center;margin-bottom:2.5rem}
.testimonials__ornament{font-size:1rem;color:var(--color-primary);letter-spacing:.5em;display:block;margin-bottom:1rem}
.testimonials h2{display:inline}
.testimonials__grid{display:grid;gap:1.25rem;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{background:var(--color-bg);border:1.5px solid var(--color-line);padding:1.75rem;box-shadow:3px 3px 0 var(--color-line);position:relative}
.testimonial__stars{color:${primary};font-size:1rem;letter-spacing:.2em;margin-bottom:1rem;display:block}
.testimonial__quote{font-style:italic;font-size:1.0625rem;color:var(--color-ink-2);line-height:1.72}
.testimonial__quote::before{content:"\\201C";font-family:${f.head};font-size:3rem;color:${tint(primary, 0.6)};line-height:0;vertical-align:-.35em;margin-right:.2rem}
.testimonial__name{margin-top:1rem;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--color-mute);font-weight:600}
/* --- Contact --- */
.contact{background:var(--color-bg)}
.contact__head{text-align:center;margin-bottom:2.5rem}
.contact h2{margin-bottom:.5rem}
.contact__sub{color:var(--color-ink-2);line-height:1.75}
.contact__grid{display:grid;gap:2.5rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr;gap:4rem}}
.contact-line{display:flex;flex-direction:column;gap:.3rem;padding:.75rem 0;border-bottom:1.5px solid var(--color-line)}
.contact-line strong{font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;color:var(--color-mute)}
.contact-line span,.contact-line a{color:var(--color-ink-2)}
.hours-list{margin-top:1.5rem;background:var(--color-surface);border:1.5px solid var(--color-line);padding:1rem 1.25rem;box-shadow:2px 2px 0 var(--color-line)}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.9375rem;color:var(--color-ink-2)}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.contact-form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface);border:1.5px solid var(--color-line);padding:1.75rem;box-shadow:3px 3px 0 var(--color-line)}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--color-mute);font-weight:600}
.contact-form__field input,.contact-form__field textarea{font-family:${f.body};color:var(--color-ink);border:1.5px solid var(--color-line);border-radius:2px;padding:.75rem .875rem;background:var(--color-bg);font-size:.9375rem;letter-spacing:normal;text-transform:none;transition:border-color .15s}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary)}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:1.5px solid var(--color-line)}
.map-embed iframe{width:100%;height:100%;border:0;filter:sepia(.2)}
/* --- Footer --- */
.site-footer{background:var(--color-ink);color:rgba(247,237,224,.6);padding:3.5rem 0 2rem;border-top:3px solid var(--color-primary)}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:640px){.site-footer__inner{grid-template-columns:2fr 1fr 1fr}}
.site-footer h3{font-family:${f.head};font-size:.875rem;color:rgba(247,237,224,.5);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.75rem}
.site-footer a:hover{color:${tint(primary, 0.5)}}
.site-footer__bottom{margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8125rem}
.social-links{display:flex;gap:.5rem;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border:1px solid rgba(255,255,255,.14);color:rgba(247,237,224,.6);border-radius:2px;transition:border-color .15s,color .15s}
.social-links a:hover{border-color:${tint(primary, 0.4)};color:${tint(primary, 0.4)}}
.social-links svg{width:16px;height:16px}`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const estYear = new Date().getFullYear() - rng.int(20) - 6;
  const yearsBadge = `${rng.int(15) + 8}+`;
  const city = project.seo.cityRegion || '';

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Gallery</a></li>' : ''}
            ${testimonials.length ? '<li><a href="#testimonials">Reviews</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a href="#contact" class="cta cta--primary header-cta">Contact us</a>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__inner">
          <div class="hero__badge-ring" aria-hidden="true">
            <span class="hero__est">Est. ${estYear}</span>
          </div>
          ${city ? `<span class="hero__eyebrow">${escapeHtml(city)}</span>` : ''}
          <h1 id="hero-title" class="hero__title">${escapeHtml(project.business.name)}</h1>
          <p class="hero__ornament" aria-hidden="true">— ✦ —</p>
          <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
          <div class="hero__ctas">
            <a href="#contact" class="cta cta--primary">Get in touch</a>
            <a href="#services" class="cta cta--ghost">Our services</a>
          </div>
          ${
            heroImage
              ? `<div class="hero__media" data-reveal>
            ${imgTag(heroImage, { loading: 'eager' })}
          </div>`
              : ''
          }
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__inner" data-reveal>
          <p class="about__ornament" aria-hidden="true">✦</p>
          <h2 id="about-title">About ${escapeHtml(project.business.name)}</h2>
          <p class="about__lead">${escapeHtml(project.content.about)}</p>
          <div class="about__stats">
            <div class="about__stat"><strong>${escapeHtml(yearsBadge)}</strong><span>Years serving</span></div>
            <div class="about__stat"><strong>5★</strong><span>Rated</span></div>
            <div class="about__stat"><strong>100%</strong><span>Local & trusted</span></div>
            <div class="about__stat"><strong>Free</strong><span>Quotes</span></div>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="services__intro" data-reveal>
            <span class="services__ornament" aria-hidden="true">✦</span>
            <h2 id="services-title">What we offer</h2>
            <p class="services__sub">Time-honoured craft, honestly priced. Every service delivered with care.</p>
          </div>
          <div class="services__grid">
${services
  .map(
    (s, i) => `            <article class="service" data-reveal>
              <span class="service__num">${romanNumeral(i + 1)}</span>
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
          <h2 id="gallery-title">Our work</h2>
          <p class="gallery__sub">A window into what we do — and how we do it.</p>
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
          <div class="testimonials__head" data-reveal>
            <span class="testimonials__ornament" aria-hidden="true">✦</span>
            <h2 id="testimonials-title">What folks say</h2>
          </div>
          <div class="testimonials__grid">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <span class="testimonial__stars" aria-label="5 stars">★★★★★</span>
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
        <div class="container">
          <div class="contact__head" data-reveal>
            <h2 id="contact-title">Come say hello</h2>
            <p class="contact__sub">We'd love to hear from you. Reach out and we'll get back to you promptly.</p>
          </div>
          <div class="contact__grid">
            <div data-reveal>
              ${contactBlock(project)}
              ${hoursList(project)}
              ${mapEmbed(project)}
            </div>
            <div data-reveal>
              ${netlifyFormFields(project)}
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER ============================================================== -->
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div>
          <h3>${escapeHtml(project.business.name)}</h3>
          <p style="color:rgba(247,237,224,.55);max-width:28em;font-size:.9375rem;margin-top:.5rem">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Explore</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Gallery</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Find us</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem">
            ${project.business.address ? `<li>${escapeHtml(project.business.address)}</li>` : ''}
            ${project.business.phone ? `<li>${escapeHtml(project.business.phone)}</li>` : ''}
            ${project.business.email ? `<li>${escapeHtml(project.business.email)}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}. All rights reserved.</span>
        <span>${escapeHtml(city)}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_11: TemplateModule = { meta: META, css, body };
