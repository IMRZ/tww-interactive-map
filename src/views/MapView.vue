<template>
  <div id="map-view">
    <MapContainer
      :common="data.common"
      :map="selectedMapData"
    />
    <MapControlSection />
  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapContainer from "@/components/MapContainer";
import MapControlSection from "@/components/MapControlSection";

export default {
  components: {
    MapContainer,
    MapControlSection,
  },
  mixins: [MapSettings]
};
</script>

<style lang="scss">
#map-view {
  height: 100%;
}
</style>
