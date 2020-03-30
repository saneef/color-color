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

  .swatch-marker {
    stroke: #a0aec0; /* border-gray-500 */
    stroke-width: var(--stroke-width);
  }

  .line-path {
    fill: none;
    stroke: #a0aec0; /* border-gray-500 */
    stroke-width: var(--stroke-width);
    stroke-linejoin: round;
  }
</style>

<script>
  import { scaleLinear, scalePoint, line, curveCardinal } from "d3";

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

  $: lineGenerator = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(curveCardinal);
  $: pathD = lineGenerator(data);
</script>

<div class="root">
  <h3>{title}</h3>
  <div class="wrapper">
    <svg
      viewBox="0 0 {width}
      {height}"
      style="--circ-stroke-width: {strokeWidth}">
      <g transform="{`translate(${margin.x},${margin.y})`}">
        <path class="line-path" d="{pathD}"></path>
        {#each data as s, i (i)}
          <circle
            class="swatch-marker"
            {r}
            fill="{s.hex}"
            cx="{xScale(s.x)}"
            cy="{yScale(s.y)}">
            <title>{s.x}</title>
          </circle>
        {/each}
      </g>
    </svg>
  </div>
</div>
