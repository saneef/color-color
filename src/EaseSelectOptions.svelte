<script>
  import { config } from "./store";
</script>

{#each $config.eases as group (group.title)}
  <optgroup label="{group.title}">
    {#each group.eases as ease (ease.value)}
      <option value="{ease.value}">{ease.title}</option>
    {/each}
  </optgroup>
{/each}
