<script>
  import eases from "eases";
  const easeOptions = Object.keys(eases);
  import { paletteParams } from "./store";
  let current = 0;

  $: current = $paletteParams.current;
</script>

<div class="control-set">
  <h2>Hue</h2>
  <div class="control-group">
    <label for="hue-min">Start</label>
    <input
      id="hue-start"
      type="range"
      bind:value="{$paletteParams.params[current].hue.start}"
      min="0"
      max="360" />
  </div>
  <div class="control-group">
    <label for="hue-end">End</label>
    <input
      id="hue-end"
      type="range"
      bind:value="{$paletteParams.params[current].hue.end}"
      min="0"
      max="360" />
  </div>
  <div class="control-group">
    <label for="hue-ease">Easing</label>
    <select
      id="hue-ease"
      bind:value="{$paletteParams.params[current].hue.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </select>
  </div>
</div>

<div class="control-set">
  <h2>Saturation</h2>
  <div class="control-group">
    <label for="sat-min">Start</label>
    <input
      id="sat-start"
      type="range"
      bind:value="{$paletteParams.params[current].sat.start}"
      min="0"
      max="100" />
  </div>
  <div class="control-group">
    <label for="sat-end">End</label>
    <input
      id="sat-end"
      type="range"
      min="0"
      max="100"
      bind:value="{$paletteParams.params[current].sat.end}" />
  </div>
  <div class="control-group">
    <label for="sat-ease">Easing</label>
    <select
      id="sat-ease"
      bind:value="{$paletteParams.params[current].sat.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </select>
  </div>
</div>

<div class="control-set">
  <h2>Lightness</h2>
  <div class="control-group">
    <label for="light-start">Start</label>
    <input
      id="light-start"
      type="range"
      min="0"
      max="100"
      bind:value="{$paletteParams.params[current].lig.start}" />
  </div>
  <div class="control-group">
    <label for="light-end">End</label>
    <input
      id="light-end"
      type="range"
      min="0"
      max="100"
      bind:value="{$paletteParams.params[current].lig.end}" />
  </div>
  <div class="control-group">
    <label for="light-ease">Easing</label>
    <select
      id="light-ease"
      bind:value="{$paletteParams.params[current].lig.ease}">
      {#each easeOptions as ease}
        <option value="{ease}">{ease}</option>
      {/each}
    </select>
  </div>
</div>
