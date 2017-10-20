<template>
  <path class="m-region-path" :d="region.d" :style="{ fill }" v-on:mousemove="onMouseMove" v-on:mouseleave="onMouseLeave" />
</template>

<script>
export default {
  name: "m-region-path",
  props: ["region"],
  mounted() {
    this.determineColor(this.$route.path);
  },
  watch: {
    $route(to, from) {
      this.determineColor(to.path);
    }
  },
  data() {
    return {
      fill: "transparent"
    };
  },
  computed: {
    provinceFill() {
      const provinceKey = this.region.province.key;
      return `#${this.$store.getters.provinces[provinceKey].fill}`;
    },
    climateFill() {
      const climate = this.region.climate;
      return `${this.$store.getters.climates[climate].fill}`;
    }
  },
  methods: {
    determineColor(overlay) {
      switch (overlay) {
        case "/regions":
          this.fill = this.region.rgb;
          break;
        case "/provinces":
          this.fill = this.provinceFill;
          break;
        case "/climates":
          this.fill = this.climateFill;
          break;
        default:
          this.fill = "transparent";
          break;
      }
    },
    onMouseMove(e) {
      const climateName = this.$store.getters.climates[this.region.climate].name;
      this.$store.commit("setTooltip", {
        x: e.x,
        y: e.y,
        visibility: "visible",
        type: "region",
        data: {
          provinceName: this.region.province.name,
          regionName: this.region.name,
          regionIsCapital: this.region.isCapital,
          climate: this.region.climate
        }
      });
    },
    onMouseLeave() {
      this.$store.commit("setTooltip", {
        x: 0,
        y: 0,
        visibility: "hidden",
        type: "",
        data: {
          text: ""
        }
      });
    }
  }
};
</script>

<style lang="scss">
path.m-region-path {
  fill: transparent;
  fill-opacity: 0.4;

  &:hover {
    fill-opacity: 0.6;
  }
}
</style>

