<style>
  .ref-colors-list {
  }
  .ref-colors-list > li {
    @apply grid gap-x-2;
    grid-template-columns: max-content 1fr;
  }

  .ref-colors-list > li + li {
    @apply mt-2;
  }

  .ref-color-code {
    @apply text-xs text-gray-700 self-center col-start-2;
  }
</style>

<script>
  import ControlGroup from "./ControlGroup.svelte";
  import TextField from "./TextField.svelte";
  import TinySwatch from "./TinySwatch.svelte";
  import { settings, refColors } from "./store";

  const prettyHSL = ([h, s, l]) => {
    const hText = parseFloat(h.toFixed(2));
    const sText = parseFloat(s.toFixed(2));
    const lText = parseFloat(l.toFixed(2));
    return `${$settings.colorSpace}(${hText},${sText}%,${lText}%)`;
  };
</script>

<ControlGroup title="Reference colors" titleId="ref-colors" noBorderTop>
  <TextField
    labelledby="ref-colors"
    id="ref-colors-input"
    bind:value="{$settings.refColorsRaw}"
    legend="Comma seperated list of hex color codes."
    placeholder="#c0ffee, #be57ed, #7ea,..." />

  {#if $refColors.length}
    <ul class="ref-colors-list">
      {#each $refColors as c, i (i)}
        <li>
          <TinySwatch color="{c.hex}" />
          <code class="ref-color-code">{c.hex}</code>
          <code class="ref-color-code">{prettyHSL(c.hsl)}</code>
        </li>
      {/each}
    </ul>
  {/if}
</ControlGroup>
