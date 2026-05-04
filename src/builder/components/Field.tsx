import type { ReactNode } from 'react';

interface Props {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  required?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}

export function Field({ label, htmlFor, hint, required, trailing, children }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="field-label">
          {label}
          {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
        </label>
        {trailing ? <div className="text-xs text-ink-500">{trailing}</div> : null}
      </div>
      {children}
      {hint ? <p className="field-help">{hint}</p> : null}
    </div>
  );
}
