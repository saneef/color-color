<script>
  import ControlGroup from "./ControlGroup.svelte";
  import Checkbox from "./Checkbox.svelte";
  import { settings } from "./store";
</script>

<ControlGroup title="Overlay">
  <Checkbox label="HEX code" bind:checked="{$settings.overlayHex}" />
  <Checkbox label="WCAG Contrast" bind:checked="{$settings.overlayContrast}" />
</ControlGroup>
