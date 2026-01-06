<style lang="postcss">
  .indent {
    @apply pl-6;
  }
</style>

<script>
  import ControlGroup from "./ControlGroup.svelte";
  import Checkbox from "./Checkbox.svelte";
  import RadioGroup from "./RadioGroup.svelte";
  import { settings } from "./store";

  const radios = [
    { label: "Selected color", value: "active" },
    { label: "Black & White", value: "bw" },
  ];
</script>

<ControlGroup title="Overlay">
  <Checkbox label="HEX code" bind:checked={$settings.overlayHex} />
  <Checkbox label="WCAG Contrast" bind:checked={$settings.overlayContrast} />
  <div class="indent">
    <RadioGroup
      {radios}
      disabled={!$settings.overlayContrast}
      bind:group={$settings.contrastWith}
      labelledby="color-space"
    />
  </div>
</ControlGroup>
