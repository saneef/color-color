export function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const linspace = length =>
  Array.from({ length: length + 1 }).map((_, i) => (1 / length) * i);

// From https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_clamp
export const clamp = (number, boundOne, boundTwo) => {
  if (!boundTwo) {
    return Math.max(number, boundOne) === boundOne ? number : boundOne;
  } else if (Math.min(number, boundOne) === number) {
    return boundOne;
  } else if (Math.max(number, boundTwo) === number) {
    return boundTwo;
  }
  return number;
};
