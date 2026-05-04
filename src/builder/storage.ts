/**
 * Local autosave for in-progress projects. The user's source-of-truth is the
 * project.json export — but we keep a working copy in localStorage so a refresh
 * doesn't lose state.
 */
import type { SiteProject } from '@/types/project';
import { SCHEMA_VERSION } from '@/types/project';
import { hydrateProject } from './projectMigration';

const KEY = 'siteforge.project.v1';

export function loadAutosave(): SiteProject | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SiteProject;
    if (!parsed || parsed.schemaVersion !== SCHEMA_VERSION) return null;
    return hydrateProject(parsed);
  } catch {
    return null;
  }
}

export function saveAutosave(project: SiteProject): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(project));
  } catch {
    // localStorage may be full (large image data URLs). Drop silently —
    // exported project.json is still the canonical store.
  }
}

export function clearAutosave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
