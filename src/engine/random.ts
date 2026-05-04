/**
 * Deterministic seeded PRNG — Mulberry32.
 * Same seed always yields the same sequence so the "regenerate" button
 * produces predictable, repeatable layouts.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rng {
  next(): number;
  /** Integer in [0, max) */
  int(max: number): number;
  pick<T>(arr: readonly T[]): T;
  shuffle<T>(arr: readonly T[]): T[];
  bool(probability?: number): boolean;
}

export function createRng(seed: number): Rng {
  const next = mulberry32(seed);
  const int = (max: number) => Math.floor(next() * max);
  return {
    next,
    int,
    pick<T>(arr: readonly T[]): T {
      if (arr.length === 0) throw new Error('pick from empty array');
      return arr[int(arr.length)] as T;
    },
    shuffle<T>(arr: readonly T[]): T[] {
      const out = arr.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = int(i + 1);
        const tmp = out[i] as T;
        out[i] = out[j] as T;
        out[j] = tmp;
      }
      return out;
    },
    bool(probability = 0.5) {
      return next() < probability;
    },
  };
}

export function newSeed(): number {
  return Math.floor(Math.random() * 0xffffffff) >>> 0;
}
