import type { SiteProject } from '@/types/project';
import { CLIENT_JS } from './clientScript';
import { SHARED_CSS } from './sharedCss';
import { TEMPLATES } from './render';
import { escapeAttr, escapeHtml, sanitizeMeta } from './escape';
import { deriveOgImage } from './seo';

/**
 * Build a single self-contained HTML document for the live preview iframe.
 * Inlines CSS and JS, and rewrites image references to data URLs by
 * substituting the asset paths the templates emit.
 */
export function renderPreview(project: SiteProject): string {
  const tpl = TEMPLATES[project.templateId] ?? TEMPLATES['service-pro'];
  const css = SHARED_CSS + '\n' + tpl.css(project);
  const og = deriveOgImage(project);

  let body = tpl.body(project);
  // Replace all "assets/images/<id>.<ext>" with the matching dataUrl.
  const all = [
    ...project.content.gallery,
    ...(project.brand.logo ? [project.brand.logo] : []),
    ...(og.asset ? [og.asset] : []),
  ];
  const seen = new Set<string>();
  for (const a of all) {
    if (seen.has(a.id)) continue;
    seen.add(a.id);
    const ext = extFromMime(a.mimeType);
    const re = new RegExp(`assets/images/${a.id}\\.${ext}`, 'g');
    body = body.replace(re, a.dataUrl);
  }

  const title = sanitizeMeta(project.seo.pageTitle || project.business.name, 70);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="theme-color" content="${escapeAttr(project.brand.primaryColor)}" />
    <style>${css}</style>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
${body}
    <script>${CLIENT_JS}</script>
  </body>
</html>`;
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
