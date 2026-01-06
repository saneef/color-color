<script>
  import { config } from "./store";
  import { getAliasByBezierEasing } from "./lib/eases.js";

  let { value } = $props();

  let alias = $derived(getAliasByBezierEasing(value));
</script>

{#each $config.eases as group (group.title)}
  <optgroup label={group.title}>
    {#each group.eases as ease (ease.value)}
      <option value={ease.value}>{ease.title}</option>
    {/each}
  </optgroup>
{/each}
{#if !alias}
  <option {value} selected>Custom</option>
{/if}
