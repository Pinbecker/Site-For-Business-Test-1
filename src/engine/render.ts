import type { SiteProject, TemplateId, TemplateMeta, Industry } from '@/types/project';
import { CLIENT_JS } from './clientScript';
import { SHARED_CSS } from './sharedCss';
import { minifyCss, minifyJs } from './minify';
import { renderHead, renderRobots, renderSitemap, deriveOgImage, imagePath } from './seo';
import {
  TEMPLATE_EXPERT,
  TEMPLATE_HEARTH,
  TEMPLATE_HOSPITALITY,
  TEMPLATE_LUMINA,
  TEMPLATE_PORTFOLIO,
  TEMPLATE_SERVICE_PRO,
  TEMPLATE_SLATE,
  TEMPLATE_VIVID,
} from '@/templates/realTemplates';

export interface TemplateModule {
  meta: TemplateMeta;
  /** Visual CSS specific to this template. Will be combined with SHARED_CSS. */
  css: (project: SiteProject) => string;
  /** Inner HTML between <body>…</body> for this template. */
  body: (project: SiteProject) => string;
}

export const TEMPLATES: Record<TemplateId, TemplateModule> = {
  'service-pro': TEMPLATE_SERVICE_PRO,
  'hospitality-editorial': TEMPLATE_HOSPITALITY,
  'portfolio-studio': TEMPLATE_PORTFOLIO,
  'expert-firm': TEMPLATE_EXPERT,
  'lumina-wellness': TEMPLATE_LUMINA,
  'vivid-bold': TEMPLATE_VIVID,
  'hearth-local': TEMPLATE_HEARTH,
  'slate-minimal': TEMPLATE_SLATE,
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES).map((t) => t.meta);

export function suggestTemplate(industry: Industry): TemplateId {
  // Pick the first template whose bestFor includes this industry, otherwise fall back.
  for (const t of Object.values(TEMPLATES)) {
    if (t.meta.bestFor.includes(industry)) return t.meta.id;
  }
  return 'service-pro';
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
  const tpl = TEMPLATES[project.templateId] ?? TEMPLATES['service-pro'];
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
