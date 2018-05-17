<template>
  <div id="MapContainer"
    @mouseup.prevent="stopPan"
    @mouseleave.prevent="stopPan"
    @mousedown.prevent="startPan"
    @mousemove.prevent="doPan"
    @wheel.prevent="doZoom"
  >
    <MapNodeOverlaySettlement
      v-if="nodeOverlay === 'settlements'"
      :style="overlayTransform"
      :mapMatrix="mapMatrix"
      :settlements="map.settlements"
    />
    <MapNodeOverlayStartposition
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
        <g v-if="mapOverlay === `regions`">
          <MapRegion
            v-for="region in map.regions" :key="region.key"
            :region="region"
            :provinces="map.provinces"
            :climates="common.climates"
            :mode="mapOverlayMode"
          />
        </g>
        <MapOverlayChokepoint v-else-if="mapOverlay === `choke_points`"
          :chokepoints="map.chokepoints"
          :mode="mapOverlayMode"
          :transform="map.settings.chokepoints_transform"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import SvgUtil from "@/mixins/SvgUtil";
import MapSettings from "@/mixins/MapSettings";
import MapNodeOverlaySettlement from "@/components/MapNodeOverlaySettlement";
import MapNodeOverlayStartposition from "@/components/MapNodeOverlayStartposition";
import MapOverlayChokepoint from "@/components/MapOverlayChokepoint";
import MapRegion from "@/components/MapRegion";

export default {
  name: "MapContainer",
  mixins: [SvgUtil, MapSettings],
  components: {
    MapNodeOverlaySettlement,
    MapNodeOverlayStartposition,
    MapOverlayChokepoint,
    MapRegion
  },
  props: {
    common: Object,
    map: Object
  },
  created() {
    const e = -this.map.settings.width / 4;
    const f = -this.map.settings.height / 4;
    this.overlayTransform = { transform: `matrix(1,0,0,1,${e},${f})` };
    this.mapTransform = `matrix(1,0,0,1,${e},${f})`;
  },
  mounted() {
    this.mapMatrix = this.$refs.map.getCTM();
    this.mpt = this.$refs.map.getCTM().inverse();
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
    onLoad() {
       console.log("loaded image");
    },
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
