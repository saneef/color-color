<style>
  .control {
    @apply py-2;
  }

  .label {
    @apply block text-base mb-2 text-gray-700;
  }

  .input {
    @apply block appearance-none w-full bg-gray-100 border-2 border-gray-700 text-gray-900 p-2 pr-4 pr-8 leading-tight;
  }

  .input:focus {
    @apply bg-white border-gray-900;
  }

  .legend {
    @apply mt-1 text-sm text-gray-700 leading-tight;
  }
</style>

<script>
  export let id;
  export let label = null;
  export let legend = null;
  export let labelledby = null;
  export let value;
</script>

<div class="control">
  {#if label}
    <label class="label" for="{id}">{label}</label>
  {/if}
  <input
    class="input"
    type="text"
    {id}
    bind:value
    aria-labelledby="{labelledby}" />
  {#if legend}
    <p class="legend">{legend}</p>
  {/if}
</div>
