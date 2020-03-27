<style>
  .chrome {
    @apply w-screen h-screen grid;
    grid-template-rows: 4rem 1fr;
    grid-template-columns: minmax(16rem, 1fr) 3fr 2fr;
    grid-template-areas:
      "header		palettes	graphs"
      "controls	palettes	graphs";
  }

  .controls {
    grid-area: controls;
  }

  .palettes {
    @apply grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-area: palettes / span 2;
  }

  .controls,
  .palettes {
    @apply overflow-y-auto overflow-x-hidden;
  }

  .controls {
    @apply border-4 border-t-0 border-gray-900;
  }

  .button-set {
    @apply flex -mx-1 -mt-1 mb-4;
  }

  button {
    @apply flex-auto items-center p-4 border-4 border-gray-900 font-bold;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  h2 {
    @apply text-lg font-bold px-4;
  }
</style>

<script>
  import "./global.css";
  import Header from "./Header.svelte";
  import Palette from "./Palette.svelte";
  import PaletteKnobs from "./PaletteKnobs.svelte";
  import Swatch from "./Swatch.svelte";

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
