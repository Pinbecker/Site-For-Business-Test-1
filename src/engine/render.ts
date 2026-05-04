import type { SiteProject, TemplateId, TemplateMeta, Industry } from '@/types/project';
import { CLIENT_JS } from './clientScript';
import { SHARED_CSS } from './sharedCss';
import { minifyCss, minifyJs } from './minify';
import { renderHead, renderRobots, renderSitemap, deriveOgImage, imagePath } from './seo';
import { TEMPLATE_01 } from '@/templates/template-01-classic-trade';
import { TEMPLATE_02 } from '@/templates/template-02-editorial-cafe';
import { TEMPLATE_03 } from '@/templates/template-03-studio-grid';
import { TEMPLATE_04 } from '@/templates/template-04-bold-fitness';
import { TEMPLATE_05 } from '@/templates/template-05-executive-consulting';
import { TEMPLATE_06 } from '@/templates/template-06-boutique-salon';
import { TEMPLATE_07 } from '@/templates/template-07-corporate-grid';
import { TEMPLATE_08 } from '@/templates/template-08-performance-pro';
import { TEMPLATE_09 } from '@/templates/template-09-neon-dark';
import { TEMPLATE_10 } from '@/templates/template-10-luxury-minimal';
import { TEMPLATE_11 } from '@/templates/template-11-retro-americana';
import { TEMPLATE_12 } from '@/templates/template-12-brutalist-news';

export interface TemplateModule {
  meta: TemplateMeta;
  /** Visual CSS specific to this template. Will be combined with SHARED_CSS. */
  css: (project: SiteProject) => string;
  /** Inner HTML between <body>…</body> for this template. */
  body: (project: SiteProject) => string;
}

export const TEMPLATES: Record<TemplateId, TemplateModule> = {
  'classic-trade': TEMPLATE_01,
  'editorial-cafe': TEMPLATE_02,
  'studio-grid': TEMPLATE_03,
  'bold-fitness': TEMPLATE_04,
  'executive-consulting': TEMPLATE_05,
  'boutique-salon': TEMPLATE_06,
  'corporate-grid': TEMPLATE_07,
  'performance-pro': TEMPLATE_08,
  'neon-dark': TEMPLATE_09,
  'luxury-minimal': TEMPLATE_10,
  'retro-americana': TEMPLATE_11,
  'brutalist-news': TEMPLATE_12,
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES).map((t) => t.meta);

export function suggestTemplate(industry: Industry): TemplateId {
  // Pick the first template whose bestFor includes this industry, otherwise fall back.
  for (const t of Object.values(TEMPLATES)) {
    if (t.meta.bestFor.includes(industry)) return t.meta.id;
  }
  return 'classic-trade';
}

export interface RenderedSite {
  /** Pretty-printed (human-readable) HTML. */
  html: string;
  /** Combined CSS, unminified. */
  css: string;
  /** Combined JS, unminified. */
  js: string;
  /** Minified CSS (for export). */
  cssMin: string;
  /** Minified JS (for export). */
  jsMin: string;
  /** sitemap.xml contents. */
  sitemap: string;
  /** robots.txt contents. */
  robots: string;
  /** project.json contents (the SiteProject serialized). */
  projectJson: string;
}

export function renderSite(project: SiteProject): RenderedSite {
  const tpl = TEMPLATES[project.templateId] ?? TEMPLATES['classic-trade'];
  const og = deriveOgImage(project);

  const css = SHARED_CSS + '\n' + tpl.css(project);
  const js = CLIENT_JS;

  const head = renderHead(project, { ogImagePath: og.path });
  const body = tpl.body(project);

  const html = `<!doctype html>
<html lang="en">
  <head>
${head}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
${body}
    <script src="assets/js/main.min.js" defer></script>
  </body>
</html>
`;

  return {
    html,
    css,
    js,
    cssMin: minifyCss(css),
    jsMin: minifyJs(js),
    sitemap: renderSitemap(project),
    robots: renderRobots(project),
    projectJson: JSON.stringify(project, null, 2),
  };
}

export { imagePath };
