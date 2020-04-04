<style>
  footer {
    @apply -mx-4 mt-4 p-4 text-center text-gray-100 bg-gray-900 leading-loose;
  }

  a:hover,
  a:focus,
  a:active {
    @apply text-white;
  }

  ul {
  }
  li + li {
    @apply mt-2;
  }

  .img {
    @apply inline-block;
    height: 36px;
  }
</style>

<script>
  import { getBaseUrl } from "./lib/url";
</script>

<footer>
  <ul>
    <li>
      <a href="{getBaseUrl()}">color × color</a>
      by
      <a href="https://saneef.com">Saneef</a>
    </li>
    <li>
      <a href="https://ko-fi.com/N4N81KP2D" target="_blank">
        <img
          class="img"
          height="36"
          src="https://cdn.ko-fi.com/cdn/kofi2.png?v=2"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com" />
      </a>
    </li>
    <li>
      <a href="https://github.com/saneef/color-color">Github</a>
    </li>
  </ul>
</footer>
