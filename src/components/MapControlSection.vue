<template>
  <div class="controls">
    <div class="map-overlay-mode-section">
      <MapControlLegendClimate v-if="mapOverlay === 'regions' && mapOverlayMode === 'climates'"
        :climates="data.common.climates"
      />
      <MapControlPainter v-if="mapOverlay === 'painter'"
        :factions="data.common.factions"
      />
      <WhPanel v-if="mapOverlay === 'regions'">
        <div class="panel-title">Regions</div>
        <WhPanelField label="None" icon="md default icon_cross_small" >
          <WhRadio v-model="mapOverlayMode" value="" />
        </WhPanelField>
        <WhPanelField label="Regions" icon="md warhammer2 icon_provinces" >
          <WhRadio v-model="mapOverlayMode" value="regions" />
        </WhPanelField>
        <WhPanelField label="Provinces" icon="md default icon_provinces" >
          <WhRadio v-model="mapOverlayMode" value="provinces" />
        </WhPanelField>
        <WhPanelField label="Climates" icon="md default icon_filter_climate">
          <WhRadio v-model="mapOverlayMode" value="climates" />
        </WhPanelField>
      </WhPanel>
      <WhPanel v-else-if="mapOverlay === 'choke_points'">
        <div class="panel-title">Chokepoints</div>
        <WhPanelField label="Single colour" icon="md warhammer2 icon_spectate_battle">
          <WhRadio v-model="mapOverlayMode" value="" />
        </WhPanelField>
        <WhPanelField label="Coloured by type" icon="md default icon_spectate_battle">
          <WhRadio v-model="mapOverlayMode" value="coloured" />
        </WhPanelField>
      </WhPanel>
    </div>

    <WhPanel>
      <div class="panel-title">Overlays</div>
      <WhPanelField  label="None" icon="md default icon_cross_small">
        <WhRadio v-model="mapOverlay" value="" />
      </WhPanelField>
      <WhPanelField  label="Regions" icon="md default icon_small_tactical_map">
        <WhRadio v-model="mapOverlay" value="regions" />
      </WhPanelField>
      <WhPanelField  label="Choke points" icon="md default icon_spectate_battle">
        <WhRadio v-model="mapOverlay" value="choke_points" />
      </WhPanelField>
      <WhPanelField  label="Planner/Painter" icon="md default icon_filter_faction">
        <WhRadio v-model="mapOverlay" value="painter" />
      </WhPanelField>
      <div class="panel-title">Nodes</div>
      <WhPanelField  label="None" icon="md default icon_cross_small">
        <WhRadio v-model="nodeOverlay" value="" />
      </WhPanelField>
      <WhPanelField  label="Settlements/Resources" icon="md default icon_province_view">
        <WhRadio v-model="nodeOverlay" value="settlements" />
      </WhPanelField>
      <WhPanelField  label="Starting positions" icon="md default icon_filter_faction">
        <WhRadio v-model="nodeOverlay" value="start_positions" />
      </WhPanelField>
    </WhPanel>

    <!-- <WhPanel>
      <div class="panel-title">Settings</div>
      <WhPanelField label="Map tooltip" icon="md default icon_options">
        <WhCheckbox v-model="settings.showTooltip" />
      </WhPanelField>
      <WhPanelField label="Map opacity" icon="md default icon_options">
        <input type="range" min="0" max="100" :value="mapOpacity" @input="updateMapOpacity" style="width: 80px;">
      </WhPanelField>
    </WhPanel> -->

  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapControlLegendClimate from "@/components/MapControlLegendClimate";
import MapControlPainter from "@/components/MapControlPainter";

export default {
  mixins: [MapSettings],
  components: {
    MapControlLegendClimate,
    MapControlPainter
  },
  computed: {
    mapOpacity() {
      return this.settings.mapOpacity * 100;
    }
  },
  methods: {
    updateMapOpacity(e) {
      const value = e.target.value / 100;
      this.setMapOpacity(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 0 20px 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  color: white;

  z-index: 100;
  & * {
    pointer-events: auto;
  }

  .map-overlay-mode-section {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    justify-content: flex-end;
    flex: 1;

    & > * {
      flex: 0 1 auto;
    }
  }

  .panel-title {
    margin: 5px;
    text-align: center;
    font-size: 1.3em;
  }
}
</style>
