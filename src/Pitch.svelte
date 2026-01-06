<style lang="postcss">
  .pitch {
    @apply p-4;
    @apply border-4 border-t-0 border-gray-900;
    @apply text-gray-100 bg-gray-600 leading-normal;
    @apply space-y-2;
    grid-area: var(--grid-area);

    @screen md {
      @apply border-l-0;
    }
  }

  a:hover,
  a:focus,
  a:active {
    @apply text-white;
  }

  h2 {
    @apply text-lg font-bold leading-tight;
    @apply mb-2;
  }

  .btn {
    @apply text-gray-900 font-bold no-underline;
    @apply py-2 px-3 bg-gray-200;
  }

  .btn:hover,
  .btn:focus,
  .btn:active {
    @apply text-gray-900;
    @apply bg-gray-300;
  }
</style>

<script>
  import siteInfo from "./lib/site-info";
  let { gridArea } = $props();
</script>

<div class="pitch" style="--grid-area: {gridArea};">
  <h2>Support {siteInfo.title}</h2>
  <p>
    All contribution helps with hosting and other operational costs of this
    valuable tool.
  </p>
  <p class="pt-2">
    <a class="btn" href="https://ko-fi.com/N4N81KP2D" target="_blank">Donate</a>
  </p>
</div>
