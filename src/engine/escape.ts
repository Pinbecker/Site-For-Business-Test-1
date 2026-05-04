/**
 * Tiny HTML/attribute/JSON escapers used by every template.
 * No third-party dependency — generated sites must be fully self-contained,
 * but the engine itself runs in the builder so we keep it tight too.
 */

export function escapeHtml(input: string | undefined | null): string {
  if (input === undefined || input === null) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** For attribute contexts where we still want quotes preserved as entities. */
export function escapeAttr(input: string | undefined | null): string {
  return escapeHtml(input);
}

const LS = String.fromCharCode(0x2028); // U+2028 LINE SEPARATOR
const PS = String.fromCharCode(0x2029); // U+2029 PARAGRAPH SEPARATOR

/** For embedding strings inside a JSON-LD <script> block.
 *  Closes a few XSS vectors specific to inline JSON, including the
 *  U+2028 / U+2029 separators which break naive script parsing. */
export function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(LS).join('\\u2028')
    .split(PS).join('\\u2029');
}

/** Collapse whitespace and trim — useful for meta description / title. */
export function sanitizeMeta(input: string | undefined | null, max = 300): string {
  if (!input) return '';
  const cleaned = String(input).replace(/\s+/g, ' ').trim();
  return cleaned.length > max ? cleaned.slice(0, max - 1).trimEnd() + '…' : cleaned;
}
