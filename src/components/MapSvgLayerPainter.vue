<template>
  <MapSvgLayer id="painter">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      @click="paintRegion(region)"
      v-tooltip="tooltipRegionOwner(region)"
    />
  </MapSvgLayer>
</template>

<script>
import MapSvgLayer from "@/components/MapSvgLayer";
import { watch } from '@vue/composition-api';
import { usePlanner } from "@/use/planner";

export default {
  components: { MapSvgLayer },
  setup() {
    const {
      factions,
      selectedFaction,
      ownedRegions,
      regions,
      startingRegions,

      getStateFromQueryParams
    } = usePlanner();

    watch(() => startingRegions.value, () => {
      const fromQuery = getStateFromQueryParams(startingRegions.value, factions);
      if (fromQuery) {
        ownedRegions.value = fromQuery;
      } else {
        ownedRegions.value = Object.assign({}, startingRegions.value);
      }
    });

    const style = (region) => {
      const owner = ownedRegions.value[region.key];
      const faction = factions[owner];
      return faction ? { fill: `#${faction.primaryColour}` } : null;
    };

    const tooltipRegionOwner = (region) => {
      const owner = ownedRegions.value[region.key];
      const faction = factions[owner];

      return {
        type: "region-owner",
        key: region.key,
        owner: faction ? faction.key : null
      };
    };

    const paintRegion = (region) => {
      if (selectedFaction.value) {
        ownedRegions.value[region.key] = selectedFaction.value.key;
      } else {
        ownedRegions.value[region.key] = null;
      }
    };

    return {
      regions,
      style,
      tooltipRegionOwner,
      paintRegion
    };
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.5;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.3;
  }
}
</style>
