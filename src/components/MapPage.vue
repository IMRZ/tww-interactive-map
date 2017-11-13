<template>
  <div id="MapPage">
    <MapOverlayPanel
      :mapId="mapId"
    />
    <MapTooltip />
    <MapContainer
      :mapId="mapId"
      :overlay="overlay"
    />
  </div>
</template>

<script>
import MapOverlayPanel from '@/components/MapOverlayPanel';
import MapTooltip from '@/components/MapTooltip';
import MapContainer from '@/components/MapContainer';

export default {
  name: 'MapPage',
  props: {
    mapId: String,
    overlay: String,
  },
  components: {
    MapOverlayPanel,
    MapTooltip,
    MapContainer
  }
};
</script>

<style lang="scss">
#MapPage {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
}
</style>
