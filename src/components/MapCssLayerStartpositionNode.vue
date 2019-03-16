<template>
  <MapCssLayerNode class="startpos"
    :mapMatrix="mapMatrix"
    :coords="startpos.flag"
    :offset="32"
    v-tooltip="tooltipStartpos"
  >
    <WhIcon :icon="icon" />
  </MapCssLayerNode>
</template>

<script>
import MapCssLayerNode from "@/components/MapCssLayerNode";

export default {
  components: {
    MapCssLayerNode
  },
  props: {
    mapMatrix: SVGMatrix,
    factions: Object,
    startpos: Object
  },
  computed: {
    icon() {
      const flagKey = this.factions[this.startpos.factionKey].flagKey;
      return `flag ${flagKey}`;
    },
    tooltipStartpos() {
      const { factionKey, lord } = this.startpos;
      return {
        type: "startpos",
        key: factionKey,
        lord: lord
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.startpos {
  height: 64px;
  width: 64px;
  cursor: pointer;
  filter: brightness(90%) drop-shadow(0 0 15px #222222);
  display: inline-block;
}

.startpos:hover {
  filter: brightness(100%) drop-shadow(0 0 15px #222222);
}
</style>
