import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SiteProject, TemplateId } from '@/types/project';
import { SCHEMA_VERSION } from '@/types/project';
import { newSeed } from '@/engine/random';
import { buildZip, downloadBlob } from '@/engine/export';
import { suggestTemplate } from '@/engine/render';
import { COMPOSABLE_PRESETS } from '@/templates/composable';
import { defaultProject } from './defaults';
import { hydrateProject } from './projectMigration';
import { loadAutosave, saveAutosave } from './storage';
import { StepNav } from './components/StepNav';
import { PreviewPane } from './components/PreviewPane';
import { BusinessInfoSection } from './sections/BusinessInfoSection';
import { BrandSection } from './sections/BrandSection';
import { ContentSection } from './sections/ContentSection';
import { SeoSection } from './sections/SeoSection';
import { TemplateSection } from './sections/TemplateSection';

type StepId = 'business' | 'brand' | 'content' | 'seo' | 'template';

const STEPS: Array<{ id: StepId; label: string }> = [
  { id: 'business', label: 'Business info' },
  { id: 'brand', label: 'Brand' },
  { id: 'content', label: 'Content' },
  { id: 'seo', label: 'SEO' },
  { id: 'template', label: 'Design system' },
];

export function App() {
  const [project, setProject] = useState<SiteProject>(() => loadAutosave() ?? defaultProject());
  const [step, setStep] = useState<StepId>('business');
  const [fullWidth, setFullWidth] = useState(false);
  const [savedAt, setSavedAt] = useState<number>(Date.now());
  const [exporting, setExporting] = useState(false);
  const [filename, setFilename] = useState<string>(() => deriveFilename(project));
  const lastIndustryRef = useRef(project.business.industry);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-suggest a template when industry changes — only if the user hasn't
  // explicitly overridden it (we approximate by switching only the very first
  // time the industry changes from the default).
  useEffect(() => {
    if (project.business.industry !== lastIndustryRef.current) {
      const suggested = suggestTemplate(project.business.industry);
      lastIndustryRef.current = project.business.industry;
      setProject((p) =>
        p.templateId === suggestTemplate(lastIndustryRef.current) || p.templateId === suggested
          ? { ...p, templateId: suggested }
          : p,
      );
    }
  }, [project.business.industry]);

  // Autosave with debounce.
  useEffect(() => {
    const t = setTimeout(() => {
      const stamped: SiteProject = { ...project, updatedAt: new Date().toISOString() };
      saveAutosave(stamped);
      setSavedAt(Date.now());
    }, 600);
    return () => clearTimeout(t);
  }, [project]);

  // Beforeunload warning if there are unsaved-since-export changes.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  const update = useCallback(<K extends keyof SiteProject>(key: K, patch: Partial<SiteProject[K]>) => {
    setProject((p) => ({ ...p, [key]: { ...(p[key] as object), ...patch } }) as SiteProject);
  }, []);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await buildZip({
        ...project,
        updatedAt: new Date().toISOString(),
      });
      downloadBlob(blob, `${filename || 'site'}.zip`);
    } catch (err) {
      console.error(err);
      alert('Export failed: ' + (err instanceof Error ? err.message : 'unknown error'));
    } finally {
      setExporting(false);
    }
  }, [project, filename]);

  const handleSaveProjectJson = useCallback(() => {
    const blob = new Blob([JSON.stringify({ ...project, updatedAt: new Date().toISOString() }, null, 2)], {
      type: 'application/json',
    });
    downloadBlob(blob, `${filename || 'project'}.project.json`);
  }, [project, filename]);

  const handleNewProject = useCallback(() => {
    const ok = window.confirm(
      'Start a fresh client site? Export the current editable project file first if you want to keep working on it later.',
    );
    if (!ok) return;
    const next = defaultProject();
    setProject(next);
    setFilename(deriveFilename(next));
    setStep('business');
  }, []);

  const handleLoad = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as SiteProject;
        if (parsed.schemaVersion !== SCHEMA_VERSION) {
          alert(
            `Project schema version mismatch. Expected v${SCHEMA_VERSION}, got v${parsed.schemaVersion}.`,
          );
          return;
        }
        const hydrated = hydrateProject(parsed);
        setProject(hydrated);
        setFilename(deriveFilename(hydrated));
      } catch (e) {
        alert('Could not read project.json — ' + (e instanceof Error ? e.message : 'bad JSON'));
      }
    };
    reader.readAsText(file);
  }, []);

  const reshuffle = useCallback(() => {
    setProject((p) => ({ ...p, randomization: { seed: newSeed() } }));
  }, []);

  const selectTemplate = useCallback((id: TemplateId) => {
    setProject((p) => ({
      ...p,
      templateId: id,
      design: { ...p.design, ...COMPOSABLE_PRESETS[id].design },
    }));
  }, []);

  const savedLabel = useMemo(() => formatSavedAgo(savedAt), [savedAt]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-ink-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-white">
            <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
              <path d="M9 10h14M9 16h14M9 22h9" stroke="#5b6cff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">SiteForge</p>
            <p className="text-xs text-ink-500">
              {project.project.customerName || project.business.name} · {savedLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn-ghost" onClick={handleNewProject}>
            New client site
          </button>
          <input
            type="text"
            className="field-input hidden w-56 sm:block"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            aria-label="Export file name"
            placeholder="export-file-name"
          />
          <button type="button" className="btn-ghost" onClick={() => fileInputRef.current?.click()}>
            Open editable project
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleLoad(f);
              e.target.value = '';
            }}
          />
          <button type="button" className="btn-secondary" onClick={handleSaveProjectJson}>
            Save editable project
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleExport}
            disabled={exporting}
            aria-busy={exporting}
          >
            {exporting ? 'Building website ZIP...' : 'Export finished website'}
          </button>
        </div>
      </header>

      <main className="grid min-h-0 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1.1fr)]">
        {fullWidth ? null : (
          <aside className="hidden border-r border-ink-200 bg-white p-3 lg:block">
            <StepNav steps={STEPS} active={step} onSelect={(id) => setStep(id as StepId)} />
            <div className="mt-6 rounded-lg bg-ink-50 p-3 text-xs text-ink-600">
              <p className="font-medium text-ink-800">Workflow</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>Use New client site when starting another customer.</li>
                <li>Save editable project creates the file you reopen later.</li>
                <li>Export finished website creates the deployable ZIP.</li>
              </ul>
            </div>
          </aside>
        )}

        {fullWidth ? null : (
          <section className="min-h-0 overflow-y-auto p-4 lg:p-6">
            <div className="lg:hidden">
              <select
                className="field-input mb-4"
                value={step}
                onChange={(e) => setStep(e.target.value as StepId)}
              >
                {STEPS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-5">
              {step === 'business' ? (
                <BusinessInfoSection
                  project={project}
                  update={(patch) => update('business', patch)}
                  updateProject={(patch) => update('project', patch)}
                />
              ) : null}
              {step === 'brand' ? (
                <BrandSection project={project} update={(patch) => update('brand', patch)} />
              ) : null}
              {step === 'content' ? (
                <ContentSection project={project} update={(patch) => update('content', patch)} />
              ) : null}
              {step === 'seo' ? (
                <SeoSection project={project} update={(patch) => update('seo', patch)} />
              ) : null}
              {step === 'template' ? (
                <TemplateSection
                  project={project}
                  selectTemplate={selectTemplate}
                  updateDesign={(patch) => update('design', patch)}
                  reshuffle={reshuffle}
                />
              ) : null}
              <div className="flex items-center justify-between pt-2 text-xs text-ink-500">
                <button
                  type="button"
                  className="btn-ghost px-2"
                  onClick={() => setStep(prevStep(step))}
                  disabled={step === STEPS[0]!.id}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="btn-ghost px-2"
                  onClick={() => setStep(nextStep(step))}
                  disabled={step === STEPS[STEPS.length - 1]!.id}
                >
                  Next →
                </button>
              </div>
            </div>
          </section>
        )}

        <section className={`min-h-0 ${fullWidth ? 'col-span-full' : ''}`}>
          <PreviewPane
            project={project}
            fullWidth={fullWidth}
            onToggleFullWidth={() => setFullWidth((v) => !v)}
          />
        </section>
      </main>
    </div>
  );
}

function deriveFilename(project: SiteProject): string {
  return (
    (project.project.customerName || project.business.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50) || 'site'
  );
}

function prevStep(s: StepId): StepId {
  const i = STEPS.findIndex((x) => x.id === s);
  return STEPS[Math.max(0, i - 1)]!.id;
}

function nextStep(s: StepId): StepId {
  const i = STEPS.findIndex((x) => x.id === s);
  return STEPS[Math.min(STEPS.length - 1, i + 1)]!.id;
}

function formatSavedAgo(ts: number): string {
  const sec = Math.max(0, Math.round((Date.now() - ts) / 1000));
  if (sec < 5) return 'Saved just now';
  if (sec < 60) return `Saved ${sec}s ago`;
  const min = Math.floor(sec / 60);
  return `Saved ${min}m ago`;
}
