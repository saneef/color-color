<style lang="postcss">
  .swatch {
    @apply relative flex flex-wrap justify-end items-start py-4 text-gray-200;
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
    @apply text-gray-800;
  }

  .fillHeight {
    @apply flex-1;
  }

  .hex-code,
  .rgb-code,
  .refColor {
    @apply pl-4 font-mono;
  }

  .refColor {
    @apply absolute bottom-0 right-0;
  }

  .w-contrast,
  .b-contrast {
    @apply pr-4;
  }

  .codes,
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

  .codes {
    @apply mr-auto;
  }
</style>

<script>
  import { settings } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";
  import CopyOnClick from "./CopyOnClick.svelte";

  export let hexCode = "#000";
  export let rgbCode = "0, 0, 0";
  export let fillHeight = false;
  export let isLight = false;
  export let whiteContrast = 0;
  export let blackContrast = 0;
  export let refColor = undefined;
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style="background-color: {hexCode}"
>
  <a class="click-area" href="#{hexCode}" on:click>
    <span class="sr-only">Select</span>
  </a>
  <div class="codes">
    {#if $settings.overlayHex}
      <div class="hex-code">
        <CopyOnClick text="{hexCode}">{hexCode}</CopyOnClick>
      </div>
    {/if}
    {#if $settings.overlayRgb}
      <div class="rgb-code">
        <CopyOnClick text="{rgbCode}">{rgbCode}</CopyOnClick>
      </div>
    {/if}
  </div>
  {#if refColor}
    <div class="refColor">
      <TinySwatch color="{refColor}" />
    </div>
  {/if}
  <div>
    {#if $settings.overlayContrast}
      <div class="b-contrast">{blackContrast.toFixed(2)}b</div>
      <div class="w-contrast">{whiteContrast.toFixed(2)}w</div>
    {/if}
  </div>
</div>
