import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { TEMPLATE_04 } from './template-04-bold-fitness';

const META: TemplateMeta = {
  id: 'performance-pro',
  name: 'Performance Pro',
  description: 'High-energy professional layout tuned for coaching, wellness, and growth-focused brands.',
  bestFor: ['fitness-wellness', 'other'],
  vibe: 'High-performance · Polished · Bold',
};

function css(project: SiteProject): string {
  return `${TEMPLATE_04.css(project)}\n.hero__content{max-width:60ch}.service{backdrop-filter:saturate(1.05)}`;
}

export const TEMPLATE_08: TemplateModule = { meta: META, css, body: TEMPLATE_04.body };
