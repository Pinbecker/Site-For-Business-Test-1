import { useCallback, useRef, useState } from 'react';
import type { ImageAsset } from '@/types/project';
import { fileToAsset } from '../imageUpload';

interface Props {
  multiple?: boolean;
  accept?: string;
  onAdded: (assets: ImageAsset[]) => void;
  label?: string;
  hint?: string;
}

export function ImageDropzone({
  multiple = true,
  accept = 'image/*',
  onAdded,
  label = 'Drop images or click to browse',
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [hover, setHover] = useState(false);

  const ingest = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;
      setBusy(true);
      try {
        const list = Array.from(files);
        const assets = await Promise.all(list.map(fileToAsset));
        onAdded(assets);
      } finally {
        setBusy(false);
      }
    },
    [onAdded],
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          void ingest(e.dataTransfer.files);
        }}
        className={`flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-6 text-sm transition ${
          hover
            ? 'border-accent-500 bg-accent-500/5 text-ink-900'
            : 'border-ink-200 bg-ink-50/50 text-ink-600 hover:border-ink-300 hover:bg-white'
        }`}
        disabled={busy}
        aria-busy={busy}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
        </svg>
        <span>{busy ? 'Reading…' : label}</span>
      </button>
      {hint ? <p className="field-help">{hint}</p> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          void ingest(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}
