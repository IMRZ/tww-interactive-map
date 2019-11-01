<template>
  <MapSvgLayer id="regions">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region, mode)"
      v-tooltip="tooltipRegion(region)"
    />
  </MapSvgLayer>
</template>

<script>
import MapSvgLayer from "@/components/MapSvgLayer";

export default {
  components: { MapSvgLayer },
  props: {
    mode: String,
    climates: Object,
    regions: Object,
  },
  methods: {
    style(region, mode) {
      switch (mode) {
        case "regions":
          return { fill: `${region.fill}` };
        case "climates":
          const climate = this.climates[region.climate];
          return { fill: climate ? `${climate.fill}` : "transparent" };
        case "provinces":
          return { fill: `${region.province.fill}` };
        default:
          return { fill: "transparent", stroke: "transparent" };
      }
    },
    tooltipRegion(region) {
      return {
        type: "region",
        key: region.key
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.2;
  }
}
</style>
