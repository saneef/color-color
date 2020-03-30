<style>
  .palettes {
    @apply grid overflow-y-auto overflow-x-hidden;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-area: var(--grid-area);
  }
</style>

<script>
  import { paletteParams, palettes } from "./store";
  import Palette from "./Palette.svelte";
  import Swatch from "./Swatch.svelte";

  export let gridArea;

  function confirmAndDelete(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      paletteParams.removeByIndex(id);
    }
  }
</script>

<div class="palettes" style="--grid-area: {gridArea};">
  {#each $palettes as palette, j (j)}
    <Palette
      active="{$paletteParams.current === j}"
      index="{j + 1}"
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
