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

  export let id;
  export let value;
  export let label = "Easing";

  let showCurve = false;
</script>

<SelectField id="{id}" label="{label}" bind:value>
  <EaseSelectOptions />
</SelectField>
{#if showCurve}
  <div class="editor">
    <CubicBezierEditor params="{value}" />
  </div>
{/if}
<a
  class="toggle"
  href="#toggle-curve"
  on:click|preventDefault="{() => (showCurve = !showCurve)}">{#if showCurve}
    ↑ Hide
  {:else}↓ Show{/if} Curve</a>
