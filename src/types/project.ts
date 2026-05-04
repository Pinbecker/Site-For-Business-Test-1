/**
 * SiteForge — shared types
 *
 * The full SiteProject is what the builder produces and what each template
 * consumes via the rendering engine. It is also the schema for project.json
 * (saved next to every export and re-importable into the builder).
 */

export const SCHEMA_VERSION = 1;

export type Industry =
  | 'cafe-restaurant'
  | 'trades-contractor'
  | 'hair-beauty'
  | 'retail-shop'
  | 'fitness-wellness'
  | 'professional-services'
  | 'other';

export const INDUSTRY_OPTIONS: Array<{ value: Industry; label: string }> = [
  { value: 'cafe-restaurant', label: 'Café / Restaurant' },
  { value: 'trades-contractor', label: 'Trades / Contractor' },
  { value: 'hair-beauty', label: 'Hair & Beauty' },
  { value: 'retail-shop', label: 'Retail Shop' },
  { value: 'fitness-wellness', label: 'Fitness / Wellness' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'other', label: 'Other' },
];

export type ToneOfVoice =
  | 'friendly-warm'
  | 'professional-trustworthy'
  | 'bold-energetic'
  | 'calm-minimal';

export const TONE_OPTIONS: Array<{ value: ToneOfVoice; label: string }> = [
  { value: 'friendly-warm', label: 'Friendly & Warm' },
  { value: 'professional-trustworthy', label: 'Professional & Trustworthy' },
  { value: 'bold-energetic', label: 'Bold & Energetic' },
  { value: 'calm-minimal', label: 'Calm & Minimal' },
];

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAYS_ORDER: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export interface OpeningHoursEntry {
  open: boolean;
  from: string; // HH:MM 24h
  to: string; // HH:MM 24h
}

export type OpeningHours = Record<DayOfWeek, OpeningHoursEntry>;

export interface BusinessInfo {
  name: string;
  tagline: string;
  industry: Industry;
  phone: string;
  email: string;
  address: string;
  mapsEmbedUrl: string;
  hours: OpeningHours;
}

export interface ImageAsset {
  /** Stable id used as filename root inside assets/images. */
  id: string;
  /** Original filename. */
  filename: string;
  /** Detected mime type, e.g. image/png. */
  mimeType: string;
  /** Data URL kept in memory while editing — used for preview and zipping. */
  dataUrl: string;
  /** Optional alt text for accessibility & SEO. */
  alt: string;
  /** Display width in px (intrinsic), if known. */
  width?: number;
  /** Display height in px (intrinsic), if known. */
  height?: number;
}

export interface Brand {
  primaryColor: string; // hex
  secondaryColor: string; // hex
  logo: ImageAsset | null;
  tone: ToneOfVoice;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string; // free-form (e.g. "from £40")
}

export interface Testimonial {
  id: string;
  quote: string;
  customerName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: ImageAsset | null;
}

export interface CredentialItem {
  id: string;
  label: string;
  detail: string;
}

export interface AreaServed {
  id: string;
  name: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Promotion {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
}

export interface Social {
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface Content {
  about: string;
  features: FeatureItem[];
  process: ProcessStep[];
  services: ServiceItem[];
  products: ProductItem[];
  gallery: ImageAsset[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  team: TeamMember[];
  credentials: CredentialItem[];
  areasServed: AreaServed[];
  promotion: Promotion;
  social: Social;
}

export interface Seo {
  pageTitle: string;
  metaDescription: string;
  keywords: string; // comma-separated
  cityRegion: string;
  canonicalUrl: string;
}

export type ProjectStatus = 'draft' | 'waiting-on-client' | 'ready-to-export' | 'published';

export interface ProjectMeta {
  customerName: string;
  internalNotes: string;
  status: ProjectStatus;
}

export type TemplateId =
  | 'service-pro'
  | 'hospitality-editorial'
  | 'portfolio-studio'
  | 'expert-firm';

export interface RandomizationSeed {
  /** Numeric seed used by the templates' deterministic randomizer. */
  seed: number;
}

export interface SiteProject {
  schemaVersion: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  project: ProjectMeta;
  templateId: TemplateId;
  randomization: RandomizationSeed;
  business: BusinessInfo;
  brand: Brand;
  content: Content;
  seo: Seo;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  /** Industries the template fits best — used for auto-suggest. */
  bestFor: Industry[];
  /** Short tagline shown in the picker. */
  vibe: string;
}
