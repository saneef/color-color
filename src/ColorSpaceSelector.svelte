<style lang="postcss">
  .note {
    @apply mt-1 text-sm text-gray-700 leading-tight;
  }
</style>

<script>
  import { settings } from "./store";
  import ControlGroup from "./ControlGroup.svelte";
  import RadioGroup from "./RadioGroup.svelte";

  const radios = [
    { label: "HSLuv", value: "hsluv" },
    { label: "Okhsl", value: "okhsl" },
    { label: "HSL", value: "hsl" },
  ];
</script>

<ControlGroup title="Color space" titleId="color-space">
  <RadioGroup
    radios="{radios}"
    bind:group="{$settings.colorSpace}"
    labelledby="color-space"
  />
  <p class="note">
    Learn about difference between
    <a
      href="https://bottosson.github.io/posts/colorpicker/#color-spaces-for-color-picking"
      target="_blank"
    >
      HSL, HSLuv, and Okhsl.
    </a>
  </p>
</ControlGroup>
