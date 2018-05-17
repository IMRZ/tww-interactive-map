<template>
  <div id="MapControlSection">

    <div class="map-overlay-mode-section">
      <MapLegendClimate v-if="mapOverlayMode === 'climates'"
        :climates="data.common.climates"
      />
      <TwPanel v-if="mapOverlay === 'regions'">
        <TwPanelTitle>Regions</TwPanelTitle>
        <TwPanelField label="None" :icon="require('./ui/skins/warhammer2/icon_cross_small.png')" >
          <TwRadio v-model="mapOverlayMode" value="" />
        </TwPanelField>
        <TwPanelField label="Regions" :icon="require('./ui/skins/warhammer2/icon_provinces.png')" >
          <TwRadio v-model="mapOverlayMode" value="regions" />
        </TwPanelField>
        <TwPanelField label="Provinces" :icon="require('./ui/skins/default/icon_provinces.png')" >
          <TwRadio v-model="mapOverlayMode" value="provinces" />
        </TwPanelField>
        <TwPanelField label="Climates" :icon="require('./ui/skins/default/icon_filter_climate.png')">
          <TwRadio v-model="mapOverlayMode" value="climates" />
        </TwPanelField>
      </TwPanel>
      <TwPanel v-else-if="mapOverlay === 'choke_points'">
        <TwPanelTitle>Chokepoints</TwPanelTitle>
        <TwPanelField label="Single colour" :icon="require('./ui/skins/warhammer2/icon_spectate_battle.png')">
          <TwRadio v-model="mapOverlayMode" value="" />
        </TwPanelField>
        <TwPanelField label="Coloured by type" :icon="require('./ui/skins/default/icon_spectate_battle.png')">
          <TwRadio v-model="mapOverlayMode" value="coloured" />
        </TwPanelField>
      </TwPanel>
    </div>

    <TwPanel>
      <TwPanelTitle>Map overlays</TwPanelTitle>
      <TwPanelField  label="None" :icon="require('./ui/skins/default/icon_cross_small.png')">
        <TwRadio v-model="mapOverlay" value="" />
      </TwPanelField>
      <TwPanelField  label="Regions" :icon="require('./ui/skins/default/icon_small_tactical_map.png')">
        <TwRadio v-model="mapOverlay" value="regions" />
      </TwPanelField>
      <TwPanelField  label="Choke points" :icon="require('./ui/skins/default/icon_spectate_battle.png')">
        <TwRadio v-model="mapOverlay" value="choke_points" />
      </TwPanelField>
      <TwPanelTitle>Node overlays</TwPanelTitle>
      <TwPanelField  label="None" :icon="require('./ui/skins/default/icon_cross_small.png')">
        <TwRadio v-model="nodeOverlay" value="" />
      </TwPanelField>
      <TwPanelField  label="Settlements" :icon="require('./ui/skins/default/icon_province_view.png')">
        <TwRadio v-model="nodeOverlay" value="settlements" />
      </TwPanelField>
      <TwPanelField  label="Start positions" :icon="require('./ui/skins/default/icon_filter_faction.png')">
        <TwRadio v-model="nodeOverlay" value="start_positions" />
      </TwPanelField>
    </TwPanel>

    <TwPanel>
      <TwPanelTitle>Settings</TwPanelTitle>
      <TwPanelField label="Map tooltip" :icon="require('./ui/skins/default/icon_options.png')">
        <TwCheckbox v-model="settings.showTooltip" />
      </TwPanelField>
      <TwPanelField label="Map opacity" :icon="require('./ui/skins/default/icon_options.png')">
        <input type="range" min="0" max="100" :value="mapOpacity" @input="updateMapOpacity" style="width: 80px;">
      </TwPanelField>
    </TwPanel>

  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapLegendClimate from "@/components/MapLegendClimate";
import TwPanel from "@/components/ui/TwPanel";
import TwPanelTitle from "@/components/ui/TwPanelTitle";
import TwPanelField from "@/components/ui/TwPanelField";
import TwCheckbox from "@/components/ui/TwCheckbox";
import TwRadio from "@/components/ui/TwRadio";

export default {
  name: "MapControlSection",
  mixins: [MapSettings],
  components: {
     MapLegendClimate,
    TwPanel,
    TwPanelTitle,
    TwPanelField,
    TwCheckbox,
    TwRadio
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
#MapControlSection {
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 20px 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  color: white;

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
}
</style>
