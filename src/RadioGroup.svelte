<style lang="postcss">
  label {
    @apply relative block pl-6 my-2;
  }

  .wrapper {
    @apply absolute left-0 inset-y-0 flex items-center;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} [radios]
   * @property {string} [group]
   * @property {any} [labelledby]
   */

  /** @type {Props} */
  let { radios = [], group = $bindable(""), labelledby = null } = $props();
</script>

<div aria-labelledby={labelledby}>
  {#each radios as radio, i (i)}
    <label>
      {radio.label}
      <div class="wrapper">
        <input type="radio" bind:group value={radio.value} />
      </div>
    </label>
  {/each}
</div>
