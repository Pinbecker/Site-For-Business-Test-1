import type { SiteProject, TemplateId, TemplateMeta, Industry } from '@/types/project';
import { CLIENT_JS } from './clientScript';
import { SHARED_CSS } from './sharedCss';
import { minifyCss, minifyJs } from './minify';
import { renderHead, renderRobots, renderSitemap, deriveOgImage, imagePath } from './seo';
import { COMPOSABLE_PRESETS, createComposableTemplate } from '@/templates/composable';

export interface TemplateModule {
  meta: TemplateMeta;
  /** Visual CSS specific to this template. Will be combined with SHARED_CSS. */
  css: (project: SiteProject) => string;
  /** Inner HTML between <body>…</body> for this template. */
  body: (project: SiteProject) => string;
}

export const TEMPLATES: Record<TemplateId, TemplateModule> = {
  'classic-trade': createComposableTemplate(COMPOSABLE_PRESETS['classic-trade']),
  'editorial-cafe': createComposableTemplate(COMPOSABLE_PRESETS['editorial-cafe']),
  'studio-grid': createComposableTemplate(COMPOSABLE_PRESETS['studio-grid']),
  'bold-fitness': createComposableTemplate(COMPOSABLE_PRESETS['bold-fitness']),
  'executive-consulting': createComposableTemplate(COMPOSABLE_PRESETS['executive-consulting']),
  'boutique-salon': createComposableTemplate(COMPOSABLE_PRESETS['boutique-salon']),
  'corporate-grid': createComposableTemplate(COMPOSABLE_PRESETS['corporate-grid']),
  'performance-pro': createComposableTemplate(COMPOSABLE_PRESETS['performance-pro']),
  'neon-dark': createComposableTemplate(COMPOSABLE_PRESETS['neon-dark']),
  'luxury-minimal': createComposableTemplate(COMPOSABLE_PRESETS['luxury-minimal']),
  'retro-americana': createComposableTemplate(COMPOSABLE_PRESETS['retro-americana']),
  'brutalist-news': createComposableTemplate(COMPOSABLE_PRESETS['brutalist-news']),
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
