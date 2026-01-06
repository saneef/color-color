<style lang="postcss">
  label {
    @apply relative block pl-6 my-2;
  }

  .wrapper {
    @apply absolute left-0 inset-y-0 flex items-center;
  }
</style>

<script>
  let { checked = $bindable(), label } = $props();
</script>

<label>
  {label}
  <div class="wrapper"><input type="checkbox" bind:checked /></div>
</label>
