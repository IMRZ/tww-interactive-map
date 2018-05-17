<template>
  <g id="MapOverlayChokepoint" :transform="transform">
    <path class="chokepoint"
      v-for="chokepoint in chokepoints" :key="chokepoint.key"
      :d="chokepoint.d"
      :style="getStyle(chokepoint, mode)"
      :data-map-tooltip="`chokepoint:${chokepoint.key}`"
    />
  </g>
</template>

<script>
export default {
  name: "MapOverlayChokepoint",
  props: {
    chokepoints: Array,
    mode: String,
    transform: String
  },
  methods: {
    getStyle(chokepoint, mode) {
      switch (mode) {
        case "coloured":
          return { fill: `#${chokepoint.fill}` };
        default:
          return { fill: "blue" };
      }
    }
  }
};
</script>

<style lang="scss">
#MapOverlayChokepoint {
  .chokepoint {
    fill: transparent;
    fill-opacity: 0.7;
  }
}
</style>
