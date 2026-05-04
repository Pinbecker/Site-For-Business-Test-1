import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { escapeHtml } from '@/engine/escape';
import { createRng } from '@/engine/random';
import { readableOn, tint } from '@/engine/color';
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
  id: 'luxury-minimal',
  name: 'Luxury Minimal',
  description:
    'Ultra-refined split-screen hero, extreme whitespace, and thin serif headlines. For premium brands, studios, and high-end services.',
  bestFor: ['hair-beauty', 'retail-shop', 'cafe-restaurant'],
  vibe: 'Refined · Spacious · Luxurious',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Cormorant Garamond", Georgia, serif',
      body: '"Jost", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap',
    },
    {
      head: '"Playfair Display", Georgia, serif',
      body: '"Raleway", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap',
    },
    {
      head: '"EB Garamond", Georgia, serif',
      body: '"Montserrat", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap',
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

  return `/* === Template 10: Luxury Minimal ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-bg:#faf9f6;
  --color-surface:#f2efe9;
  --color-ink:#17140f;
  --color-ink-2:#504b42;
  --color-mute:#9a9186;
  --color-line:#ddd9d1;
  --max:1320px;
  --pad:clamp(1.5rem,4vw,3rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};font-weight:300;background:var(--color-bg);color:var(--color-ink);line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:${f.head};font-weight:400;line-height:1.08;letter-spacing:-.01em}
h1{font-size:clamp(3rem,7vw,6.5rem)}
h2{font-size:clamp(2rem,4vw,3.75rem)}
h3{font-size:1.5rem}
section{padding-block:clamp(4rem,9vw,7rem)}
.cta--primary{background:var(--color-ink);color:#fff;border-radius:0;letter-spacing:.1em;text-transform:uppercase;font-size:.75rem;font-weight:500;padding:.9rem 1.75rem}
.cta--primary:hover{background:var(--color-primary)}
.cta--ghost{background:transparent;color:var(--color-ink);border:1px solid var(--color-ink);border-radius:0;letter-spacing:.1em;text-transform:uppercase;font-size:.75rem;font-weight:500;padding:.9rem 1.75rem}
.cta--ghost:hover{background:var(--color-ink);color:#fff}
/* --- Header --- */
.site-header{position:sticky;top:0;z-index:50;background:rgba(250,249,246,.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--color-line)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:72px;gap:1rem}
.brand-mark{font-family:${f.head};font-weight:400;font-size:1.125rem;letter-spacing:.04em}
.brand-mark img{max-height:36px;width:auto}
[data-nav]{display:none;position:fixed;inset:72px 0 0 0;background:var(--color-bg);padding:2.5rem var(--pad);transform:translateX(100%);transition:transform .3s ease;border-left:1px solid var(--color-line);visibility:hidden;pointer-events:none}
[data-nav][data-open="true"]{display:block;transform:none;visibility:visible;pointer-events:auto}
[data-nav] ul{display:flex;flex-direction:column;gap:1.75rem}
@media(min-width:880px){
  [data-nav]{display:block;position:static;transform:none;padding:0;background:transparent;border:0;visibility:visible;pointer-events:auto}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2.5rem}
}
[data-nav] a{font-size:.8125rem;letter-spacing:.14em;text-transform:uppercase;font-weight:500;color:var(--color-mute);transition:color .15s}
[data-nav] a:hover{color:var(--color-ink)}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex}}
/* --- Hero --- */
.hero{min-height:100svh;display:grid;grid-template-columns:1fr;padding-top:0}
@media(min-width:880px){.hero{grid-template-columns:1fr 1fr}}
.hero__image-panel{aspect-ratio:3/4;overflow:hidden;background:var(--color-surface);position:relative}
@media(min-width:880px){.hero__image-panel{aspect-ratio:auto;min-height:100svh;top:0;position:sticky}}
.hero__image-panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero__placeholder{position:absolute;inset:0;background:linear-gradient(160deg,var(--color-surface) 0%,${tint(primary, 0.85)} 100%)}
.hero__text-panel{display:flex;flex-direction:column;justify-content:center;padding:clamp(3rem,7vw,6rem) var(--pad)}
.hero__rule{width:56px;height:1px;background:var(--color-ink);margin-bottom:2.5rem}
.hero__eyebrow{font-size:.75rem;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mute);margin-bottom:2rem;display:block}
.hero__title{margin-bottom:2rem}
.hero__title em{font-style:italic;color:var(--color-primary)}
.hero__sub{font-size:1.0625rem;color:var(--color-ink-2);line-height:1.8;max-width:36em;margin-bottom:3rem}
.hero__ctas{display:flex;flex-wrap:wrap;gap:1rem}
/* --- About --- */
.about{background:var(--color-surface)}
.about__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.about__grid{grid-template-columns:1fr 1.6fr;gap:5rem;align-items:center}}
.about__pull{font-family:${f.head};font-style:italic;font-size:clamp(1.75rem,3vw,2.5rem);line-height:1.3;color:var(--color-primary);max-width:18ch;border-left:1px solid currentColor;padding-left:1.5rem}
.about__lead{font-size:1.0625rem;color:var(--color-ink-2);line-height:1.82;white-space:pre-wrap;margin-bottom:2.5rem}
.about__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding-top:2rem;border-top:1px solid var(--color-line)}
.about__stat strong{display:block;font-family:${f.head};font-size:2.25rem;color:var(--color-ink)}
.about__stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;color:var(--color-mute);margin-top:.25rem;display:block}
/* --- Services --- */
.services h2{margin-bottom:1rem}
.services__sub{color:var(--color-ink-2);line-height:1.75;max-width:46ch;margin-bottom:3.5rem}
.services__list{display:flex;flex-direction:column}
.service{display:grid;grid-template-columns:3rem 1fr;align-items:baseline;gap:1rem 2.5rem;padding:1.75rem 0;border-bottom:1px solid var(--color-line)}
.service:first-child{border-top:1px solid var(--color-line)}
@media(min-width:720px){.service{grid-template-columns:3rem 1fr auto}}
.service__num{font-family:${f.head};font-style:italic;font-size:1.25rem;color:var(--color-mute);text-align:right}
.service__name{font-size:1.25rem;font-weight:500;color:var(--color-ink);margin-bottom:.3rem}
.service__desc{font-size:.9375rem;color:var(--color-ink-2);line-height:1.68;font-weight:300}
.service__price{font-family:${f.head};font-style:italic;color:var(--color-primary);font-size:1.25rem;white-space:nowrap}
@media(max-width:720px){.service__price{grid-column:2;margin-top:-.5rem}}
/* --- Gallery --- */
.gallery{background:var(--color-surface)}
.gallery h2{margin-bottom:.75rem}
.gallery__sub{color:var(--color-ink-2);margin-bottom:2.5rem}
.gallery__grid{display:grid;gap:clamp(.75rem,2vw,1.25rem);grid-template-columns:1fr 1fr}
@media(min-width:880px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
.gallery__item{aspect-ratio:3/4;overflow:hidden;background:var(--color-line)}
.gallery__item:nth-child(3n+1){aspect-ratio:1/1}
.gallery__item img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;cursor:zoom-in}
.gallery__item:hover img{transform:scale(1.04)}
/* --- Testimonials --- */
.testimonials h2{text-align:center;margin-bottom:3rem}
.testimonials__grid{display:grid;gap:2rem;grid-template-columns:1fr;max-width:58rem;margin:0 auto}
@media(min-width:880px){.testimonials__grid{grid-template-columns:1fr 1fr}}
.testimonial{text-align:center;padding:2.5rem;border:1px solid var(--color-line)}
.testimonial__quote{font-family:${f.head};font-style:italic;font-size:1.375rem;line-height:1.55;color:var(--color-ink)}
.testimonial__quote::before{content:"\\201C"}
.testimonial__quote::after{content:"\\201D"}
.testimonial__name{margin-top:1.5rem;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute)}
/* --- Contact --- */
.contact{background:var(--color-surface)}
.contact h2{margin-bottom:.75rem}
.contact__sub{color:var(--color-ink-2);margin-bottom:2.5rem;line-height:1.75}
.contact__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr;gap:5rem;align-items:start}}
.contact-line{display:flex;flex-direction:column;gap:.3rem;padding:.85rem 0;border-bottom:1px solid var(--color-line)}
.contact-line strong{font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;color:var(--color-mute)}
.contact-line span,.contact-line a{color:var(--color-ink-2)}
.hours-list{margin-top:1.5rem;border:1px solid var(--color-line);padding:1rem 1.25rem;background:var(--color-bg)}
.hours-row{display:flex;justify-content:space-between;padding:.45rem 0;font-size:.9375rem;color:var(--color-ink-2)}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.contact-form{display:flex;flex-direction:column;gap:1rem;border:1px solid var(--color-line);padding:2rem;background:var(--color-bg)}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--color-mute);font-weight:500}
.contact-form__field input,.contact-form__field textarea{font-family:${f.body};color:var(--color-ink);border:1px solid var(--color-line);border-radius:0;padding:.75rem;background:var(--color-bg);font-size:.9375rem;font-weight:300;transition:border-color .15s}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-ink)}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--color-line)}
.map-embed iframe{width:100%;height:100%;border:0}
/* --- Footer --- */
.site-footer{background:var(--color-ink);color:rgba(255,255,255,.6);padding:4rem 0 2rem}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:640px){.site-footer__inner{grid-template-columns:2fr 1fr 1fr}}
.site-footer h3{font-family:${f.head};font-weight:400;font-style:italic;font-size:1rem;color:rgba(255,255,255,.45);margin-bottom:1rem}
.site-footer a:hover{color:#fff}
.site-footer__bottom{margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8125rem}
.social-links{display:flex;gap:.75rem;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.6);border-radius:0;transition:border-color .15s,color .15s}
.social-links a:hover{border-color:rgba(255,255,255,.6);color:#fff}
.social-links svg{width:16px;height:16px}`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const yearsBadge = `${rng.int(12) + 8}+`;
  const eyebrow = [project.seo.cityRegion, 'Est. ' + (new Date().getFullYear() - rng.int(20) - 5)]
    .filter(Boolean)
    .join(' · ');

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
            ${testimonials.length ? '<li><a href="#testimonials">Praise</a></li>' : ''}
            <li><a href="#contact">Enquire</a></li>
          </ul>
        </nav>
        <a href="#contact" class="cta cta--primary header-cta">Enquire</a>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__image-panel" aria-hidden="${heroImage ? 'false' : 'true'}">
          ${heroImage ? imgTag(heroImage, { loading: 'eager' }) : '<div class="hero__placeholder"></div>'}
        </div>
        <div class="hero__text-panel" data-reveal>
          <div class="hero__rule" aria-hidden="true"></div>
          ${eyebrow ? `<span class="hero__eyebrow">${escapeHtml(eyebrow)}</span>` : ''}
          <h1 id="hero-title" class="hero__title">${escapeHtml(project.business.name)}</h1>
          <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
          <div class="hero__ctas">
            <a href="#contact" class="cta cta--primary">Enquire now</a>
            <a href="#services" class="cta cta--ghost">Our services</a>
          </div>
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div data-reveal>
            <p class="about__pull">${escapeHtml(project.business.tagline)}</p>
          </div>
          <div data-reveal>
            <h2 id="about-title">Our story</h2>
            <p class="about__lead" style="margin-top:1.25rem">${escapeHtml(project.content.about)}</p>
            <div class="about__stats">
              <div class="about__stat"><strong>${escapeHtml(yearsBadge)}</strong><span>Years</span></div>
              <div class="about__stat"><strong>5★</strong><span>Rating</span></div>
              <div class="about__stat"><strong>Free</strong><span>Consultation</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <h2 id="services-title" data-reveal>Services</h2>
          <p class="services__sub" data-reveal>A curated selection of services, each delivered with exacting attention to detail.</p>
          <div class="services__list" data-reveal>
${services
  .map(
    (s, i) => `            <article class="service">
              <span class="service__num">${String(i + 1).padStart(2, '0')}</span>
              <div class="service__body">
                <h3 class="service__name">${escapeHtml(s.name)}</h3>
                <p class="service__desc">${escapeHtml(s.description)}</p>
              </div>
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
          <h2 id="gallery-title" data-reveal>Gallery</h2>
          <p class="gallery__sub" data-reveal>A selection of our recent work.</p>
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
          <h2 id="testimonials-title" data-reveal>What they say</h2>
          <div class="testimonials__grid">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <p class="testimonial__quote">${escapeHtml(t.quote)}</p>
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
        <div class="container">
          <h2 id="contact-title" data-reveal>Get in touch</h2>
          <p class="contact__sub" data-reveal>We welcome all enquiries. Expect a personal response within one business day.</p>
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
          <p style="color:rgba(255,255,255,.5);max-width:30em;font-size:.9375rem;margin-top:.5rem;font-weight:300">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Navigate</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Gallery</a></li>' : ''}
            <li><a href="#contact">Enquire</a></li>
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
        <span>${escapeHtml(project.seo.cityRegion || '')}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_10: TemplateModule = { meta: META, css, body };
