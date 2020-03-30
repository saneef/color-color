import { writable, derived, readable } from "svelte/store";
import eases from "eases";
import chroma from "chroma-js";
import jsoun from "jsoun";
import { randomInt } from "./lib/math";
import { getBaseUrl, getStateFromUrl } from "./lib/url";
import { hslToHex } from "./lib/colors";

const urlState = getStateFromUrl();

// These eases are not very useful to generate
// colour schemes.
const easesBlacklist = [
  "backInOut",
  "backIn",
  "backOut",
  "elasticInOut",
  "elasticIn",
  "elasticOut",
  "bounceInOut",
  "bounceIn",
  "bounceOut",
];

export const config = readable({
  eases: Object.keys(eases).filter(e => !easesBlacklist.includes(e)),
  resolution: 0.25,
  limits: {
    hue: [0, 360],
    sat: [0, 100],
    lig: [0, 100],
  },
});

export const steps = writable(urlState.steps || 9);

export const shareDialog = writable(false);

export const settings = writable(
  urlState.settings || {
    overlayContrast: false,
    overlayHex: true,
    refColorsRaw: "",
    colorSpace: "hsluv",
  }
);

function createPaletteParams() {
  const { subscribe, set, update } = writable(
    urlState.paletteParams || {
      paletteIndex: 0,
      swatchIndex: 0,
      params: [
        {
          hue: { start: 230, end: 254, ease: "quadIn" },
          sat: { start: 45, end: 100, ease: "quadOut" },
          lig: { start: 99, end: 5, ease: "quadOut" },
        },
        {
          hue: { start: 278, end: 290, ease: "quadIn" },
          sat: { start: 38, end: 89, ease: "quadOut" },
          lig: { start: 99, end: 5, ease: "quadOut" },
        },
        {
          hue: { start: 9, end: 16, ease: "quadIn" },
          sat: { start: 44, end: 81, ease: "quadOut" },
          lig: { start: 99, end: 5, ease: "quadOut" },
        },
      ],
    }
  );

  const removeByIndex = index =>
    update(pp => {
      if (pp.params.length > 1) {
        pp.params = pp.params.filter((_, i) => i !== index);
        if (pp.paletteIndex > index) {
          pp.paletteIndex = pp.paletteIndex - 1;
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

        pp.paletteIndex = pp.params.length;
        pp.params = [...pp.params, param];
      }

      return pp;
    });

  return { subscribe, set, update, removeByIndex, add };
}
export const paletteParams = createPaletteParams();

const easeSteps = (easeFn, currentStep, totalStep) =>
  easeFn(currentStep / totalStep) * currentStep;

export const palettes = derived(
  [steps, paletteParams, settings],
  ([$steps, $paletteParams, $settings]) =>
    $paletteParams.params.map(pal => {
      const { hue, sat, lig } = pal;
      const hUnit = (hue.end - hue.start) / $steps;
      const sUnit = (sat.end - sat.start) / $steps;
      const lUnit = (lig.end - lig.start) / $steps;

      const swatches = Array.from({ length: $steps }).map((_, i) => {
        const h = hue.start + easeSteps(eases[hue.ease], i + 1, $steps) * hUnit;
        const s = sat.start + easeSteps(eases[sat.ease], i + 1, $steps) * sUnit;
        const l = lig.start + easeSteps(eases[lig.ease], i + 1, $steps) * lUnit;
        const hex = hslToHex(h, s, l, $settings.colorSpace);
        const id = (i + 1) * ($steps > 9 ? 10 : 100);
        return {
          id: id.toString(),
          h,
          s,
          l,
          hex,
        };
      });

      return swatches;
    })
);

export const swatchesGroupedById = derived([palettes], ([$palettes]) => {
  const groupedBySwatchId = $palettes
    .map((palette, i) => {
      return palette.map(swatch => {
        const { id: swatchId, ...rest } = swatch;
        return {
          ...rest,
          paletteIndex: i,
          swatchId,
        };
      });
    })
    .flat()
    .reduce(
      (acc, swatch) => ({
        ...acc,
        [swatch.swatchId]: [
          ...(acc[swatch.swatchId] ? acc[swatch.swatchId] : []),
          swatch,
        ],
      }),
      {}
    );

  return Object.keys(groupedBySwatchId).reduce((acc, swatchId, i) => {
    acc[i] = groupedBySwatchId[swatchId];
    return acc;
  }, []);
});

const hexRe = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

export const refColors = derived(settings, $settings => {
  return $settings.refColorsRaw
    .split(",")
    .map(s => s.trim())
    .filter(s => s.match(hexRe) !== null);
});

export const nearestRefColors = derived(
  [refColors, palettes],
  ([$refColors, $palettes]) => {
    const refs = $refColors.reduce((acc, c) => {
      return { ...acc, [c]: {} };
    }, {});

    $refColors.forEach(rc => {
      $palettes.forEach(p =>
        p.forEach(swatch => {
          const { hex } = swatch;
          const dist = chroma.distance(rc, hex, "rgb");
          if (refs[rc].hex === undefined || refs[rc].dist > dist) {
            refs[rc].hex = hex;
            refs[rc].dist = dist;
          }
        })
      );
    });

    const matchedSwatches = Object.keys(refs).reduce((acc, key) => {
      const { hex } = refs[key];

      return {
        [hex]: key,
        ...acc,
      };
    }, {});

    return matchedSwatches;
  }
);

export const shareState = derived(
  [settings, steps, paletteParams, palettes],
  ([$settings, $steps, $paletteParams, $palettes]) => {
    const state = {
      steps: $steps,
      paletteParams: $paletteParams,
      settings: $settings,
    };
    const encodedState = jsoun.encode(state);

    const paletteJson = $palettes.reduce((pacc, p, i) => {
      const palette = p.reduce((acc, s) => {
        return { ...acc, [s.id]: s.hex };
      }, {});
      return { ...pacc, [`color-${i + 1}`]: palette };
    }, {});

    return {
      url: `${getBaseUrl()}#${encodedState}`,
      json: JSON.stringify(paletteJson, null, 2),
    };
  }
);
