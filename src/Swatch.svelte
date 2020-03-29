<style>
  .swatch {
    @apply flex flex-wrap justify-end py-4 text-gray-300;
  }

  .isLight {
    @apply text-gray-700;
  }

  .fillHeight {
    @apply flex-auto;
  }

  .label,
  .hex-code,
  .w-contrast,
  .b-contrast,
  .refColor {
    @apply px-4 font-mono;
  }

  .w-contrast {
    @apply text-white;
  }

  .b-contrast {
    @apply text-black;
  }

  .label {
    @apply font-bold mr-auto;
  }
</style>

<script>
  import chroma from "chroma-js";
  import { settings, nearestRefColors } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";

  export let hexCode = "#000";
  export let label = "";
  export let fillHeight = false;

  let isLight = false;
  let whiteContrast = 0;
  let blackContrast = 0;
  let refColor;

  $: isLight = chroma(hexCode).luminance() > 0.6;
  $: whiteContrast =
    $settings.overlayContrast && chroma.contrast("#fff", hexCode);
  $: blackContrast =
    $settings.overlayContrast && chroma.contrast("#000", hexCode);
  $: refColor = $nearestRefColors[hexCode];

  $: console.log($nearestRefColors);
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style="background-color:{hexCode}">
  <span class="label">{label}</span>
  {#if refColor}
    <div class="refColor">
      <TinySwatch color="{refColor}" {isLight} />
    </div>
  {/if}
  {#if $settings.overlayContrast}
    <span class="b-contrast">{blackContrast.toFixed(2)}b</span>
    <span class="w-contrast">{whiteContrast.toFixed(2)}w</span>
  {/if}
  {#if $settings.overlayHex}
    <span class="hex-code">{hexCode}</span>
  {/if}
</div>
