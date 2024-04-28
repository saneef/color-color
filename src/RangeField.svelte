<style lang="postcss">
  .root {
    @apply py-2 -mr-1;
  }

  .label {
    @apply block text-sm text-gray-700;
  }

  .wrapper {
    @apply flex items-center;
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
    width: 6rem;
    padding-left: 0.5rem;
  }

  .value-text-input {
    @apply bg-transparent px-1;

    width: 100%;
    text-align: right;
  }

  .value-text-input:hover {
    @apply bg-gray-100;
  }

  .value-text-input:focus {
    @apply bg-white;
  }
</style>

<script>
  export let id;
  export let label = null;
  export let labelledby = null;
  export let value;
  export let step = 1;
  export let min;
  export let max;

  function isValueValid(num) {
    if (typeof num === "number" && num >= min && num <= max) {
      return true;
    }
    return false;
  }

  function parseTextValue(text) {
    const value = +text;
    if (isValueValid(value)) {
      return value;
    }
  }

  const handleTextValue = (e, resetInvalidValue = true) => {
    const text = e.currentTarget.value;

    const nextValue = parseTextValue(text);

    if (nextValue !== undefined) {
      value = nextValue;
    } else if (resetInvalidValue) {
      e.currentTarget.value = formatValue(value);
    }
  };

  const onKeyEvent = (e) => {
    if (e.key === "Enter") {
      handleTextValue(e, false);
    }
  };

  const formatValue = (value) => {
    return step === 1 ? value : value.toFixed(2);
  };

  $: valueText = formatValue(value);
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
        bind:value="{value}"
        min="{min}"
        max="{max}"
        {...$$restProps}
      />
    </div>
    <div class="value">
      <input
        class="value-text-input"
        type="text"
        inputmode="numeric"
        pattern="\d*"
        value="{valueText}"
        on:keyup="{onKeyEvent}"
        on:blur="{handleTextValue}"
      />
    </div>
  </div>
</div>
