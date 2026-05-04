import type {
  OpeningHours,
  ServiceItem,
  SiteProject,
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

export function newTestimonial(): Testimonial {
  return { id: newId('tst'), quote: '', customerName: '' };
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
      services: [
        { id: newId('svc'), name: 'Consultation', description: 'A no-obligation chat about your project.', price: 'Free' },
        { id: newId('svc'), name: 'Installation', description: 'Tidy, on-time, fully insured installation.', price: 'from £150' },
        { id: newId('svc'), name: 'Maintenance', description: 'Keep things running with regular check-ups.', price: 'from £40/mo' },
      ],
      gallery: [],
      testimonials: [
        { id: newId('tst'), quote: 'Brilliant from start to finish — clean, careful, and finished early.', customerName: 'Sarah, repeat customer' },
        { id: newId('tst'), quote: 'Fair price, no surprises, and a job done properly.', customerName: 'Tom, local resident' },
      ],
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
