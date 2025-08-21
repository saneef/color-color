import {
  ColorSpace,
  HSL,
  HSLuv,
  LCH,
  OKLCH,
  Okhsl,
  distance as computeDistance,
  to as convert,
  contrast as getContrast,
  getLuminance as luminance,
  parse,
  sRGB,
  serialize,
} from "colorjs.io/fn";

/** @import  {ColorTypes, Algorithms} from "colorjs.io/fn"  */

ColorSpace.register(sRGB);
ColorSpace.register(LCH);
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);
ColorSpace.register(Okhsl);
ColorSpace.register(HSLuv);

export function createColor(cssString) {
  return parse(cssString);
}

export function createColorByHSL(h, s, l, colorSpace = "hsl") {
  const hsl = colorSpace === "okhsl" ? [h, s / 100, l / 100] : [h, s, l];
  const colorObj = {
    space: colorSpace,
    coords: /**@type [number, number, number] */ (hsl),
  };

  return convert(colorObj, colorSpace);
}

export function colorToString(color, format = "hex", colorSpace = "srgb") {
  const c = convert(color, colorSpace);
  return serialize(c, { format });
}

export function getChroma(color) {
  const _c = convert(color, "lch");
  const [_, c] = _c.coords;
  return c;
}

export function getLuminance(color) {
  return luminance(color);
}

/**
 * @param      {ColorTypes}  background                The color 1
 * @param      {ColorTypes}  foreground                The color 2
 * @param      {Algorithms}  [algorithm="WCAG21"]  The algorithm
 * @return     {number}  { description_of_the_return_value }
 */
export function contrast(background, foreground, algorithm = "WCAG21") {
  return getContrast(background, foreground, { algorithm });
}

export function distance(color1, color2, colorSpace = "srgb") {
  return computeDistance(color1, color2, colorSpace);
}
