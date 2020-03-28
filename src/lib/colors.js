import hsluv from "hsluv";
import chroma from "chroma-js";
const hsluvToHex = hsluv.hsluvToHex;

export const hslToHex = function(h, s, l, colorSpace = "hsluv") {
  switch (colorSpace) {
    case "hsl":
      return chroma.hsl(h, s / 100, l / 100).hex();
    default:
      return hsluvToHex([h, s, l]);
  }
};
