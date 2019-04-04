<template>
  <div id="map-view">
    <MapContainer
      :common="data.common"
      :map="selectedMapData"
    />
    <MapControlSection />
    <MapControlTopbar />
  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapContainer from "@/components/MapContainer";
import MapControlSection from "@/components/MapControlSection";
import MapControlTopbar from "@/components/MapControlTopbar";

export default {
  components: {
    MapContainer,
    MapControlSection,
    MapControlTopbar
  },
  mixins: [MapSettings]
};
</script>

<style lang="scss">
#map-view {
  height: 100%;
}
</style>
