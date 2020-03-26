<style>
  .palette {
    @apply flex flex-col;
  }

  .header {
    @apply sticky top-0 flex px-2 pt-3 pb-4 bg-gray-200 border-t-4 border-gray-900;
  }

  .status {
    @apply relative flex w-8 h-8 border-2 border-gray-900 rounded-full;
  }

  .active {
    @apply bg-gray-900;
  }

  .active::before {
    @apply block absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";
  }

  .active::after {
    @apply block absolute top-0 left-0 w-full h-full flex justify-center items-center;
    content: "⚡️";
  }
</style>

<script>
  export let active = false;
</script>

<div class="palette">
  <button class="header" on:click>
    <div class="status" class:active></div>
    <span class="sr-only">Active</span>
  </button>
  <slot />
</div>
