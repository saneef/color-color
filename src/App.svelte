<style>
  .chrome {
    @apply w-screen h-screen grid;
    grid-template-rows: content-max 1fr;
    grid-template-columns: minmax(16rem, 1fr) 3fr 2fr;
    grid-template-areas:
      "header		palettes	graphs"
      "controls	palettes	graphs";
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

  h2 {
    @apply text-lg font-bold;
  }
</style>

<script>
  import "./global.css";
  import Header from "./Header.svelte";
  import Palette from "./Palette.svelte";
  import PaletteKnobs from "./PaletteKnobs.svelte";
  import Swatch from "./Swatch.svelte";
  import RangeField from "./RangeField.svelte";

  import { paletteParams, steps, palettes } from "./store";

  function confirmAndDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      paletteParams.removeByIndex(id);
    }
  }
</script>

<main class="chrome">
  <Header />
  <div class="controls">

    <h2 id="steps-title">Steps</h2>
    <RangeField
      id="steps-range"
      labelledby="steps-title"
      bind:value="{$steps}"
      min="3"
      max="21" />

    <PaletteKnobs />
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
