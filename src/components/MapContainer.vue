<template>
  <svg id="MapContainer" xmlns="http://www.w3.org/2000/svg" version="1.1"
    @mouseup="stopPanning"
    @mouseleave="stopPanning"
    @mousedown="startPanning"
    @mousemove="doPan"
    @wheel="doZoom">

    <g ref="map" :transform="mapTransform" v-show="isMapVisible">
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
          :mapId="mapId"
          :overlay="overlay"
        />
      </g>
    </g>

    <g id="nodes"
      v-if="mapMatrix"
      v-show="isMapVisible"
      :transform="nodesTransform">
      <MapNode
        v-for="settlement in settlements"
        :key="settlement.key"
        :settlement="settlement"
        :svgElement="$el"
        :mapMatrix="mapMatrix"
      />
    </g>

  </svg>
</template>

<script>
import StoreMixin from '@/mixins/StoreMixin';
import MapRegion from '@/components/MapRegion';
import MapNode from '@/components/MapNode';

export default {
  name: 'MapContainer',
  props: ['mapId', 'overlay'],
  mixins: [StoreMixin],
  components: {
    MapRegion,
    MapNode
  },
  mounted() {
    this.mapMatrix = this.$refs.map.getCTM();
    this.stateTf = this.$refs.map.getCTM().inverse();
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
      const z = Math.pow(1.25, this.getWheelDelta(e)); // z = (1.25 || 0.8)
      const mapElement = this.$refs.map;
      const { x , y } = this.getEventPoint(e).matrixTransform(mapElement.getCTM().inverse());
      const k = this.$el.createSVGMatrix().translate(x, y).scale(z).translate(-x, -y);
      this.setCTM(mapElement.getCTM().multiply(k));
      this.stateTf = this.stateTf.multiply(k.inverse());
    },
    getEventPoint(e) {
      const p = this.$el.createSVGPoint();
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
        return (e.wheelDelta / 360 > 0) ? 1 : -1;
      } else {
        return (e.deltaY / -9 > 0) ? 1 : -1;
      }
    },
    onLoad() {
      this.isMapVisible = true;
    }
  },
  computed: {
    map() {
      this.isMapVisible = false; // TODO: firefox not firing here...
      return this.maps[this.mapId];
    },
    settlements() {
      return this.map.settlements;
    }
  }
};
</script>

<style lang="scss">
svg#MapContainer {
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
