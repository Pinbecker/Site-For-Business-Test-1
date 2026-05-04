import type { Seo, SiteProject } from '@/types/project';
import { Field } from '../components/Field';
import { SectionShell } from '../components/SectionShell';

interface Props {
  project: SiteProject;
  update: (patch: Partial<Seo>) => void;
}

export function SeoSection({ project, update }: Props) {
  const s = project.seo;
  const descLen = s.metaDescription.length;
  const descOver = descLen > 160;

  return (
    <SectionShell title="SEO" description="What search engines and social shares show. Pre-filled where we can.">
      <Field label="Page title" htmlFor="seo-title" hint="Shown as the browser tab title and the headline in search results.">
        <input
          id="seo-title"
          className="field-input"
          value={s.pageTitle}
          onChange={(e) => update({ pageTitle: e.target.value })}
        />
      </Field>

      <Field
        label="Meta description"
        htmlFor="seo-desc"
        trailing={
          <span className={descOver ? 'text-rose-600' : descLen > 140 ? 'text-amber-600' : ''}>
            {descLen} / 160
          </span>
        }
      >
        <textarea
          id="seo-desc"
          className="field-input min-h-[80px]"
          value={s.metaDescription}
          onChange={(e) => update({ metaDescription: e.target.value })}
          rows={3}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Keywords" htmlFor="seo-keys" hint="Comma-separated.">
          <input
            id="seo-keys"
            className="field-input"
            value={s.keywords}
            onChange={(e) => update({ keywords: e.target.value })}
            placeholder="local plumber, leaks, emergency"
          />
        </Field>
        <Field label="City / region" htmlFor="seo-city" hint="Used for local SEO and structured data.">
          <input
            id="seo-city"
            className="field-input"
            value={s.cityRegion}
            onChange={(e) => update({ cityRegion: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Canonical URL" htmlFor="seo-canon" hint="The final live URL of the site (leave blank if unsure — you can edit later).">
        <input
          id="seo-canon"
          className="field-input"
          value={s.canonicalUrl}
          onChange={(e) => update({ canonicalUrl: e.target.value })}
          placeholder="https://www.example.com"
          spellCheck={false}
        />
      </Field>
    </SectionShell>
  );
}
