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

export interface Social {
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface Content {
  about: string;
  services: ServiceItem[];
  gallery: ImageAsset[];
  testimonials: Testimonial[];
  social: Social;
}

export interface Seo {
  pageTitle: string;
  metaDescription: string;
  keywords: string; // comma-separated
  cityRegion: string;
  canonicalUrl: string;
}

export type TemplateId =
  | 'classic-trade'
  | 'editorial-cafe'
  | 'studio-grid'
  | 'bold-fitness'
  | 'executive-consulting'
  | 'boutique-salon'
  | 'corporate-grid'
  | 'performance-pro'
  | 'neon-dark'
  | 'luxury-minimal'
  | 'retro-americana'
  | 'brutalist-news';

export type SiteMood =
  | 'assured'
  | 'warm'
  | 'crisp'
  | 'expressive'
  | 'premium'
  | 'playful';

export type HeroLayout =
  | 'split'
  | 'poster'
  | 'editorial'
  | 'stacked'
  | 'service-led';

export type NavStyle = 'simple' | 'centered' | 'utility' | 'drawer';

export type SectionLayout = 'balanced' | 'compact' | 'spacious' | 'feature';

export type ServiceLayout = 'cards' | 'list' | 'price-menu' | 'feature-grid';

export type GalleryLayout = 'grid' | 'masonry' | 'filmstrip' | 'showcase';

export type TestimonialLayout = 'cards' | 'quotes' | 'spotlight';

export type ContactLayout = 'split' | 'panel' | 'stacked';

export type CornerStyle = 'sharp' | 'soft' | 'rounded';

export type DepthStyle = 'flat' | 'subtle' | 'elevated';

export type Density = 'compact' | 'comfortable' | 'spacious';

export type FontStyle = 'modern' | 'classic' | 'editorial' | 'technical' | 'friendly';

export interface DesignSettings {
  mood: SiteMood;
  fontStyle: FontStyle;
  heroLayout: HeroLayout;
  navStyle: NavStyle;
  sectionLayout: SectionLayout;
  serviceLayout: ServiceLayout;
  galleryLayout: GalleryLayout;
  testimonialLayout: TestimonialLayout;
  contactLayout: ContactLayout;
  cornerStyle: CornerStyle;
  depthStyle: DepthStyle;
  density: Density;
  contrast: 'soft' | 'standard' | 'high';
  sectionOrder: Array<'about' | 'services' | 'gallery' | 'testimonials' | 'contact'>;
  showStats: boolean;
  showBadges: boolean;
  showPricing: boolean;
  heroImageFirst: boolean;
  stickyCta: boolean;
  ctaLabel: string;
  secondaryCtaLabel: string;
}

export interface RandomizationSeed {
  /** Numeric seed used by the templates' deterministic randomizer. */
  seed: number;
}

export interface SiteProject {
  schemaVersion: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  templateId: TemplateId;
  randomization: RandomizationSeed;
  design: DesignSettings;
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
