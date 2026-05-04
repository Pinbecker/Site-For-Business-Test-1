interface Step {
  id: string;
  label: string;
}

interface Props {
  steps: Step[];
  active: string;
  onSelect: (id: string) => void;
}

export function StepNav({ steps, active, onSelect }: Props) {
  return (
    <nav aria-label="Builder sections" className="flex flex-col gap-1">
      {steps.map((s, i) => {
        const isActive = s.id === active;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              isActive
                ? 'bg-ink-900 text-white'
                : 'text-ink-700 hover:bg-ink-100'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-xs font-semibold ${
                isActive ? 'bg-white/15 text-white' : 'bg-ink-100 text-ink-700'
              }`}
            >
              {i + 1}
            </span>
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}
