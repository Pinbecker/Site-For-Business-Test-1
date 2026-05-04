import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionShell({ title, description, children }: Props) {
  return (
    <section className="card space-y-5">
      <header>
        <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
        {description ? <p className="mt-1 text-sm text-ink-600">{description}</p> : null}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
