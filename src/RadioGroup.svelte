<style>
  label {
    @apply relative block pl-6 my-2;
  }

  .wrapper {
    @apply absolute left-0 inset-y-0 flex items-center;
  }
</style>

<script>
  export let radios = [];
  export let group = "";
  export let labelledby = null;
</script>

<div aria-labelledby="{labelledby}">
  {#each radios as radio, i (i)}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>
      {radio.label}
      <div class="wrapper">
        <input type="radio" bind:group value="{radio.value}" />
      </div>
    </label>
  {/each}
</div>
