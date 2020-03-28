<style>
  .root {
    @apply p-4 pt-3 -mx-4 my-4 border-t-4 border-b-4 border-gray-900;
  }

  h2 {
    @apply text-lg font-bold;
  }

  .index {
    @apply flex mb-4 -mx-1;
  }

  .index li {
    @apply mx-1;
  }

  .index-marker {
    @apply flex justify-center items-center h-8 w-8 no-underline border-2 border-gray-900 rounded-full;
  }

  .index-marker--active {
    @apply relative text-white bg-gray-900;
  }

  .index-marker--active::before {
    @apply block absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";
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
  let paletteIndex = [];

  $: current = $paletteParams.current;
  $: paletteIndex = $paletteParams.params.map((_, i) => i);
</script>

<div class="root">
  <ul class="index">
    {#each paletteIndex as pi, i (i)}
      <li>
        <a
          class="index-marker"
          class:index-marker--active="{current === i}"
          href="#{i + 1}"
          on:click|preventDefault="{() => {
            $paletteParams.current = i;
          }}">
          {i + 1}
        </a>
      </li>
    {/each}
  </ul>
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
