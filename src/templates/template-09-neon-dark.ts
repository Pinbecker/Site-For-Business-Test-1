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
  id: 'neon-dark',
  name: 'Neon Dark',
  description:
    'Cyberpunk-inspired dark layout with glowing neon accents and monospace details. For tech, digital agencies, and bold modern brands.',
  bestFor: ['professional-services', 'fitness-wellness', 'other'],
  vibe: 'Dark · Glowing · Tech-forward',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Space Grotesk", system-ui, sans-serif',
      body: '"Space Grotesk", system-ui, sans-serif',
      mono: '"Space Mono", monospace',
      url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
    },
    {
      head: '"Syne", system-ui, sans-serif',
      body: '"DM Sans", system-ui, sans-serif',
      mono: '"DM Mono", monospace',
      url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Mono:wght@400;500&display=swap',
    },
    {
      head: '"Outfit", system-ui, sans-serif',
      body: '"Outfit", system-ui, sans-serif',
      mono: '"JetBrains Mono", monospace',
      url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
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

  return `/* === Template 09: Neon Dark ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-bg:#060b14;
  --color-surface:#0d1525;
  --color-surface-2:#141f35;
  --color-ink:#dce6f5;
  --color-ink-2:#8a9ab5;
  --color-mute:#4a5870;
  --color-line:rgba(255,255,255,.07);
  --max:1280px;
  --pad:clamp(1.25rem,3vw,2.5rem);
  --glow:0 0 24px ${primary}70,0 0 64px ${primary}28;
  --glow-sm:0 0 14px ${primary}55;
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-bg);color:var(--color-ink);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:${f.head};line-height:1.1;letter-spacing:-.015em}
h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:700}
h2{font-size:clamp(1.75rem,4vw,3rem);font-weight:700}
h3{font-size:1.25rem;font-weight:600}
section{padding-block:clamp(3.5rem,7vw,5.5rem)}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:2px;box-shadow:var(--glow-sm)}
.cta--primary:hover{background:${shade(primary, 0.12)};box-shadow:var(--glow)}
.cta--ghost{background:transparent;color:var(--color-ink);border:1px solid rgba(255,255,255,.2);border-radius:2px}
.cta--ghost:hover{border-color:var(--color-primary);color:var(--color-primary)}
/* --- Header --- */
.site-header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(6,11,20,.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--color-line)}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;height:68px;gap:1rem}
.brand-mark{font-family:${f.mono};font-weight:700;font-size:.9375rem;color:var(--color-primary);letter-spacing:.04em}
.brand-mark img{max-height:30px;width:auto;filter:brightness(0) invert(1)}
[data-nav]{display:none;position:fixed;inset:68px 0 0 0;background:var(--color-bg);padding:2rem var(--pad);transform:translateX(100%);transition:transform .25s ease;border-left:1px solid var(--color-line);visibility:hidden;pointer-events:none}
[data-nav][data-open="true"]{display:block;transform:none;visibility:visible;pointer-events:auto}
[data-nav] ul{display:flex;flex-direction:column;gap:1.5rem;font-family:${f.mono}}
@media(min-width:880px){
  [data-nav]{display:block;position:static;transform:none;padding:0;background:transparent;border:0;visibility:visible;pointer-events:auto}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2rem;font-family:${f.body};font-size:.875rem;font-weight:500}
}
[data-nav] a{color:var(--color-ink-2);transition:color .15s}
[data-nav] a:hover{color:var(--color-primary)}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex;padding:.5rem 1rem}}
/* --- Hero --- */
.hero{min-height:100svh;display:grid;grid-template-columns:1fr;align-items:center;padding-top:68px;overflow:hidden;isolation:isolate}
@media(min-width:880px){.hero{grid-template-columns:1fr 1fr}}
.hero::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.hero::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 55% 50% at 25% 50%,${primary}14,transparent 70%);pointer-events:none}
.hero__content{position:relative;z-index:1;padding:clamp(2rem,5vw,4rem) var(--pad);display:flex;flex-direction:column;gap:1.5rem}
.hero__label{font-family:${f.mono};font-size:.8125rem;color:var(--color-primary);letter-spacing:.1em;display:flex;align-items:center;gap:.5rem}
.hero__label::before{content:">";color:var(--color-ink-2)}
.hero__title{color:#fff;text-shadow:var(--glow);max-width:14ch}
.hero__sub{font-size:clamp(1rem,1.5vw,1.2rem);color:var(--color-ink-2);max-width:36em;line-height:1.72}
.hero__ctas{display:flex;flex-wrap:wrap;gap:.75rem}
.hero__terminal{display:none;flex-direction:column;align-self:stretch;background:var(--color-surface);border-left:1px solid var(--color-line);position:relative;overflow:hidden;min-height:480px}
@media(min-width:880px){.hero__terminal{display:flex}}
.hero__terminal-bar{height:32px;background:var(--color-surface-2);border-bottom:1px solid var(--color-line);display:flex;align-items:center;padding:0 12px;flex-shrink:0;gap:6px}
.hero__terminal-dot{width:10px;height:10px;border-radius:50%}
.hero__terminal-dot:nth-child(1){background:#ff5f57}
.hero__terminal-dot:nth-child(2){background:#febc2e}
.hero__terminal-dot:nth-child(3){background:${primary}}
.hero__terminal-screen{flex:1;position:relative;overflow:hidden}
.hero__terminal-screen img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero__scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.1) 3px,rgba(0,0,0,.1) 4px);pointer-events:none;z-index:3}
/* --- About --- */
.about{background:var(--color-surface);border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line)}
.about__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.about__grid{grid-template-columns:1.2fr 1fr;gap:5rem;align-items:start}}
.about__label{font-family:${f.mono};font-size:.75rem;color:var(--color-primary);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.75rem}
.about__label::before{content:"# "}
.about__lead{font-size:1.0625rem;color:var(--color-ink-2);line-height:1.78;white-space:pre-wrap;margin-top:1rem}
.about__metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:.625rem}
.about__metric{background:var(--color-surface-2);border:1px solid var(--color-line);border-top:2px solid var(--color-primary);padding:1.25rem 1rem}
.about__metric strong{display:block;font-family:${f.mono};font-size:1.75rem;font-weight:700;color:var(--color-primary);text-shadow:var(--glow-sm)}
.about__metric span{font-size:.8125rem;color:var(--color-mute);display:block;margin-top:.25rem}
/* --- Services --- */
.services__head{display:grid;gap:1rem;margin-bottom:2rem;grid-template-columns:1fr}
@media(min-width:880px){.services__head{grid-template-columns:1fr 1fr;align-items:end}}
.services__label{font-family:${f.mono};font-size:.75rem;color:var(--color-primary);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem}
.services__label::before{content:"# "}
.services h2{color:#fff}
.services__sub{color:var(--color-ink-2)}
.services__grid{display:grid;gap:1px;background:var(--color-line);border:1px solid var(--color-line)}
@media(min-width:640px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.services__grid{grid-template-columns:repeat(3,1fr)}}
.service{background:var(--color-surface);padding:1.75rem 1.5rem;border-left:2px solid transparent;position:relative;overflow:hidden;transition:border-left-color .2s,background .2s}
.service:hover{background:var(--color-surface-2);border-left-color:var(--color-primary)}
.service__num{font-family:${f.mono};font-size:.75rem;color:var(--color-primary);display:block;margin-bottom:1rem;letter-spacing:.06em}
.service__name{color:#fff;margin-bottom:.5rem;font-size:1.125rem}
.service__desc{font-size:.9375rem;color:var(--color-ink-2);line-height:1.7}
.service__price{margin-top:1rem;font-family:${f.mono};color:${primary};font-size:.875rem}
/* --- Gallery --- */
.gallery{background:var(--color-surface);border-top:1px solid var(--color-line)}
.gallery h2{color:#fff;margin-bottom:.5rem}
.gallery__sub{color:var(--color-ink-2);margin-bottom:2rem}
.gallery__grid{display:grid;gap:2px;grid-template-columns:repeat(2,1fr)}
@media(min-width:640px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.gallery__grid{grid-template-columns:repeat(4,1fr)}}
.gallery__item{aspect-ratio:1/1;overflow:hidden;position:relative;background:var(--color-surface-2)}
.gallery__item::after{content:"";position:absolute;inset:0;background:var(--color-primary);opacity:0;mix-blend-mode:screen;transition:opacity .2s;pointer-events:none}
.gallery__item:hover::after{opacity:.22}
.gallery__item img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease;cursor:zoom-in}
.gallery__item:hover img{transform:scale(1.07)}
/* --- Testimonials --- */
.testimonials h2{color:#fff;margin-bottom:2rem}
.testimonials__grid{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{background:var(--color-surface);border:1px solid var(--color-line);padding:1.5rem;position:relative;overflow:hidden}
.testimonial::before{content:"$ query --review";display:block;font-family:${f.mono};font-size:.7rem;color:var(--color-mute);margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid var(--color-line);letter-spacing:.04em}
.testimonial__quote{font-size:1rem;color:var(--color-ink-2);line-height:1.72}
.testimonial__name{margin-top:1rem;font-family:${f.mono};font-size:.8125rem;color:var(--color-primary)}
.testimonial__name::before{content:"> "}
/* --- Contact --- */
.contact{background:var(--color-surface);border-top:1px solid var(--color-line)}
.contact h2{color:#fff;margin-bottom:.5rem}
.contact__sub{color:var(--color-ink-2);margin-bottom:2rem}
.contact__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr;gap:4rem}}
.contact-line{display:flex;flex-direction:column;gap:.25rem;padding:.75rem 0;border-bottom:1px solid var(--color-line)}
.contact-line strong{font-family:${f.mono};font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--color-primary)}
.contact-line span,.contact-line a{color:var(--color-ink)}
.hours-list{margin-top:1.5rem;background:var(--color-surface-2);border:1px solid var(--color-line);padding:1rem 1.25rem}
.hours-row{display:flex;justify-content:space-between;padding:.4rem 0;font-family:${f.mono};font-size:.8125rem;color:var(--color-ink-2)}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.contact-form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface-2);border:1px solid var(--color-line);padding:1.75rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-family:${f.mono};font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--color-mute)}
.contact-form__field input,.contact-form__field textarea{font-family:${f.body};color:var(--color-ink);background:var(--color-bg);border:1px solid var(--color-line);padding:.75rem .875rem;font-size:.9375rem;letter-spacing:normal;text-transform:none;border-radius:0;transition:border-color .15s}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px ${tint(primary, 0.7)}30}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--color-line)}
.map-embed iframe{width:100%;height:100%;border:0;filter:invert(.9) hue-rotate(180deg) saturate(.7)}
/* --- Footer --- */
.site-footer{background:var(--color-surface);color:var(--color-ink-2);padding:3rem 0 1.5rem;border-top:2px solid var(--color-primary)}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:640px){.site-footer__inner{grid-template-columns:repeat(3,1fr)}}
.site-footer h3{font-family:${f.mono};font-size:.75rem;color:var(--color-primary);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.75rem}
.site-footer a:hover{color:var(--color-primary)}
.site-footer__bottom{margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--color-line);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-family:${f.mono};font-size:.75rem;color:var(--color-mute)}
.social-links{display:flex;gap:.5rem;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--color-line);color:var(--color-ink-2);transition:border-color .15s,color .15s;border-radius:0}
.social-links a:hover{border-color:var(--color-primary);color:var(--color-primary)}
.social-links svg{width:16px;height:16px}`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroImage = gallery[0] ?? project.brand.logo;
  const yearsBadge = `${rng.int(15) + 8}yr`;
  const city = project.seo.cityRegion ? escapeHtml(project.seo.cityRegion) : 'Online';

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
        <a href="#contact" class="cta cta--primary header-cta">Get started</a>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__content" data-reveal>
          <p class="hero__label">${city}</p>
          <h1 id="hero-title" class="hero__title">${escapeHtml(project.business.name)}</h1>
          <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
          <div class="hero__ctas">
            <a href="#contact" class="cta cta--primary">Get started</a>
            <a href="#services" class="cta cta--ghost">Explore services</a>
          </div>
        </div>
        <div class="hero__terminal" aria-hidden="true">
          <div class="hero__terminal-bar">
            <span class="hero__terminal-dot"></span>
            <span class="hero__terminal-dot"></span>
            <span class="hero__terminal-dot"></span>
          </div>
          <div class="hero__terminal-screen">
            ${heroImage ? imgTag(heroImage, { loading: 'eager' }) : ''}
          </div>
          <div class="hero__scan"></div>
        </div>
      </section>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div data-reveal>
            <p class="about__label">About</p>
            <h2 id="about-title">${escapeHtml(project.business.name)}</h2>
            <p class="about__lead">${escapeHtml(project.content.about)}</p>
          </div>
          <div class="about__metrics" data-reveal>
            <div class="about__metric"><strong>${escapeHtml(yearsBadge)}</strong><span>Experience</span></div>
            <div class="about__metric"><strong>5.0★</strong><span>Client rating</span></div>
            <div class="about__metric"><strong>100%</strong><span>Local</span></div>
            <div class="about__metric"><strong>Free</strong><span>Estimates</span></div>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <div class="services__head">
            <div data-reveal>
              <p class="services__label">Services</p>
              <h2 id="services-title">What we offer</h2>
            </div>
            <p class="services__sub" data-reveal>Precision work, delivered on time. Every service backed by real experience.</p>
          </div>
          <div class="services__grid">
${services
  .map(
    (s, i) => `            <article class="service" data-reveal>
              <span class="service__num">// ${String(i + 1).padStart(2, '0')}</span>
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
          <p class="gallery__sub">Selected projects from our portfolio.</p>
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
          <h2 id="testimonials-title">Client feedback</h2>
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
          <h2 id="contact-title">Get in touch</h2>
          <p class="contact__sub">Tell us about your project — we respond within one business day.</p>
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
          <p style="color:var(--color-ink-2);max-width:28em;font-size:.9375rem;margin-top:.5rem">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Navigate</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            ${gallery.length ? '<li><a href="#gallery">Work</a></li>' : ''}
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Connect</h3>
          <ul style="display:flex;flex-direction:column;gap:.5rem;font-size:.9375rem;color:var(--color-ink-2)">
            ${project.business.phone ? `<li>${escapeHtml(project.business.phone)}</li>` : ''}
            ${project.business.email ? `<li>${escapeHtml(project.business.email)}</li>` : ''}
            ${project.business.address ? `<li>${escapeHtml(project.business.address)}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}. All rights reserved.</span>
        <span>${escapeHtml(project.seo.cityRegion || '')}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_09: TemplateModule = { meta: META, css, body };
