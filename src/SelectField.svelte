<style lang="postcss">
  .control {
    @apply py-2;
  }

  label {
    @apply block text-base mb-2 text-gray-700;
  }

  select {
    @apply block appearance-none w-full bg-white border-2 border-gray-500 rounded-none text-gray-900 p-2 pr-4 pr-8 leading-tight;
  }

  select:focus {
    @apply outline-none border-gray-700;
  }

  .wrapper {
    @apply relative;
  }

  .icon {
    @apply absolute inset-y-0 right-0;
    @apply px-2;
    @apply flex items-center;
    @apply text-gray-600;
    @apply pointer-events-none;
  }
</style>

<script>
  import Icon from "./Icon.svelte";
  /**
   * @typedef {Object} Props
   * @property {string} [id]
   * @property {string} [label]
   * @property {any} value
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { id = "", label = "", value = $bindable(), children } = $props();
</script>

<div class="control">
  <label for={id}>{label}</label>
  <div class="wrapper">
    <select name="" {id} bind:value>
      {@render children?.()}
    </select>
    <div class="icon">
      <Icon icon="chevron-small-down" />
    </div>
  </div>
</div>
