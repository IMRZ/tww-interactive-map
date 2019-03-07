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
        :data-map-tooltip="dataMapTooltip(startPos)"
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
    flagPath(startPos) {
      const factionKey = startPos.factionKey;
      return `${this.baseUrl}${this.factions[factionKey].flagsPath}/mon_64.png`;
    },
    dataMapTooltip(startPos) {
      const { factionKey, lord } = startPos;
      if (lord) {
        return `startpos:${factionKey}:${lord}`;
      } else {
        return `startpos:${factionKey}`;
      }
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

