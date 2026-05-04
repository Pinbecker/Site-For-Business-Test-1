/**
 * Colour utilities for the generated site and contrast warnings in the builder.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb {
  const m = /^#?([a-f\d]{3}|[a-f\d]{6})$/i.exec(hex.trim());
  if (!m) return { r: 0, g: 0, b: 0 };
  let h = m[1] as string;
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(c: Rgb): number {
  return 0.2126 * srgbToLinear(c.r) + 0.7152 * srgbToLinear(c.g) + 0.0722 * srgbToLinear(c.b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

export function contrastRatioHex(a: string, b: string): number {
  return contrastRatio(hexToRgb(a), hexToRgb(b));
}

/** Lightens a hex color by mixing with white. amount 0..1 */
export function tint(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: r + (255 - r) * amount,
    g: g + (255 - g) * amount,
    b: b + (255 - b) * amount,
  });
}

/** Darkens a hex color by mixing with black. amount 0..1 */
export function shade(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({ r: r * (1 - amount), g: g * (1 - amount), b: b * (1 - amount) });
}

/** Best on-color (black or white) for a given background. */
export function readableOn(bgHex: string): '#ffffff' | '#0b0b0b' {
  const white = contrastRatioHex(bgHex, '#ffffff');
  const black = contrastRatioHex(bgHex, '#0b0b0b');
  return white >= black ? '#ffffff' : '#0b0b0b';
}

export function isValidHex(value: string): boolean {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(value.trim());
}

export function normalizeHex(value: string): string {
  if (!isValidHex(value)) return '#000000';
  let h = value.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return `#${h.toLowerCase()}`;
}
