<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="(startpos, index) in startPositions"
      :key="index"
      :mapMatrix="mapMatrix"
      :coords="startpos.flag"
      :offset="32"
    >
      <MapCssLayerStartpositionNode
        :factions="factions"
        :startpos="startpos"
      />
    </MapCssLayerNode>
  </MapCssLayer>
</template>

<script>
import MapCssLayer from "@/components/MapCssLayer";
import MapCssLayerNode from "@/components/MapCssLayerNode";
import MapCssLayerStartpositionNode from "@/components/MapCssLayerStartpositionNode";

export default {
  components: {
    MapCssLayer,
    MapCssLayerNode,
    MapCssLayerStartpositionNode
  },
  props: {
    mapMatrix: SVGMatrix,
    startPositions: Array,
    factions: Object
  }
};
</script>

<style lang="scss" scoped>
.node {
  height: 64px;
  width: 64px;
}
</style>

