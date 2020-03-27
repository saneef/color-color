<style>
  .root {
    @apply px-4 py-2;
  }

  label {
    @apply block text-sm text-gray-700;
  }

  .wrapper {
    @apply flex items-center;
  }
  .value {
    @apply w-8 text-right;
  }
</style>

<script>
  export let id;
  export let label;
  export let labelledby;
  export let value;
</script>

<div class="root">
  {#if label}
    <label for="{id}">{label}</label>
  {/if}
  <div class="wrapper">
    <input
      type="range"
      aria-labelledby="{labelledby}"
      {id}
      bind:value
      {...$$restProps} />
    <div class="value">{value}</div>
  </div>
</div>
