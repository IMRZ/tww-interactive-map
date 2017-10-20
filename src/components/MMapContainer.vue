<template>
  <div id="m-map-container">
    <svg id="map" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 3378 3869">
      <image xlink:href="/static/images/wh2_main_great_vortex_map.png" width="3378" height="3869" x="0" y="0" />
      <g id="region-paths">
        <m-region-path v-for="region in regions" :key="region.key" :region="region"></m-region-path>
      </g>
    </svg>
  </div>
</template>

<script>
import SvgPanZoom from "svg-pan-zoom";
import MRegionPath from "@/components/MRegionPath";

export default {
  name: "m-map-container",
  components: {
    "m-region-path": MRegionPath
  },
  mounted() {
    SvgPanZoom("#map", {
      zoomEnabled: true,
      fit: true,
      center: true,
      controlIconsEnabled: false,
      zoomScaleSensitivity: 0.3,
      maxZoom: 8,
      minZoom: 0.95
    });
  },
  computed: {
    regions() {
      return this.$store.getters.regions;
    }
  }
};
</script>

<style lang="scss">
#m-map-container {
  width: 100%;
  height: 100%;
  padding: none;
  margin: none;
  overflow-y: hidden;

  #map {
    width: inherit;
    min-width: inherit;
    max-width: inherit;
    height: inherit;
    min-height: inherit;
    max-height: inherit;
  }
}
</style>
