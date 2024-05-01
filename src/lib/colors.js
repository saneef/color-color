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

export function contrast(color1, color2, algorithm = "WCAG21") {
  return getContrast(color1, color2, algorithm);
}

export function distance(color1, color2, colorSpace = "srgb") {
  return computeDistance(color1, color2, colorSpace);
}
