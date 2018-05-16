<template>
  <div id="MapView"
    v-on="eventListeners"
  >
    <MapContainer
      :common="data.common"
      :map="selectedMapData"
    />
    <MapControlSection />
    <MapTooltip
      v-if="settings.showTooltip"
      :event="tooltipEvent"
      :common="data.common"
      :map="selectedMapData"
    />
  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapContainer from "@/components/MapContainer";
import MapControlSection from "@/components/MapControlSection";
import MapTooltip from "@/components/MapTooltip";

export default {
  name: "MapView",
  components: {
    MapContainer,
    MapControlSection,
    MapTooltip
  },
  mixins: [MapSettings],
  data() {
    return {
      tooltipEvent: undefined
    };
  },
  computed: {
    eventListeners() {
      if (this.showTooltip) {
        return {
          mousemove: e => this.tooltipEvent = e,
          mouseleave: e => this.tooltipEvent = undefined
        };
      } else {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
#MapView {
  height: 100%;
}
</style>
