<style>
  .control {
    @apply py-2;
  }

  label {
    @apply block text-base mb-2 text-gray-700;
  }

  select {
    @apply block appearance-none w-full bg-gray-100 border-4 border-gray-600 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight;
  }

  select:focus {
    @apply outline-none bg-white border-gray-900;
  }

  .wrapper {
    @apply relative;
  }

  .icon {
    @apply pointer-events-none absolute inset-y-0 right-0 flex items-center px-2;
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
    <select name="" {id} bind:value>
      <slot />
    </select>
    <div class="icon">
      <Icon icon="chevron-small-down" />
    </div>
  </div>
</div>
