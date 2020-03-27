<style>
  h2 {
    @apply text-lg font-bold;
  }

  .chrome {
    @apply w-screen h-screen grid;
    grid-template-rows: max-content 1fr;
    grid-template-columns: minmax(16rem, 1fr) 3fr 2fr;
    grid-template-areas:
      "header   palettes  graphs"
      "controls palettes  graphs";
  }

  .controls,
  .palettes {
    @apply overflow-y-auto overflow-x-hidden;
  }

  .palettes {
    @apply grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-area: palettes / span 2;
  }

  .controls {
    @apply p-4 border-4 border-t-0 border-gray-900;
    grid-area: controls;
  }

  .control-set {
    @apply mt-4 pt-4 border-t border-gray-500;
  }
</style>

<script>
  import "./global.css";
  import SiteHeader from "./SiteHeader.svelte";
  import Palette from "./Palette.svelte";
  import PaletteKnobs from "./PaletteKnobs.svelte";
  import Swatch from "./Swatch.svelte";
  import RangeField from "./RangeField.svelte";
  import Checkbox from "./Checkbox.svelte";
  import TextField from "./TextField.svelte";

  import { paletteParams, steps, palettes, settings } from "./store";

  function confirmAndDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      paletteParams.removeByIndex(id);
    }
  }
</script>

<main class="chrome">
  <SiteHeader />
  <div class="controls">
    <h2 id="steps-title">Steps</h2>
    <RangeField
      id="steps-range"
      labelledby="steps-title"
      bind:value="{$steps}"
      min="3"
      max="21" />

    <PaletteKnobs />

    <div class="control-set">
      <h2 id="ref-colors">Reference colors</h2>
      <TextField
        labelledby="ref-colors"
        id="ref-colors-input"
        bind:value="{$settings.refColorsRaw}"
        legend="Comma seperated list of hex color codes." />
    </div>

    <div class="control-set">
      <h2>Overlay</h2>
      <Checkbox label="HEX code" bind:checked="{$settings.overlayHex}" />
      <Checkbox
        label="WCAG Contrast"
        bind:checked="{$settings.overlayContrast}" />
    </div>
  </div>
  <div class="palettes">
    {#each $palettes as palette, j (j)}
      <Palette
        active="{$paletteParams.current === j}"
        on:clickActivate="{() => {
          $paletteParams.current = palette.id;
        }}"
        on:clickRemove="{() => {
          confirmAndDelete(palette.id);
        }}"
        removable="{$palettes.length > 1}">
        {#each palette.swatches as color, i (i)}
          <Swatch fillHeight hexCode="{color.hex}" label="{color.id}" />
        {/each}
      </Palette>
    {/each}
  </div>
</main>
