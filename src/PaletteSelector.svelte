<style>
  .index {
    @apply flex mb-4 -mx-1;
  }

  .index li {
    @apply mx-1;
  }

  .index-marker {
    @apply flex justify-center items-center h-8 w-8 no-underline border-2 border-gray-900 rounded-full;
  }

  .index-marker--active {
    @apply relative text-white bg-gray-900;
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
