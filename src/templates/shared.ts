/**
 * Shared template helpers — small, presentational utilities reused across
 * all templates. Each template still owns its own HTML structure.
 */

import type { ButtonConfig, HeadingConfig, ImageAsset, ServiceItem, ShapeConfig, SiteProject, SpacingConfig, TemplateConfig, Testimonial } from '@/types/project';
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
        <form name="${escapeAttr(formName)}" method="POST" action="/?success=true" netlify data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
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

export function resolveConfig(config: TemplateConfig): string {
  const parts: string[] = [];

  // ── Spacing ──────────────────────────────────────────────────────────────
  const padMap: Record<SpacingConfig, string | null> = {
    compact: 'clamp(2.5rem,5vw,3.5rem)',
    default: null,
    airy: 'clamp(6rem,12vw,10rem)',
  };
  const pad = padMap[config.spacing];
  if (pad) {
    // Target all sections except template hero sections which intentionally use padding:0
    parts.push(
      `section:not(.sp-hero):not(.he-hero):not(.ps-hero):not(.lw-hero):not(.vi-hero):not(.ht-hero):not(.sl-hero){padding-block:${pad}!important}`,
    );
  }

  // ── Shape ─────────────────────────────────────────────────────────────────
  const rMap: Record<ShapeConfig, string | null> = { sharp: '0px', default: null, generous: '24px' };
  const rLgMap: Record<ShapeConfig, string | null> = { sharp: '0px', default: null, generous: '40px' };
  const r = rMap[config.shape];
  const rLg = rLgMap[config.shape];
  if (r !== null) {
    // Cards, service tiles, feature blocks, quote cards, contact form
    const cardSel = [
      '.sp-service,.sp-feature,.sp-process-step,.sp-quote-card,.sp-team-member',
      '.he-feature,.he-testimonial',
      '.ef-service,.ef-credential',
      '.lw-service,.lw-team-member',
      '.vi-service,.vi-stat',
      '.ht-service,.ht-feature',
      '.sl-stat,.sl-feature',
      '.contact-form',
    ].join(',');
    parts.push(`${cardSel}{border-radius:${r}!important}`);
  }
  if (rLg !== null) {
    // Larger image/map containers
    const containerSel = '.sp-hero__panel,.map-embed iframe,.ps-contact__inner';
    parts.push(`${containerSel}{border-radius:${rLg}!important}`);
  }

  // ── Buttons ───────────────────────────────────────────────────────────────
  const btnMap: Record<ButtonConfig, string | null> = { square: '0px', default: null, pill: '999px' };
  const btnR = btnMap[config.buttons];
  if (btnR !== null) {
    parts.push(
      `.cta,.cta--primary,.cta--outline,.cta--ghost,.cta--secondary,.btn,.btn-primary,.btn-secondary{border-radius:${btnR}!important}`,
    );
  }

  // ── Headings ──────────────────────────────────────────────────────────────
  const hwMap: Record<HeadingConfig, string | null> = { light: '300', default: null, heavy: '900' };
  const hw = hwMap[config.headings];
  if (hw !== null) {
    parts.push(`h1,h2{font-weight:${hw}!important}`);
  }

  return parts.join('');
}

export function mapEmbed(project: SiteProject): string {
  const url = project.business.mapsEmbedUrl.trim();
  if (!url) return '';
  return `<div class="map-embed"><iframe src="${escapeAttr(url)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of ${escapeAttr(project.business.name)}" aria-label="Map showing ${escapeAttr(project.business.name)} location"></iframe></div>`;
}

