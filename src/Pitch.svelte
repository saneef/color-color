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
  export let gridArea;

  const contactForm = `mailto:corbels_canny.0g@icloud.com?subject=I%20need%20help%20with%20colours&body=Hey%20Saneef%2C%0A%0A`;
  const website = "https://saneef.com";
</script>

<div class="pitch" style="--grid-area: {gridArea};">
  <h2>Need professional help?</h2>
  <p>
    Hi, I'm <a href="{website}">Saneef</a>, an information designer. I can help
    you create accessible color systems for your products and brands.
  </p>
  <p class="pt-2">
    <a class="btn" href="{contactForm}">Book a call</a>
  </p>
</div>
