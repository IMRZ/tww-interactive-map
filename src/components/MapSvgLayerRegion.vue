<template>
  <MapSvgLayer id="regions">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region, mode)"
      @mouseenter.prevent="showTooltip(region)"
      @mouseleave.prevent="clearTooltip"
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
    provinces: Object,
    regions: Object,
  },
  methods: {
    style(region, mode) {
      const climate = this.climates[region.climate];
      const province = this.provinces[region.provinceKey];

      switch (mode) {
        case "regions":
          return { fill: `#${region.fill}` };
        case "climates":
          return { fill: climate ? `${climate.fill}` : "transparent" };
        case "provinces":
          return { fill: province ? `#${province.fill}` : "transparent" };
        default:
          return { fill: "transparent", stroke: "transparent" };
      }
    },
    showTooltip(region) {
      this.setTooltip({
        type: "region",
        key: region.key
      });
    },
    clearTooltip() {
      this.setTooltip(null);
    },
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
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
