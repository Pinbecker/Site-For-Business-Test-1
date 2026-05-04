import type { SiteProject, TemplateMeta } from '@/types/project';
import type { TemplateModule } from '@/engine/render';
import { TEMPLATE_03 } from './template-03-studio-grid';

const META: TemplateMeta = {
  id: 'corporate-grid',
  name: 'Corporate Grid',
  description: 'Clean modular blocks with enterprise-style hierarchy and clear conversion-focused sections.',
  bestFor: ['professional-services', 'trades-contractor'],
  vibe: 'Modern · Corporate · Conversion-led',
};

function css(project: SiteProject): string {
  return `${TEMPLATE_03.css(project)}\n:root{--max:1280px}.about__grid,.contact__grid{gap:clamp(1.5rem,3vw,3rem)}`;
}

export const TEMPLATE_07: TemplateModule = { meta: META, css, body: TEMPLATE_03.body };
