export function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const linspace = (length) =>
  Array.from({ length: length + 1 }).map((_, i) => (1 / length) * i);

export const clamp = (min, val, max) => Math.max(min, Math.min(val, max));

export const lerp = (min, max, t) => {
  return min * (1 - t) + max * t;
};
