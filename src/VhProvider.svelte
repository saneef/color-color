<script>
  // Based on https://www.bram.us/2020/05/06/100vh-in-safari-on-ios/
  import debounceFn from "debounce-fn";

  let vh;

  function setVhOnDocument(vh) {
    if (vh) {
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    } else {
      document.documentElement.style.removeProperty("--vh");
    }
  }

  const getVh = debounceFn(
    () => {
      vh = window.innerHeight * 0.01;
    },
    { wait: 200 }
  );

  $: setVhOnDocument(vh);
</script>

<svelte:window on:load="{getVh}" on:resize="{getVh}" />
