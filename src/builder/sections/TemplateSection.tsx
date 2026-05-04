import type { DesignSettings, TemplateId } from '@/types/project';
import type { SiteProject } from '@/types/project';
import { TEMPLATE_LIST, suggestTemplate } from '@/engine/render';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';

interface Props {
  project: SiteProject;
  selectTemplate: (id: TemplateId) => void;
  updateDesign: (patch: Partial<DesignSettings>) => void;
  reshuffle: () => void;
}

const SECTION_LABELS: Record<DesignSettings['sectionOrder'][number], string> = {
  about: 'About',
  services: 'Services',
  gallery: 'Gallery',
  testimonials: 'Reviews',
  contact: 'Contact',
};

export function TemplateSection({ project, selectTemplate, updateDesign, reshuffle }: Props) {
  const suggested = suggestTemplate(project.business.industry);
  const d = project.design;

  return (
    <>
      <SectionShell
        title="Site strategy"
        description="Choose a starting direction. This now sets a design recipe, not a locked template."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {TEMPLATE_LIST.map((t) => {
            const isActive = project.templateId === t.id;
            const isSuggested = suggested === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTemplate(t.id)}
                className={`flex min-h-[168px] flex-col gap-2 rounded-xl p-4 text-left ring-1 transition ${
                  isActive
                    ? 'bg-ink-900 text-white ring-ink-900'
                    : 'bg-white text-ink-900 ring-ink-200 hover:ring-ink-300'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    {isSuggested && !isActive ? <Badge tone="green">suggested</Badge> : null}
                    {isActive ? <Badge tone="dark">selected</Badge> : null}
                  </div>
                </div>
                <p className={`text-xs leading-5 ${isActive ? 'text-white/75' : 'text-ink-600'}`}>
                  {t.description}
                </p>
                <p
                  className={`mt-auto text-[11px] uppercase tracking-wider ${
                    isActive ? 'text-white/70' : 'text-ink-500'
                  }`}
                >
                  {t.vibe}
                </p>
              </button>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        title="Design controls"
        description="Tune the site without touching content. These settings travel with project.json."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Mood"
            value={d.mood}
            onChange={(value) => updateDesign({ mood: value as DesignSettings['mood'] })}
            options={[
              ['assured', 'Assured'],
              ['warm', 'Warm'],
              ['crisp', 'Crisp'],
              ['expressive', 'Expressive'],
              ['premium', 'Premium'],
              ['playful', 'Playful'],
            ]}
          />
          <SelectField
            label="Typography"
            value={d.fontStyle}
            onChange={(value) => updateDesign({ fontStyle: value as DesignSettings['fontStyle'] })}
            options={[
              ['modern', 'Modern'],
              ['classic', 'Classic'],
              ['editorial', 'Editorial'],
              ['technical', 'Technical'],
              ['friendly', 'Friendly'],
            ]}
          />
          <SelectField
            label="Hero layout"
            value={d.heroLayout}
            onChange={(value) => updateDesign({ heroLayout: value as DesignSettings['heroLayout'] })}
            options={[
              ['split', 'Split'],
              ['poster', 'Poster'],
              ['editorial', 'Editorial'],
              ['stacked', 'Stacked'],
              ['service-led', 'Service-led'],
            ]}
          />
          <SelectField
            label="Navigation"
            value={d.navStyle}
            onChange={(value) => updateDesign({ navStyle: value as DesignSettings['navStyle'] })}
            options={[
              ['simple', 'Simple'],
              ['centered', 'Centered'],
              ['utility', 'Utility'],
              ['drawer', 'Drawer'],
            ]}
          />
          <SelectField
            label="Section spacing"
            value={d.sectionLayout}
            onChange={(value) => updateDesign({ sectionLayout: value as DesignSettings['sectionLayout'] })}
            options={[
              ['balanced', 'Balanced'],
              ['compact', 'Compact'],
              ['spacious', 'Spacious'],
              ['feature', 'Feature'],
            ]}
          />
          <SelectField
            label="Density"
            value={d.density}
            onChange={(value) => updateDesign({ density: value as DesignSettings['density'] })}
            options={[
              ['compact', 'Compact'],
              ['comfortable', 'Comfortable'],
              ['spacious', 'Spacious'],
            ]}
          />
          <SelectField
            label="Contrast"
            value={d.contrast}
            onChange={(value) => updateDesign({ contrast: value as DesignSettings['contrast'] })}
            options={[
              ['soft', 'Soft'],
              ['standard', 'Standard'],
              ['high', 'High'],
            ]}
          />
          <SelectField
            label="Services"
            value={d.serviceLayout}
            onChange={(value) => updateDesign({ serviceLayout: value as DesignSettings['serviceLayout'] })}
            options={[
              ['cards', 'Cards'],
              ['list', 'List'],
              ['price-menu', 'Price menu'],
              ['feature-grid', 'Feature grid'],
            ]}
          />
          <SelectField
            label="Gallery"
            value={d.galleryLayout}
            onChange={(value) => updateDesign({ galleryLayout: value as DesignSettings['galleryLayout'] })}
            options={[
              ['grid', 'Grid'],
              ['masonry', 'Masonry'],
              ['filmstrip', 'Filmstrip'],
              ['showcase', 'Showcase'],
            ]}
          />
          <SelectField
            label="Testimonials"
            value={d.testimonialLayout}
            onChange={(value) =>
              updateDesign({ testimonialLayout: value as DesignSettings['testimonialLayout'] })
            }
            options={[
              ['cards', 'Cards'],
              ['quotes', 'Quotes'],
              ['spotlight', 'Spotlight'],
            ]}
          />
          <SelectField
            label="Contact"
            value={d.contactLayout}
            onChange={(value) => updateDesign({ contactLayout: value as DesignSettings['contactLayout'] })}
            options={[
              ['split', 'Split'],
              ['panel', 'Panel'],
              ['stacked', 'Stacked'],
            ]}
          />
          <SelectField
            label="Corners"
            value={d.cornerStyle}
            onChange={(value) => updateDesign({ cornerStyle: value as DesignSettings['cornerStyle'] })}
            options={[
              ['sharp', 'Sharp'],
              ['soft', 'Soft'],
              ['rounded', 'Rounded'],
            ]}
          />
          <SelectField
            label="Depth"
            value={d.depthStyle}
            onChange={(value) => updateDesign({ depthStyle: value as DesignSettings['depthStyle'] })}
            options={[
              ['flat', 'Flat'],
              ['subtle', 'Subtle'],
              ['elevated', 'Elevated'],
            ]}
          />
        </div>

        <Field label="CTA labels" hint="Use client-specific language such as Book a table, Request a quote, or Start a consultation.">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="field-input"
              value={d.ctaLabel}
              onChange={(e) => updateDesign({ ctaLabel: e.target.value })}
              placeholder="Primary CTA"
            />
            <input
              className="field-input"
              value={d.secondaryCtaLabel}
              onChange={(e) => updateDesign({ secondaryCtaLabel: e.target.value })}
              placeholder="Secondary CTA"
            />
          </div>
        </Field>

        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle label="Show proof stats" checked={d.showStats} onChange={(showStats) => updateDesign({ showStats })} />
          <Toggle label="Show hero badges" checked={d.showBadges} onChange={(showBadges) => updateDesign({ showBadges })} />
          <Toggle label="Show service pricing" checked={d.showPricing} onChange={(showPricing) => updateDesign({ showPricing })} />
          <Toggle label="Image first in split hero" checked={d.heroImageFirst} onChange={(heroImageFirst) => updateDesign({ heroImageFirst })} />
          <Toggle label="Mobile sticky CTA" checked={d.stickyCta} onChange={(stickyCta) => updateDesign({ stickyCta })} />
        </div>
      </SectionShell>

      <SectionShell
        title="Section order"
        description="Move content blocks up or down to match the client journey."
      >
        <div className="space-y-2">
          {d.sectionOrder.map((id, index) => (
            <div key={id} className="flex items-center justify-between rounded-lg bg-ink-50 p-3 ring-1 ring-ink-100">
              <span className="text-sm font-medium text-ink-900">{SECTION_LABELS[id]}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="btn-ghost px-2"
                  onClick={() => updateDesign({ sectionOrder: move(d.sectionOrder, index, index - 1) })}
                  disabled={index === 0}
                >
                  Up
                </button>
                <button
                  type="button"
                  className="btn-ghost px-2"
                  onClick={() => updateDesign({ sectionOrder: move(d.sectionOrder, index, index + 1) })}
                  disabled={index === d.sectionOrder.length - 1}
                >
                  Down
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-ink-50 p-3 ring-1 ring-ink-100">
          <div>
            <p className="text-sm font-medium text-ink-900">Variation seed</p>
            <p className="text-xs text-ink-600">
              Changes font variant and small composition choices while keeping content and controls intact.
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={reshuffle}>
            Regenerate
          </button>
        </div>
      </SectionShell>
    </>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  const id = `design-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </Field>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm font-medium text-ink-800 ring-1 ring-ink-200">
      <span>{label}</span>
      <input
        type="checkbox"
        className="h-4 w-4 accent-accent-600"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

function Badge({ children, tone }: { children: string; tone: 'green' | 'dark' }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        tone === 'green' ? 'bg-emerald-100 text-emerald-800' : 'bg-white/15 text-white'
      }`}
    >
      {children}
    </span>
  );
}

function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = items.slice();
  const [item] = next.splice(from, 1);
  if (item === undefined) return items;
  next.splice(to, 0, item);
  return next;
}
