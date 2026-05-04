import { useEffect, useMemo, useRef, useState } from 'react';
import type { SiteProject } from '@/types/project';
import { renderPreview } from '@/engine/preview';

type Device = 'mobile' | 'tablet' | 'desktop';

interface Props {
  project: SiteProject;
  fullWidth: boolean;
  onToggleFullWidth: () => void;
}

const DEVICE_WIDTHS: Record<Device, number> = {
  mobile: 390,
  tablet: 768,
  desktop: 1280,
};

export function PreviewPane({ project, fullWidth, onToggleFullWidth }: Props) {
  const [device, setDevice] = useState<Device>('desktop');
  const [doc, setDoc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Debounce render to keep typing smooth.
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setDoc(renderPreview(project));
      } catch (err) {
        // Surface render errors as a tiny preview message rather than crashing the builder.
        const message = err instanceof Error ? err.message : 'Render error';
        setDoc(
          `<!doctype html><html><body style="font:14px system-ui;padding:2rem;color:#b00">Preview error: ${message}</body></html>`,
        );
      }
    }, 120);
    return () => clearTimeout(t);
  }, [project]);

  const wrapStyle = useMemo(() => {
    if (device === 'desktop') return { width: '100%', maxWidth: '1280px' };
    return { width: `${DEVICE_WIDTHS[device]}px`, maxWidth: '100%' };
  }, [device]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-ink-100 bg-white px-4 py-2">
        <div className="flex items-center gap-1 rounded-lg bg-ink-100 p-1">
          {(['mobile', 'tablet', 'desktop'] as Device[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition ${
                device === d ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
              }`}
              aria-pressed={device === d}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-500">Live preview</span>
          <button
            type="button"
            onClick={onToggleFullWidth}
            className="btn-ghost px-2 py-1 text-xs"
            aria-label={fullWidth ? 'Show form' : 'Hide form'}
          >
            {fullWidth ? '↤ Show form' : '↦ Full width'}
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center overflow-auto bg-ink-100/70 p-4">
        <div
          className="overflow-hidden rounded-xl bg-white shadow-soft transition-all"
          style={{ ...wrapStyle, height: 'calc(100vh - 180px)', minHeight: '500px' }}
        >
          <iframe
            ref={iframeRef}
            title="SiteForge preview"
            className="h-full w-full bg-white"
            sandbox="allow-same-origin allow-scripts allow-popups"
            srcDoc={doc}
          />
        </div>
      </div>
    </div>
  );
}
