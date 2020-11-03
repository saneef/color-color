<style>
  .scrim {
    @apply absolute inset-0;
    @apply bg-black bg-opacity-25;
    @apply z-10;
  }
</style>

<script>
  import { fade } from "svelte/transition";
  import { expoOut } from "svelte/easing";
</script>

<div
  transition:fade="{{ delay: 0, duration: 400, easing: expoOut }}"
  class="scrim"></div>
