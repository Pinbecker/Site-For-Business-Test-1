import type {
  AreaServed,
  CredentialItem,
  DesignSettings,
  FaqItem,
  FeatureItem,
  OpeningHours,
  ProcessStep,
  ProductItem,
  ServiceItem,
  SiteProject,
  TeamMember,
  Testimonial,
} from '@/types/project';
import { DAYS_ORDER, SCHEMA_VERSION } from '@/types/project';
import { newSeed } from '@/engine/random';

function defaultHours(): OpeningHours {
  const o: Partial<OpeningHours> = {};
  for (const d of DAYS_ORDER) {
    const open = d !== 'sun';
    o[d] = { open, from: '09:00', to: d === 'sat' ? '15:00' : '17:00' };
  }
  return o as OpeningHours;
}

export function newId(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function newServiceItem(): ServiceItem {
  return { id: newId('svc'), name: '', description: '', price: '' };
}

export function newFeatureItem(): FeatureItem {
  return { id: newId('fea'), title: '', description: '' };
}

export function newProcessStep(): ProcessStep {
  return { id: newId('pro'), title: '', description: '' };
}

export function newProductItem(): ProductItem {
  return { id: newId('prd'), name: '', description: '', price: '' };
}

export function newTestimonial(): Testimonial {
  return { id: newId('tst'), quote: '', customerName: '' };
}

export function newFaqItem(): FaqItem {
  return { id: newId('faq'), question: '', answer: '' };
}

export function newTeamMember(): TeamMember {
  return { id: newId('tea'), name: '', role: '', bio: '', photo: null };
}

export function newCredentialItem(): CredentialItem {
  return { id: newId('crd'), label: '', detail: '' };
}

export function newAreaServed(): AreaServed {
  return { id: newId('are'), name: '' };
}

export function defaultDesignSettings(): DesignSettings {
  return {
    mood: 'assured',
    fontStyle: 'modern',
    heroLayout: 'split',
    navStyle: 'utility',
    sectionLayout: 'balanced',
    serviceLayout: 'cards',
    galleryLayout: 'grid',
    testimonialLayout: 'cards',
    contactLayout: 'split',
    cornerStyle: 'soft',
    depthStyle: 'subtle',
    density: 'comfortable',
    contrast: 'standard',
    sectionOrder: [
      'about',
      'features',
      'services',
      'products',
      'process',
      'gallery',
      'team',
      'credentials',
      'areas',
      'promotion',
      'testimonials',
      'faqs',
      'contact',
    ],
    showStats: true,
    showBadges: true,
    showPricing: true,
    heroImageFirst: false,
    stickyCta: true,
    ctaLabel: 'Get a quote',
    secondaryCtaLabel: 'View services',
  };
}

export function defaultProject(): SiteProject {
  const now = new Date().toISOString();
  return {
    schemaVersion: SCHEMA_VERSION,
    id: newId('prj'),
    createdAt: now,
    updatedAt: now,
    templateId: 'classic-trade',
    randomization: { seed: newSeed() },
    design: defaultDesignSettings(),
    business: {
      name: 'Acme Local',
      tagline: 'Trusted local service for your home and business.',
      industry: 'trades-contractor',
      phone: '+44 20 7946 0000',
      email: 'hello@acme.local',
      address: '12 High Street, London',
      mapsEmbedUrl: '',
      hours: defaultHours(),
    },
    brand: {
      primaryColor: '#1f6feb',
      secondaryColor: '#0e1116',
      logo: null,
      tone: 'professional-trustworthy',
    },
    content: {
      about:
        'We’re a small, local team that has been serving the area for years. Our work blends old-school craftsmanship with a modern approach — we treat every job, big or small, like it matters. Because it does.',
      features: [
        { id: newId('fea'), title: 'Clear communication', description: 'Straight answers, practical advice, and no confusing jargon.' },
        { id: newId('fea'), title: 'Reliable standards', description: 'Every job is handled carefully, consistently, and with respect for your time.' },
        { id: newId('fea'), title: 'Local knowledge', description: 'A team that understands the area, the customers, and the details that matter.' },
      ],
      services: [
        { id: newId('svc'), name: 'Consultation', description: 'A no-obligation chat about your project.', price: 'Free' },
        { id: newId('svc'), name: 'Installation', description: 'Tidy, on-time, fully insured installation.', price: 'from £150' },
        { id: newId('svc'), name: 'Maintenance', description: 'Keep things running with regular check-ups.', price: 'from £40/mo' },
      ],
      products: [],
      process: [
        { id: newId('pro'), title: 'Enquire', description: 'Tell us what you need and we’ll point you in the right direction.' },
        { id: newId('pro'), title: 'Plan', description: 'We agree the details, timings, price, and next steps before work begins.' },
        { id: newId('pro'), title: 'Deliver', description: 'The work is completed carefully, with a tidy finish and clear handover.' },
      ],
      gallery: [],
      testimonials: [
        { id: newId('tst'), quote: 'Brilliant from start to finish — clean, careful, and finished early.', customerName: 'Sarah, repeat customer' },
        { id: newId('tst'), quote: 'Fair price, no surprises, and a job done properly.', customerName: 'Tom, local resident' },
      ],
      faqs: [
        { id: newId('faq'), question: 'How quickly can you respond?', answer: 'We usually reply within one business day and will let you know the next available slot.' },
        { id: newId('faq'), question: 'Do you provide quotes upfront?', answer: 'Yes. We explain the likely cost before work begins so there are no surprises.' },
      ],
      team: [],
      credentials: [
        { id: newId('crd'), label: 'Fully insured', detail: 'Public liability cover for peace of mind.' },
        { id: newId('crd'), label: 'Local business', detail: 'Serving customers across the surrounding area.' },
      ],
      areasServed: [
        { id: newId('are'), name: 'London' },
        { id: newId('are'), name: 'North London' },
        { id: newId('are'), name: 'Greater London' },
      ],
      promotion: {
        enabled: false,
        eyebrow: 'Limited offer',
        title: 'Book this month for priority availability',
        description: 'Use this block for seasonal offers, opening announcements, events, packages, or lead magnets.',
        buttonLabel: 'Claim offer',
        buttonUrl: '#contact',
      },
      social: { instagram: '', facebook: '', tiktok: '' },
    },
    seo: {
      pageTitle: 'Acme Local · Trusted local service',
      metaDescription: 'A trusted local team serving your area with care, craft, and honesty.',
      keywords: 'local, trusted, service',
      cityRegion: 'London',
      canonicalUrl: '',
    },
  };
}
