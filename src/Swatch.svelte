<style lang="postcss">
  .swatch {
    @apply flex flex-col;
    @apply relative text-white;
    @apply px-4 py-2;
    @apply text-sm;
    @apply font-mono;
  }

  .swatch__top {
    @apply flex mb-auto pb-3;
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

  .contrasts {
    @apply inline-flex gap-4 items-center;
  }
  .contrast {
    @apply inline-flex gap-2 items-center;
  }
  .contrast--bad .contrast__value {
    @apply line-through;
  }

  .hex-code {
    @apply block;
    @apply -ml-2 -mb-2;
  }

  .dot {
    @inline-flex;
    @apply w-8 h-8 rounded-full;
    @apply mr-auto;
  }

  .dot--active {
    @apply bg-gray-900;
    outline: 1px solid rgb(255 255 255 / 0.5);
  }

  .isLight .dot--active {
    outline: none;
  }
</style>

<script>
  import { settings } from "./store.js";
  import TinySwatch from "./TinySwatch.svelte";
  import CopyOnClick from "./CopyOnClick.svelte";
  import {
    isMinimumTextAAContrast,
    isMinimumTextAAAContrast,
  } from "./lib/contrast.js";

  /**
   * @typedef {Object} Props
   * @property {string} [hexCode]
   * @property {boolean} [fillHeight]
   * @property {boolean} [isLight]
   * @property {any} [refColor]
   * @property {boolean} [active]
   * @property {(event: MouseEvent) => void} click
   * @property {Array<[string, string, number]>} contrasts
   */

  /** @type {Props} */
  let {
    hexCode = "#000",
    fillHeight = false,
    isLight = false,
    refColor = undefined,
    active = false,
    click,
    contrasts,
  } = $props();

  const contrastsSwatches = $derived.by(
    /** @type () => Array<[string, number, string]> */
    () => {
      if (!$settings.overlayContrast) return [];

      const filteredContrasts = contrasts.filter(([key, , contrast]) => {
        if ($settings.contrastWith === "bw") {
          return (
            ["black", "white"].includes(key) &&
            isMinimumTextAAContrast(contrast)
          );
        }

        return !["black", "white"].includes(key);
      });

      return filteredContrasts.map(([, hex, contrast]) => [
        /** @type {string} */ (hex),
        /** @type {number} */ (contrast),
        isMinimumTextAAAContrast(contrast)
          ? "AAA"
          : isMinimumTextAAContrast(contrast)
            ? "AA"
            : undefined,
      ]);
    }
  );
</script>

<div
  class="swatch"
  class:fillHeight
  class:isLight
  style:background-color={hexCode}
>
  <a class="click-area" href="#{hexCode}" onclick={click}>
    <span class="sr-only">Select</span>
  </a>

  <div class="swatch__top">
    <span class="dot" class:dot--active={active} aria-hidden="true"></span>

    {#if refColor}
      <TinySwatch color={refColor} />
    {/if}
  </div>

  {#if $settings.overlayContrast}
    <div class="contrasts">
      {#each contrastsSwatches as [color, contrast, grade], index (index)}
        <span
          class="contrast"
          class:contrast--bad={grade === undefined}
          style:color
        >
          <TinySwatch {color} size="small" />
          <span class="contrast__value">
            {`${contrast.toFixed(2)} ${grade != undefined ? grade : ""}`}
          </span>
        </span>
      {/each}
    </div>
  {/if}

  {#if $settings.overlayHex}
    <span class="hex-code">
      <CopyOnClick text={hexCode}>{hexCode}</CopyOnClick>
    </span>
  {/if}
</div>
