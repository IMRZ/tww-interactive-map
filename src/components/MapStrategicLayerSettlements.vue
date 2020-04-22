<template>
  <div style="display: none;">
    <MapStrategicMarkerSettlement
      v-for="region in regions"
      :key="region.key"
      :region="region"
      :zoomLevel="zoomLevel"
    />
  </div>
</template>

<script>
import MapStrategicMarkerSettlement from "@/components/MapStrategicMarkerSettlement.vue";

export default {
  components: {
    MapStrategicMarkerSettlement
  },
  props: {
    regions: Array,
    zoomLevel: String
  }
};
</script>
