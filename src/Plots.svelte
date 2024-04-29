<style lang="postcss">
  .plots {
    @apply overflow-y-auto overflow-x-hidden;
    @apply border-4 border-t-0 border-gray-900;
    grid-area: var(--grid-area);
    scroll-snap-align: start;

    @screen md {
      @apply border-t-4 border-l-0;
    }
  }

  .plot-group {
    @apply p-4;
  }

  .plot-group + .plot-group {
    @apply border-t-4 border-gray-900;
  }

  h2 {
    @apply text-2xl font-bold;
  }

  .palette-selector {
    @apply -mt-1;
  }
</style>

<script>
  import ColorsPlot from "./ColorsPlot.svelte";
  import ControlGroup from "./ControlGroup.svelte";
  import PaletteSelector from "./PaletteSelector.svelte";
  import {
    paletteParams,
    swatchesGroupedById,
    palettes,
    config,
  } from "./store";
  import { getChroma, getLuminance } from "./lib/colors";

  export let gridArea;

  let currentPalette = [];
  let currentSwatchId = "";
  let currentSwatchSet = [];

  $: currentPalette = $palettes[$paletteParams.paletteIndex];

  $: currentSwatchId =
    $swatchesGroupedById[$paletteParams.swatchIndex][0].swatchId;
  $: currentSwatchSet = $swatchesGroupedById[$paletteParams.swatchIndex] || [];
</script>

<div class="plots" style="--grid-area: {gridArea};">
  <div class="plot-group">
    <div class="palette-selector">
      <PaletteSelector />
    </div>

    <ControlGroup noBorderTop>
      <ColorsPlot
        title="Luminance"
        subtitle="How bright is it?"
        yDomain="{[0, 1]}"
        data="{currentPalette.map((s) => ({
          x: s.id,
          y: getLuminance(s.hex),
          hex: s.hex,
        }))}"
      />
    </ControlGroup>
    <ControlGroup>
      <ColorsPlot
        title="Chroma"
        subtitle="How colorful is it?"
        yDomain="{[0, 150]}"
        data="{currentPalette.map((s) => ({
          x: s.id,
          y: getChroma(s.hex),
          hex: s.hex,
        }))}"
      />
    </ControlGroup>
    <ControlGroup>
      <ColorsPlot
        title="Hue"
        subtitle="What color is it?"
        yDomain="{$config.limits.hue}"
        yTickDivisions="{6}"
        data="{currentPalette.map((s) => ({ x: s.id, y: s.h, hex: s.hex }))}"
      />
    </ControlGroup>
  </div>
  <div class="plot-group">
    <h2>{currentSwatchId}</h2>
    <ControlGroup noBorderTop>
      <ColorsPlot
        title="Luminance"
        subtitle="How bright is it?"
        yDomain="{[0, 1]}"
        data="{currentSwatchSet.map((s) => ({
          x: (s.paletteIndex + 1).toString(),
          y: getLuminance(s.hex),
          hex: s.hex,
        }))}"
      />
    </ControlGroup>
    <ControlGroup>
      <ColorsPlot
        title="Chroma"
        subtitle="How colorful is it?"
        yDomain="{[0, 150]}"
        data="{currentSwatchSet.map((s) => ({
          x: (s.paletteIndex + 1).toString(),
          y: getChroma(s.hex),
          hex: s.hex,
        }))}"
      />
    </ControlGroup>

    <ControlGroup>
      <ColorsPlot
        title="Hue"
        subtitle="What color is it?"
        yDomain="{$config.limits.hue}"
        yTickDivisions="{6}"
        data="{currentSwatchSet.map((s) => ({
          x: (s.paletteIndex + 1).toString(),
          y: s.h,
          hex: s.hex,
        }))}"
      />
    </ControlGroup>
  </div>
</div>
