/**
 * Conservative CSS / JS minifiers, no parser, safe-by-default.
 * Run as a separate export step so the unminified HTML stays human-readable.
 */

export function minifyCss(css: string): string {
  // Strip comments (preserve license blocks /*! ... */)
  let out = css.replace(/\/\*(?!!)[\s\S]*?\*\//g, '');
  // Collapse whitespace
  out = out.replace(/\s+/g, ' ');
  // Remove spaces around punctuation
  out = out.replace(/\s*([{}:;,>+~])\s*/g, '$1');
  // Drop trailing semicolons before }
  out = out.replace(/;}/g, '}');
  // Trim leading/trailing
  return out.trim();
}

/**
 * Tiny JS "minifier" — strip comments and collapse whitespace.
 * Avoids stripping inside strings or regex literals by walking char-by-char.
 */
export function minifyJs(js: string): string {
  let out = '';
  let i = 0;
  const n = js.length;
  let prev = '';
  while (i < n) {
    const c = js[i] as string;
    const next = js[i + 1] ?? '';
    // Line comment
    if (c === '/' && next === '/') {
      while (i < n && js[i] !== '\n') i++;
      continue;
    }
    // Block comment
    if (c === '/' && next === '*') {
      i += 2;
      while (i < n && !(js[i] === '*' && js[i + 1] === '/')) i++;
      i += 2;
      continue;
    }
    // String literal
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      out += c;
      i++;
      while (i < n) {
        const ch = js[i] as string;
        out += ch;
        if (ch === '\\' && i + 1 < n) {
          out += js[i + 1];
          i += 2;
          continue;
        }
        i++;
        if (ch === quote) break;
      }
      prev = quote;
      continue;
    }
    // Regex literal — heuristic: only after operator or start
    if (c === '/' && /[=({,;!&|?:+\-*%^~<>\[]/.test(prev || '')) {
      out += c;
      i++;
      while (i < n) {
        const ch = js[i] as string;
        out += ch;
        if (ch === '\\' && i + 1 < n) {
          out += js[i + 1];
          i += 2;
          continue;
        }
        i++;
        if (ch === '/') break;
      }
      // flags
      while (i < n && /[a-z]/i.test(js[i] as string)) {
        out += js[i];
        i++;
      }
      prev = '/';
      continue;
    }
    // Whitespace
    if (/\s/.test(c)) {
      // Preserve a single space when needed between identifiers/keywords
      const lastCh = out[out.length - 1] || '';
      const nextCh = (() => {
        let j = i + 1;
        while (j < n && /\s/.test(js[j] as string)) j++;
        return js[j] || '';
      })();
      if (/[A-Za-z0-9_$]/.test(lastCh) && /[A-Za-z0-9_$]/.test(nextCh)) {
        out += ' ';
        prev = ' ';
      }
      i++;
      continue;
    }
    out += c;
    prev = c;
    i++;
  }
  return out.trim();
}
