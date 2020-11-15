<style>
  h3 {
    @apply text-sm font-bold text-gray-700;
  }

  .subtitle {
    @apply font-normal text-gray-600;
  }

  .wrapper {
    @apply grid mt-2 p-1 bg-gray-100;
    grid-template-columns: 1fr max-content;
  }

  .legend {
    @apply pl-1 font-mono text-gray-600 text-xs flex flex-col justify-between;
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

  .axis line {
    stroke: #e2e8f0; /* border-gray-300 */
    stroke-width: var(--stroke-width);
    stroke-dasharray: 4 4;
  }
</style>

<script>
  import { scaleLinear, scalePoint } from "d3-scale";
  import { line as generateLine, curveCardinal } from "d3-shape";
  import { linspace } from "./lib/math.js";

  export let data = [];
  export let title;
  export let subtitle = null;
  export let yDomain = [0, 100];
  export let yTickDivisions = 4;

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

  $: xSteps = data.map((d) => d.x);
  $: xScale = scalePoint().domain(xSteps).range([0, innerWidth]);
  $: yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

  $: yTicks = linspace(yTickDivisions).map((v) => v * yDomain[1]);
  $: lineGenerator = generateLine()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curveCardinal);
  $: pathD = lineGenerator(data);
</script>

<div class="root">
  <h3>
    {title}
    {#if subtitle}<span class="subtitle">· {subtitle}</span>{/if}
  </h3>
  <div class="wrapper">
    <div class="graph">
      <svg
        viewBox="0 0 {width}
        {height}"
        style="--circ-stroke-width: {strokeWidth}">
        <g transform="{`translate(${margin.x},${margin.y})`}">
          <g class="axis y-axis">
            {#each yTicks as tick}
              <g transform="translate(0, {yScale(tick)})">
                <line x1="{0}" x2="{innerWidth}"></line>
              </g>
            {/each}
          </g>

          <g class="axis x-axis">
            {#each data as s, i (i)}
              <g transform="translate({xScale(s.x)}, 0)">
                <line y1="{0}" y2="{innerHeight}"></line>
              </g>
            {/each}
          </g>

          <path class="line-path" d="{pathD}"></path>
          {#each data as s, i (i)}
            <circle
              class="swatch-marker"
              r="{r}"
              fill="{s.hex}"
              cx="{xScale(s.x)}"
              cy="{yScale(s.y)}">
              <title>{s.x} · {title}: {s.y.toFixed(2)}</title>
            </circle>
          {/each}
        </g>
      </svg>
    </div>
    <div class="legend">
      <span>{yDomain[1]}</span>
      <span>{yDomain[0]}</span>
    </div>
  </div>
</div>
