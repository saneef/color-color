<style lang="postcss">
  .tiny-swatch {
    @apply block w-6 h-6 rounded;
    box-shadow: inset 0px -1px 0 rgba(0, 0, 0, 0.35),
      inset 0px 1px 0 0 rgba(255, 255, 255, 0.55);
  }
</style>

<script>
  export let color;
</script>

<div class="tiny-swatch" style="background-color:{color}"></div>
