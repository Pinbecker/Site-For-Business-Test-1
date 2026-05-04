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
  id: 'brutalist-news',
  name: 'Brutalist News',
  description:
    'Raw newspaper grid, extreme contrast, thick borders, and oversized type. For bold brands that refuse to be ignored.',
  bestFor: ['trades-contractor', 'professional-services', 'other'],
  vibe: 'Raw · Loud · Unapologetic',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Epilogue", system-ui, sans-serif',
      body: '"Epilogue", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,700;0,800;0,900;1,400;1,800&display=swap',
    },
    {
      head: '"Barlow Condensed", system-ui, sans-serif',
      body: '"Barlow", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,800;0,900;1,700&family=Barlow:wght@400;500;600;700&display=swap',
    },
    {
      head: '"Space Grotesk", system-ui, sans-serif',
      body: '"Space Grotesk", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
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

  return `/* === Template 12: Brutalist News ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-bg:#ffffff;
  --color-surface:#f5f5f5;
  --color-ink:#000000;
  --color-ink-2:#222222;
  --color-mute:#555555;
  --color-line:#000000;
  --max:1300px;
  --pad:clamp(1rem,3vw,2.5rem);
  --border:3px solid var(--color-line);
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-bg);color:var(--color-ink);line-height:1.5;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:${f.head};line-height:.95;letter-spacing:-.02em;font-weight:900;text-transform:uppercase}
h1{font-size:clamp(2.5rem,8vw,6.5rem)}
h2{font-size:clamp(2rem,5vw,4rem)}
h3{font-size:1.5rem;letter-spacing:-.01em}
section{padding-block:clamp(3rem,6vw,5rem)}
*{border-radius:0!important}
.cta--primary{background:var(--color-ink);color:#fff;border:var(--border);font-family:${f.head};font-weight:800;text-transform:uppercase;letter-spacing:.06em;border-radius:0!important}
.cta--primary:hover{background:var(--color-primary);border-color:var(--color-primary);color:var(--color-on-primary)}
.cta--ghost{background:transparent;color:var(--color-ink);border:var(--border);font-family:${f.head};font-weight:800;text-transform:uppercase;letter-spacing:.06em;border-radius:0!important}
.cta--ghost:hover{background:var(--color-ink);color:#fff}
/* --- Header --- */
.site-header{position:sticky;top:0;z-index:50;background:var(--color-bg);border-bottom:var(--border)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:72px;gap:1rem}
.brand-mark{font-family:${f.head};font-weight:900;font-size:1.25rem;text-transform:uppercase;letter-spacing:-.01em}
.brand-mark img{max-height:36px;width:auto}
[data-nav]{display:none;position:fixed;inset:72px 0 0 0;background:var(--color-bg);padding:2rem var(--pad);border-left:var(--border);border-bottom:var(--border);transform:translateX(100%);transition:transform .25s ease;visibility:hidden;pointer-events:none}
[data-nav][data-open="true"]{display:block;transform:none;visibility:visible;pointer-events:auto}
[data-nav] ul{display:flex;flex-direction:column;gap:1.25rem;font-family:${f.head};font-size:1.75rem;text-transform:uppercase}
@media(min-width:880px){
  [data-nav]{display:block;position:static;transform:none;padding:0;background:transparent;border:0;visibility:visible;pointer-events:auto}
  [data-nav] ul{flex-direction:row;align-items:center;gap:0;font-size:.875rem}
  [data-nav] ul li{border-left:2px solid var(--color-line)}
  [data-nav] ul li:last-child{border-right:2px solid var(--color-line)}
}
[data-nav] a{display:block;padding:.4rem 1rem;color:var(--color-ink);font-weight:700;transition:background .12s,color .12s}
[data-nav] a:hover{background:var(--color-ink);color:#fff}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex;padding:.5rem 1.25rem;font-size:.8125rem}}
/* --- Hero --- */
.hero{padding:0;border-bottom:var(--border)}
.hero__bar{background:var(--color-primary);color:var(--color-on-primary);display:flex;justify-content:space-between;align-items:center;padding:.5rem var(--pad);font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border-bottom:var(--border)}
.hero__body{display:grid;grid-template-columns:1fr}
@media(min-width:880px){.hero__body{grid-template-columns:1fr 1fr}}
.hero__headline{padding:clamp(2rem,5vw,4rem) var(--pad);display:flex;flex-direction:column;gap:1.5rem;justify-content:center;border-right:0}
@media(min-width:880px){.hero__headline{border-right:var(--border)}}
.hero__title em{color:var(--color-primary);font-style:normal}
.hero__sub{font-size:1.125rem;color:var(--color-ink-2);line-height:1.65;max-width:38em;font-weight:400}
.hero__ctas{display:flex;flex-wrap:wrap;gap:.75rem}
.hero__photo{overflow:hidden;aspect-ratio:1/1;background:var(--color-surface);border-top:var(--border)}
@media(min-width:880px){.hero__photo{aspect-ratio:auto;min-height:min(60vh,580px);border-top:0}}
.hero__photo img{width:100%;height:100%;object-fit:cover}
/* --- About --- */
.about{padding:0;border-bottom:var(--border)}
.about__grid{display:grid;grid-template-columns:1fr}
@media(min-width:880px){.about__grid{grid-template-columns:1fr 2fr}}
.about__accent{background:var(--color-primary);color:var(--color-on-primary);padding:clamp(2rem,5vw,4rem) var(--pad);display:flex;flex-direction:column;justify-content:center;gap:1.5rem;border-right:0}
@media(min-width:880px){.about__accent{border-right:var(--border)}}
.about__accent h2{color:inherit;font-size:clamp(2rem,4.5vw,3.5rem)}
.about__stats{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:auto}
.about__stat{border-top:2px solid ${readableOn(primary) === '#ffffff' ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.2)'};padding:1rem 0}
.about__stat strong{display:block;font-family:${f.head};font-size:1.75rem;font-weight:900}
.about__stat span{font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;opacity:.75}
.about__text{padding:clamp(2rem,5vw,4rem) var(--pad)}
.about__lead{font-size:1.0625rem;color:var(--color-ink-2);line-height:1.75;white-space:pre-wrap}
/* --- Services --- */
.services{border-bottom:var(--border)}
.services__head{padding-bottom:1.5rem;margin-bottom:0;border-bottom:var(--border)}
.services h2{margin-bottom:.5rem}
.services__sub{font-size:1rem;color:var(--color-mute);font-weight:400;max-width:56ch;text-transform:none;letter-spacing:normal}
.services__grid{display:grid;gap:0;grid-template-columns:1fr;border-top:0}
@media(min-width:640px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.services__grid{grid-template-columns:repeat(3,1fr)}}
.service{padding:2rem;border-bottom:var(--border);border-right:0;position:relative;overflow:hidden;transition:background .15s}
.service:hover{background:var(--color-surface)}
@media(min-width:640px){.service{border-right:var(--border)}.service:nth-child(2n){border-right:0}}
@media(min-width:1024px){.service:nth-child(2n){border-right:var(--border)}.service:nth-child(3n){border-right:0}}
.service__num{font-family:${f.head};font-size:3.5rem;font-weight:900;line-height:.9;color:var(--color-primary);display:block;margin-bottom:1rem}
.service__name{margin-bottom:.5rem}
.service__desc{font-size:.9375rem;color:var(--color-mute);line-height:1.65;font-weight:400;text-transform:none;letter-spacing:normal}
.service__price{margin-top:1rem;font-family:${f.head};font-size:1.375rem;font-weight:900;color:var(--color-ink)}
/* --- Gallery --- */
.gallery{padding:0;border-bottom:var(--border)}
.gallery__header{padding:clamp(1.5rem,3vw,2.5rem) var(--pad);border-bottom:var(--border)}
.gallery h2{margin-bottom:0}
.gallery__grid{display:grid;gap:0;grid-template-columns:repeat(2,1fr)}
@media(min-width:640px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.gallery__grid{grid-template-columns:repeat(4,1fr)}}
.gallery__item{aspect-ratio:1/1;overflow:hidden;background:var(--color-surface);border-right:var(--border);border-bottom:var(--border);position:relative}
.gallery__item::after{content:"";position:absolute;inset:0;background:var(--color-primary);opacity:0;transition:opacity .2s;pointer-events:none}
.gallery__item:hover::after{opacity:.22}
.gallery__item img{width:100%;height:100%;object-fit:cover;cursor:zoom-in;transition:transform .3s ease}
.gallery__item:hover img{transform:scale(1.06)}
/* --- Testimonials --- */
.testimonials{border-bottom:var(--border)}
.testimonials__header{padding-bottom:1.5rem;border-bottom:var(--border);margin-bottom:2rem}
.testimonials h2{margin-bottom:0}
.testimonials__grid{display:grid;gap:0;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{padding:2rem;border:var(--border);border-top:5px solid var(--color-ink);margin-bottom:0;position:relative}
@media(min-width:880px){.testimonial{border-right:0}.testimonial:last-child{border-right:var(--border)}}
.testimonial__quote{font-size:1.0625rem;color:var(--color-ink-2);line-height:1.65;font-weight:400}
.testimonial__quote::before{content:"\\201C";font-family:${f.head};font-size:4rem;font-weight:900;color:var(--color-primary);line-height:0;vertical-align:-.3em;margin-right:.1em}
.testimonial__name{margin-top:1.25rem;font-family:${f.head};font-size:.875rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:var(--color-ink)}
/* --- Contact --- */
.contact{border-bottom:var(--border)}
.contact__head{padding-bottom:1.5rem;border-bottom:var(--border);margin-bottom:2rem}
.contact h2{margin-bottom:.25rem}
.contact__sub{font-size:1rem;color:var(--color-mute);font-weight:400;text-transform:none;letter-spacing:normal}
.contact__grid{display:grid;gap:0;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr}}
.contact__info{padding-right:0;border-right:0}
@media(min-width:880px){.contact__info{padding-right:3rem;border-right:var(--border)}}
.contact-line{display:flex;flex-direction:column;gap:.25rem;padding:.75rem 0;border-bottom:2px solid #000}
.contact-line strong{font-family:${f.head};font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:var(--color-mute)}
.contact-line span,.contact-line a{font-size:1rem;color:var(--color-ink-2)}
.hours-list{margin-top:1.5rem;border:var(--border);padding:1rem 1.25rem}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-size:.9375rem;color:var(--color-ink-2);border-bottom:1px solid #ddd}
.hours-row:last-child{border-bottom:0}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:var(--border)}
.map-embed iframe{width:100%;height:100%;border:0}
.contact__form-wrap{padding-top:2rem}
@media(min-width:880px){.contact__form-wrap{padding-top:0;padding-left:3rem}}
.contact-form{display:flex;flex-direction:column;gap:1rem;border:var(--border);padding:1.75rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-family:${f.head};font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--color-mute)}
.contact-form__field input,.contact-form__field textarea{font-family:${f.body};color:var(--color-ink);border:2px solid #000;padding:.75rem .875rem;background:var(--color-bg);font-size:.9375rem;font-weight:400;letter-spacing:normal;text-transform:none;transition:border-color .15s}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary);box-shadow:none}
/* --- Footer --- */
.site-footer{background:var(--color-ink);color:rgba(255,255,255,.65);padding:3rem 0 1.5rem;border-top:5px solid var(--color-primary)}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:640px){.site-footer__inner{grid-template-columns:2fr 1fr 1fr}}
.site-footer h3{font-family:${f.head};font-size:.875rem;font-weight:900;color:#fff;letter-spacing:.14em;text-transform:uppercase;margin-bottom:.75rem}
.site-footer a:hover{color:var(--color-primary)}
.site-footer__bottom{margin-top:2rem;padding-top:1.5rem;border-top:2px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8125rem}
.social-links{display:flex;gap:0;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:42px;height:42px;border:2px solid rgba(255,255,255,.2);border-left:0;color:rgba(255,255,255,.65);border-radius:0;transition:background .15s,color .15s}
.social-links li:first-child a{border-left:2px solid rgba(255,255,255,.2)}
.social-links a:hover{background:var(--color-primary);border-color:var(--color-primary);color:var(--color-on-primary)}
.social-links svg{width:16px;height:16px}`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const yearsBadge = `${rng.int(15) + 8}+`;
  const city = project.seo.cityRegion || '';
  const industry = project.business.industry.replace(/-/g, ' ').toUpperCase();

  const words = project.business.name.split(' ');
  const accentWord = words[words.length - 1] ?? project.business.name;
  const preWords = words.length > 1 ? words.slice(0, -1).join(' ') : '';

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Work</a></li>' : ''}
            ${testimonials.length ? '<li><a href="#testimonials">Reviews</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <a href="#contact" class="cta cta--primary header-cta">Get a quote</a>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__bar" aria-hidden="true">
          <span>${escapeHtml(city || industry)}</span>
          <span>${new Date().getFullYear()}</span>
        </div>
        <div class="hero__body">
          <div class="hero__headline" data-reveal>
            <h1 id="hero-title" class="hero__title">${preWords ? `${escapeHtml(preWords)}<br><em>${escapeHtml(accentWord as string)}</em>` : `<em>${escapeHtml(project.business.name)}</em>`}</h1>
            <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="hero__ctas">
              <a href="#contact" class="cta cta--primary">Get a quote</a>
              <a href="#services" class="cta cta--ghost">Our services</a>
            </div>
          </div>
          <div class="hero__photo" aria-hidden="${heroImage ? 'false' : 'true'}">
            ${heroImage ? imgTag(heroImage, { loading: 'eager' }) : ''}
          </div>
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="about__grid">
          <div class="about__accent" data-reveal>
            <h2 id="about-title">Who<br>we are</h2>
            <div class="about__stats">
              <div class="about__stat"><strong>${escapeHtml(yearsBadge)}</strong><span>Years</span></div>
              <div class="about__stat"><strong>5★</strong><span>Rated</span></div>
              <div class="about__stat"><strong>Free</strong><span>Quotes</span></div>
              <div class="about__stat"><strong>100%</strong><span>Local</span></div>
            </div>
          </div>
          <div class="about__text container" style="max-width:none" data-reveal>
            <p class="about__lead">${escapeHtml(project.content.about)}</p>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="services__head" data-reveal>
            <h2 id="services-title">Services</h2>
            <p class="services__sub">Everything we do, delivered without compromise.</p>
          </div>
        </div>
        <div class="container services__grid">
${services
  .map(
    (s, i) => `          <article class="service" data-reveal>
            <span class="service__num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="service__name">${escapeHtml(s.name)}</h3>
            <p class="service__desc">${escapeHtml(s.description)}</p>
            ${s.price ? `<div class="service__price">${escapeHtml(s.price)}</div>` : ''}
          </article>`,
  )
  .join('\n')}
        </div>
      </section>

      <!-- GALLERY =========================================================== -->
      ${
        gallery.length
          ? `<section class="gallery" id="gallery" aria-labelledby="gallery-title">
        <div class="container gallery__header">
          <h2 id="gallery-title">Our work</h2>
        </div>
        <div class="gallery__grid" data-lightbox>
${gallery.map((g) => `          <figure class="gallery__item">${imgTag(g)}</figure>`).join('\n')}
        </div>
      </section>`
          : ''
      }

      <!-- TESTIMONIALS ====================================================== -->
      ${
        testimonials.length
          ? `<section class="testimonials" id="testimonials" aria-labelledby="testimonials-title">
        <div class="container">
          <div class="testimonials__header" data-reveal>
            <h2 id="testimonials-title">What clients say</h2>
          </div>
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
        <div class="container">
          <div class="contact__head" data-reveal>
            <h2 id="contact-title">Get in touch</h2>
            <p class="contact__sub">Tell us about your project and we'll respond within one business day.</p>
          </div>
          <div class="contact__grid">
            <div class="contact__info" data-reveal>
              ${contactBlock(project)}
              ${hoursList(project)}
              ${mapEmbed(project)}
            </div>
            <div class="contact__form-wrap" data-reveal>
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
          <p style="color:rgba(255,255,255,.5);max-width:28em;font-size:.9375rem;margin-top:.5rem">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Pages</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Work</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem;color:rgba(255,255,255,.5)">
            ${project.business.phone ? `<li>${escapeHtml(project.business.phone)}</li>` : ''}
            ${project.business.email ? `<li>${escapeHtml(project.business.email)}</li>` : ''}
            ${project.business.address ? `<li>${escapeHtml(project.business.address)}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}. All rights reserved.</span>
        <span>${escapeHtml(city)}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_12: TemplateModule = { meta: META, css, body };
