<style>
  label {
    @apply relative block pl-6 my-2;
  }

  .wrapper {
    @apply absolute left-0 inset-y-0 flex items-center;
  }
</style>

<script>
  export let checked;
  export let label;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  {label}
  <div class="wrapper"><input type="checkbox" bind:checked /></div>
</label>
