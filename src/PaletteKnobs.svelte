<style lang="postcss">
  .root {
    @apply p-4 pt-3 -mx-4 my-4 border-t-4 border-b-4 border-gray-900;
  }
</style>

<script>
  import { run } from "svelte/legacy";

  import Checkbox from "./Checkbox.svelte";
  import ControlGroup from "./ControlGroup.svelte";
  import PaletteSelector from "./PaletteSelector.svelte";
  import RangeField from "./RangeField.svelte";
  import EaseControl from "./EaseControl.svelte";
  import { paletteParams, config } from "./store";

  let current = $state(0);

  run(() => {
    current = $paletteParams.paletteIndex;
  });
</script>

<div class="root">
  <PaletteSelector />
  <ControlGroup title="Hue" noBorderTop>
    <RangeField
      id="hue-start"
      label="Start"
      bind:value={$paletteParams.params[current].hue.start}
      min={$config.limits.hue[0]}
      max={$config.limits.hue[1]}
      step={$config.resolution}
    />
    <RangeField
      id="hue-end"
      label="End"
      bind:value={$paletteParams.params[current].hue.end}
      min={$config.limits.hue[0]}
      max={$config.limits.hue[1]}
      step={$config.resolution}
    />

    <EaseControl
      id="hue-ease"
      bind:value={$paletteParams.params[current].hue.ease}
    />

    <Checkbox
      label="Interpolate across 360"
      bind:checked={$paletteParams.params[current].hue.interpolateHueOver360}
    />
  </ControlGroup>

  <ControlGroup title="Saturation">
    <RangeField
      id="sat-start"
      label="Start"
      bind:value={$paletteParams.params[current].sat.start}
      min={$config.limits.sat[0]}
      max={$config.limits.sat[1]}
      step={$config.resolution}
    />

    <RangeField
      id="sat-end"
      label="End"
      bind:value={$paletteParams.params[current].sat.end}
      min={$config.limits.sat[0]}
      max={$config.limits.sat[1]}
      step={$config.resolution}
    />

    <EaseControl
      id="sat-ease"
      bind:value={$paletteParams.params[current].sat.ease}
    />
    <RangeField
      id="sat-rate"
      label="Rate"
      bind:value={$paletteParams.params[current].sat.rate}
      min={$config.limits.rate[0]}
      max={$config.limits.rate[1]}
    />
  </ControlGroup>

  <ControlGroup title="Lightness">
    <RangeField
      id="lig-start"
      label="Start"
      bind:value={$paletteParams.params[current].lig.start}
      min={$config.limits.lig[0]}
      max={$config.limits.lig[1]}
      step={$config.resolution}
    />

    <RangeField
      id="lig-end"
      label="End"
      bind:value={$paletteParams.params[current].lig.end}
      min={$config.limits.lig[0]}
      max={$config.limits.lig[1]}
      step={$config.resolution}
    />
    <EaseControl
      id="lig-ease"
      bind:value={$paletteParams.params[current].lig.ease}
    />
  </ControlGroup>
</div>
