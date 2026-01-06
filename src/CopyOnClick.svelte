<style lang="postcss">
  .copy-on-click {
    all: unset;
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;

    @apply py-2 px-3;
  }

  .copy-on-click:hover,
  .copy-on-click:focus,
  .copy-on-click:active {
    @apply bg-gray-900 bg-opacity-60 text-white;
  }

  .success,
  .success:hover,
  .success:focus,
  .success:active {
    @apply bg-opacity-100;
  }

  .success .content {
    @apply opacity-0;
  }

  .success-text {
    display: none;
  }

  .success .success-text {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import { copyToClipboard } from "./lib/clipboard";
  let { text, children } = $props();

  let lock = $state(false);

  const handleClick = () => {
    if (!lock) {
      lock = true;
      unlockAfterDelay();

      copyToClipboard(text);
    }
  };

  const unlockAfterDelay = (ms = 2500) => {
    setTimeout(() => {
      lock = false;
    }, ms);
  };
</script>

<button
  class="copy-on-click"
  class:success={lock}
  onclick={handleClick}
  title="Copy {text}"
>
  <div class="content">
    {@render children?.()}
  </div>
  <span class="success-text">Copied!</span>
</button>
