<style lang="postcss">
  div {
    @apply pt-2;
  }

  a {
    @apply inline-block p-2 border-4 border-gray-900 font-bold no-underline;
  }

  a:hover,
  a:active,
  a:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  /**
   * @typedef {Object} Props
   * @property {any} [data]
   */

  /** @type {Props} */
  let { data = null } = $props();

  let filename = "Palette from ColorColor.svg";

  let base64EncodedData = $derived(data ? window.btoa(data) : null);
</script>

{#if base64EncodedData}
  <div>
    <a href="data:image/svg;base64,{base64EncodedData}" download={filename}>
      Download as SVG
    </a>
  </div>
{/if}
