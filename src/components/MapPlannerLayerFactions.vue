<template>
  <div style="display: none;">
    <div
      class="planner-marker-wrapper"
      v-for="(factionKey, regionKey) in ownedRegions.value"
      :key="regionKey"
    >
      <MapPlannerMarkerFaction
        :region="regions[regionKey]"
        :faction="factions[factionKey]"
      />
    </div>
  </div>
</template>

<script>
import MapPlannerMarkerFaction from '@/components/MapPlannerMarkerFaction';

import vanilla_factions from '@/data/common/factions';
import custom_factions from '@/data/common/custom_factions';
const factions = { ...vanilla_factions, ...custom_factions };

export default {
  components: {
    MapPlannerMarkerFaction
  },
  props: {
    regions: Object,
    ownedRegions: Object
  },
  setup() {
    return {
      factions
    };
  }
};
</script>

<style lang="scss" scoped>
.planner-marker-wrapper {
  position: absolute;
  width: 0px;
  height: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    z-index: 2000 !important;
  }

  & > * {
    flex-shrink: 0;
  }
}
</style>
