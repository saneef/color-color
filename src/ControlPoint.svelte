<script>
  /**
   * @typedef {Object} Props
   * @property {any} size
   * @property {string} [variant]
   * @property {(event: MouseEvent) => void} mousedown
   */

  /** @type {Props} */
  let { size, mousedown, variant = "square" } = $props();
</script>

{#if variant === "square"}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <rect
    onmousedown={mousedown}
    class="control-point-marker control-point-marker--square"
    x={-size / 2}
    y={-size / 2}
    width={size}
    height={size}
  ></rect>
{:else}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <circle
    onmousedown={mousedown}
    class="control-point-marker control-point-marker--circle"
    cx="0"
    cy="0"
    r={size / 2}
  ></circle>
{/if}
