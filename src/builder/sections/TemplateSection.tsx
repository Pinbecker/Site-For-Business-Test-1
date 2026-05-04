import type { SiteProject, TemplateId } from '@/types/project';
import { TEMPLATE_LIST, suggestTemplate } from '@/engine/render';
import { SectionShell } from '../components/SectionShell';

interface Props {
  project: SiteProject;
  selectTemplate: (id: TemplateId) => void;
  reshuffle: () => void;
}

export function TemplateSection({ project, selectTemplate, reshuffle }: Props) {
  const suggested = suggestTemplate(project.business.industry);
  return (
    <SectionShell
      title="Template"
      description="Pick a layout. We auto-suggest one based on your industry — override any time."
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
              className={`flex flex-col gap-2 rounded-xl p-4 text-left ring-1 transition ${
                isActive
                  ? 'bg-ink-900 text-white ring-ink-900'
                  : 'bg-white text-ink-900 ring-ink-200 hover:ring-ink-300'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{t.name}</span>
                <div className="flex items-center gap-1">
                  {isSuggested && !isActive ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                      suggested
                    </span>
                  ) : null}
                  {isActive ? (
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium">
                      selected
                    </span>
                  ) : null}
                </div>
              </div>
              <p className={`text-xs ${isActive ? 'text-white/75' : 'text-ink-600'}`}>
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
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-ink-50 p-3 ring-1 ring-ink-100">
        <div>
          <p className="text-sm font-medium text-ink-900">Variation</p>
          <p className="text-xs text-ink-600">
            Reshuffle the randomisation layer (font pairing, accent placement, section order) without
            changing your content. Seed:{' '}
            <code className="rounded bg-white px-1 py-0.5 text-[11px] ring-1 ring-ink-200">
              {project.randomization.seed}
            </code>
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={reshuffle}>
          ↻ Regenerate
        </button>
      </div>
    </SectionShell>
  );
}
