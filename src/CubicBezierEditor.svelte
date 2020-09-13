<style>
  .wrapper {
    @apply bg-gray-100;
  }

  .legend {
    @apply text-lg italic font-serif text-gray-600;
    @apply fill-current;
  }

  .axis line {
    @apply stroke-current text-gray-300;
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  .curve {
    @apply stroke-current text-gray-600;
    stroke-width: var(--stroke-width-lg);
    stroke-linecap: round;
  }

  .handle {
    @apply stroke-current text-black;
    stroke-width: var(--stroke-width-lg);
    fill: white;
  }

  .handle-line {
    @apply stroke-current text-red-400 text-opacity-75;
  }
</style>

<script>
  import { scaleLinear } from "d3-scale";
  import { linspace } from "./lib/math.js";
  import { stringToCubicBezierParams } from "./lib/eases";

  export let params;

  $: parsedParams = stringToCubicBezierParams(params);
  $: x1 = parsedParams[0];
  $: y1 = parsedParams[1];
  $: x2 = parsedParams[2];
  $: y2 = parsedParams[3];
  $: console.log(params);

  const tickDivisions = 4;
  const width = 300;
  const height = 300;
  const r = width / 30;
  const strokeWidth = 3;
  const margin = r + strokeWidth;
  const innerWidth = width - 2 * margin;
  const innerHeight = height - 2 * margin;

  const ticks = linspace(tickDivisions);
  const xScale = scaleLinear().range([0, innerWidth]);
  const yScale = scaleLinear().range([innerHeight, 0]);

  $: curvePathD = `M${margin},${innerHeight + margin} C${margin + xScale(x1)},${
    margin + yScale(y1)
  } ${margin + xScale(x2)},${margin + yScale(y2)} ${
    margin + innerWidth
  },${margin}`;

  $: controlX1 = margin + xScale(x1);
  $: controlY1 = margin + yScale(y1);
  $: controlX2 = margin + xScale(x2);
  $: controlY2 = margin + yScale(y2);
</script>

<div class="wrapper">
  <svg
    viewBox="0 0 {width} {height}"
    fill="none"
    style="--stroke-width-lg: {strokeWidth};">
    <text x="{margin + r}" y="{r + 2 * margin}" class="legend">f(t)</text>
    <text
      x="{innerWidth + margin - 2 * r}"
      y="{margin + innerHeight - r}"
      class="legend">
      t
    </text>
    <g transform="{`translate(${margin},${margin})`}">
      <g class="axis">
        {#each ticks as tick}
          <g transform="translate(0, {yScale(tick)})">
            <line x1="{0}" x2="{innerWidth}"></line>
          </g>

          <g transform="translate({xScale(tick)}, 0)">
            <line y1="{0}" y2="{innerHeight}"></line>
          </g>
        {/each}
      </g>
    </g>
    <line
      class="handle-line handle-line-1"
      x1="{margin}"
      y1="{margin + innerHeight}"
      x2="{controlX1}"
      y2="{controlY1}"></line>
    <line
      class="handle-line handle-line-2"
      x1="{margin + innerWidth}"
      y1="{margin}"
      x2="{controlX2}"
      y2="{controlY2}"></line>
    <path class="curve" d="{curvePathD}"></path>
    <circle
      class="handle handle-1"
      cx="{controlX1}"
      cy="{controlY1}"
      r="{r}"></circle>
    <rect
      class="handle handle-2"
      x="{controlX2 - r}"
      y="{controlY2 - r}"
      width="{2 * r}"
      height="{2 * r}"></rect>
  </svg>
</div>
