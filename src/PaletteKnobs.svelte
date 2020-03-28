<style>
  .root {
    @apply p-4 -mx-4 my-4 border-t-4 border-b-4 border-gray-900;
  }

  h2 {
    @apply text-lg font-bold;
  }
</style>

<script>
  import eases from "eases";
  import { paletteParams } from "./store";
  import SelectField from "./SelectField.svelte";
  import RangeField from "./RangeField.svelte";
  import ControlGroup from "./ControlGroup.svelte";

  const easeOptions = Object.keys(eases);

  let current = 0;

  $: current = $paletteParams.current;
</script>

<div class="root">
  <ControlGroup>
    <h2>Hue</h2>
    <RangeField
      id="hue-start"
      label="Start"
      bind:value="{$paletteParams.params[current].hue.start}"
      min="0"
      max="360" />
    <RangeField
      id="hue-end"
      label="End"
      bind:value="{$paletteParams.params[current].hue.end}"
      min="0"
      max="360" />
    <SelectField
      id="hue-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].hue.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </SelectField>
  </ControlGroup>

  <ControlGroup>
    <h2>Saturation</h2>
    <RangeField
      id="sat-start"
      label="Start"
      bind:value="{$paletteParams.params[current].sat.start}"
      min="0"
      max="100" />

    <RangeField
      id="sat-end"
      label="End"
      bind:value="{$paletteParams.params[current].sat.end}"
      min="0"
      max="100" />
    <SelectField
      id="sat-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].sat.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </SelectField>
  </ControlGroup>

  <ControlGroup>
    <h2>Lightness</h2>
    <RangeField
      id="lig-start"
      label="Start"
      bind:value="{$paletteParams.params[current].lig.start}"
      min="0"
      max="100" />

    <RangeField
      id="lig-end"
      label="End"
      bind:value="{$paletteParams.params[current].lig.end}"
      min="0"
      max="100" />
    <SelectField
      id="lig-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].lig.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </SelectField>
  </ControlGroup>
</div>
