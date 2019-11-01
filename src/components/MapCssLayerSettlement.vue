<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="region in regions"
      :key="region.key"
      :mapMatrix="mapMatrix"
      :coords="region.settlement"
      :offset="12"
    >
      <MapCssLayerSettlementNode
        :region="region"
        :resources="resources"
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
    regions: Object,
    resources: Object,
  }
};
</script>

<style lang="scss" scoped>
.node {
  height: 24px;
  width: 24px;
}
</style>

