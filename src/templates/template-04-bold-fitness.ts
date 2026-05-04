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
  id: 'bold-fitness',
  name: 'Bold Fitness',
  description:
    'Punchy full-bleed hero, oversized type and high-contrast colour blocks. Built for fitness, wellness, and high-energy brands.',
  bestFor: ['fitness-wellness', 'cafe-restaurant', 'other'],
  vibe: 'Bold · Energetic · High-contrast',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Anton", Impact, sans-serif',
      body: '"Inter", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap',
    },
    {
      head: '"Bebas Neue", Impact, sans-serif',
      body: '"Inter", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap',
    },
    {
      head: '"Archivo Black", Impact, sans-serif',
      body: '"Archivo", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap',
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
  const onSecondary = readableOn(secondary);
  const skew = rng.bool() ? '-2deg' : '2deg';
  return `/* === Template 04: Bold Fitness ============================ */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-on-secondary:${onSecondary};
  --color-accent:${primary};
  --color-bg:#0a0a0c;
  --color-surface:#15151a;
  --color-line:#23242b;
  --color-text:#f6f6f8;
  --color-mute:#9aa0ad;
  --max:1280px;
  --pad:clamp(1.25rem,3vw,2.5rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-bg);color:var(--color-text);line-height:1.5;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:${f.head};text-transform:uppercase;letter-spacing:.005em;line-height:.9;font-weight:400}
h1{font-size:clamp(3rem,12vw,8rem)}
h2{font-size:clamp(2rem,6vw,4.5rem)}
h3{font-size:1.5rem}
.container{max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
section{padding-block:clamp(3rem,7vw,6rem);position:relative}
.cta--primary{background:var(--color-primary);color:var(--color-on-primary);border-radius:0;padding:1.1rem 2rem;font-family:${f.head};font-size:1rem;letter-spacing:.05em;text-transform:uppercase;clip-path:polygon(0 0,100% 0,calc(100% - 14px) 100%,0 100%);padding-right:2.5rem}
.cta--primary:hover{background:${shade(primary, 0.15)}}
.cta--ghost{background:transparent;color:#fff;border:2px solid #fff;border-radius:0;font-family:${f.head};font-size:1rem;letter-spacing:.05em;text-transform:uppercase}
.cta--ghost:hover{background:#fff;color:var(--color-bg)}
.eyebrow{display:inline-flex;align-items:center;gap:.5rem;font-size:.8125rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--color-primary);margin-bottom:1rem}
.eyebrow::before{content:"";width:24px;height:2px;background:var(--color-primary)}
/* --- Header --- */
.site-header{position:fixed;top:0;left:0;right:0;z-index:50;padding:1rem 0;transition:background .2s ease,padding .2s ease}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;gap:1rem;background:rgba(10,10,12,.7);backdrop-filter:blur(10px);padding:.75rem 1rem;border:1px solid rgba(255,255,255,.08);border-radius:0}
.brand-mark{font-family:${f.head};font-size:1.25rem;letter-spacing:.05em;text-transform:uppercase}
.brand-mark img{max-height:36px;width:auto;filter:brightness(0) invert(1)}
[data-nav]{position:fixed;inset:0;background:var(--color-bg);padding:5rem var(--pad);transform:translateX(100%);transition:transform .3s ease;z-index:40}
[data-nav][data-open="true"]{transform:none}
[data-nav] ul{display:flex;flex-direction:column;gap:1.5rem;font-family:${f.head};font-size:2.5rem;text-transform:uppercase}
@media(min-width:880px){
  [data-nav]{position:static;transform:none;padding:0;background:transparent}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2rem;font-size:.9rem;font-family:${f.body};font-weight:600;letter-spacing:.05em}
}
[data-nav] a:hover{color:var(--color-primary)}
[data-nav-toggle]{position:relative;z-index:60;color:#fff}
.header-cta{display:none}
@media(min-width:880px){.header-cta{display:inline-flex;padding:.6rem 1.25rem}}
/* --- Hero --- */
.hero{min-height:100vh;display:flex;align-items:center;padding-top:6rem;padding-bottom:3rem;position:relative;overflow:hidden;isolation:isolate}
.hero__bg{position:absolute;inset:0;z-index:-2}
.hero__bg img{width:100%;height:100%;object-fit:cover;filter:brightness(.45) contrast(1.05)}
.hero__bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,12,.55) 0%,rgba(10,10,12,.85) 100%);z-index:1}
.hero__inner{display:grid;gap:2rem;width:100%}
.hero__title{transform:skewY(${skew});display:inline-block}
.hero__title span{display:block;background:linear-gradient(180deg,#fff 60%,${tint(primary, 0.3)} 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero__title em{color:var(--color-primary);font-style:normal;display:inline-block;background:none;-webkit-text-fill-color:initial}
.hero__sub{font-size:1.25rem;color:var(--color-mute);max-width:32em}
.hero__ctas{display:flex;flex-wrap:wrap;gap:1rem}
.hero__stats{position:absolute;bottom:2rem;left:0;right:0;display:grid;grid-template-columns:repeat(3,1fr);max-width:var(--max);margin:0 auto;padding:0 var(--pad);gap:1rem;z-index:2}
.hero__stat{padding:1rem;border-left:3px solid var(--color-primary);background:rgba(255,255,255,.04);backdrop-filter:blur(6px)}
.hero__stat strong{display:block;font-family:${f.head};font-size:1.75rem;color:#fff}
.hero__stat span{font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;color:var(--color-mute)}
@media(max-width:640px){.hero__stats{position:static;margin-top:2rem;padding:0;grid-template-columns:1fr}}
/* --- Tagline strip --- */
.strip{background:var(--color-primary);color:var(--color-on-primary);padding:1.25rem 0;overflow:hidden;font-family:${f.head};font-size:1.5rem;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;transform:rotate(${skew})}
.strip__track{display:inline-flex;gap:2rem;animation:strip 25s linear infinite}
.strip__track span::before{content:"⚡";margin-right:2rem}
@keyframes strip{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* --- About --- */
.about{background:var(--color-surface)}
.about__grid{display:grid;gap:3rem;grid-template-columns:1fr;align-items:start}
@media(min-width:880px){.about__grid{grid-template-columns:1.1fr 1fr;gap:4rem}}
.about__title{margin-bottom:1.5rem}
.about__title em{color:var(--color-primary);font-style:normal}
.about__lead{font-size:1.125rem;color:var(--color-mute);white-space:pre-wrap}
.about__pillars{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.about__pillars{grid-template-columns:1fr 1fr}}
.about__pillar{padding:1.5rem;border:1px solid var(--color-line);background:rgba(255,255,255,.02)}
.about__pillar h3{font-size:1.25rem;color:#fff;margin-bottom:.5rem}
.about__pillar p{color:var(--color-mute);font-size:.95rem}
/* --- Services --- */
.services{background:var(--color-bg);position:relative}
.services h2{margin-bottom:.5rem}
.services h2 em{color:var(--color-primary);font-style:normal}
.services__sub{color:var(--color-mute);max-width:32em;margin-bottom:3rem}
.services__grid{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.services__grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.services__grid{grid-template-columns:repeat(3,1fr)}}
.service{padding:2rem 1.5rem;border:1px solid var(--color-line);background:var(--color-surface);position:relative;overflow:hidden;transition:transform .2s ease}
.service::before{content:"";position:absolute;top:0;left:0;width:100%;height:4px;background:var(--color-primary);transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.service:hover{transform:translateY(-4px)}
.service:hover::before{transform:scaleX(1)}
.service__num{font-family:${f.head};color:var(--color-primary);font-size:2.5rem;line-height:1;display:block;margin-bottom:1rem}
.service__name{color:#fff;margin-bottom:.5rem;font-size:1.5rem}
.service__desc{color:var(--color-mute);font-size:.95rem}
.service__price{margin-top:1rem;font-family:${f.head};font-size:1.5rem;color:var(--color-primary)}
/* --- Gallery --- */
.gallery{background:var(--color-surface)}
.gallery h2 em{color:var(--color-primary);font-style:normal}
.gallery__grid{display:grid;gap:.5rem;grid-template-columns:repeat(2,1fr);margin-top:2rem}
@media(min-width:640px){.gallery__grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.gallery__grid{grid-template-columns:repeat(4,1fr)}}
.gallery__item{aspect-ratio:1/1;overflow:hidden;background:var(--color-line);position:relative}
.gallery__item::after{content:"";position:absolute;inset:0;background:var(--color-primary);mix-blend-mode:multiply;opacity:0;transition:opacity .2s ease;pointer-events:none}
.gallery__item:hover::after{opacity:.25}
.gallery__item img{width:100%;height:100%;object-fit:cover;cursor:zoom-in;transition:transform .4s ease}
.gallery__item:hover img{transform:scale(1.08)}
/* --- Testimonials --- */
.testimonials{background:var(--color-primary);color:var(--color-on-primary);padding-block:clamp(4rem,8vw,7rem);overflow:hidden}
.testimonials h2{color:var(--color-on-primary);margin-bottom:2rem}
.testimonials__grid{display:grid;gap:1.5rem;grid-template-columns:1fr}
@media(min-width:880px){.testimonials__grid{grid-template-columns:repeat(2,1fr)}}
.testimonial{padding:2rem;border:2px solid ${onPrimary === '#ffffff' ? 'rgba(255,255,255,.25)' : 'rgba(0,0,0,.2)'};background:${onPrimary === '#ffffff' ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.04)'}}
.testimonial__quote{font-size:1.125rem;line-height:1.5}
.testimonial__name{margin-top:1rem;font-family:${f.head};font-size:1rem;letter-spacing:.05em;text-transform:uppercase}
/* --- Contact --- */
.contact{background:var(--color-bg)}
.contact__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1fr;gap:4rem}}
.contact h2 em{color:var(--color-primary);font-style:normal}
.contact-line{display:flex;flex-direction:column;padding:1rem 0;border-bottom:1px solid var(--color-line)}
.contact-line strong{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--color-mute);margin-bottom:.4rem}
.contact-line span{color:#fff;font-size:1.125rem;font-weight:600}
.hours-list{margin-top:1.5rem;border:1px solid var(--color-line);padding:1rem 1.25rem;background:var(--color-surface)}
.hours-row{display:flex;justify-content:space-between;padding:.5rem 0;font-size:.95rem;color:#fff}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute)}
.contact-form{display:flex;flex-direction:column;gap:1rem;background:var(--color-surface);border:1px solid var(--color-line);padding:2rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;color:var(--color-mute);font-weight:600}
.contact-form__field input,.contact-form__field textarea{font:400 1rem ${f.body};color:#fff;border:1px solid var(--color-line);background:var(--color-bg);padding:.85rem 1rem;letter-spacing:normal;text-transform:none}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary)}
.map-embed{margin-top:1.5rem;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--color-line)}
.map-embed iframe{width:100%;height:100%;border:0;filter:invert(.92) hue-rotate(180deg)}
/* --- Footer --- */
.site-footer{background:#000;color:#fff;padding:4rem 0 1.5rem;border-top:2px solid var(--color-primary)}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:768px){.site-footer__inner{grid-template-columns:2fr 1fr 1fr}}
.site-footer h3{font-family:${f.head};font-size:1.25rem;color:#fff;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.05em}
.site-footer ul{display:flex;flex-direction:column;gap:.5rem;font-size:.95rem;color:var(--color-mute)}
.site-footer a:hover{color:var(--color-primary)}
.site-footer__bottom{margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8rem;color:var(--color-mute)}
.social-links{display:flex;gap:.5rem;margin-top:1rem}
.social-links a{display:grid;place-items:center;width:42px;height:42px;background:var(--color-surface);color:#fff;border:1px solid var(--color-line)}
.social-links a:hover{background:var(--color-primary);color:var(--color-on-primary);border-color:var(--color-primary)}
.social-links svg{width:18px;height:18px}
`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroBg = gallery[0] ?? project.brand.logo;

  const words = project.business.name.toUpperCase().split(' ');
  const stylizedTitle =
    words.length > 1
      ? `<span>${escapeHtml(words.slice(0, -1).join(' '))}</span><em>${escapeHtml(words[words.length - 1] as string)}</em>`
      : `<span>${escapeHtml(words.join(' '))}</span>`;

  const stripWords = ['Push harder', 'Train smart', 'Stay strong', 'Be unstoppable', 'No excuses', 'Show up'];
  const strip = rng.shuffle(stripWords).slice(0, 4).join('  ');

  const orderedServices = rng.bool(0.5) ? rng.shuffle(services) : services;

  return `
    <header class="site-header" id="top">
      <div class="container">
        <div class="site-header__inner">
          ${logoOrName(project)}
          <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
          <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Programs</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Join</a></li>
            </ul>
          </nav>
          <a href="#contact" class="cta cta--primary header-cta">Join now</a>
        </div>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__bg" aria-hidden="true">
          ${heroBg ? imgTag(heroBg, { loading: 'eager' }) : ''}
        </div>
        <div class="container">
          <div class="hero__inner" data-reveal>
            <span class="eyebrow">${escapeHtml(project.seo.cityRegion || 'Welcome')}</span>
            <h1 id="hero-title" class="hero__title">${stylizedTitle}</h1>
            <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="hero__ctas">
              <a href="#contact" class="cta cta--primary">Get started</a>
              <a href="#services" class="cta cta--ghost">View programs</a>
            </div>
          </div>
        </div>
        <div class="hero__stats" aria-hidden="true">
          <div class="hero__stat"><strong>${rng.int(500) + 200}+</strong><span>Members</span></div>
          <div class="hero__stat"><strong>${rng.int(20) + 8}+</strong><span>Programs</span></div>
          <div class="hero__stat"><strong>5★</strong><span>Reviews</span></div>
        </div>
      </section>

      <!-- STRIP ============================================================== -->
      <div class="strip" aria-hidden="true">
        <div class="strip__track">
          <span>${escapeHtml(strip)}</span>
          <span>${escapeHtml(strip)}</span>
          <span>${escapeHtml(strip)}</span>
        </div>
      </div>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div data-reveal>
            <span class="eyebrow">Our story</span>
            <h2 id="about-title" class="about__title">Built for those who <em>show up</em>.</h2>
            <p class="about__lead">${escapeHtml(project.content.about)}</p>
          </div>
          <div class="about__pillars" data-reveal>
            <article class="about__pillar"><h3>Strong</h3><p>Train with purpose. Build the kind of strength that follows you home.</p></article>
            <article class="about__pillar"><h3>Local</h3><p>Independent, community-rooted, and proudly built in ${escapeHtml(project.seo.cityRegion || 'town')}.</p></article>
            <article class="about__pillar"><h3>Honest</h3><p>No gimmicks, no fluff. Just a coach in your corner and a plan that works.</p></article>
            <article class="about__pillar"><h3>Welcoming</h3><p>From day one, you'll know we mean it. Come as you are.</p></article>
          </div>
        </div>
      </section>

      <!-- SERVICES ========================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <span class="eyebrow">Programs</span>
          <h2 id="services-title">What you get <em>access to</em>.</h2>
          <p class="services__sub">A focused set of services, designed to deliver real results — at any starting point.</p>
          <div class="services__grid">
${orderedServices
  .map(
    (s, i) => `            <article class="service" data-reveal>
              <span class="service__num">${String(i + 1).padStart(2, '0')}</span>
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
          <span class="eyebrow">Gallery</span>
          <h2 id="gallery-title">Inside <em>the space</em>.</h2>
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
          <span class="eyebrow" style="color:var(--color-on-primary);opacity:.85">Reviews</span>
          <h2 id="testimonials-title">From the floor.</h2>
          <div class="testimonials__grid">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <p class="testimonial__quote">"${escapeHtml(t.quote)}"</p>
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
            <span class="eyebrow">Get in touch</span>
            <h2 id="contact-title">Ready to <em>start</em>?</h2>
            <div style="margin-top:1.5rem">
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
          <p style="color:var(--color-mute);max-width:28em">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3>Browse</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Programs</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Visit</h3>
          <ul>
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

export const TEMPLATE_04: TemplateModule = { meta: META, css, body };
