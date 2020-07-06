<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      v-on="createRegionFactionTooltip(region)"
      @click="paintRegion(region)"
    />
  </svg>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useTooltip } from '@/use/tooltip';
import vanilla_factions from '@/data/common/factions';
import custom_factions from '@/data/common/custom_factions';
const factions = { ...vanilla_factions, ...custom_factions };

export default {
  props: {
    viewBox: String,
    regions: Array,
    plannerState: Object
  },
  setup(props) {

    const { createTooltip } = useTooltip();
    const createRegionFactionTooltip = (region) => {
      const ownedRegions = props.plannerState.ownedRegions.value;
      const faction = computed(() => {
        const factionKey = ownedRegions[region.key];
        return factions[factionKey];
      });
      return createTooltip('region-owner', { region, faction });
    };

    const paintRegion = (region) => {
      const ownedRegions = props.plannerState.ownedRegions.value;
      const selectedFaction = props.plannerState.selectedFaction.value;
      if (selectedFaction) {
        ownedRegions[region.key] = selectedFaction.key;
      } else {
        ownedRegions[region.key] = null;
      }
    };

    return {
      createRegionFactionTooltip,
      style: (region) => {
        const ownedRegions = props.plannerState.ownedRegions.value;
        const factionKey = ownedRegions[region.key];
        const faction = factions[factionKey];
        return faction ? { fill: faction.primaryColour } : null;
      },
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
    fill-opacity: 0.6;
  }
}
</style>
