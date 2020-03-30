<style>
  .plots {
    @apply overflow-y-auto overflow-x-hidden border-4 border-l-0 border-gray-900;
    grid-area: var(--grid-area);
  }

  .plot-group {
    @apply p-4;
  }

  .plot-group + .plot-group {
    @apply border-t-4 border-gray-900;
  }

  h2 {
    @apply text-xl font-bold;
  }

  .palette-selector {
    @apply -mt-1;
  }
</style>

<script>
  import PaletteSelector from "./PaletteSelector.svelte";
  import { paletteParams, swatchesGroupedById } from "./store";

  export let gridArea;

  let currentSwatchId = "";

  $: currentSwatchId =
    $swatchesGroupedById[$paletteParams.swatchIndex][0].swatchId;
</script>

<div class="plots" style="--grid-area: {gridArea};">
  <div class="plot-group">
    <div class="palette-selector">
      <PaletteSelector />
    </div>
  </div>
  <div class="plot-group">
    <h2>{currentSwatchId}</h2>
  </div>
</div>
