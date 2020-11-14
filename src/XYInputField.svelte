<style>
  .root {
    @apply border;
  }
  label,
  input {
    @apply w-full;
    @apply border-t;
  }

  label {
    @apply font-mono text-sm text-gray-700 text-center;
    @apply border-r;
  }

  input {
    @apply text-xs;
    @apply px-1;
  }

  .fieldset {
    @apply grid;
    grid-template-columns: 0.25fr 1fr;
  }
</style>

<script>
  export let id;
  export let x;
  export let y;
  export let onXChange;
  export let onYChange;

  const handleXChange = (e) => {
    if (e.currentTarget.value) {
      let value = +e.currentTarget.value;

      if (value > 1) {
        value = 1;
      } else if (value < 0) {
        value = 0;
      }

      onXChange(value);
    }
  };

  const handleYChange = (e) => {
    let value = +e.currentTarget.value;

    onYChange(value);
  };
</script>

<div class="root">
  <slot />
  <div class="fieldset">
    <label class="label" for="{id}-x">x</label>
    <input
      id="{id}-x"
      type="number"
      value="{x}"
      on:input="{handleXChange}"
      step="0.01"
      min="0"
      max="1" />
  </div>
  <div class="fieldset">
    <label class="label" for="{id}-y">y</label>
    <input
      id="{id}-y"
      type="number"
      step="0.01"
      value="{y}"
      on:input="{handleYChange}" />
  </div>
</div>
