import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { TEMPLATE_01 } from './template-01-classic-trade';

const META: TemplateMeta = {
  id: 'executive-consulting',
  name: 'Executive Consulting',
  description: 'Premium corporate styling with refined spacing and polished service cards for high-trust firms.',
  bestFor: ['professional-services', 'other'],
  vibe: 'Executive · Premium · Structured',
};

function css(project: SiteProject): string {
  return `${TEMPLATE_01.css(project)}\n:root{--max:1260px}.hero__title{letter-spacing:-.03em}.service{border-radius:20px}.testimonial{border-radius:20px}`;
}

export const TEMPLATE_05: TemplateModule = { meta: META, css, body: TEMPLATE_01.body };
