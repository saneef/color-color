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
  import { headerCase } from "change-case";
  import { paletteParams, config } from "./store";
  import SelectField from "./SelectField.svelte";
  import RangeField from "./RangeField.svelte";
  import ControlGroup from "./ControlGroup.svelte";

  let current = 0;
  let paletteIndex = [];

  $: current = $paletteParams.paletteIndex;
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
            $paletteParams.paletteIndex = i;
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
      min="{$config.limits.hue[0]}"
      max="{$config.limits.hue[1]}"
      step="{$config.resolution}" />
    <RangeField
      id="hue-end"
      label="End"
      bind:value="{$paletteParams.params[current].hue.end}"
      min="{$config.limits.hue[0]}"
      max="{$config.limits.hue[1]}"
      step="{$config.resolution}" />
    <SelectField
      id="hue-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].hue.ease}">
      {#each $config.eases as ease}
        <option value="{ease}">{headerCase(ease)}</option>
      {/each}
    </SelectField>
  </ControlGroup>

  <ControlGroup>
    <h2>Saturation</h2>
    <RangeField
      id="sat-start"
      label="Start"
      bind:value="{$paletteParams.params[current].sat.start}"
      min="{$config.limits.sat[0]}"
      max="{$config.limits.sat[1]}"
      step="{$config.resolution}" />

    <RangeField
      id="sat-end"
      label="End"
      bind:value="{$paletteParams.params[current].sat.end}"
      min="{$config.limits.sat[0]}"
      max="{$config.limits.sat[1]}"
      step="{$config.resolution}" />
    <SelectField
      id="sat-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].sat.ease}">
      {#each $config.eases as ease}
        <option value="{ease}">{headerCase(ease)}</option>
      {/each}
    </SelectField>
  </ControlGroup>

  <ControlGroup>
    <h2>Lightness</h2>
    <RangeField
      id="lig-start"
      label="Start"
      bind:value="{$paletteParams.params[current].lig.start}"
      min="{$config.limits.lig[0]}"
      max="{$config.limits.lig[1]}"
      step="{$config.resolution}" />

    <RangeField
      id="lig-end"
      label="End"
      bind:value="{$paletteParams.params[current].lig.end}"
      min="{$config.limits.lig[0]}"
      max="{$config.limits.lig[1]}"
      step="{$config.resolution}" />
    <SelectField
      id="lig-ease"
      label="Easing"
      bind:value="{$paletteParams.params[current].lig.ease}">
      {#each $config.eases as ease}
        <option value="{ease}">{headerCase(ease)}</option>
      {/each}
    </SelectField>
  </ControlGroup>
</div>
