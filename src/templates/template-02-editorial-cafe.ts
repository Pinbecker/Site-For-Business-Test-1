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
  id: 'editorial-cafe',
  name: 'Editorial Café',
  description:
    'Magazine-style hero with asymmetric image grid and serif headlines. Warm and welcoming, perfect for cafés, restaurants, and retail.',
  bestFor: ['cafe-restaurant', 'retail-shop', 'hair-beauty'],
  vibe: 'Warm · Editorial · Welcoming',
};

function fontPair(rng: ReturnType<typeof createRng>) {
  const pairs = [
    {
      head: '"Fraunces", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Inter:wght@400;500;600&display=swap',
    },
    {
      head: '"Cormorant Garamond", Georgia, serif',
      body: '"DM Sans", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap',
    },
    {
      head: '"Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
      url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Inter:wght@400;500;600&display=swap',
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
  const cream = tint(primary, 0.92);
  const heroLayout = rng.pick(['left', 'right'] as const);
  return `/* === Template 02: Editorial Café =========================== */
@import url("${f.url}");
:root{
  --color-primary:${primary};
  --color-secondary:${secondary};
  --color-on-primary:${onPrimary};
  --color-accent:${primary};
  --color-cream:${cream};
  --color-ink:#1c1814;
  --color-ink-2:#52483e;
  --color-mute:#8a7a6a;
  --color-line:#e9e2d6;
  --max:1240px;
  --pad:clamp(1.25rem,3vw,3rem);
}
${visuallyHiddenCss()}
body{font-family:${f.body};background:var(--color-cream);color:var(--color-ink);line-height:1.6}
h1,h2,h3{font-family:${f.head};font-weight:700;letter-spacing:-.015em;line-height:1.05}
h1{font-size:clamp(2.5rem,7vw,5.5rem);font-weight:800}
h2{font-size:clamp(1.875rem,4vw,3rem)}
h3{font-size:1.25rem}
em{font-style:italic;color:var(--color-primary)}
.container{max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
section{padding-block:clamp(3.5rem,8vw,7rem)}
.cta--primary{background:var(--color-ink);color:#fff;border-radius:999px}
.cta--primary:hover{background:var(--color-primary)}
.cta--ghost{background:transparent;color:var(--color-ink);border-bottom:2px solid var(--color-ink);border-radius:0;padding:.4rem 0;min-height:auto}
.eyebrow{display:inline-block;font-family:${f.body};font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute);margin-bottom:1rem}
/* --- Header --- */
.site-header{padding-top:1.25rem}
.site-header__inner{display:flex;align-items:center;justify-content:space-between;gap:1rem}
.brand-mark{font-family:${f.head};font-size:1.25rem;font-weight:700}
.brand-mark img{max-height:40px;width:auto}
[data-nav]{position:fixed;inset:0;background:var(--color-cream);padding:5rem var(--pad);transform:translateY(-100%);transition:transform .3s ease;z-index:40}
[data-nav][data-open="true"]{transform:none}
[data-nav] ul{display:flex;flex-direction:column;gap:1.5rem;font-family:${f.head};font-size:2rem}
@media(min-width:880px){
  [data-nav]{position:static;transform:none;padding:0;background:transparent}
  [data-nav] ul{flex-direction:row;align-items:center;gap:2rem;font-family:${f.body};font-size:.95rem;font-weight:500}
}
[data-nav-toggle]{position:relative;z-index:60}
/* --- Hero --- */
.hero{padding-top:clamp(2rem,5vw,4rem);position:relative}
.hero__inner{display:grid;gap:clamp(1.5rem,3vw,3rem);grid-template-columns:1fr;align-items:end}
@media(min-width:880px){.hero__inner{grid-template-columns:${heroLayout === 'left' ? '1.1fr .9fr' : '.9fr 1.1fr'};gap:4rem}}
.hero__copy{${heroLayout === 'left' ? '' : 'order:2'}}
.hero__title{margin-bottom:1.5rem}
.hero__title em{font-style:italic;color:var(--color-primary)}
.hero__sub{font-size:1.125rem;color:var(--color-ink-2);max-width:30em;margin-bottom:2rem}
.hero__ctas{display:flex;flex-wrap:wrap;gap:1.25rem;align-items:center}
.hero__media{position:relative;display:grid;gap:.75rem;grid-template-columns:2fr 1fr;grid-template-rows:auto auto}
.hero__media .img--main{grid-column:1/2;grid-row:1/3;aspect-ratio:3/4;border-radius:4px;overflow:hidden;background:var(--color-line)}
.hero__media .img--top{grid-column:2/3;grid-row:1/2;aspect-ratio:1/1;border-radius:4px;overflow:hidden;background:var(--color-line)}
.hero__media .img--bot{grid-column:2/3;grid-row:2/3;aspect-ratio:1/1;border-radius:4px;overflow:hidden;background:var(--color-line)}
.hero__media img{width:100%;height:100%;object-fit:cover}
.hero__sticker{position:absolute;${heroLayout === 'left' ? 'left:-1rem' : 'right:-1rem'};bottom:-1rem;background:var(--color-primary);color:var(--color-on-primary);width:120px;height:120px;border-radius:50%;display:grid;place-items:center;text-align:center;font-family:${f.head};font-size:.85rem;line-height:1.2;padding:1rem;transform:rotate(-8deg);font-weight:700;z-index:2}
@media(min-width:640px){.hero__sticker{width:140px;height:140px;font-size:.95rem}}
/* --- Marquee divider --- */
.marquee{background:var(--color-ink);color:#fff;padding:1.25rem 0;overflow:hidden;font-family:${f.head};font-size:1.5rem;letter-spacing:-.01em;white-space:nowrap}
.marquee__track{display:inline-flex;gap:3rem;animation:marquee 30s linear infinite}
.marquee__track span::before{content:"·";margin-right:3rem;color:var(--color-primary)}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* --- About --- */
.about__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.about__grid{grid-template-columns:1fr 1.4fr;gap:5rem}}
.about__lead{font-size:1.25rem;color:var(--color-ink-2);font-family:${f.head};font-weight:500;font-style:italic;line-height:1.5;white-space:pre-wrap}
.about__sticky{position:sticky;top:2rem}
/* --- Services (the "Menu") --- */
.services{background:#fff;border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line)}
.services h2{margin-bottom:.5rem}
.services__sub{color:var(--color-mute);margin-bottom:3rem;max-width:32em}
.menu{display:grid;gap:0;grid-template-columns:1fr}
@media(min-width:768px){.menu{grid-template-columns:1fr 1fr;column-gap:4rem;row-gap:0}}
.menu__item{padding:1.5rem 0;border-bottom:1px dashed var(--color-line)}
.menu__head{display:flex;align-items:baseline;gap:1rem}
.menu__head::after{content:"";flex:1;border-bottom:1px dotted var(--color-line);transform:translateY(-.3em)}
.menu__name{font-family:${f.head};font-size:1.25rem;font-weight:700}
.menu__price{font-family:${f.head};font-weight:700;color:var(--color-primary);white-space:nowrap}
.menu__desc{margin-top:.5rem;color:var(--color-ink-2);font-size:.95rem}
/* --- Gallery --- */
.gallery{background:var(--color-cream)}
.gallery__masonry{column-count:1;column-gap:.75rem}
@media(min-width:640px){.gallery__masonry{column-count:2}}
@media(min-width:1024px){.gallery__masonry{column-count:3}}
.gallery__item{break-inside:avoid;margin-bottom:.75rem;border-radius:4px;overflow:hidden;background:var(--color-line)}
.gallery__item img{width:100%;height:auto;display:block;cursor:zoom-in;transition:transform .5s ease}
.gallery__item:hover img{transform:scale(1.03)}
/* --- Testimonials --- */
.testimonials{background:var(--color-ink);color:var(--color-cream)}
.testimonials h2{color:var(--color-cream)}
.testimonials__rail{display:grid;gap:2rem;grid-template-columns:1fr;margin-top:2rem}
@media(min-width:880px){.testimonials__rail{grid-template-columns:repeat(2,1fr);gap:3rem}}
.testimonial{padding:1.5rem 0;border-top:1px solid rgba(255,255,255,.15)}
.testimonial__quote{font-family:${f.head};font-size:1.5rem;font-weight:500;font-style:italic;line-height:1.4}
.testimonial__name{margin-top:1rem;font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.7)}
/* --- Contact --- */
.contact__grid{display:grid;gap:3rem;grid-template-columns:1fr}
@media(min-width:880px){.contact__grid{grid-template-columns:1fr 1.1fr;gap:5rem}}
.contact-line{display:block;padding:1rem 0;border-bottom:1px solid var(--color-line)}
.contact-line strong{display:block;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--color-mute);margin-bottom:.25rem}
.contact-line span{font-family:${f.head};font-size:1.25rem}
.hours-list{margin-top:1.5rem}
.hours-row{display:flex;justify-content:space-between;padding:.6rem 0;border-bottom:1px solid var(--color-line);font-family:${f.body}}
.hours-row[data-open="false"] .hours-row__time{color:var(--color-mute);font-style:italic}
.contact-form{display:flex;flex-direction:column;gap:1rem}
.contact-form__row{display:grid;gap:1rem;grid-template-columns:1fr}
@media(min-width:640px){.contact-form__row{grid-template-columns:1fr 1fr}}
.contact-form__field{display:flex;flex-direction:column;gap:.4rem;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--color-mute)}
.contact-form__field input,.contact-form__field textarea{font:400 1rem ${f.body};color:var(--color-ink);border:0;border-bottom:1.5px solid var(--color-ink);background:transparent;padding:.5rem 0 .75rem;border-radius:0;letter-spacing:normal;text-transform:none}
.contact-form__field input:focus,.contact-form__field textarea:focus{outline:none;border-color:var(--color-primary)}
.map-embed{margin-top:2rem;aspect-ratio:4/3;border-radius:4px;overflow:hidden}
.map-embed iframe{width:100%;height:100%;border:0}
/* --- Footer --- */
.site-footer{background:var(--color-ink);color:var(--color-cream);padding:4rem 0 1.5rem}
.site-footer__inner{display:grid;gap:2rem;grid-template-columns:1fr}
@media(min-width:768px){.site-footer__inner{grid-template-columns:2fr 1fr 1fr}}
.site-footer h3{font-family:${f.head};font-size:1.5rem;color:#fff;margin-bottom:1rem}
.site-footer ul{display:flex;flex-direction:column;gap:.5rem;font-size:.95rem;color:rgba(255,255,255,.75)}
.site-footer__bottom{margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.social-links{display:flex;gap:.75rem;margin-top:.5rem}
.social-links a{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.08)}
.social-links a:hover{background:var(--color-primary);color:var(--color-on-primary)}
.social-links svg{width:18px;height:18px}
`;
}

function body(project: SiteProject): string {
  const rng = createRng(project.randomization.seed);
  const services = servicesList(project.content.services);
  const testimonials = testimonialsList(project.content.testimonials);
  const gallery = project.content.gallery;
  const heroMain = gallery[0] ?? project.brand.logo;
  const heroTop = gallery[1] ?? gallery[0] ?? null;
  const heroBot = gallery[2] ?? gallery[1] ?? gallery[0] ?? null;

  const titleWords = project.business.name.split(' ');
  const stylizedTitle =
    titleWords.length > 1
      ? `${escapeHtml(titleWords.slice(0, -1).join(' '))} <em>${escapeHtml(titleWords[titleWords.length - 1] as string)}</em>`
      : `<em>${escapeHtml(project.business.name)}</em>`;

  const tagWords = ['Handcrafted', 'Local', 'Seasonal', 'With love', 'Made daily', 'For the neighbourhood'];
  const marquee = rng.shuffle(tagWords).slice(0, 4).join('  ');

  const orderedServices = rng.bool(0.5) ? rng.shuffle(services) : services;

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        ${logoOrName(project)}
        <button type="button" class="header-toggle" data-nav-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span></button>
        <nav class="primary-nav" id="primary-nav" data-nav data-open="false" aria-label="Primary">
          <ul>
            <li><a href="#about">Story</a></li>
            <li><a href="#services">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#testimonials">Words</a></li>
            <li><a href="#contact">Visit</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="main">
      <!-- HERO ============================================================== -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__inner">
          <div class="hero__copy" data-reveal>
            <span class="eyebrow">${escapeHtml(project.seo.cityRegion || 'Welcome')}</span>
            <h1 id="hero-title" class="hero__title">${stylizedTitle}</h1>
            <p class="hero__sub">${escapeHtml(project.business.tagline)}</p>
            <div class="hero__ctas">
              <a href="#contact" class="cta cta--primary">Visit us</a>
              <a href="#services" class="cta cta--ghost">See the menu →</a>
            </div>
          </div>
          <div class="hero__media" data-reveal>
            ${heroMain ? `<div class="img--main">${imgTag(heroMain, { loading: 'eager' })}</div>` : ''}
            ${heroTop ? `<div class="img--top">${imgTag(heroTop)}</div>` : ''}
            ${heroBot ? `<div class="img--bot">${imgTag(heroBot)}</div>` : ''}
            <div class="hero__sticker" aria-hidden="true">Open<br>today!</div>
          </div>
        </div>
      </section>

      <!-- MARQUEE ============================================================ -->
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
          <span>${escapeHtml(marquee)}</span>
          <span>${escapeHtml(marquee)}</span>
          <span>${escapeHtml(marquee)}</span>
        </div>
      </div>

      <!-- ABOUT ============================================================= -->
      <section class="about" id="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div class="about__sticky" data-reveal>
            <span class="eyebrow">Our story</span>
            <h2 id="about-title">A place to slow down.</h2>
          </div>
          <p class="about__lead" data-reveal>${escapeHtml(project.content.about)}</p>
        </div>
      </section>

      <!-- SERVICES (Menu) ==================================================== -->
      <section class="services" id="services" aria-labelledby="services-title">
        <div class="container">
          <span class="eyebrow">What we offer</span>
          <h2 id="services-title">The menu.</h2>
          <p class="services__sub">A small, considered selection — changing with the seasons and what feels right that week.</p>
          <div class="menu">
${orderedServices
  .map(
    (s) => `            <article class="menu__item" data-reveal>
              <div class="menu__head">
                <span class="menu__name">${escapeHtml(s.name)}</span>
                ${s.price ? `<span class="menu__price">${escapeHtml(s.price)}</span>` : ''}
              </div>
              <p class="menu__desc">${escapeHtml(s.description)}</p>
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
          <span class="eyebrow">A look inside</span>
          <h2 id="gallery-title">Moments.</h2>
          <div class="gallery__masonry" data-lightbox style="margin-top:2rem">
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
          <span class="eyebrow" style="color:rgba(255,255,255,.6)">Kind words</span>
          <h2 id="testimonials-title">From regulars.</h2>
          <div class="testimonials__rail">
${testimonials
  .map(
    (t) => `            <article class="testimonial" data-reveal>
              <p class="testimonial__quote">“${escapeHtml(t.quote)}”</p>
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
            <span class="eyebrow">Find us</span>
            <h2 id="contact-title">Drop in.</h2>
            <div class="contact__details" style="margin-top:1.5rem">
              ${contactBlock(project)}
            </div>
            ${hoursList(project)}
            ${mapEmbed(project)}
          </div>
          <div data-reveal>
            <span class="eyebrow">Send a note</span>
            <h2 style="margin-bottom:1.5rem">Say hello.</h2>
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
          <p style="color:rgba(255,255,255,.7);max-width:30em;font-family:${'inherit'};">${escapeHtml(project.business.tagline)}</p>
          ${socialLinks(project)}
        </div>
        <div>
          <h3 style="font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;font-family:inherit">Visit</h3>
          <ul><li>${escapeHtml(project.business.address)}</li>${project.business.phone ? `<li>${escapeHtml(project.business.phone)}</li>` : ''}</ul>
        </div>
        <div>
          <h3 style="font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;font-family:inherit">Browse</h3>
          <ul>
            <li><a href="#about">Story</a></li>
            <li><a href="#services">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© <span data-year>${new Date().getFullYear()}</span> ${escapeHtml(project.business.name)}</span>
        <span>Made with care${project.seo.cityRegion ? ` in ${escapeHtml(project.seo.cityRegion)}` : ''}</span>
      </div>
    </footer>`;
}

export const TEMPLATE_02: TemplateModule = { meta: META, css, body };
