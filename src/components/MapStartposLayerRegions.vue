<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
      v-on="createRegionFactionTooltip(region)"
    />
  </svg>
</template>

<script>
import { useTooltip } from '@/use/tooltip';
import factions from '@/data/common/factions';

export default {
  props: {
    viewBox: String,
    regions: Array,
    regionStyle: Function,

    startingPositions: Array,
    startingRegions: Object
  },
  setup(props) {
    const { createTooltip } = useTooltip();
    const createRegionFactionTooltip = (region) => {
      const factionKey = props.startingRegions[region.key];
      const faction = factions[factionKey];
      return createTooltip('region-owner', { region, faction });
    };

    // default faction colour when no startpos selected
    const playableFactions = props.startingPositions.map(entry => entry.faction);
    const factionRegions = Object.assign({}, props.startingRegions);
    Object.keys(factionRegions).forEach((key) => {
      const isPlayableFaction = playableFactions.includes(factionRegions[key]);
      factionRegions[key] = isPlayableFaction ? factionRegions[key] : null;
    });

    return {
      createRegionFactionTooltip,
      style: (region) => {
        const owner = factionRegions[region.key];
        const faction = factions[owner];
        return faction ? { fill: `${faction.primaryColour}` } : null;
      }
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
