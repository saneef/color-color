<style>
  footer {
    @apply -mx-4 mt-4 py-4 px-2 text-center text-gray-100 bg-gray-900 leading-loose;
  }

  a:hover,
  a:focus,
  a:active {
    @apply text-white;
  }

  li + li {
    @apply mt-2;
  }

  li:not(.full) {
    @apply inline-block;
  }

  li:not(.full) + li::before {
    @apply inline-block;
    content: "\00B7\00A0"; /* "· " */
  }
</style>

<script>
  import Icon from "./Icon.svelte";
  import { getBaseUrl } from "./lib/url";
</script>

<footer>
  <ul>
    <li class="full">
      <a href="{getBaseUrl()}">color × color</a> by <a
        href="https://saneef.com">Saneef</a>
    </li>
    <li>
      <a href="https://ko-fi.com/N4N81KP2D" target="_blank">
        <Icon icon="ko-fi" />
        Buy me a coffee
      </a>
    </li>
    <li><a href="https://github.com/saneef/color-color">Github</a></li>
  </ul>
</footer>
