<style>
  .control {
    @apply py-2;
  }

  .label {
    @apply block text-base mb-2 text-gray-700;
  }

  .input {
    @apply block appearance-none w-full bg-white border-2 border-gray-500 rounded-none text-gray-700 p-2 leading-tight;
  }

  .input:focus {
    @apply border-gray-900;
  }

  .input--textarea {
    @apply h-48 resize-none;
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
  export let multiline = false;
</script>

<div class="control">
  {#if label}
    <label class="label" for="{id}">{label}</label>
  {/if}
  {#if multiline}
    <textarea
      class="input input--textarea"
      {id}
      bind:value
      aria-labelledby="{labelledby}"
      on:click
      {...$$restProps}></textarea>
  {:else}
    <input
      class="input"
      type="text"
      {id}
      bind:value
      aria-labelledby="{labelledby}"
      on:click
      {...$$restProps} />
  {/if}
  {#if legend}
    <p class="legend">{legend}</p>
  {/if}
</div>
