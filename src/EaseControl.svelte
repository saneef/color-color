<style lang="postcss">
  .editor {
    @apply pb-1;
  }
  .toggle {
    @apply uppercase text-xs tracking-wide text-gray-700 no-underline;
  }
</style>

<script>
  import { preventDefault } from "svelte/legacy";

  import SelectField from "./SelectField.svelte";
  import EaseSelectOptions from "./EaseSelectOptions.svelte";
  import CubicBezierEditor from "./CubicBezierEditor.svelte";
  import { getAliasByBezierEasing } from "./lib/eases.js";

  /**
   * @typedef {Object} Props
   * @property {any} id
   * @property {any} value
   * @property {string} [label]
   */

  /** @type {Props} */
  let { id, value = $bindable(), label = "Easing" } = $props();

  let alias = getAliasByBezierEasing(value);
  // alias will be empty for 'Custom' curve
  let showCurve = $state(!alias);
</script>

<SelectField {id} {label} bind:value>
  <EaseSelectOptions {value} />
</SelectField>
{#if showCurve}
  <div class="editor">
    <CubicBezierEditor bind:params={value} />
  </div>
{/if}
<a
  class="toggle"
  href="#toggle-curve"
  onclick={preventDefault(() => (showCurve = !showCurve))}
  >{#if showCurve}
    ↑ Hide
  {:else}↓ Show{/if}
  Curve</a
>
