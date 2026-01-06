<style lang="postcss">
  .control-group {
    @apply mt-4 pt-4 border-t border-gray-500;
  }

  .control-group__no-border-top {
    @apply mt-0 pt-0 border-t-0;
  }

  .control-group__title {
    @apply text-lg font-bold;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} [title]
   * @property {any} [titleId]
   * @property {boolean} [noBorderTop]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    title = null,
    titleId = null,
    noBorderTop = false,
    children,
  } = $props();
</script>

<div class="control-group" class:control-group__no-border-top={noBorderTop}>
  {#if title !== null}
    <h2 id={titleId} class="control-group__title">{title}</h2>
  {/if}
  {@render children?.()}
</div>
