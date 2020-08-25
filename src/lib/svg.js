import { minify } from "./string.js";

const generateSwatches = (parentId, p, swatchWidth, swatchHeight, padding) =>
  Object.entries(p)
    .map(
      ([id, hex], i) =>
        `<rect id="${parentId}-${id}" fill="${hex}" x="0" y="${
          i * (swatchHeight + padding)
        }" width="${swatchWidth}" height="${swatchHeight}"></rect>`
    )
    .join("");

const generateGroups = (p, swatchWidth, swatchHeight, padding) =>
  Object.entries(p).reduce(
    (acc, [id, colors], i) =>
      acc +
      `<g id="${id}" transform="translate(${
        i * (swatchWidth + padding)
      }, 0.000000)">
  ${generateSwatches(id, colors, swatchWidth, swatchHeight, padding)}
</g>`,
    ""
  );

export const jsonToSvg = (
  json,
  swatchWidth = 80,
  swatchHeight = 60,
  padding = 8
) => {
  const numOfColors = Object.keys(json).length;
  const firstColorId = Object.keys(json)[0];
  const numOfSwatches = Object.keys(json[firstColorId]).length;

  const canvasWidth = numOfColors * swatchWidth + (numOfColors - 1) * padding;
  const canvasHeight =
    numOfSwatches * swatchHeight + (numOfSwatches - 1) * padding;

  const svg = `<svg width="${canvasWidth}px" height="${canvasHeight}px" viewBox="0 0 ${canvasWidth} ${canvasHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Colors</title>
    <desc>Created with color-color</desc>
    <g id="palette" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      ${generateGroups(json, swatchWidth, swatchHeight, padding)}
    </g>
</svg>
`;

  return minify(svg);
};
