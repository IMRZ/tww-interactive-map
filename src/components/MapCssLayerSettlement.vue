<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="(settlement, index) in settlements"
      :key="index"
      :mapMatrix="mapMatrix"
      :coords="settlement"
      :offset="12"
    >
      <MapCssLayerSettlementNode
        :settlement="settlement"
        :resources="resources"
        :regions_resources="regions_resources"
      />
    </MapCssLayerNode>
  </MapCssLayer>
</template>

<script>
import MapCssLayer from "@/components/MapCssLayer";
import MapCssLayerNode from "@/components/MapCssLayerNode";
import MapCssLayerSettlementNode from "@/components/MapCssLayerSettlementNode";

export default {
  components: {
    MapCssLayer,
    MapCssLayerNode,
    MapCssLayerSettlementNode
  },
  props: {
    mapMatrix: SVGMatrix,
    settlements: Array,
    resources: Object,
    regions_resources: Object
  }
};
</script>

<style lang="scss" scoped>
.node {
  height: 24px;
  width: 24px;
}
</style>

