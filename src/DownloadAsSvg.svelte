<style>
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
  export let data = null;
  let filename = "Palette from ColorColor.svg";

  $: strippedData = data
    ? data.replace(/(\r\n|\n|\r)/gm, "").replace(/[ ]{2,}/gm, "")
    : "";
</script>

{#if data}
  <div>
    <a
      href="data:image/svg;base64,{window.btoa(strippedData)}"
      download="{filename}">
      Download as SVG
    </a>
  </div>
{/if}
