<style lang="postcss">
  .swatch {
    @apply relative flex flex-wrap justify-end items-start py-4 text-gray-300;
  }

  .click-area {
    color: inherit;
  }

  .click-area::after {
    @apply absolute inset-0;
    content: "";
  }

  .click-area:hover::after {
    border: 2px solid;
  }

  .isLight {
    @apply text-gray-700;
  }

  .fillHeight {
    @apply flex-1;
  }

  .hex-code,
  .w-contrast,
  .b-contrast,
  .refColor {
    @apply px-4 font-mono;
  }

  .hex-code,
  .w-contrast,
  .b-contrast {
    @apply relative;
  }

  .w-contrast {
    @apply text-white;
  }

  .b-contrast {
    @apply text-black;
  }

  .hex-code {
    @apply mr-auto;
  }
</style>

<script>
  import chroma from "chroma-js";
  import { settings, nearestRefColors } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";

  export let hexCode = "#000";
  export let fillHeight = false;

  let isLight = false;
  let whiteContrast = 0;
  let blackContrast = 0;
  let refColor;

  $: isLight = chroma(hexCode).luminance() > 0.55;
  $: whiteContrast =
    $settings.overlayContrast && chroma.contrast("#fff", hexCode);
  $: blackContrast =
    $settings.overlayContrast && chroma.contrast("#000", hexCode);
  $: refColor = $nearestRefColors[hexCode];
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style="background-color:{hexCode}"
>
  <a class="click-area" href="#{hexCode}" on:click>
    <span class="sr-only">Select</span>
  </a>
  {#if $settings.overlayHex}<span class="hex-code">{hexCode}</span>{/if}
  {#if refColor}
    <div class="refColor">
      <TinySwatch color="{refColor}" />
    </div>
  {/if}
  {#if $settings.overlayContrast}
    <span class="b-contrast">{blackContrast.toFixed(2)}b</span>
    <span class="w-contrast">{whiteContrast.toFixed(2)}w</span>
  {/if}
</div>
