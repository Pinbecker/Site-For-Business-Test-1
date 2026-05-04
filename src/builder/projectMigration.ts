import type { SiteProject, TemplateId } from '@/types/project';
import { SCHEMA_VERSION } from '@/types/project';
import { defaultProject } from './defaults';

const LEGACY_TEMPLATE_TO_NEW: Record<string, TemplateId> = {
  'classic-trade': 'service-pro',
  'bold-fitness': 'service-pro',
  'corporate-grid': 'service-pro',
  'performance-pro': 'service-pro',
  'editorial-cafe': 'hospitality-editorial',
  'boutique-salon': 'hospitality-editorial',
  'retro-americana': 'hospitality-editorial',
  'studio-grid': 'portfolio-studio',
  'neon-dark': 'portfolio-studio',
  'executive-consulting': 'expert-firm',
  'luxury-minimal': 'expert-firm',
  'brutalist-news': 'expert-firm',
};

export function hydrateProject(input: SiteProject): SiteProject {
  const fallback = defaultProject();
  const templateId = normalizeTemplateId(String(input.templateId));

  return {
    ...input,
    schemaVersion: SCHEMA_VERSION,
    templateId,
    project: {
      ...fallback.project,
      customerName: input.project?.customerName || input.business?.name || fallback.project.customerName,
      internalNotes: input.project?.internalNotes ?? fallback.project.internalNotes,
      status: input.project?.status ?? fallback.project.status,
    },
    content: {
      ...fallback.content,
      ...input.content,
      promotion: {
        ...fallback.content.promotion,
        ...input.content?.promotion,
      },
      social: {
        ...fallback.content.social,
        ...input.content?.social,
      },
    },
  };
}

function normalizeTemplateId(value: string): TemplateId {
  if (
    value === 'service-pro' ||
    value === 'hospitality-editorial' ||
    value === 'portfolio-studio' ||
    value === 'expert-firm'
  ) {
    return value;
  }
  return LEGACY_TEMPLATE_TO_NEW[value] ?? 'service-pro';
}
