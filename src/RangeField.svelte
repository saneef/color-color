<style>
  .root {
    @apply py-2;
  }

  .label {
    @apply block text-sm text-gray-700;
  }

  .wrapper {
    @apply flex items-center;
  }
  .input {
    @apply block w-full;
  }

  .value {
    @apply flex-none w-16 text-right;
  }

  .shortValue {
    @apply w-10;
  }
</style>

<script>
  export let id;
  export let label = null;
  export let labelledby = null;
  export let value;
  export let step = 1;

  let shortValue = false;

  $: shortValue = step === 1;
  $: valueText = shortValue ? value : value.toFixed(2);
</script>

<div class="root">
  {#if label}
    <label class="label" for="{id}">{label}</label>
  {/if}
  <div class="wrapper">
    <input
      type="range"
      aria-labelledby="{labelledby}"
      class="input"
      {id}
      {step}
      bind:value
      {...$$restProps} />
    <div class="value" class:shortValue>{valueText}</div>
  </div>
</div>
