<style lang="postcss">
  .palette {
    @apply flex flex-col;
  }

  .header {
    @apply sticky top-0 z-10 h-16 flex bg-gray-200;
  }

  button {
    @apply flex items-center p-4 pt-3 text-gray-600;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
    @apply text-gray-800;
  }

  .button-activate {
    @apply flex-auto text-gray-200 mr-auto;
  }

  .button-action {
    @apply flex-none text-3xl leading-none border-r;
  }

  .status {
    @apply relative flex items-center justify-center w-8 h-8 border-2 border-gray-600 rounded-full font-bold text-gray-600;
  }

  .active .status {
    @apply border-gray-900 bg-gray-900 text-gray-100;
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

  /**
   * @typedef {Object} Props
   * @property {boolean} [active]
   * @property {boolean} [removable]
   * @property {boolean} [clonable]
   * @property {any} index
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    active = false,
    removable = true,
    clonable = true,
    index,
    children,
  } = $props();

  const dispatch = createEventDispatcher();

  function onActivate(e) {
    dispatch("clickActivate", e);
  }

  function onRemove(e) {
    dispatch("clickRemove", e);
  }

  function onClone(e) {
    dispatch("clickClone", e);
  }
</script>

<div class="palette">
  <div class="header">
    <button
      class="button-activate"
      class:active
      onclick={onActivate}
      title={active ? "Active" : "Activate"}
    >
      <span class="status">{index}</span>
    </button>
    {#if clonable}
      <button class="button-action" onclick={onClone} title="Clone">
        <span class="sr-only">Clone</span>
        <Icon icon="clone" title="Clone palette" />
      </button>
    {/if}
    {#if removable}
      <button class="button-action" onclick={onRemove} title="Remove">
        <span class="sr-only">Remove</span>
        <Icon icon="x" title="Remove palette" />
      </button>
    {/if}
  </div>
  {@render children?.()}
</div>
