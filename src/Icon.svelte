<style>
  .root {
    @apply inline-block fill-current;
  }

  .sm {
    @apply h-4 w-4;
  }

  .base {
    @apply h-6 w-6;
  }

  .lg {
    @apply h-8 w-8;
  }
</style>

<script>
  export let icon;
  export let size = "base";
</script>

<svg
  class="root {size}"
  title="{icon}"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20">
  {#if icon === 'chevron-small-down'}
    <path
      d="M6 8L10 12L14 8"
      stroke="currentColor"
      fill="none"
      stroke-width="2"></path>
  {/if}
  {#if icon === 'cross'}
    <path
      d="M4 4L16 16M16 4L4 16"
      stroke="currentColor"
      stroke-width="2"></path>
  {/if}
  {#if icon === 'ko-fi'}
    <g fill-rule="nonzero">
      <path
        d="M19.9 7.458c-.277-1.465-1.065-2.377-1.874-2.942a4.985 4.985 0
        00-2.856-.883H.703c-.503 0-.696.491-.698.737l.001.16s-.023 6.401.021
        9.82c.137 2.018 2.159 2.017 2.159 2.017s6.602-.02 9.768-.039c.148 0
        .297-.017.44-.053 1.803-.45 1.99-2.126 1.97-3.06 3.624.202 6.18-2.355
        5.536-5.757zm-4.07 3.322c-.773.096-1.4.024-1.4.024V6.072h.95c.629 0
        1.235.262 1.645.738.289.335.52.807.52 1.459 0 1.593-.821 2.221-1.715
        2.51z"
        fill="#fff"></path>
      <path
        d="M7.092 13.713c.157.08.258-.02.258-.02s2.302-2.1
        3.34-3.311c.922-1.083.982-2.907-.602-3.59-1.585-.68-2.888.803-2.888.803-1.13-1.244-2.842-1.18-3.633-.34-.791.842-.515
        2.287.075 3.09.554.755 2.99 2.926 3.36 3.293 0 0 .026.028.09.075z"
        fill="#f15e5e"></path>
    </g>
  {/if}
</svg>
