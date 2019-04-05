<template>
  <MapCssLayerNode class="startpos"
    :mapMatrix="mapMatrix"
    :coords="startpos.flag"
    :offset="32"
    v-tooltip="tooltipStartpos"
  >
    <WhIcon
      :class="{ 'zoomed-out': isZoomedOut }"
      :icon="icon"
    />
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
    },
    isZoomedOut() {
      console.log(this.$store.state.settings.zoomScale);
      return (this.$store.state.settings.zoomScale < 0.4);
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

  display: flex;
  align-items: center;
  justify-content: center;
}

.startpos:hover {
  filter: brightness(100%) drop-shadow(0 0 15px #222222);
}

.zoomed-out {
  transform: scale(0.6);
}
</style>
