<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="(settlement, index) in settlements"
      :key="`settlement-${index}`"
      :mapMatrix="mapMatrix"
      :coords="settlement"
      :offset="12"
    >
      <MapCssLayerSettlementNode
        :settlement="settlement"
        :resources="resources"
        :regions_resources="regions_resources"
      />
      <!-- <img
        class="settlement-icon"
        :src="`${baseUrl}ui/wh_settlement_schematic.png`"
        :data-map-tooltip="dataMapTooltip(settlement)"
      > -->
      <!-- <div class="info">
        <span class="scroll">
          <span>Settlement</span>
        </span>
        <img class="climate-icon" src="/images/climate_icons/temperate.png" />
      </div> -->
    </MapCssLayerNode>
  </MapCssLayer>
</template>

<script>
import MapCssLayerNode from "@/components/MapCssLayerNode";
import MapCssLayer from "@/components/MapCssLayer";
import MapCssLayerSettlementNode from "@/components/MapCssLayerSettlementNode";

export default {
  components: {
    MapCssLayerNode,
    MapCssLayer,
    MapCssLayerSettlementNode
  },
  props: {
    mapMatrix: SVGMatrix,
    settlements: Array,
    resources: Object,
    regions_resources: Object
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL
    }
  },
  methods: {
    dataMapTooltip(settlement) {
      return `settlement:${settlement.key}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.node {
  height: 24px;
  width: 24px;
  display: flex;
  flex-direction: row;

  .settlement-icon {
    position: absolute;
    z-index: 11;
    filter: brightness(90%);

    &:hover {
      filter: brightness(100%);
    }
  }

  /* TODO: cleanup */
  .info {
    position: absolute;
    top: -15px;
    left: -48px;
    display: flex;
    align-items: center;
    height: 51px;
    z-index: 10;

    .scroll {
      display: flex;
      align-items: center;
      padding-top: 6px;
      color: black;
      height: 51px;
      border: solid;
      border-width: 0 76px 0 44px;
      border-image: url('/images/city_info_scroll.png') 0 76 0 44 fill repeat;
      cursor: default;
    }
  }
}
</style>

