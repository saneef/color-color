<style>
  .overlay {
    @apply absolute inset-0;
    @apply flex items-center justify-center;
    @apply bg-black bg-opacity-25;
    @apply z-10;
  }

  h2 {
    @apply p-4 text-lg font-bold mr-auto;
  }

  .dialog {
    @apply w-11/12 max-w-2xl;
    @apply border-4 border-gray-900 bg-gray-200;
    @apply shadow-lg;

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
    @apply flex flex-auto items-center p-4 pt-3 text-gray-900;
    flex-grow: 0;
  }

  button:hover,
  button:active,
  button:focus {
    @apply bg-gray-300;
  }
</style>

<script>
  import { shareState, shareDialog } from "./store.js";
  import Icon from "./Icon.svelte";
  import TextField from "./TextField.svelte";
  import DownloadAsSvg from "./DownloadAsSvg.svelte";

  function selectText(e) {
    e.currentTarget.select();
  }

  function closeModal(e) {
    e.preventDefault();
    $shareDialog = !$shareDialog;
  }
</script>

<div class="overlay">
  <div class="dialog">
    <div class="header">
      <h2>Share</h2>
      <button title="Close" on:click="{closeModal}">
        <Icon icon="cross" size="lg" />
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
