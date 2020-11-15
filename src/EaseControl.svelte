<style>
  .editor {
    @apply pb-1;
  }
  .toggle {
    @apply uppercase text-xs tracking-wide text-gray-700 no-underline;
  }
</style>

<script>
  import SelectField from "./SelectField.svelte";
  import EaseSelectOptions from "./EaseSelectOptions.svelte";
  import CubicBezierEditor from "./CubicBezierEditor.svelte";
  import { getAliasByBezierEasing } from "./lib/eases.js";

  export let id;
  export let value;
  export let label = "Easing";

  let alias = getAliasByBezierEasing(value);
  // alias will be empty for 'Custom' curve
  let showCurve = !alias;
</script>

<SelectField id="{id}" label="{label}" bind:value>
  <EaseSelectOptions value="{value}" />
</SelectField>
{#if showCurve}
  <div class="editor">
    <CubicBezierEditor bind:params="{value}" />
  </div>
{/if}
<a
  class="toggle"
  href="#toggle-curve"
  on:click|preventDefault="{() => (showCurve = !showCurve)}">{#if showCurve}
    ↑ Hide
  {:else}↓ Show{/if}
  Curve</a>
