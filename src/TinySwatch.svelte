<style>
  .tiny-swatch {
    @apply block w-6 h-6 rounded;
    box-shadow: inset 0px -1px 0 rgba(0, 0, 0, 0.35),
      inset 0px 1px 0 0 rgba(255, 255, 255, 0.55);
  }
  .isLight {
  }
</style>

<script>
  export let color;
  export let isLight = false;
</script>

<div class="tiny-swatch" class:isLight style="background-color:{color}"></div>
