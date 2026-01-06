<style lang="postcss">
  .marker {
    @apply inline-flex;
    @apply w-8 h-8 rounded-full;
    @apply border-2 border-transparent;
  }

  .marker--active {
    @apply border-gray-900;
  }

  .marker--inverted.marker--active {
    @apply border-gray-100;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {boolean} [active]
   * @property {boolean} [inverted]
   */

  /** @type {Props} */
  let { active, inverted } = $props();
</script>

<span
  class="marker"
  class:marker--active={active}
  class:marker--inverted={inverted}
  aria-hidden="true"
></span>
