<style>
  .overlay {
    @apply absolute inset-0;
    @apply flex items-center justify-center;
    @apply z-10;
  }

  h2 {
    @apply p-4 text-lg font-bold mr-auto;
  }

  .dialog {
    @apply w-11/12 max-w-2xl;
    @apply border-4 border-gray-900 bg-gray-200;
    @apply shadow-lg;

    transform-origin: top left;

    @screen md {
      @apply w-2/3;
    }
  }

  .header {
    @apply flex border-b-4 border-gray-900;
  }

  .content {
    @apply p-4;
  }

  button {
    @apply flex flex-auto items-center py-3 px-4 text-gray-900;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  import { cubicOut } from "svelte/easing";
  import { shareState, shareDialog } from "./store.js";
  import Icon from "./Icon.svelte";
  import TextField from "./TextField.svelte";
  import DownloadAsSvg from "./DownloadAsSvg.svelte";
  import { lerp, clamp } from "./lib/math";

  function selectText(e) {
    e.currentTarget.select();
  }

  function closeModal(e) {
    e.preventDefault();
    $shareDialog.open = false;
  }

  function fly(node, params) {
    const first = $shareDialog.rect || { x: 0, y: 0, width: 0, height: 0 };
    const last = node.getBoundingClientRect();

    const dx = last.x - first.x;
    const dy = last.y - first.y;
    const dw = last.width / first.width;
    const dh = last.height / first.height;

    return {
      ...params,
      css: (t, u) => `
        transform: translate(${u * -dx}px, ${u * -dy}px) scale(${lerp(
        1 / dw,
        1,
        t
      )}, ${lerp(1 / dh, 1, t)});
        opacity: ${clamp(0, t * 2, 1)}
      `,
    };
  }
</script>

<div class="overlay">
  <div transition:fly="{{ duration: 400, easing: cubicOut }}" class="dialog">
    <div class="header">
      <h2>Share</h2>
      <button title="Close" on:click="{closeModal}">
        <Icon icon="cross" />
      </button>
    </div>
    <div class="content">
      <TextField
        id="share-url"
        label="URL"
        readonly="readonly"
        value="{$shareState.url}"
        on:click="{selectText}" />
      <TextField
        multiline
        id="share-json"
        label="JSON"
        readonly="readonly"
        value="{$shareState.json}"
        on:click="{selectText}" />
      <DownloadAsSvg data="{$shareState.svg}" />
    </div>
  </div>
</div>
