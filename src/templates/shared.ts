/**
 * Shared template helpers — small, presentational utilities reused across
 * all templates. Each template still owns its own HTML structure.
 */

import type { ImageAsset, ServiceItem, SiteProject, Testimonial } from '@/types/project';
import { escapeAttr, escapeHtml } from '@/engine/escape';
import { formatHours, mailtoHref, telHref } from '@/engine/format';
import { imagePath } from '@/engine/seo';

export function imgTag(asset: ImageAsset, opts: { className?: string; sizes?: string; loading?: 'lazy' | 'eager' } = {}): string {
  const cls = opts.className ? ` class="${escapeAttr(opts.className)}"` : '';
  const loading = opts.loading ?? 'lazy';
  const path = imagePath(asset);
  // WebP conversion hint (kept as a comment in the unminified HTML).
  const hint = `<!-- WebP hint: convert ${escapeHtml(asset.filename)} to WebP for production -->`;
  return `${hint}\n<img${cls} src="${escapeAttr(path)}" data-full="${escapeAttr(path)}" alt="${escapeAttr(asset.alt || '')}" loading="${loading}" decoding="async" />`;
}

export function netlifyFormFields(project: SiteProject): string {
  const formName = `contact-${project.id.slice(0, 8)}`;
  return `
        <form name="${escapeAttr(formName)}" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
          <input type="hidden" name="form-name" value="${escapeAttr(formName)}" />
          <p class="visually-hidden" aria-hidden="true">
            <label>Don’t fill this out: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
          </p>
          <div class="contact-form__row">
            <label class="contact-form__field">
              <span>Name</span>
              <input type="text" name="name" required autocomplete="name" />
            </label>
            <label class="contact-form__field">
              <span>Email</span>
              <input type="email" name="email" required autocomplete="email" />
            </label>
          </div>
          <label class="contact-form__field">
            <span>Phone (optional)</span>
            <input type="tel" name="phone" autocomplete="tel" />
          </label>
          <label class="contact-form__field">
            <span>Message</span>
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit" class="cta cta--primary">Send message</button>
        </form>`;
}

export function hoursList(project: SiteProject, opts: { className?: string } = {}): string {
  const rows = formatHours(project.business.hours);
  const cls = opts.className ?? 'hours-list';
  return `<ul class="${escapeAttr(cls)}">
${rows
  .map(
    (r) =>
      `          <li class="hours-row" data-open="${r.open}"><span class="hours-row__day">${escapeHtml(r.label)}</span><span class="hours-row__time">${escapeHtml(r.text)}</span></li>`,
  )
  .join('\n')}
        </ul>`;
}

export function socialLinks(project: SiteProject, opts: { className?: string } = {}): string {
  const cls = opts.className ?? 'social-links';
  const { instagram, facebook, tiktok } = project.content.social;
  const items: Array<{ label: string; url: string; svg: string }> = [];
  if (instagram)
    items.push({
      label: 'Instagram',
      url: instagram,
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    });
  if (facebook)
    items.push({
      label: 'Facebook',
      url: facebook,
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.4-3H14V8z"/></svg>',
    });
  if (tiktok)
    items.push({
      label: 'TikTok',
      url: tiktok,
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v10a3 3 0 1 1-3-3"/><path d="M12 4c.5 2.5 2.5 4.5 5 5"/></svg>',
    });
  if (!items.length) return '';
  return `<ul class="${escapeAttr(cls)}">
${items
  .map(
    (it) =>
      `          <li><a href="${escapeAttr(it.url)}" rel="noopener noreferrer" target="_blank" aria-label="${escapeAttr(it.label)}">${it.svg}<span class="visually-hidden">${escapeHtml(it.label)}</span></a></li>`,
  )
  .join('\n')}
        </ul>`;
}

export function contactBlock(project: SiteProject): string {
  const { phone, email, address } = project.business;
  const lines: string[] = [];
  if (phone) lines.push(`<a href="${escapeAttr(telHref(phone))}" class="contact-line"><strong>Phone</strong><span>${escapeHtml(phone)}</span></a>`);
  if (email) lines.push(`<a href="${escapeAttr(mailtoHref(email))}" class="contact-line"><strong>Email</strong><span>${escapeHtml(email)}</span></a>`);
  if (address) lines.push(`<div class="contact-line"><strong>Visit</strong><span>${escapeHtml(address)}</span></div>`);
  return lines.join('\n        ');
}

export function servicesList(items: ServiceItem[]): ServiceItem[] {
  return items.filter((s) => s.name.trim().length > 0);
}

export function testimonialsList(items: Testimonial[]): Testimonial[] {
  return items.filter((t) => t.quote.trim().length > 0);
}

export function visuallyHiddenCss(): string {
  return `.visually-hidden{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`;
}

export function logoOrName(project: SiteProject, opts: { className?: string } = {}): string {
  const cls = opts.className ?? 'brand-mark';
  if (project.brand.logo) {
    return `<a href="#top" class="${escapeAttr(cls)}" aria-label="${escapeAttr(project.business.name)} home">
        <img src="${escapeAttr(imagePath(project.brand.logo))}" alt="${escapeAttr(project.brand.logo.alt || project.business.name)}" />
      </a>`;
  }
  return `<a href="#top" class="${escapeAttr(cls)}">${escapeHtml(project.business.name)}</a>`;
}

export function mapEmbed(project: SiteProject): string {
  const url = project.business.mapsEmbedUrl.trim();
  if (!url) return '';
  return `<div class="map-embed"><iframe src="${escapeAttr(url)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of ${escapeAttr(project.business.name)}" aria-label="Map showing ${escapeAttr(project.business.name)} location"></iframe></div>`;
}


export function professionalOverhaulCss(opts: { primary: string; secondary: string; head: string }): string {
  const { primary, secondary, head } = opts;
  return `
/* --- 2026 Professional overhaul layer ------------------------------------ */
:root{
  --sf-radius-xs:10px;
  --sf-radius-sm:14px;
  --sf-radius-md:18px;
  --sf-radius-lg:24px;
  --sf-shadow-1:0 10px 28px rgba(16,24,40,.06);
  --sf-shadow-2:0 18px 44px rgba(16,24,40,.12);
  --sf-grid-gap:clamp(1rem,2vw,1.5rem);
}
body{letter-spacing:.0025em}
.site-header{box-shadow:0 1px 0 rgba(15,23,42,.07),0 12px 40px rgba(15,23,42,.05)}
.site-header__inner{min-height:78px}
.brand-mark{font-family:${head};font-weight:700}
section h2{font-family:${head};letter-spacing:-.02em}
.hero{isolation:isolate}
.hero::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(1200px 300px at 80% -20%, ${primary}18, transparent 45%)}
.hero__title{max-width:18ch;text-wrap:balance}
.hero__sub{line-height:1.65;max-width:58ch}
.hero__ctas .cta{box-shadow:var(--sf-shadow-1)}
.hero__media,.about__media,.gallery__item,.testimonial,.service,.contact-form,.hours-list{border-radius:var(--sf-radius-md)}
.hero__media,.gallery__item,.testimonial,.service,.contact-form,.hours-list,.about__stat{box-shadow:var(--sf-shadow-1)}
.about{position:relative;overflow:hidden}
.about::before{content:"";position:absolute;width:min(42vw,420px);aspect-ratio:1/1;right:-16%;top:-28%;background:radial-gradient(circle, ${secondary}22 0%, transparent 68%);pointer-events:none}
.about__lead{font-size:clamp(1.05rem,1.1vw,1.2rem);line-height:1.72}
.about__stats{gap:var(--sf-grid-gap)}
.about__stat{padding:1.35rem;border:1px solid color-mix(in srgb, ${primary} 20%, white)}
.about__stat span{color:#5a6474}
.services__sub{line-height:1.7;color:#4a5567;max-width:56ch}
.services__grid{gap:var(--sf-grid-gap)}
.service{padding:clamp(1.25rem,2vw,1.75rem);border:1px solid color-mix(in srgb, ${primary} 16%, #d8dbe2);background:linear-gradient(180deg,#fff, #fbfcff)}
.service__name{line-height:1.25}
.service__desc{line-height:1.65}
.service__price{font-size:1.02rem;color:#111827}
.gallery{position:relative}
.gallery::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.0) 40%);pointer-events:none}
.gallery__grid{gap:clamp(.65rem,1.2vw,.9rem)}
.gallery__item{overflow:hidden;border:1px solid rgba(255,255,255,.12)}
.gallery__item img{transition:transform .45s ease,filter .45s ease}
.gallery__item:hover img{transform:scale(1.06);filter:saturate(1.08)}
.testimonials{background:linear-gradient(180deg, #fff 0%, #f8fafc 100%)}
.testimonials__grid{gap:var(--sf-grid-gap)}
.testimonial{border:1px solid #e8ecf2;padding:clamp(1.25rem,2vw,1.75rem)}
.testimonial__quote{line-height:1.72}
.testimonial__name{font-size:.95rem;letter-spacing:.01em;text-transform:uppercase;color:${primary}}
.contact{position:relative}
.contact::after{content:"";position:absolute;left:-20%;bottom:-30%;width:min(45vw,460px);aspect-ratio:1/1;background:radial-gradient(circle, ${primary}14 0%, transparent 70%);pointer-events:none}
.contact__grid{gap:clamp(1.5rem,2.2vw,2.5rem)}
.contact-line{gap:.3rem;line-height:1.5}
.contact-form{padding:clamp(1.15rem,2vw,1.8rem);border:1px solid #e6eaf1}
.contact-form__field span{font-weight:600;color:#374151}
.contact-form__field input,.contact-form__field textarea{border-radius:12px;border:1px solid #d7dde7;background:#fff}
.contact-form__field input:hover,.contact-form__field textarea:hover{border-color:#b8c1d1}
.contact-form__field input:focus,.contact-form__field textarea:focus{box-shadow:0 0 0 4px color-mix(in srgb, ${primary} 28%, white)}
.map-embed{border-radius:var(--sf-radius-sm);box-shadow:var(--sf-shadow-1)}
.site-footer{position:relative;overflow:hidden}
.site-footer::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)}
.site-footer__inner{gap:1.5rem}
.site-footer__bottom{font-size:.82rem}
.social-links a{border:1px solid rgba(255,255,255,.14)}
@media(min-width:720px){
  .hero__ctas{gap:1rem}
  .contact-form__row{gap:1rem}
}
@media(min-width:1024px){
  .hero__inner,.about__grid,.contact__grid{align-items:stretch}
  .service:hover,.testimonial:hover,.about__stat:hover{transform:translateY(-2px);box-shadow:var(--sf-shadow-2)}
}
@media(max-width:640px){
  .hero__title{font-size:clamp(1.95rem,10vw,2.5rem)}
  .site-header__inner{min-height:72px}
  .service,.testimonial,.contact-form{padding:1.1rem}
}
`;
}
