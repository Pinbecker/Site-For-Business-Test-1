import { isValidHex, normalizeHex } from '@/engine/color';
import { Field } from './Field';

interface Props {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
}

export function ColorField({ label, value, onChange, hint }: Props) {
  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={isValidHex(value) ? normalizeHex(value) : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border border-ink-200 bg-white p-1"
          aria-label={`${label} colour picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field-input"
          placeholder="#1f6feb"
          spellCheck={false}
        />
      </div>
    </Field>
  );
}
