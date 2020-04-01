import hsluv from "hsluv";
import chroma from "chroma-js";
import { clamp } from "./math";

export const hslToHex = function(h, s, l, colorSpace = "hsluv") {
  switch (colorSpace) {
    case "hsl":
      return chroma.hsl(h, s / 100, l / 100).hex();
    default:
      return hsluv.hsluvToHex([h, s, l]);
  }
};

export const hexToHsl = function(hex, colorSpace = "hsluv") {
  let h, s, l;
  switch (colorSpace) {
    case "hsl":
      [h, s, l] = chroma(hex).hsl();
      return [h, s * 100, isNaN(l) ? 0 : l];
    default:
      [h, s, l] = hsluv.hexToHsluv(hex);
      return [clamp(h, 0, 360), clamp(s, 0, 100), clamp(l, 0, 100)];
  }
};
