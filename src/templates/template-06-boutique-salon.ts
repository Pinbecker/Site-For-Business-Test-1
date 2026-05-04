import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { TEMPLATE_02 } from './template-02-editorial-cafe';

const META: TemplateMeta = {
  id: 'boutique-salon',
  name: 'Boutique Salon',
  description: 'Elegant editorial look with luxury touchpoints for salons, beauty studios, and boutique services.',
  bestFor: ['hair-beauty', 'retail-shop'],
  vibe: 'Elegant · Boutique · Refined',
};

function css(project: SiteProject): string {
  return `${TEMPLATE_02.css(project)}\n.hero__title{max-width:16ch}.services__grid .service{border-width:1.5px}`;
}

export const TEMPLATE_06: TemplateModule = { meta: META, css, body: TEMPLATE_02.body };
