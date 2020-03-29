<style>
  .ref-colors-list {
    @apply flex flex-wrap -mx-4 -my-1;
  }
  .ref-colors-list > li {
    @apply flex flex-no-wrap px-4 py-1 w-1/2;
  }

  .ref-color-hex {
    @apply ml-2 text-sm text-gray-700;
  }
</style>

<script>
  import ControlGroup from "./ControlGroup.svelte";
  import TextField from "./TextField.svelte";
  import TinySwatch from "./TinySwatch.svelte";
  import { settings, refColors } from "./store";
</script>

<ControlGroup title="Reference colors" titleId="ref-colors">
  <TextField
    labelledby="ref-colors"
    id="ref-colors-input"
    bind:value="{$settings.refColorsRaw}"
    legend="Comma seperated list of hex color codes."
    placeholder="#e8a386, #4681a5, #f20,..." />

  {#if $refColors.length}
    <ul class="ref-colors-list">
      {#each $refColors as c, i (i)}
        <li>
          <TinySwatch color="{c}" />
          <code class="ref-color-hex">{c}</code>
        </li>
      {/each}
    </ul>
  {/if}
</ControlGroup>
