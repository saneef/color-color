import test from "ava";

import { getLuminance } from "colorjs.io/fn";
import {
  colorToString,
  contrast,
  createColor,
  createColorByHSL,
  distance,
  getChroma,
} from "./colors.js";

const isCloseTo = (a, b) => Math.abs(a - b) < 0.005;

test("createColor from HEX", (t) => {
  t.snapshot(createColor("#c0ffee"));
});

test("createColor from CSS HSL string", (t) => {
  t.snapshot(createColor("HSL(200 53% 79%)"));
});

test("createColorByHSL into HSL", (t) => {
  const c = createColorByHSL(200, 53, 79);
  t.is(c.space.id, "srgb");
  t.is(colorToString(c, "hex"), "#add3e6");
});

test("createColorByHSL into HSLuv", (t) => {
  const c = createColorByHSL(200, 53, 79, "hsluv");

  t.is(c.space.id, "hsluv");
  t.is(
    colorToString(c, "hsluv", "hsluv"),
    "color(--hsluv 224.52 48.074% 82.453%)"
  );
});

test("createColorByHSL into Okhsl", (t) => {
  const c = createColorByHSL(200, 50, 50, "okhsl");

  t.is(c.space.id, "okhsl");
  t.is(
    colorToString(c, "okhsl", "okhsl"),
    "color(--okhsl 228.69 0.23501% 1.8408%)"
  );
});

test("colorToString: get HEX string", (t) => {
  const color = createColor("HSL(200 53% 79%)");
  t.is(colorToString(color, "hex"), "#add3e6");
});

test("colorToString: get as HEX string", (t) => {
  const color = createColor("HSL(200 53% 79%)");
  t.is(colorToString(color, "hex"), "#add3e6");
});

test("colorToString: get a hsl string", (t) => {
  const color = createColor("#add3e6");
  t.is(colorToString(color, "hsl", "hsl"), "hsl(200 53.271% 79.02%)");
});

test("getChroma from color", (t) => {
  const color = createColor("#52ac64");
  t.truthy(isCloseTo(getChroma(color), 49.1972));
});

test("getLuminance from color", (t) => {
  const color = createColor("#cef4d4");
  t.truthy(isCloseTo(getLuminance(color), 0.82575));
});

test("get contrast with white", (t) => {
  const color1 = createColor("#9ae7a9");
  const color2 = createColor("#fff");

  t.truthy(isCloseTo(contrast(color1, color2), 1.46));
});

test("get contrast with black", (t) => {
  const color1 = createColor("#9ae7a9");
  const color2 = createColor("#000");

  t.truthy(isCloseTo(contrast(color1, color2), 14.38));
});

test("get distance with black", (t) => {
  const color1 = createColor("#9ae7a9");
  const color2 = createColor("#000");
  t.truthy(isCloseTo(distance(color1, color2), 1.2745));
});

test("get distance with white", (t) => {
  const color1 = createColor("#9ae7a9");
  const color2 = createColor("#fff");
  t.truthy(isCloseTo(distance(color1, color2), 0.528));
});
