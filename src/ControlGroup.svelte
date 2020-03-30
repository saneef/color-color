<style>
  .control-group + .control-group {
    @apply mt-4 pt-4 border-t border-gray-500;
  }

  .control-group__title {
    @apply text-lg font-bold;
  }
</style>

<script>
  export let title = null;
  export let titleId = null;
</script>

<div class="control-group">
  {#if title !== null}
    <h2 id="{titleId}" class="control-group__title">{title}</h2>
  {/if}
  <slot />
</div>
