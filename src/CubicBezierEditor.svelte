<style>
  .wrapper {
    @apply p-1 bg-gray-100;
  }

  .axis line {
    @apply stroke-current text-gray-300;
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }

  .curve {
    @apply stroke-current text-gray-600;
    stroke-width: 3;
    stroke-linecap: round;
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

  const tickDivisions = 4;
  const width = 300;
  const height = 300;
  const r = width / 30;
  const strokeWidth = 2;
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
</script>

<div class="wrapper">
  <svg viewBox="0 0 {width} {height}" fill="none">
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
    <path class="curve" d="{curvePathD}"></path>
  </svg>
</div>
