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
    Learn how <a href="https://www.hsluv.org/comparison/" target="_blank">
      HSLuv differs from HSL
    </a> .
  </p>
</ControlGroup>
