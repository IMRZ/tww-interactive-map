<template>
  <div ref="container" class="map-container">
    <MapCssLayerSettlement
      v-if="nodeOverlay === 'settlements'"
      :style="overlayTransform"
      :mapMatrix="zoomMatrix"
      :regions="map.regions"
      :resources="common.resources"
    />
    <MapCssLayerStartposition
      v-else-if="nodeOverlay === 'start_positions'"
      :style="overlayTransform"
      :mapMatrix="zoomMatrix"
      :startPositions="map.startpositions"
      :factions="common.factions"
    />

    <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g class="svg-pan-zoom_viewport">
        <image
          class="map-outline"
          :href="map.settings.path"
          :width="map.settings.width"
          :height="map.settings.height"
        />
        <MapSvgLayerRegion
          v-if="mapOverlay === 'regions'"
          :regions="map.regions"
          :provinces="common.provinces"
          :climates="common.climates"
          :mode="mapOverlayMode"
        />
        <MapSvgLayerChokepoint
          v-if="mapOverlay === 'choke_points'"
          :chokepoints="map.chokepoints"
          :mode="mapOverlayMode"
          :transform="map.settings.chokepoints_transform"
        />
        <MapSvgLayerPainter
          v-if="mapOverlay === 'painter'"
          :regions="map.regions"
          :factions="common.factions"
          :starting_regions="map.startingRegions"
        />
      </g>
    </svg>

  </div>
</template>

<script>
import svgPanZoom from "svg-pan-zoom";
import MapSettings from "@/mixins/MapSettings";
import MapCssLayerSettlement from "@/components/MapCssLayerSettlement";
import MapCssLayerStartposition from "@/components/MapCssLayerStartposition";
import MapSvgLayerChokepoint from "@/components/MapSvgLayerChokepoint";
import MapSvgLayerRegion from "@/components/MapSvgLayerRegion";
import MapSvgLayerPainter from "@/components/MapSvgLayerPainter";

export default {
  mixins: [MapSettings],
  components: {
    MapCssLayerSettlement,
    MapCssLayerStartposition,
    MapSvgLayerChokepoint,
    MapSvgLayerRegion,
    MapSvgLayerPainter
  },
  props: {
    common: Object,
    map: Object
  },
  data() {
    return {
      zoomMatrix: null,
      overlayTransform: null,
      svgPanZoom: null,
      zoom: null
    };
  },
  mounted() {
    this.svgPanZoom = svgPanZoom(this.$refs.svg, {
      eventsListenerElement: this.$refs.container,
      maxZoom: 8,
      minZoom: 0.8,
      fit: true,
      onUpdatedCTM: (m) => {
        if (!this.zoomMatrix || this.zoomMatrix.a != m.a) {
          this.zoomMatrix = m;
        }

        const e = Math.round(m.e);
        const f = Math.round(m.f);

        this.overlayTransform = {
          transform: `translate3d(${e}px, ${f}px, 0px)`
        };
      },
      beforePan(oldPan, newPan) {
        const gutterWidth = 400;
        const gutterHeight = 400;

        const sizes = this.getSizes();
        const leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
        const rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
        const topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
        const bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

        return {
          x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
          y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
        };
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  overflow-y: hidden;

  .svg-container {
    display: block;
    width: 100%;
    height: 100%;
    min-width: inherit;
    max-width: inherit;
    min-height: inherit;
    max-height: inherit;
    padding: none;
    margin: none;
  }

  .map-outline {
    outline: 4px solid #b29871;
  }
}
</style>
