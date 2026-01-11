<style>
  .touch-area {
    fill: #ffffff00;
    stroke: none;
    user-select: none;
    touch-action: none;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} size
   * @property {string} [variant]
   * @property {(event: MouseEvent | TouchEvent) => void} [mousedown]
   */

  /** @type {Props} */
  let { size, mousedown, variant = "square" } = $props();
</script>

{#if variant === "square"}
  <rect
    class="control-point-marker control-point-marker--square"
    x={-size / 2}
    y={-size / 2}
    width={size}
    height={size}
  ></rect>
{:else}
  <circle
    class="control-point-marker control-point-marker--circle"
    cx="0"
    cy="0"
    r={size / 2}
  ></circle>
{/if}

{#if typeof mousedown === "function"}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <rect
    onmousedown={mousedown}
    ontouchstart={mousedown}
    class="touch-area"
    x={-size}
    y={-size}
    width={size * 2}
    height={size * 2}
  ></rect>
{/if}
