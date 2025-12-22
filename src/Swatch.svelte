<style lang="postcss">
  .swatch {
    @apply relative text-white;
    @apply p-2;
  }

  .isLight {
    @apply text-black;
  }

  .fillHeight {
    @apply flex-1;
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

  .contrast {
    @apply flex gap-2 mt-1;
  }

  .hex-code,
  .w-contrast,
  .b-contrast,
  .refColor {
    @apply font-mono;
  }

  .w-contrast {
    @apply text-white;
  }

  .b-contrast {
    @apply text-black;
  }

  .hex-code {
    @apply -ml-2 -mt-2;
    @apply block;
  }

  .dot {
    @apply absolute left-2 bottom-2 w-4 h-4 bg-gray-900 rounded-full;
  }
  .refColor {
    @apply absolute right-2 bottom-2;
  }
</style>

<script>
  import { settings } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";
  import CopyOnClick from "./CopyOnClick.svelte";
  import { isMinimumTextAAContrast } from "./lib/contrast.js";

  export let hexCode = "#000";
  export let fillHeight = false;
  export let isLight = false;
  export let whiteContrast = 0;
  export let blackContrast = 0;
  export let refColor = undefined;
  export let active = false;
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

  {#if $settings.overlayHex}
    <span class="hex-code">
      <CopyOnClick text="{hexCode}">{hexCode}</CopyOnClick>
    </span>
  {/if}

  {#if $settings.overlayContrast}
    <div class="contrast">
      {#if isMinimumTextAAContrast(blackContrast)}
        <span class="b-contrast">{blackContrast.toFixed(2)}b</span>
      {/if}
      {#if isMinimumTextAAContrast(whiteContrast)}
        <span class="w-contrast">{whiteContrast.toFixed(2)}w</span>
      {/if}
    </div>
  {/if}
  {#if active}
    <span class="dot" aria-hidden></span>
  {/if}
  {#if refColor}
    <div class="refColor">
      <TinySwatch color="{refColor}" />
    </div>
  {/if}
</div>
