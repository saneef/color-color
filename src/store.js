import { writable, derived } from "svelte/store";
import eases from "eases";
import hsluv from "hsluv";
import { randomInt } from "./lib/math";

const hsluvToHex = hsluv.hsluvToHex;

export const steps = writable(10);

export const settings = writable({
  showContrast: false,
  showHex: true,
});

function createPaletteParams() {
  const { subscribe, set, update } = writable({
    current: 0,
    params: [
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
    ],
  });

  const removeByIndex = index =>
    update(pp => {
      if (pp.params.length > 1) {
        pp.params = pp.params.filter((_, i) => i !== index);
        if (pp.current > index) {
          pp.current = pp.current - 1;
        }
      }
      return pp;
    });

  const add = () =>
    update(pp => {
      if (pp.params.length < 6) {
        const hueRange = 20;
        const hue = randomInt(0, 360 - hueRange);

        const param = {
          hue: { start: hue, end: hue + hueRange, ease: "quadIn" },
          sat: { start: 60, end: 100, ease: "quadOut" },
          lig: { start: 100, end: 5, ease: "quadOut" },
        };

        pp.params = [param, ...pp.params];
        pp.current = 0;
      }

      return pp;
    });

  return { subscribe, set, update, removeByIndex, add };
}
export const paletteParams = createPaletteParams();

const easeSteps = (easeFn, currentStep, totalStep) =>
  easeFn(currentStep / totalStep) * currentStep;

export const palettes = derived(
  [steps, paletteParams],
  ([$steps, $paletteParams]) =>
    $paletteParams.params.map((pal, id) => {
      const { hue, sat, lig } = pal;
      const hUnit = (hue.end - hue.start) / $steps;
      const sUnit = (sat.end - sat.start) / $steps;
      const lUnit = (lig.end - lig.start) / $steps;

      const swatches = Array.from({ length: $steps }).map((_, i) => {
        const h = hue.start + easeSteps(eases[hue.ease], i + 1, $steps) * hUnit;
        const s = sat.start + easeSteps(eases[sat.ease], i + 1, $steps) * sUnit;
        const l = lig.start + easeSteps(eases[lig.ease], i + 1, $steps) * lUnit;
        const hex = hsluvToHex([h, s, l]);
        const id = (i + 1) * ($steps > 9 ? 10 : 100);
        return {
          id,
          h,
          s,
          l,
          hex,
        };
      });

      return { id, swatches };
    })
);
