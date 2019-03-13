<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="(startPos, index) in startPositions"
      :key="`startpos-${index}`"
      :mapMatrix="mapMatrix"
      :coords="startPos.flag"
      :offset="32"
    >
      <img
        :src="flagPath(startPos)"
        @mouseenter.prevent="showTooltip(startPos)"
        @mouseleave.prevent="clearTooltip"
      >
    </MapCssLayerNode>
  </MapCssLayer>
</template>

<script>
import MapCssLayerNode from "@/components/MapCssLayerNode";
import MapCssLayer from "@/components/MapCssLayer";

export default {
  components: {
    MapCssLayerNode,
    MapCssLayer
  },
  props: {
    mapMatrix: SVGMatrix,
    startPositions: Array,
    factions: Object
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    }
  },
  methods: {
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
    },
    flagPath(startPos) {
      const factionKey = startPos.factionKey;
      return `${this.baseUrl}${this.factions[factionKey].flagsPath}/mon_64.png`;
    },
    showTooltip(startPos) {
      const { factionKey, lord } = startPos;
      this.setTooltip({
        type: "startpos",
        key: factionKey,
        lord: lord
      });
    },
    clearTooltip() {
      this.setTooltip(null);
    },
    setTooltip(tooltip) {
      this.$store.commit("SET_TOOLTIP", tooltip);
    }
  }
};
</script>

<style lang="scss" scoped>
.node {
  height: 64px;
  width: 64px;

  img {
    cursor: pointer;
    filter: drop-shadow(0 0 15px #222222);
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }
}
</style>

