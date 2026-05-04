import type { SiteProject, ImageAsset } from '@/types/project';
import { escapeAttr, escapeHtml, escapeJsonLd, sanitizeMeta } from './escape';
import { toSchemaHours } from './format';

export interface SeoContext {
  /** Path of the social/og image inside assets/images, or empty string. */
  ogImagePath: string;
}

export function deriveOgImage(project: SiteProject): { asset: ImageAsset | null; path: string } {
  const first = project.content.gallery[0] ?? project.brand.logo;
  if (!first) return { asset: null, path: '' };
  return { asset: first, path: `assets/images/${first.id}.${extFromMime(first.mimeType)}` };
}

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/gif': 'gif',
  };
  return map[mime.toLowerCase()] ?? 'png';
}

export function imagePath(asset: ImageAsset): string {
  return `assets/images/${asset.id}.${extFromMime(asset.mimeType)}`;
}

export function renderHead(project: SiteProject, ctx: SeoContext): string {
  const { business, seo, brand } = project;
  const title = sanitizeMeta(seo.pageTitle || business.name, 70);
  const desc = sanitizeMeta(seo.metaDescription || business.tagline, 160);
  const keywords = sanitizeMeta(seo.keywords, 250);
  const canonical = (seo.canonicalUrl || '').trim();
  const og = ctx.ogImagePath;

  const lines: string[] = [];
  lines.push('<meta charset="utf-8" />');
  lines.push('<meta name="viewport" content="width=device-width, initial-scale=1" />');
  lines.push(`<title>${escapeHtml(title)}</title>`);
  if (desc) lines.push(`<meta name="description" content="${escapeAttr(desc)}" />`);
  if (keywords) lines.push(`<meta name="keywords" content="${escapeAttr(keywords)}" />`);
  if (canonical) lines.push(`<link rel="canonical" href="${escapeAttr(canonical)}" />`);
  lines.push(`<meta name="theme-color" content="${escapeAttr(brand.primaryColor)}" />`);

  // Open Graph
  lines.push('<meta property="og:type" content="website" />');
  lines.push(`<meta property="og:title" content="${escapeAttr(title)}" />`);
  if (desc) lines.push(`<meta property="og:description" content="${escapeAttr(desc)}" />`);
  if (canonical) lines.push(`<meta property="og:url" content="${escapeAttr(canonical)}" />`);
  if (og) lines.push(`<meta property="og:image" content="${escapeAttr(og)}" />`);
  lines.push(`<meta property="og:site_name" content="${escapeAttr(business.name)}" />`);

  // Twitter
  lines.push('<meta name="twitter:card" content="summary_large_image" />');
  lines.push(`<meta name="twitter:title" content="${escapeAttr(title)}" />`);
  if (desc) lines.push(`<meta name="twitter:description" content="${escapeAttr(desc)}" />`);
  if (og) lines.push(`<meta name="twitter:image" content="${escapeAttr(og)}" />`);

  // Schema.org JSON-LD — LocalBusiness, auto-populated.
  const jsonLd = renderLocalBusinessJsonLd(project, ctx);
  lines.push(`<script type="application/ld+json">${jsonLd}</script>`);

  // Stylesheet & favicon
  lines.push('<link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg" />');
  lines.push('<link rel="stylesheet" href="assets/css/style.min.css" />');

  return lines.map((l) => '    ' + l).join('\n');
}

export function renderLocalBusinessJsonLd(project: SiteProject, ctx: SeoContext): string {
  const { business, seo, content } = project;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: seo.metaDescription || business.tagline,
    image: ctx.ogImagePath || undefined,
    telephone: business.phone || undefined,
    email: business.email || undefined,
    url: seo.canonicalUrl || undefined,
    address: business.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: business.address,
          addressLocality: seo.cityRegion || undefined,
        }
      : undefined,
    areaServed: seo.cityRegion || undefined,
    openingHoursSpecification: toSchemaHours(business.hours),
    sameAs: [content.social.instagram, content.social.facebook, content.social.tiktok]
      .map((s) => s.trim())
      .filter(Boolean),
  };
  // Strip undefineds so the JSON stays clean.
  const clean = JSON.parse(JSON.stringify(data));
  return escapeJsonLd(clean);
}

export function renderRobots(project: SiteProject): string {
  const canonical = project.seo.canonicalUrl.trim();
  const lines = ['User-agent: *', 'Allow: /'];
  if (canonical) lines.push(`Sitemap: ${stripTrailingSlash(canonical)}/sitemap.xml`);
  return lines.join('\n') + '\n';
}

export function renderSitemap(project: SiteProject): string {
  const canonical = project.seo.canonicalUrl.trim() || 'https://example.com';
  const url = stripTrailingSlash(canonical);
  const lastmod = (project.updatedAt || new Date().toISOString()).slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(url + '/')}</loc>
    <lastmod>${escapeHtml(lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function stripTrailingSlash(s: string): string {
  return s.replace(/\/+$/, '');
}
