<template>
  <MapSvgLayer id="chokepoints">
    <path
      class="chokepoint"
      v-for="chokepoint in chokepoints"
      :key="chokepoint.key"
      :d="chokepoint.d"
      :style="style(chokepoint, mode)"
      @mouseenter.prevent="showTooltip(chokepoint)"
      @mouseleave.prevent="clearTooltip"
    />
  </MapSvgLayer>
</template>

<script>
import MapSvgLayer from "@/components/MapSvgLayer";

export default {
  components: {
    MapSvgLayer
  },
  props: {
    mode: String,
    chokepoints: Array
  },
  methods: {
    style(chokepoint, mode) {
      switch (mode) {
        case "coloured":
          return { fill: `#${chokepoint.fill}` };
        default:
          return { fill: "blue" };
      }
    },
    showTooltip(chokepoint) {
      this.setTooltip({
        type: "chokepoint",
        key: chokepoint.key
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
.chokepoint {
  fill: transparent;
  fill-opacity: 0.7;
}
</style>
