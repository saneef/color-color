<style>
  .palette {
    @apply flex flex-col;
  }

  .header {
    @apply sticky top-0 flex bg-gray-200 border-t-4 border-gray-900;
  }

  button {
    @apply flex flex-auto items-center p-4 pt-3 text-gray-700;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  .button-activate {
    @apply pl-2 font-bold;
  }

  .button-remove {
    flex-grow: 0;
  }

  .status {
    @apply relative flex w-8 h-8 border-2 border-gray-900 rounded-full mr-2;
  }

  .active {
    @apply text-black;
  }

  .active .status {
    @apply bg-gray-900;
  }

  .active .status::before {
    @apply block absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";
  }

  .active .status::after {
    @apply block absolute top-0 left-0 w-full h-full flex justify-center items-center;
    content: "⚡️";
  }
</style>

<script>
  import { createEventDispatcher } from "svelte";

  export let active = false;
  export let removable = true;

  const dispatch = createEventDispatcher();

  function onActivate(e) {
    dispatch("clickActivate", e);
  }

  function onRemove(e) {
    dispatch("clickRemove", e);
  }
</script>

<div class="palette">
  <div class="header">
    <button class="button-activate" class:active on:click="{onActivate}">
      <span class="status"></span>
      {#if active}Active{:else}Activate{/if}
    </button>
    {#if removable}
      <button class="button-remove" on:click="{onRemove}">Remove</button>
    {/if}
  </div>
  <slot />
</div>
