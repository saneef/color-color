<style>
  .wrapper {
    @apply bg-gray-100 pb-2;
    @apply grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr max-content;
  }

  .plot {
    grid-column: 1 / 3;
    @apply mb-2;
  }

  .legend {
    @apply font-mono text-gray-600;
    @apply fill-current;
    @apply pointer-events-none;
  }

  .axis line {
    @apply stroke-current text-gray-300;
    stroke-width: var(--stroke-width);
    stroke-dasharray: 4 4;
  }

  .curve {
    @apply stroke-current text-gray-600;
    stroke-width: var(--stroke-width-lg);
    stroke-linecap: round;
  }

  .control-point-line {
    @apply stroke-current text-blue-400 text-opacity-75;
    stroke-width: var(--stroke-width);
  }

  .control-point-icon,
  .control-point {
    @apply stroke-current text-green-500;
    fill: #f7fafc; /* .bg-gray-100 */
    stroke-width: var(--stroke-width);
  }

  .control-point {
    cursor: grab;
  }

  .control-point--2,
  .control-point-icon--2 {
    @apply text-red-500;
  }

  .control-point-icon {
    stroke-width: calc(var(--stroke-width) * 2 / 3);
  }

  .input-set {
    @apply mx-2;
  }

  .control-point-icon {
    @apply w-6 h-6;
  }

  .plot--dragging,
  .plot--dragging .control-point {
    cursor: grabbing;
  }
</style>

<script>
  import { scaleLinear } from "d3-scale";
  import { interpret, assign } from "@xstate/fsm";

  import { linspace, clamp } from "./lib/math.js";
  import XYInputField from "./XYInputField.svelte";
  import ControlPoint from "./ControlPoint.svelte";
  import {
    stringToCubicBezierParams,
    cubicBezierParamsToString,
  } from "./lib/eases";
  import dragDropMachineCreator from "./machines/draggableMachine";

  export let params;

  let plotEl;

  const tickDivisions = 4;
  const width = 300;
  const height = 300;
  const r = width / 30;
  const strokeWidth = 4;
  const strokeWidthSmall = 2;
  const margin = r + strokeWidth;
  const innerWidth = width - 2 * margin;
  const innerHeight = height - 2 * margin;

  $: x1 = stringToCubicBezierParams(params)[0];
  $: y1 = stringToCubicBezierParams(params)[1];
  $: x2 = stringToCubicBezierParams(params)[2];
  $: y2 = stringToCubicBezierParams(params)[3];

  const setParamsFromClientXY = (
    index,
    x,
    y,
    wrapperX,
    wrapperY,
    wrapperWidth,
    wrapperHeight
  ) => {
    const p = stringToCubicBezierParams(params);
    let u = (x - wrapperX) / wrapperWidth;
    let v = (y - wrapperY) / wrapperHeight;

    u = clamp(0, u, 1);
    v = clamp(-0.3, 1 - v, 1.3);

    if (index === 1) {
      p[0] = u;
      p[1] = v;
    } else {
      p[2] = u;
      p[3] = v;
    }
    params = cubicBezierParamsToString(p);
  };

  const draggableMachine = dragDropMachineCreator({
    actions: {
      assignPoint: assign({
        controlIndex: (context, event) => event.controlIndex,
        px: (context, event) => event.clientX,
        py: (context, event) => event.clientY,
        wrapperX: () => plotEl.getBoundingClientRect().left,
        wrapperY: () => plotEl.getBoundingClientRect().top,
        wrapperWidth: () => plotEl.getBoundingClientRect().width,
        wrapperHeight: () => plotEl.getBoundingClientRect().height,
      }),
      resetPosition: (context) => {
        setParamsFromClientXY(
          context.controlIndex,
          context.px,
          context.py,
          context.wrapperX,
          context.wrapperY,
          context.wrapperWidth,
          context.wrapperHeight
        );
      },
      assignDelta: (context, event) => {
        setParamsFromClientXY(
          context.controlIndex,
          event.clientX,
          event.clientY,
          context.wrapperX,
          context.wrapperY,
          context.wrapperWidth,
          context.wrapperHeight
        );
      },
    },
    delays: {
      TIMEOUT: 2000,
    },
  });
  const service = interpret(draggableMachine).start();

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

  const onChangeValues = (index, value) => {
    const p = stringToCubicBezierParams(params);
    p[index] = +value;
    params = cubicBezierParamsToString(p);
  };

  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      service.send("keyup.escape");
    }
  };

  const handleMouseDownFn = (index) => (e) => {
    e.preventDefault();

    const target = e.currentTarget;
    const { width, height } = target.getBoundingClientRect();
    service.send({
      type: "mousedown",
      clientX: e.clientX,
      clientY: e.clientY,
      clientWidth: width,
      clientHeight: height,
      controlIndex: index,
    });
  };
</script>

<svelte:body
  on:keyup="{escapeHandler}"
  on:mouseup|preventDefault="{service.send}"
  on:mousemove="{service.send}" />
<div
  class="wrapper"
  style="--stroke-width-lg: {strokeWidth}px; --stroke-width: {strokeWidthSmall}px;">
  <div
    class="plot"
    bind:this="{plotEl}"
    class:plot--dragging="{$service.value === 'dragging'}">
    <svg viewBox="0 0 {width} {height}" fill="none">
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
        class="control-point-line control-point-line-1"
        x1="{margin}"
        y1="{margin + innerHeight}"
        x2="{controlX1}"
        y2="{controlY1}"></line>
      <line
        class="control-point-line control-point-line-2"
        x1="{margin + innerWidth}"
        y1="{margin}"
        x2="{controlX2}"
        y2="{controlY2}"></line>
      <path class="curve" d="{curvePathD}"></path>
      <g
        class="control-point control-point--1"
        transform="translate({controlX1},{controlY1})">
        <ControlPoint
          on:mousedown="{handleMouseDownFn(1)}"
          size="{r * 2}"
          variant="circle" />
      </g>
      <g
        class="control-point control-point--2"
        transform="translate({controlX2},{controlY2})">
        <ControlPoint on:mousedown="{handleMouseDownFn(2)}" size="{r * 2}" />
      </g>
    </svg>
  </div>
  <div class="input-set">
    <XYInputField
      id="control-point-1"
      x="{x1}"
      onXChange="{(e) => onChangeValues(0, e)}"
      y="{y1}"
      onYChange="{(e) => onChangeValues(1, e)}">
      <div>
        <svg class="control-point-icon" viewBox="0 0 24 24">
          <g transform="translate(12, 12)">
            <ControlPoint size="12" variant="circle" />
          </g>
        </svg>
      </div>
    </XYInputField>
  </div>
  <div class="input-set">
    <XYInputField
      id="control-point-2"
      x="{x2}"
      onXChange="{(e) => onChangeValues(2, e)}"
      y="{y2}"
      onYChange="{(e) => onChangeValues(3, e)}">
      <div>
        <svg
          class="control-point-icon control-point-icon--2"
          viewBox="0 0 24 24">
          <g transform="translate(12, 12)">
            <ControlPoint size="12" />
          </g>
        </svg>
      </div>
    </XYInputField>
  </div>
</div>
