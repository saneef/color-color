<style>
  .index {
    @apply grid pb-4;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
    grid-gap: 0.25rem;
  }

  .index > li {
  }

  .index-marker {
    @apply flex justify-center items-center h-8 w-8 border-2 border-gray-600 rounded-full text-gray-600 font-bold no-underline;
  }

  .index-marker--active {
    @apply relative border-gray-900 text-gray-100 bg-gray-900;
  }

  .index-marker--active::before {
    @apply block absolute w-1 h-4 bg-gray-900;
    bottom: 100%;
    left: 50%;
    margin-left: -0.125rem;
    content: "";
  }
</style>

<script>
  import { paletteParams } from "./store";
  let paletteIndex = [];
  $: paletteIndex = $paletteParams.params.map((_, i) => i);
</script>

<ul class="index">
  {#each paletteIndex as pi, i (i)}
    <li>
      <a
        class="index-marker"
        class:index-marker--active="{$paletteParams.paletteIndex === i}"
        href="#{i + 1}"
        on:click|preventDefault="{() => {
          $paletteParams.paletteIndex = i;
        }}">
        {i + 1}
      </a>
    </li>
  {/each}
</ul>
