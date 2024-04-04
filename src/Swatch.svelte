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
    @apply font-mono;
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

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        // success
      },
      (err) => {
        console.error(err);
      }
    );
  }
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
  {#if $settings.overlayHex}
    <div class="flex justify-between content-around w-full px-4 z-10">
      <div class="hex-code">{hexCode}</div>
      <div>
        <button on:click="{() => copyToClipboard(hexCode)}"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  {/if}
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
