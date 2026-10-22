// Small deterministic hash (FNV-1a) so the same seed always gives the same tilt.
function hash(str: string): number {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/**
 * Returns a stable "random" rotation in degrees between -max and +max.
 * Stable = same seed, same angle on every render, so cards don't jitter
 * when React re-renders or when filters change.
 */
export function tilt(seed: string, max = 2): number {
    const n = hash(seed) / 0xffffffff; // 0..1
    return Number(((n * 2 - 1) * max).toFixed(2));
}

export function randomFromArray<T>(array: Array<T>, seed: string): T {
    return array[Math.floor((hash(seed) / 0xffffffff) * array.length)];
}
