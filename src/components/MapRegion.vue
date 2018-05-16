<template>
  <path class="MapRegion"
    :d="region.d"
    :style="style"
    :data-map-tooltip="dataMapTooltip"
  />
</template>

<script>
export default {
  name: "MapRegion",
  props: {
    region: Object,
    mode: String,
    climates: Object,
    provinces: Object
  },
  computed: {
    climate() {
      return this.climates[this.region.climate];
    },
    province() {
      return this.provinces[this.region.provinceKey];
    },
    style() {
      switch (this.mode) {
        case "regions":
          return { fill: `#${this.region.fill}` };
        case "climates":
          return { fill: this.climate ? `${this.climate.fill}` : "transparent" };
        case "provinces":
          return { fill: this.province ? `#${this.province.fill}` : "transparent" }
        default:
          return { fill: "transparent", stroke: "transparent" };
      }
    },
    dataMapTooltip() {
      const { key } = this.region;
      return `region:${key}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.MapRegion {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.2;
  }
}
</style>
