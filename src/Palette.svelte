<style>
  .palette {
    @apply flex flex-col;
  }

  .header {
    @apply sticky top-0 flex bg-gray-200 border-t-4 border-gray-900;
  }

  button {
    @apply flex flex-auto items-center p-4 pt-3 text-gray-500;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  .button-remove {
    @apply text-3xl leading-none;
  }

  .status {
    @apply relative flex w-8 h-8 border-2 border-gray-900 rounded-full;
  }

  .active {
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
      <span class="sr-only">
        {#if active}Active{:else}Activate{/if}
      </span>
    </button>
    {#if removable}
      <button class="button-remove" on:click="{onRemove}">
        <span class="sr-only">Remove</span>
        <span aria-hidden="true">×</span>
      </button>
    {/if}
  </div>
  <slot />
</div>
