<style lang="postcss">
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
  import { clamp } from "./lib/math.js";
  let { id, x, y, onXChange, onYChange, children } = $props();

  const handleXChange = (e) => {
    if (e.currentTarget.value) {
      let value = clamp(0, +e.currentTarget.value, 1);

      onXChange(value);
    }
  };

  const handleYChange = (e) => {
    let value = clamp(-0.3, +e.currentTarget.value, 1.3);

    onYChange(value);
  };
</script>

<div class="root">
  {@render children?.()}
  <div class="fieldset">
    <label class="label" for="{id}-x">x</label>
    <input
      id="{id}-x"
      type="number"
      value={x}
      oninput={handleXChange}
      step="0.01"
      min="0"
      max="1"
    />
  </div>
  <div class="fieldset">
    <label class="label" for="{id}-y">y</label>
    <input
      id="{id}-y"
      type="number"
      step="0.01"
      value={y}
      oninput={handleYChange}
    />
  </div>
</div>
