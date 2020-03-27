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
  .b-contrast {
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
  import { settings } from "./store.js";
  export let hexCode = "#000";
  export let label = "";
  export let fillHeight = false;

  let isLight = false;
  let whiteContrast = 0;
  let blackContrast = 0;

  $: isLight = chroma(hexCode).luminance() > 0.6;
  $: whiteContrast = $settings.showContrast && chroma.contrast("#fff", hexCode);
  $: blackContrast = $settings.showContrast && chroma.contrast("#000", hexCode);
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style="background-color:{hexCode}">
  <span class="label">{label}</span>
  {#if $settings.showContrast}
    <span class="b-contrast">{blackContrast.toFixed(2)}b</span>
    <span class="w-contrast">{whiteContrast.toFixed(2)}w</span>
  {/if}
  {#if $settings.showHex}
    <span class="hex-code">{hexCode}</span>
  {/if}
</div>
