<style lang="postcss">
  .chrome {
    @apply w-screen;
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-template-columns: repeat(2, 60vw) min-content;
    grid-template-areas:
      "header controls   palettes"
      "graphs controls palettes";
    scroll-snap-type: x proximity;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    @screen md {
      grid-template-columns: minmax(16rem, 1fr) 4fr minmax(16rem, 1fr);
      grid-template-areas:
        "header   palettes  graphs"
        "controls palettes  graphs";
    }
  }

  .controls {
    @apply p-4 pb-0 overflow-y-auto overflow-x-hidden;
    @apply border-4 border-l-0 border-gray-900;
    grid-area: controls;
    scroll-snap-align: start;

    @screen md {
      @apply border-t-0 border-l-4;
    }
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
  import VhProvider from "./VhProvider.svelte";
  import Scrim from "./Scrim.svelte";
  import { shareDialog } from "./store";
</script>

<VhProvider />
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

{#if $shareDialog.open}
  <Scrim />
  <ShareDialog />
{/if}
