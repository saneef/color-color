<style>
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
  export let title = null;
  export let titleId = null;
  export let noBorderTop = false;
</script>

<div class="control-group" class:control-group__no-border-top="{noBorderTop}">
  {#if title !== null}
    <h2 id="{titleId}" class="control-group__title">{title}</h2>
  {/if}
  <slot />
</div>
