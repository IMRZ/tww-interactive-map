<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerStartpositionNode
      v-for="(startpos, index) in startPositions"
      :key="index"
      :mapMatrix="mapMatrix"
      :factions="factions"
      :startpos="startpos"
    />
  </MapCssLayer>
</template>

<script>
import MapCssLayer from "@/components/MapCssLayer";
import MapCssLayerStartpositionNode from "@/components/MapCssLayerStartpositionNode";

export default {
  components: {
    MapCssLayer,
    MapCssLayerStartpositionNode
  },
  props: {
    mapMatrix: SVGMatrix,
    startPositions: Array,
    factions: Object
  }
};
</script>
