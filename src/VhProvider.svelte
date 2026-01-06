<script>
  import { run } from "svelte/legacy";

  // Based on https://www.bram.us/2020/05/06/100vh-in-safari-on-ios/
  import debounce from "debounce";

  let vh = $state();

  function setVhOnDocument(vh) {
    if (vh) {
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    } else {
      document.documentElement.style.removeProperty("--vh");
    }
  }

  const getVh = debounce(() => {
    vh = window.innerHeight * 0.01;
  }, 200);

  run(() => {
    setVhOnDocument(vh);
  });
</script>

<svelte:window onload={getVh} onresize={getVh} />
