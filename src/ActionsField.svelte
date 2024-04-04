<style lang="postcss">
  button {
    @apply border-2 p-0.5 border-gray-900;
    @apply bg-gray-200;
    @apply leading-tight font-bold;
    @apply transition-opacity ease-in;
    transition-duration: 100ms;
    transition-delay: 150ms;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  button:active:not([disabled]) {
    @apply transform scale-95;
  }
</style>

<script>
  export let syncFrom;
  export let syncTo;
  export let locked;
  export let difference;

  function sync() {
    if (locked) {
      difference = 0;
    }
    syncTo = syncFrom;
  }
  function lock() {
    difference = syncFrom - syncTo;
    locked = !locked;
  }
</script>

<div class="root">
  <div class="flex justify-end gap-2">
    <button
      type="button"
      aria-labelledby="Lock"
      on:click="{lock}"
      class:text-red-500="{locked}"
    >
      {#if locked}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          ></path>
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          ></path>
        </svg>
      {/if}
    </button>
    <button type="button" aria-labelledby="Sync" on:click="{sync}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        ></path>
      </svg>
    </button>
  </div>
</div>
