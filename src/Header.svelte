<style>
  .header {
    @apply border-4 border-gray-900;
    grid-area: header;
  }

  .title {
    @apply text-2xl font-bold text-center leading-none;
  }

  .title a {
    @apply block px-2 py-4;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    @apply underline cursor-pointer;
  }
</style>

<header class="header">
  <h1 class="title">
    <a href="/">
      color 
      <span aria-hidden="true">×</span>
       color
    </a>
  </h1>
</header>
