<template>
  <div id="MapContainer"
    @mouseup.prevent="stopPan"
    @mouseleave.prevent="stopPan"
    @mousedown.prevent="startPan"
    @mousemove.prevent="doPan"
    @wheel.prevent="doZoom"
  >
    <MapCssLayerSettlement
      v-if="nodeOverlay === 'settlements'"
      :style="overlayTransform"
      :mapMatrix="mapMatrix"
      :settlements="map.settlements"
      :resources="common.resources"
      :regions_resources="map.resources"
    />
    <MapCssLayerStartposition
      v-else-if="nodeOverlay === 'start_positions'"
      :style="overlayTransform"
      :mapMatrix="mapMatrix"
      :startPositions="map.startpositions"
      :factions="common.factions"
    />

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g ref="map" :transform="mapTransform">
        <image
          :href="map.settings.path"
          :width="map.settings.width"
          :height="map.settings.height"
          :style="{ opacity: settings.mapOpacity }"
        />
        <MapSvgLayerRegion
          v-if="mapOverlay === 'regions'"
          :regions="map.regions"
          :provinces="map.provinces"
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
          :starting_regions="map.starting_regions"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import SvgUtil from "@/mixins/SvgUtil";
import WindowUtil from "@/mixins/WindowUtil";
import MapSettings from "@/mixins/MapSettings";
import MapCssLayerSettlement from "@/components/MapCssLayerSettlement";
import MapCssLayerStartposition from "@/components/MapCssLayerStartposition";

import MapSvgLayerChokepoint from "@/components/MapSvgLayerChokepoint";
import MapSvgLayerRegion from "@/components/MapSvgLayerRegion";
import MapSvgLayerPainter from "@/components/MapSvgLayerPainter";

export default {
  mixins: [SvgUtil, WindowUtil, MapSettings],
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
  created() {
    const windowCenter = this.getWindowCenter();
    const e = this.getWindowCenter().x - this.map.settings.width / 2 * 0.25;
    const f = this.getWindowCenter().y - this.map.settings.height / 2 * 0.25;
    this.overlayTransform = { transform: `matrix(0.25,0,0,0.25,${e},${f})` };
    this.mapTransform = `matrix(0.25,0,0,0.25,${e},${f})`;
  },
  mounted() {
    const m = this.$refs.map.getCTM();
    this.mpt = m.inverse();
    this.setCTM(m);
  },
  data() {
    return {
      isPanning: false,
      mapMatrix: undefined,
      overlayTransform: undefined,
      mapTransform: undefined,
      mpt: undefined, // mapPanTransform
      mpo: undefined // mapPanOrigin
    };
  },
  methods: {
    stopPan(e) {
      this.isPanning = false;
    },
    startPan(e) {
      this.isPanning = true;
      this.mpt = this.$refs.map.getCTM().inverse();
      this.mpo = this.getEventPoint(e).matrixTransform(this.mpt);
    },
    doPan(e) {
      if (this.isPanning) {
        const p = this.getEventPoint(e).matrixTransform(this.mpt);
        const m = this.mpt.inverse().translate(p.x - this.mpo.x, p.y - this.mpo.y);
        this.setCTM(m);
      }
    },
    doZoom(e) {
      const z = this.getWheelDelta(e);
      const mapElement = this.$refs.map;
      const { x , y } = this.getEventPoint(e).matrixTransform(mapElement.getCTM().inverse());

      let matrix = mapElement.getCTM();
      const scale = (matrix.a + z).toPrecision(3);

      if (scale < 0.2 || scale > 2) return;

      matrix = matrix.translate(x, y);
      matrix.a = scale;
      matrix.d = scale;
      matrix = matrix.translate(-x, -y);

      this.setCTM(matrix);
      this.mpt = matrix.inverse();
    },
    getWheelDelta(e) {
      if (e.wheelDelta) {
        return (e.wheelDelta / 360 > 0) ? 0.05 : -0.05;
      } else {
        return (e.deltaY / -9 > 0) ? 0.05 : -0.05;
      }
    },
    getEventPoint(e) {
      const p = this.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
    },
    setCTM(m) {
      this.mapMatrix = m;
      this.mapTransform = `matrix(${m.a},0,0,${m.d},${m.e},${m.f})`;
      this.overlayTransform = {
        transform: `matrix(1,0,0,1,${m.e},${m.f})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#MapContainer {
  height: 100%;
}

svg {
  display: block;
  width: 100%;
  min-width: inherit;
  max-width: inherit;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
  padding: none;
  margin: none;
}
</style>
