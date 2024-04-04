<style lang="postcss">
  .header {
    grid-area: var(--grid-area);
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .title a {
    @apply block px-2 py-4 no-underline text-gray-100 bg-gray-900;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    @apply underline cursor-pointer;
  }

  .button-set {
    @apply flex;
    @apply bg-gray-900;
  }

  button {
    @apply flex-1 items-center p-2 border-4 border-gray-900;
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

  button + button {
    @apply -ml-1;
  }

  button[disabled] {
    @apply line-through;
  }

  button[disabled]:hover,
  button[disabled]:active,
  button[disabled]:focus {
    @apply bg-gray-200;
    @apply cursor-not-allowed;
  }

  .button--hidden {
    @apply ease-out;
    opacity: 0;
    transition-delay: 0ms;
    transition-duration: 0s;
  }
</style>

<script>
  import { paletteParams, shareDialog } from "./store";
  export let gridArea;

  $: canAddMoreColors =
    $paletteParams.params.length < $paletteParams.maxNumOfPalettes;
</script>

<header class="header" style="--grid-area:{gridArea};">
  <h1 class="title">
    <a href="/"> color <span aria-hidden="true">×</span> color </a>
  </h1>
  <div class="button-set">
    <button
      class:button--hidden="{$shareDialog.open}"
      on:click="{(e) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        shareDialog.openWithTriggerRect(rect);
      }}"
    >
      Share
    </button>
    <button
      on:click="{() => paletteParams.clone()}"
      disabled="{!canAddMoreColors}"
      title="{!canAddMoreColors ? 'Supports only 6 sets at a time' : null}"
    >
      Clone color
    </button>
    <button
      on:click="{() => paletteParams.add()}"
      disabled="{!canAddMoreColors}"
      title="{!canAddMoreColors ? 'Supports only 6 sets at a time' : null}"
    >
      Add colors
    </button>
  </div>
</header>
