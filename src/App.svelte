<style>
  .chrome {
    @apply w-screen h-screen grid;
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-areas:
      "header		palettes	graphs"
      "controls	palettes	graphs";
  }

  .header {
    @apply p-4 border-4 border-r-4 border-gray-900;
    grid-area: header;
  }

  .controls {
    @apply p-2;
    grid-area: controls;
  }

  .palettes {
    @apply grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-area: palettes / span 2;
  }

  .controls,
  .palettes {
    @apply overflow-y-auto;
  }

  .controls {
    @apply border-4 border-t-0 border-gray-900;
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .button-set {
    @apply flex -mx-3 -mt-3 mb-4;
  }

  button {
    @apply flex-auto items-center p-4 border-4 border-gray-900 font-bold;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  import "./global.css";
  import Palette from "./Palette.svelte";
  import PaletteKnobs from "./PaletteKnobs.svelte";
  import Swatch from "./Swatch.svelte";

  import { paletteParams, steps, palettes } from "./store";
</script>

<main class="chrome">
  <header class="header">
    <h1 class="title">
      color
      <span aria-hidden="true">×</span>
      color
    </h1>
  </header>
  <div class="controls">
    <div class="button-set">
      <button on:click="{() => paletteParams.add()}">Add Color</button>
    </div>
    <div class="control-set control-set--half-width">
      <h2 id="steps-title">Steps</h2>
      <div class="control-group">
        <div class="range-set">
          <input
            aria-labelledby="steps-title"
            id="steps"
            type="range"
            bind:value="{$steps}"
            min="3"
            max="21" />
          <span class="range-set__value">{$steps}</span>
        </div>
      </div>
    </div>

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
          paletteParams.removeByIndex(palette.id);
        }}"
        removable="{$palettes.length > 1}">
        {#each palette.swatches as color, i (i)}
          <Swatch fillHeight hexCode="{color.hex}" label="{i}" />
        {/each}
      </Palette>
    {/each}
  </div>
</main>
