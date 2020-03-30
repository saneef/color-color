<style>
  h3 {
    @apply text-sm text-gray-700;
  }

  .wrapper {
    @apply mt-2 p-2 rounded bg-gray-100;
  }

  svg {
    @apply max-w-full h-auto;
  }

  circle {
    stroke: #edf2f7; /* bg-gray-200; */
    stroke-width: var(--circ-stroke-width);
  }
</style>

<script>
  import { scaleLinear, scalePoint } from "d3";

  export let data = [];
  export let title;
  export let yDomain = [0, 100];

  const strokeWidth = 2;
  const r = 6;
  let width = 300;
  let height = 150;
  let margin = {
    x: r + strokeWidth,
    y: r + strokeWidth,
  };

  let innerWidth = width - 2 * margin.y;
  let innerHeight = height - 2 * margin.x;

  $: xSteps = data.map(d => d.x);
  $: xScale = scalePoint()
    .domain(xSteps)
    .range([0, innerWidth]);
  $: yScale = scaleLinear()
    .domain(yDomain)
    .range([innerHeight, 0]);
</script>

<div class="root">
  <h3>{title}</h3>
  <div class="wrapper">
    <svg viewBox="0 0 {width} {height}">
      <g transform="{`translate(${margin.x},${margin.y})`}">
        {#each data as s, i (i)}
          <circle
            {r}
            fill="{s.hex}"
            cx="{xScale(s.x)}"
            cy="{yScale(s.y)}"
            style="--circ-stroke-width: {strokeWidth}">
            <title>{s.x}</title>
          </circle>
        {/each}
      </g>
    </svg>
  </div>
</div>
