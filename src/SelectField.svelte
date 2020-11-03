<style>
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
  export let id = "";
  export let label = "";
  export let value;
</script>

<div class="control">
  <label for="{id}">{label}</label>
  <div class="wrapper">
    <select name="" id="{id}" bind:value>
      <slot />
    </select>
    <div class="icon">
      <Icon icon="chevron-small-down" />
    </div>
  </div>
</div>
