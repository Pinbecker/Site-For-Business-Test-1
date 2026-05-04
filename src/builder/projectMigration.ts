import type { DesignSettings, SiteProject, TemplateId } from '@/types/project';
import { SCHEMA_VERSION } from '@/types/project';
import { defaultDesignSettings, defaultProject } from './defaults';

const LEGACY_TEMPLATE_TO_DESIGN: Partial<Record<TemplateId, Partial<DesignSettings>>> = {
  'classic-trade': {
    mood: 'assured',
    fontStyle: 'modern',
    heroLayout: 'service-led',
    serviceLayout: 'cards',
  },
  'editorial-cafe': {
    mood: 'warm',
    fontStyle: 'editorial',
    heroLayout: 'editorial',
    serviceLayout: 'price-menu',
    galleryLayout: 'masonry',
  },
  'studio-grid': {
    mood: 'crisp',
    fontStyle: 'technical',
    heroLayout: 'poster',
    sectionLayout: 'feature',
    galleryLayout: 'showcase',
  },
  'bold-fitness': {
    mood: 'expressive',
    fontStyle: 'technical',
    heroLayout: 'poster',
    density: 'compact',
    contrast: 'high',
  },
  'executive-consulting': {
    mood: 'assured',
    fontStyle: 'classic',
    heroLayout: 'split',
    navStyle: 'centered',
    depthStyle: 'flat',
  },
  'boutique-salon': {
    mood: 'premium',
    fontStyle: 'editorial',
    heroLayout: 'stacked',
    galleryLayout: 'masonry',
  },
  'corporate-grid': {
    mood: 'crisp',
    fontStyle: 'modern',
    sectionLayout: 'compact',
    serviceLayout: 'feature-grid',
  },
  'performance-pro': {
    mood: 'expressive',
    fontStyle: 'technical',
    heroLayout: 'service-led',
    serviceLayout: 'feature-grid',
    contrast: 'high',
  },
  'neon-dark': {
    mood: 'expressive',
    fontStyle: 'technical',
    contrast: 'high',
    depthStyle: 'elevated',
  },
  'luxury-minimal': {
    mood: 'premium',
    fontStyle: 'editorial',
    heroLayout: 'split',
    sectionLayout: 'spacious',
    depthStyle: 'flat',
  },
  'retro-americana': {
    mood: 'playful',
    fontStyle: 'friendly',
    heroLayout: 'poster',
    cornerStyle: 'sharp',
  },
  'brutalist-news': {
    mood: 'crisp',
    fontStyle: 'technical',
    heroLayout: 'editorial',
    cornerStyle: 'sharp',
    contrast: 'high',
    depthStyle: 'flat',
  },
};

export function hydrateProject(input: SiteProject): SiteProject {
  const fallback = defaultProject();
  const defaults = defaultDesignSettings();
  const legacy = LEGACY_TEMPLATE_TO_DESIGN[input.templateId] ?? {};
  const design = { ...defaults, ...legacy, ...(input.design ?? {}) };
  design.sectionOrder = mergeSectionOrder(input.design?.sectionOrder, defaults.sectionOrder);

  return {
    ...input,
    schemaVersion: SCHEMA_VERSION,
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
    design,
  };
}

function mergeSectionOrder(
  saved: DesignSettings['sectionOrder'] | undefined,
  defaults: DesignSettings['sectionOrder'],
): DesignSettings['sectionOrder'] {
  const next = saved?.length ? saved.slice() : defaults.slice();
  for (const id of defaults) {
    if (!next.includes(id)) next.push(id);
  }
  return next.filter((id, index) => next.indexOf(id) === index);
}
