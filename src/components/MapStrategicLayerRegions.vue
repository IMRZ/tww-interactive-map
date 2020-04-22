<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="regionStyle && regionStyle(region)"
      :class="{ transparent: !regionStyle }"
      v-on="createTooltipRegion(region)"
    />
  </svg>
</template>

<script>
import { useTooltip } from '@/use/tooltip';

export default {
  props: {
    viewBox: String,
    regions: Array,
    regionStyle: Function
  },
  setup() {
    const { createTooltip } = useTooltip();
    const createTooltipRegion = (region) => createTooltip('region', region);

    return {
      createTooltipRegion
    };
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.4;
  stroke: black;
  stroke-width: 1;

  &:hover {
    fill-opacity: 0.6;
  }

  &.transparent {
    stroke: none;

    &:hover {
      stroke: black;
    }
  }
}
</style>
