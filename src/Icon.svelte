<style>
  .root {
    @apply fill-current;
  }

  .sm {
    @apply h-4 w-4;
  }

  .base {
    @apply h-6 w-6;
  }

  .lg {
    @apply h-8 w-8;
  }
</style>

<script>
  export let icon;
  export let size = "base";
</script>

<svg
  class="root {size}"
  title="{icon}"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20">
  {#if icon === 'chevron-small-down'}
    <path
      d="M13.418 7.859a.695.695 0 01.978 0 .68.68 0 010 .969l-3.908
      3.83a.697.697 0 01-.979 0l-3.908-3.83a.68.68 0 010-.969.695.695 0 01.978
      0L10 11l3.418-3.141z"></path>
  {/if}
  {#if icon === 'cross'}
    <path
      d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0
      11-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 111.697-1.697L10
      8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2
      0 010 1.698z"></path>
  {/if}
</svg>
