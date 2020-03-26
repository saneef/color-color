import { writable, derived } from "svelte/store";
import eases from "eases";
import hsluv from "hsluv";

const hsluvToHex = hsluv.hsluvToHex;

export const currentPalette = writable(0);

export const steps = writable(10);

export const paletteParams = writable([
  {
    hue: { start: 230, end: 240, ease: "quadIn" },
    sat: { start: 60, end: 100, ease: "quadOut" },
    lig: { start: 100, end: 5, ease: "quadOut" },
  },
  {
    hue: { start: 280, end: 290, ease: "quadIn" },
    sat: { start: 60, end: 100, ease: "quadOut" },
    lig: { start: 100, end: 5, ease: "quadOut" },
  },
  {
    hue: { start: 340, end: 360, ease: "quadIn" },
    sat: { start: 60, end: 100, ease: "quadOut" },
    lig: { start: 100, end: 5, ease: "quadOut" },
  },
]);

const easeSteps = (easeFn, currentStep, totalStep) =>
  easeFn(currentStep / totalStep) * currentStep;

export const palettes = derived(
  [steps, paletteParams],
  ([$steps, $paletteParams]) =>
    $paletteParams.map((pal, id) => {
      const { hue, sat, lig } = pal;
      const hUnit = (hue.end - hue.start) / $steps;
      const sUnit = (sat.end - sat.start) / $steps;
      const lUnit = (lig.end - lig.start) / $steps;

      const swatches = Array.from({ length: $steps }).map((_, i) => {
        const h = hue.start + easeSteps(eases[hue.ease], i + 1, $steps) * hUnit;
        const s = sat.start + easeSteps(eases[sat.ease], i + 1, $steps) * sUnit;
        const l = lig.start + easeSteps(eases[lig.ease], i + 1, $steps) * lUnit;
        const hex = hsluvToHex([h, s, l]);
        return {
          h,
          s,
          l,
          hex,
        };
      });

      return { id, swatches };
    })
);
