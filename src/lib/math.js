export function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const linspace = length =>
  Array.from({ length: length + 1 }).map((_, i) => (1 / length) * i);
