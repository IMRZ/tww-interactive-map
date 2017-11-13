<template>
  <div id="map-container">
    <svg ref="map" xmlns="http://www.w3.org/2000/svg" version="1.1" zoomAndPan
      v-on:mouseup="stopPanning"
      v-on:mouseleave="stopPanning"
      v-on:mousedown="startPanning"
      v-on:mousemove="doPan"
      v-on:wheel="doZoom">
      <g ref="content" :transform="transform">
        <image xlink:href="/static/images/wh2_main_great_vortex_map.png" width="3378" height="3869" x="0" y="0" />
        <m-region-path v-for="region in regions" :key="region.key" :region="region" />
        <m-map-node v-for="(s, index) in settlements" :key="index" :tsfm="tsfm" :container-refs="$refs" :x="s.x" :y="s.y" />
      </g>
    </svg>
  </div>
</template>

<script>
import MRegionPath from "@/components/MRegionPath";
import MMapNode from "@/components/MMapNode";

import settlements from "../store/data/settlements.json";

export default {
  name: "map-container",
  components: {
    "m-region-path": MRegionPath,
    "m-map-node": MMapNode
  },
  mounted() {
    this.setCTM(this.$refs.content.getCTM());
  },
  data() {
    return {
      zoomLevel: 1,
      zoomScale: 0.4,
      isPanning: false,
      stateTf: undefined,
      stateOrigin: undefined,
      transform: "matrix(0.25, 0, 0, 0.25, 480, 0)",
      tsfm: undefined,
      settlements: settlements
    };
  },
  methods: {
    getEventPoint(e) {
      const p = this.$refs.map.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
    },
    getWheelDelta(e) {
      if (e.wheelDelta) {
        return e.wheelDelta / 360;
      } else {
        return e.deltaY / -9;
      }
    },
    setCTM(m) {
      this.tsfm = m;
      this.transform = `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`;
    },
    stopPanning(e) {
      e.preventDefault();
      this.isPanning = false;
    },
    startPanning(e) {
      e.preventDefault();
      this.isPanning = true;
      this.stateTf = this.$refs.content.getCTM().inverse();
      this.stateOrigin = this.getEventPoint(e).matrixTransform(this.stateTf);
    },
    doPan(e) {
      e.preventDefault();
      if (this.isPanning) {
        const p = this.getEventPoint(e).matrixTransform(this.stateTf);
        this.setCTM(this.stateTf.inverse().translate(p.x - this.stateOrigin.x, p.y - this. stateOrigin.y));
      }
    },
    zoomAllowed(z) {
      if ((z > 1 && this.zoomLevel < 15)) {
        this.zoomLevel +=1;
        return true;
      } else if ((z < 1 && this.zoomLevel > 0)) {
        this.zoomLevel -=1;
        return true;
      } else {
        return false;
      }
    },
    doZoom(e) {
      e.preventDefault();
      const z = Math.pow(1 + 0.5, this.getWheelDelta(e));

      if (!this.zoomAllowed(z)) return;

      const g = this.$refs.content;
      const root = this.$refs.map;
      const p = this.getEventPoint(e).matrixTransform(g.getCTM().inverse());
      const k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
      this.setCTM(g.getCTM().multiply(k));
      if (this.stateTf === undefined) this.stateTf = g.getCTM().inverse();
      this.stateTf = this.stateTf.multiply(k.inverse());
    }
  },
  computed: {
    regions() {
      return this.$store.getters.regions;
    }
  }
};
</script>

<style lang="scss">
#map-container {
  width: 100%;
  height: 100%;
  padding: none;
  margin: none;

  svg {
    display: block;
    width: inherit;
    min-width: inherit;
    max-width: inherit;
    height: inherit;
    min-height: inherit;
    max-height: inherit;
  }
}
</style>
