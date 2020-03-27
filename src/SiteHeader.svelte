<style>
  .header {
    @apply border-4 border-gray-900;
    grid-area: header;
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .title a {
    @apply block px-2 pt-4 pb-6;
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
    @apply flex-auto items-center p-2 border-4 border-gray-900 font-bold;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  import { paletteParams } from "./store";
</script>

<header class="header">
  <h1 class="title">
    <a href="/">
      color 
      <span aria-hidden="true">×</span>
       color
    </a>
  </h1>
  <div class="button-set">
    <button on:click="{() => paletteParams.add()}">Add colors</button>
  </div>
</header>
