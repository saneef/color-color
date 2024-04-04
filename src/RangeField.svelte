<style lang="postcss">
  .root {
    @apply py-2;
  }

  .label {
    @apply block text-sm text-gray-700;
  }

  .wrapper {
    @apply flex items-center gap-2;
  }

  .input-wrapper {
    @apply relative w-full;
  }

  .input {
    @apply block w-full appearance-none bg-transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    @apply h-2 m-0 w-full bg-gray-600 cursor-pointer;
  }

  input[type="range"]::-moz-range-track {
    @apply h-2 m-0 w-full bg-gray-600 cursor-pointer;
  }

  input[type="range"]::-ms-track {
    @apply h-2 m-0 w-full bg-gray-600 cursor-pointer;
    @apply text-transparent;
  }

  input[type="range"]::-ms-fill-lower {
    @apply bg-transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    @apply appearance-none h-6 w-3 bg-gray-200 border-2 border-solid border-gray-900;
    @apply -mt-2;
  }

  input[type="range"]::-moz-range-thumb {
    @apply appearance-none h-6 w-3 bg-gray-200 border-2 border-solid border-gray-900;
    @apply mt-0 rounded-none;
  }

  input[type="range"]::-ms-thumb {
    @apply appearance-none h-6 w-3 bg-gray-200 border-2 border-solid border-gray-900;
    @apply mt-0 rounded-none;
  }

  .value {
    @apply flex-none w-20 text-right;
  }

  .shortValue {
    @apply w-12;
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
  {#if label}<label class="label" for="{id}">{label}</label>{/if}
  <div class="wrapper">
    <div class="input-wrapper">
      <input
        type="range"
        aria-labelledby="{labelledby}"
        class="input"
        id="{id}"
        step="{step}"
        bind:value
        {...$$restProps}
      />
    </div>
    <input
      type="number"
      aria-labelledby="{labelledby}"
      class="value"
      class:shortValue
      bind:value
      step="{step}"
      {...$$restProps}
    />
  </div>
</div>
