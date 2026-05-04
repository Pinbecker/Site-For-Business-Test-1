import type { BusinessInfo, OpeningHoursEntry, SiteProject } from '@/types/project';
import { DAYS_ORDER, DAY_LABELS, INDUSTRY_OPTIONS } from '@/types/project';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';

interface Props {
  project: SiteProject;
  update: (patch: Partial<BusinessInfo>) => void;
}

export function BusinessInfoSection({ project, update }: Props) {
  const b = project.business;
  const setHour = (day: keyof BusinessInfo['hours'], patch: Partial<OpeningHoursEntry>) => {
    update({ hours: { ...b.hours, [day]: { ...b.hours[day], ...patch } } });
  };
  return (
    <SectionShell title="Business info" description="The essentials — what you do, how to reach you, and when you're open.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business name" required htmlFor="biz-name">
          <input
            id="biz-name"
            className="field-input"
            value={b.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </Field>
        <Field label="Industry" required htmlFor="biz-industry">
          <select
            id="biz-industry"
            className="field-input"
            value={b.industry}
            onChange={(e) => update({ industry: e.target.value as BusinessInfo['industry'] })}
          >
            {INDUSTRY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tagline / one-liner" htmlFor="biz-tagline">
        <input
          id="biz-tagline"
          className="field-input"
          value={b.tagline}
          onChange={(e) => update({ tagline: e.target.value })}
          placeholder="A short hook that captures what you do."
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" htmlFor="biz-phone">
          <input
            id="biz-phone"
            className="field-input"
            value={b.phone}
            onChange={(e) => update({ phone: e.target.value })}
            inputMode="tel"
          />
        </Field>
        <Field label="Email" htmlFor="biz-email">
          <input
            id="biz-email"
            className="field-input"
            value={b.email}
            onChange={(e) => update({ email: e.target.value })}
            inputMode="email"
            type="email"
          />
        </Field>
      </div>

      <Field label="Physical address" htmlFor="biz-address">
        <input
          id="biz-address"
          className="field-input"
          value={b.address}
          onChange={(e) => update({ address: e.target.value })}
          placeholder="Street, city, postcode"
        />
      </Field>

      <Field
        label="Google Maps embed URL"
        hint="Optional. From Google Maps → Share → Embed a map → copy the src URL."
        htmlFor="biz-maps"
      >
        <input
          id="biz-maps"
          className="field-input"
          value={b.mapsEmbedUrl}
          onChange={(e) => update({ mapsEmbedUrl: e.target.value })}
          placeholder="https://www.google.com/maps/embed?…"
          spellCheck={false}
        />
      </Field>

      <div>
        <h3 className="field-label mb-2">Opening hours</h3>
        <div className="overflow-hidden rounded-lg ring-1 ring-ink-200">
          {DAYS_ORDER.map((d, i) => {
            const e = b.hours[d];
            return (
              <div
                key={d}
                className={`grid grid-cols-[7rem_auto_1fr_1fr] items-center gap-2 px-3 py-2 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-ink-50/40'
                }`}
              >
                <span className="text-sm font-medium text-ink-800">{DAY_LABELS[d]}</span>
                <label className="inline-flex items-center gap-2 text-xs text-ink-700">
                  <input
                    type="checkbox"
                    checked={e.open}
                    onChange={(ev) => setHour(d, { open: ev.target.checked })}
                    className="h-4 w-4 rounded border-ink-300 text-accent-600 focus:ring-accent-500"
                  />
                  {e.open ? 'Open' : 'Closed'}
                </label>
                <input
                  type="time"
                  value={e.from}
                  onChange={(ev) => setHour(d, { from: ev.target.value })}
                  disabled={!e.open}
                  className="field-input py-1.5 text-xs disabled:opacity-50"
                  aria-label={`${DAY_LABELS[d]} open time`}
                />
                <input
                  type="time"
                  value={e.to}
                  onChange={(ev) => setHour(d, { to: ev.target.value })}
                  disabled={!e.open}
                  className="field-input py-1.5 text-xs disabled:opacity-50"
                  aria-label={`${DAY_LABELS[d]} close time`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
