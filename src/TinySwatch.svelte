<style lang="postcss">
  .tiny-swatch {
    @apply inline-block w-8 h-8 rounded;
    box-shadow:
      inset 0px -1px 0 rgba(0, 0, 0, 0.35),
      inset 0px 1px 0 0 rgba(255, 255, 255, 0.55);
  }

  .tiny-swatch--small {
    @apply w-4 h-4;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {string} color
   * @property {"medium" | "small"=} size
   */

  /** @type {Props} */
  let { color, size = "medium" } = $props();
</script>

<span
  class={["tiny-swatch", `tiny-swatch--${size}`]}
  style:background-color={color}
></span>
