<style>
  .header {
    @apply border-4 border-gray-900;
    grid-area: var(--grid-area);
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .title a {
    @apply block px-2 pt-4 pb-6 no-underline text-gray-100 bg-gray-900;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    @apply underline cursor-pointer;
  }

  .button-set {
    @apply flex -mx-1 -my-1;
  }

  button {
    @apply flex-1 items-center p-2 border-4 border-gray-900 font-bold;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }

  button + button {
    @apply -ml-1;
  }
</style>

<script>
  import { paletteParams, shareDialog } from "./store";
  export let gridArea;
</script>

<header class="header" style="--grid-area:{gridArea};">
  <h1 class="title">
    <a href="/">
      color 
      <span aria-hidden="true">×</span>
       color
    </a>
  </h1>
  <div class="button-set">
    <button
      on:click="{() => {
        $shareDialog = true;
      }}">
      Share
    </button>
    <button on:click="{() => paletteParams.add()}">Add colors</button>
  </div>
</header>
