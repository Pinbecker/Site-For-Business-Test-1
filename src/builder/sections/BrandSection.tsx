import type { Brand, SiteProject } from '@/types/project';
import { TONE_OPTIONS } from '@/types/project';
import { contrastRatioHex } from '@/engine/color';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';
import { ColorField } from '../components/ColorField';
import { ImageDropzone } from '../components/ImageDropzone';

interface Props {
  project: SiteProject;
  update: (patch: Partial<Brand>) => void;
}

export function BrandSection({ project, update }: Props) {
  const b = project.brand;
  const ratio = contrastRatioHex(b.primaryColor, '#ffffff');
  const ratioOk = ratio >= 4.5;

  return (
    <SectionShell title="Brand" description="The look and personality — colour, logo, voice.">
      <div className="grid gap-4 sm:grid-cols-2">
        <ColorField
          label="Primary colour"
          value={b.primaryColor}
          onChange={(v) => update({ primaryColor: v })}
          hint="Used for buttons, accents, and links."
        />
        <ColorField
          label="Secondary colour"
          value={b.secondaryColor}
          onChange={(v) => update({ secondaryColor: v })}
          hint="Used for highlights and complementary touches."
        />
      </div>

      <div
        className={`flex items-start gap-3 rounded-lg p-3 text-sm ${
          ratioOk
            ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100'
            : 'bg-amber-50 text-amber-800 ring-1 ring-amber-100'
        }`}
      >
        <span aria-hidden="true">{ratioOk ? '✓' : '!'}</span>
        <div>
          <strong className="font-semibold">
            Contrast on white: {ratio.toFixed(2)}:1 — {ratioOk ? 'passes WCAG AA.' : 'below 4.5:1.'}
          </strong>
          <p className="mt-0.5 text-xs opacity-90">
            {ratioOk
              ? 'White text on this colour is readable.'
              : 'Choose a darker primary colour for white text on coloured buttons to remain accessible.'}
          </p>
        </div>
      </div>

      <Field label="Logo (PNG / SVG)" hint="Optional. We’ll fall back to the business name in the header if none is uploaded.">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-lg bg-ink-50 ring-1 ring-ink-200">
            {b.logo ? (
              <img src={b.logo.dataUrl} alt={b.logo.alt} className="max-h-16 max-w-16 object-contain" />
            ) : (
              <span className="text-xs text-ink-400">No logo</span>
            )}
          </div>
          <div className="flex-1">
            <ImageDropzone
              multiple={false}
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              label={b.logo ? 'Replace logo' : 'Upload logo'}
              onAdded={(assets) => {
                const a = assets[0];
                if (a) update({ logo: a });
              }}
            />
            {b.logo ? (
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="text"
                  className="field-input"
                  value={b.logo.alt}
                  onChange={(e) =>
                    update({ logo: b.logo ? { ...b.logo, alt: e.target.value } : null })
                  }
                  placeholder="Alt text for logo"
                />
                <button type="button" className="btn-ghost" onClick={() => update({ logo: null })}>
                  Remove
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Field>

      <Field label="Tone of voice" htmlFor="brand-tone">
        <select
          id="brand-tone"
          className="field-input"
          value={b.tone}
          onChange={(e) => update({ tone: e.target.value as Brand['tone'] })}
        >
          {TONE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
    </SectionShell>
  );
}
