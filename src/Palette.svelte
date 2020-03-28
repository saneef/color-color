<style>
  .palette {
    @apply flex flex-col;
  }

  .header {
    @apply sticky top-0 flex bg-gray-200 border-t-4 border-gray-900;
  }

  button {
    @apply flex flex-auto items-center p-4 pt-3 text-gray-600;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  .button-activate {
    @apply text-gray-200 mr-auto;
  }

  .button-remove {
    @apply text-3xl leading-none border-r-2;
  }

  .status {
    @apply relative flex items-center justify-center w-8 h-8 border-2 border-gray-900 rounded-full text-gray-900;
  }

  .active {
  }
  .active .status {
    @apply text-gray-100 bg-gray-900;
  }

  .active .status::before {
    @apply block absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";
  }
</style>

<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "./Icon.svelte";

  export let active = false;
  export let removable = true;
  export let index;

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
    <button
      class="button-activate"
      class:active
      on:click="{onActivate}"
      title="{active ? 'Activate' : 'Deactivate'}">
      <span class="status">{index}</span>
    </button>
    {#if removable}
      <button class="button-remove" on:click="{onRemove}" title="Remove">
        <span class="sr-only">Remove</span>
        <Icon icon="cross" />
      </button>
    {/if}
  </div>
  <slot />
</div>
