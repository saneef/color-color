<style>
  footer {
    @apply -mx-4 mt-4 p-4 text-center text-gray-100 bg-gray-900 leading-loose;
  }

  a:hover,
  a:focus,
  a:active {
    @apply text-white;
  }
</style>

<script>
  import { getBaseUrl } from "./lib/url";
</script>

<footer>
  <a href="{getBaseUrl()}">color × color</a>
  by
  <a href="https://saneef.com">Saneef</a>
  <br />
  <a href="https://github.com/saneef/color-color">Github</a>
</footer>
