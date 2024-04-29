import Color from "colorjs.io";
import hsluv from "hsluv";
import { clamp } from "./math";

export function createColor(cssString) {
  return new Color(cssString);
}

export function createColorByHSL(h, s, l, colorSpace = "srgb") {
  if (colorSpace === "okhsl") {
    return new Color(colorSpace, [h, s / 100, l / 100]);
  }
  return new Color(colorSpace, [h, s, l]);
}

export function colorToString(color, format = "hsla", colorSpace = "srgb") {
  return color.to(colorSpace).toString({ format });
}

export function getChroma(color) {
  const _c = color.to("lch");
  return _c.c;
}

export function getLuminance(color) {
  return color.luminance;
}

export function contrast(color1, color2, algorithm = "WCAG21") {
  return color1.contrast(color2, algorithm);
}

export function distance(color1, color2, colorSpace = "srgb") {
  return color1.distance(color2, colorSpace);
}
