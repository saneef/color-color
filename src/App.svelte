<style>
  .chrome {
    @apply w-screen h-screen grid;
    grid-template-rows: max-content 1fr;
    grid-template-columns: minmax(16rem, 1fr) 4fr minmax(16rem, 1fr);
    grid-template-areas:
      "header   palettes  graphs"
      "controls palettes  graphs";
  }

  .controls {
    @apply p-4 pb-0 overflow-y-auto overflow-x-hidden border-4 border-t-0 border-gray-900;
    grid-area: controls;
  }
</style>

<script>
  import "./global.css";
  import ColorSpaceSelector from "./ColorSpaceSelector.svelte";
  import OverlayKnobs from "./OverlayKnobs.svelte";
  import PaletteKnobs from "./PaletteKnobs.svelte";
  import Palettes from "./Palettes.svelte";
  import Plots from "./Plots.svelte";
  import ReferenceColorFieldGroup from "./ReferenceColorFieldGroup.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import SiteFooter from "./SiteFooter.svelte";
  import SiteHeader from "./SiteHeader.svelte";
  import StepsKnob from "./StepsKnob.svelte";
  import { shareDialog } from "./store";
</script>

<main class="chrome">
  <SiteHeader gridArea="header" />
  <div class="controls">
    <StepsKnob />
    <PaletteKnobs />
    <ReferenceColorFieldGroup />
    <ColorSpaceSelector />
    <OverlayKnobs />
    <SiteFooter />
  </div>
  <Palettes gridArea="palettes" />
  <Plots gridArea="graphs" />
</main>

{#if $shareDialog}
  <ShareDialog />
{/if}
