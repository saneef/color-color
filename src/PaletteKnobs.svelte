<style>
  .root {
    @apply p-4 pt-3 -mx-4 my-4 border-t-4 border-b-4 border-gray-900;
  }
</style>

<script>
  import ControlGroup from "./ControlGroup.svelte";
  import PaletteSelector from "./PaletteSelector.svelte";
  import RangeField from "./RangeField.svelte";
  import SelectField from "./SelectField.svelte";
  import EaseSelectOptions from "./EaseSelectOptions.svelte";

  import { paletteParams, config } from "./store";

  let current = 0;

  $: current = $paletteParams.paletteIndex;
</script>

<div class="root">
  <PaletteSelector />
  <ControlGroup title="Hue">
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
      <EaseSelectOptions />
    </SelectField>
  </ControlGroup>

  <ControlGroup title="Saturation">
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
      <EaseSelectOptions />
    </SelectField>
    <RangeField
      id="sat-rate"
      label="Rate"
      bind:value="{$paletteParams.params[current].sat.rate}"
      min="{$config.limits.rate[0]}"
      max="{$config.limits.rate[1]}" />
  </ControlGroup>

  <ControlGroup title="Lightness">
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
      <EaseSelectOptions />
    </SelectField>
  </ControlGroup>
</div>
