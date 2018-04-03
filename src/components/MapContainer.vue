<template>
  <div id="MapContainer">
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
      @mouseup="stopPanning"
      @mouseleave="stopPanning"
      @mousedown="startPanning"
      @mousemove="doPan"
      @wheel="doZoom">

      <g ref="map"
        :transform="mapTransform"
        v-show="isMapVisible">
        <image x="0" y="0"
          :href="map.path"
          :width="map.width"
          :height="map.height"
          @load="onLoad"
        />
        <g id="regions">
          <MapRegion
            v-for="region in map.regions"
            :key="region.key"
            :region="region"
          />
        </g>
      </g>
      <g id="nodes"
        v-if="mapMatrix"
        v-show="isMapVisible"
        :transform="nodesTransform">
        <MapNode
          v-for="settlement in map.settlements"
          :key="settlement.key"
          :settlement="settlement"
          :mapMatrix="mapMatrix"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import SvgUtilMixin from '@/mixins/SvgUtilMixin';
import MapGettersMixin from '@/mixins/MapGettersMixin';
import MapRegion from '@/components/MapRegion';
import MapNode from '@/components/MapNode';

export default {
  name: 'MapContainer',
  mixins: [SvgUtilMixin, MapGettersMixin],
  components: {
    MapRegion,
    MapNode
  },
  mounted() {
    this.mapMatrix = this.$refs.map.getCTM();
    this.stateTf = this.$refs.map.getCTM().inverse();
    // https://codepen.io/techslides/pen/zowLd
  },
  watch: {
    map(newValue, oldValue) {
      if (newValue !== oldValue) this.isMapVisible = false;
    }
  },
  data() {
    return {
      mapTransform: 'matrix(1,0,0,1,0,0)',
      mapMatrix: undefined,
      isPanning: false,
      isMapVisible: false,

      nodesTransform: undefined,

      stateTf: undefined,
      stateOrigin: undefined
    };
  },
  methods: {
    stopPanning(e) {
      e.preventDefault();
      this.isPanning = false;
    },
    startPanning(e) {
      e.preventDefault();
      this.isPanning = true;
      this.stateTf = this.$refs.map.getCTM().inverse();
      this.stateOrigin = this.getEventPoint(e).matrixTransform(this.stateTf);
    },
    doPan(e) {
      e.preventDefault();
      if (this.isPanning) {
        const p = this.getEventPoint(e).matrixTransform(this.stateTf);
        this.setCTM(this.stateTf.inverse().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y));
      }
    },
    doZoom(e) {
      e.preventDefault();
      const z = this.getWheelDelta(e);
      const mapElement = this.$refs.map;
      const { x , y } = this.getEventPoint(e).matrixTransform(mapElement.getCTM().inverse());

      let testMatrix = mapElement.getCTM();
      const scale = (testMatrix.a + z).toPrecision(2);

      if (scale < 0.2 || scale > 2) return;

      testMatrix = testMatrix.translate(x, y);
      testMatrix.a = scale;
      testMatrix.d = scale;
      testMatrix = testMatrix.translate(-x, -y);

      this.setCTM(testMatrix);
      this.stateTf = testMatrix.inverse();
    },
    getEventPoint(e) {
      const p = this.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
    },

    setCTM(m) {
      this.mapMatrix = m;
      this.nodesTransform = `matrix(1,0,0,1,${m.e},${m.f})`;
      this.mapTransform = `matrix(${m.a},0,0,${m.d},${m.e},${m.f})`;
    },

    getWheelDelta(e) {
      if (e.wheelDelta) {
        return (e.wheelDelta / 360 > 0) ? 0.2 : -0.2;
      } else {
        return (e.deltaY / -9 > 0) ? 0.2 : -0.2;
      }
    },
    onLoad() {
      this.isMapVisible = true;
    }
  }
};
</script>

<style lang="scss">
#MapContainer {
  width: 100%;
  height: 100%;

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
}
</style>
