<template>
  <MapSvgLayer id="chokepoints">
    <path
      class="chokepoint"
      v-for="chokepoint in chokepoints"
      :key="chokepoint.key"
      :d="chokepoint.d"
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
  fill: blue;
  fill-opacity: 0.7;
}
</style>
