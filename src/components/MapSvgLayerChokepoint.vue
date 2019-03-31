<template>
  <MapSvgLayer id="chokepoints">
    <path
      class="chokepoint"
      v-for="chokepoint in chokepoints"
      :key="chokepoint.key"
      :d="chokepoint.d"
      :style="style(chokepoint, mode)"
      v-tooltip="tooltipChokepoint(chokepoint)"
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
    tooltipChokepoint(chokepoint) {
      return {
        type: "chokepoint",
        key: chokepoint.key
      };
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
