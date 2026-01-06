<style lang="postcss">
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
    @apply h-32 resize-none;
  }

  .legend {
    @apply mt-1 text-sm text-gray-700 leading-tight;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} id
   * @property {any} [label]
   * @property {any} [legend]
   * @property {any} [labelledby]
   * @property {any} value
   * @property {boolean} [multiline]
   * @property {(event: MouseEvent) => void=} click
   */

  /** @type {Props & { [key: string]: any }} */
  let {
    id,
    label = null,
    legend = null,
    labelledby = null,
    value = $bindable(),
    multiline = false,
    click,
    ...rest
  } = $props();
</script>

<div class="control">
  {#if label}<label class="label" for={id}>{label}</label>{/if}
  {#if multiline}
    <textarea
      class="input input--textarea"
      {id}
      bind:value
      aria-labelledby={labelledby}
      onclick={click}
      {...rest}
    ></textarea>
  {:else}
    <input
      class="input"
      type="text"
      {id}
      bind:value
      aria-labelledby={labelledby}
      onclick={click}
      {...rest}
    />
  {/if}
  {#if legend}
    <p class="legend">{legend}</p>
  {/if}
</div>
