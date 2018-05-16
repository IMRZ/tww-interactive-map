<template>
  <path class="MapChokepoint"
    :d="chokepoint.d"
    :style="style"
    :data-map-tooltip="dataMapTooltip"
  />
</template>

<script>
export default {
  name: "MapChokepoint",
  props: {
    chokepoint: Object,
    mode: String
  },
  computed: {
    style() {
      switch (this.mode) {
        case "coloured":
          return { fill: `#${this.chokepoint.fill}` };
        default:
          return { fill: "blue" };
      }
    },
    dataMapTooltip() {
      const { key } = this.chokepoint;
      return `chokepoint:${key}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.MapChokepoint {
  fill: transparent;
  fill-opacity: 0.7;
}
</style>
