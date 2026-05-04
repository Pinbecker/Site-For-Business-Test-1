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
      title="Templates"
      description="Pick a complete website direction. These are separate template systems, not one layout with settings changed."
    >
      <div className="grid gap-4">
        {TEMPLATE_LIST.map((t) => {
          const isActive = project.templateId === t.id;
          const isSuggested = suggested === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTemplate(t.id)}
              className={`grid gap-3 rounded-xl p-4 text-left ring-1 transition sm:grid-cols-[140px_1fr] ${
                isActive
                  ? 'bg-ink-900 text-white ring-ink-900'
                  : 'bg-white text-ink-900 ring-ink-200 hover:ring-ink-300'
              }`}
              aria-pressed={isActive}
            >
              <TemplateThumbnail id={t.id} />
              <span className="flex min-w-0 flex-col gap-2">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-base font-semibold">{t.name}</span>
                  <span className="flex shrink-0 items-center gap-1">
                    {isSuggested && !isActive ? <Badge tone="green">suggested</Badge> : null}
                    {isActive ? <Badge tone="dark">selected</Badge> : null}
                  </span>
                </span>
                <span className={`text-sm leading-6 ${isActive ? 'text-white/75' : 'text-ink-600'}`}>
                  {t.description}
                </span>
                <span
                  className={`mt-auto text-[11px] uppercase tracking-wider ${
                    isActive ? 'text-white/70' : 'text-ink-500'
                  }`}
                >
                  {t.vibe}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-ink-50 p-3 ring-1 ring-ink-100">
        <div>
          <p className="text-sm font-medium text-ink-900">Variation seed</p>
          <p className="text-xs text-ink-600">
            Regenerate swaps small template details such as image emphasis and supporting copy order.
          </p>
        </div>
        <button type="button" className="btn-secondary" onClick={reshuffle}>
          Regenerate
        </button>
      </div>
    </SectionShell>
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

function TemplateThumbnail({ id }: { id: TemplateId }) {
  const base = 'h-28 overflow-hidden rounded-lg ring-1 ring-black/10';

  if (id === 'hospitality-editorial') {
    return (
      <span className={`${base} grid grid-cols-[.8fr_1.2fr] bg-[#f7ead8]`}>
        <span className="m-3 border-y border-[#4a2f1f]" />
        <span className="grid grid-rows-[1fr_.6fr] gap-2 p-3">
          <span className="bg-[#3a2418]" />
          <span className="grid grid-cols-3 gap-1">
            <span className="bg-[#b9683a]" />
            <span className="bg-[#ecd3b1]" />
            <span className="bg-[#4a2f1f]" />
          </span>
        </span>
      </span>
    );
  }

  if (id === 'portfolio-studio') {
    return (
      <span className={`${base} grid grid-cols-3 grid-rows-3 gap-1 bg-[#101010] p-2`}>
        <span className="col-span-2 row-span-2 bg-[#f2f2f2]" />
        <span className="bg-[#9cff4d]" />
        <span className="bg-[#555]" />
        <span className="bg-[#f2f2f2]" />
        <span className="col-span-2 bg-[#242424]" />
      </span>
    );
  }

  if (id === 'expert-firm') {
    return (
      <span className={`${base} grid grid-cols-[.42fr_1fr] bg-[#eef2f6]`}>
        <span className="bg-[#14213d]" />
        <span className="space-y-2 p-3">
          <span className="block h-3 w-2/3 bg-[#14213d]" />
          <span className="block h-8 bg-white" />
          <span className="block h-8 bg-white" />
          <span className="block h-3 w-1/2 bg-[#c49a49]" />
        </span>
      </span>
    );
  }

  if (id === 'lumina-wellness') {
    return (
      <span className={`${base} flex flex-col items-center justify-center gap-2 bg-[#faf8f5] p-3`}>
        <span className="h-14 w-24 rounded-full bg-[#e8d5c4]" />
        <span className="space-y-1 text-center">
          <span className="block h-2 w-20 rounded bg-[#5c3d28] mx-auto" />
          <span className="block h-2 w-14 rounded bg-[#c49a6c] mx-auto" />
        </span>
      </span>
    );
  }

  if (id === 'vivid-bold') {
    return (
      <span className={`${base} relative bg-[#08090b] p-3 flex flex-col justify-end`}>
        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-[#08090b]" />
        <span className="relative space-y-1">
          <span className="block h-5 w-3/4 rounded-sm bg-white" />
          <span className="block h-3 w-1/2 rounded-sm bg-white/40" />
          <span className="block h-6 w-20 rounded-none bg-[#22c55e] mt-2" />
        </span>
      </span>
    );
  }

  if (id === 'hearth-local') {
    return (
      <span className={`${base} relative bg-[#1b3326] flex flex-col justify-end`}>
        <span className="absolute inset-0 bg-[#3b2718] opacity-40" />
        <span className="relative p-3 space-y-1">
          <span className="block h-2 w-16 rounded bg-white/40" />
          <span className="block h-4 w-3/4 rounded bg-white/90" />
          <span className="block h-4 w-2/3 rounded bg-white/90" />
          <span className="block h-5 w-24 rounded-full bg-[#fdf6e8]/90 mt-1" />
        </span>
      </span>
    );
  }

  if (id === 'slate-minimal') {
    return (
      <span className={`${base} bg-white p-4 flex flex-col justify-between`}>
        <span className="space-y-2">
          <span className="block h-1 w-8 bg-[#6366f1]" />
          <span className="block h-4 w-3/4 bg-[#1a1a1c]" />
          <span className="block h-4 w-1/2 bg-[#1a1a1c]" />
        </span>
        <span className="space-y-1">
          <span className="flex justify-between items-center border-t border-[#e8e8ec] pt-1">
            <span className="h-2 w-1/2 bg-[#767680] rounded" />
            <span className="h-2 w-8 bg-[#6366f1] rounded" />
          </span>
          <span className="flex justify-between items-center border-t border-[#e8e8ec] pt-1">
            <span className="h-2 w-2/5 bg-[#767680] rounded" />
            <span className="h-2 w-10 bg-[#6366f1] rounded" />
          </span>
        </span>
      </span>
    );
  }

  // Default: service-pro
  return (
    <span className={`${base} grid grid-rows-[auto_1fr] bg-[#f4f7fb]`}>
      <span className="grid grid-cols-[1fr_auto] gap-2 border-b border-[#1d4ed8] p-2">
        <span className="h-3 bg-[#1d4ed8]" />
        <span className="h-3 w-10 bg-[#111827]" />
      </span>
      <span className="grid grid-cols-[1.2fr_.8fr] gap-2 p-3">
        <span className="space-y-2">
          <span className="block h-4 bg-[#111827]" />
          <span className="block h-4 w-3/4 bg-[#111827]" />
          <span className="block h-5 w-20 bg-[#1d4ed8]" />
        </span>
        <span className="bg-[#dbeafe]" />
      </span>
    </span>
  );
}
