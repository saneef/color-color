<script>
  export let size;
  export let variant = "square";
</script>

{#if variant === "square"}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <rect
    on:mousedown
    class="control-point-marker control-point-marker--square"
    x="{-size / 2}"
    y="{-size / 2}"
    width="{size}"
    height="{size}"
  ></rect>
{:else}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <circle
    on:mousedown
    class="control-point-marker control-point-marker--circle"
    cx="0"
    cy="0"
    r="{size / 2}"
  ></circle>
{/if}
