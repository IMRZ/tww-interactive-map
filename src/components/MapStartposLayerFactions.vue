<template>
  <div style="display: none;">
    <div class="startpos-wrapper"
      v-for="startpos in startingPositions"
      :key="startpos.key"
    >
      <MapStartposMarkerFaction
        :startpos="startpos"
        :faction="factions[startpos.faction]"
      />
    </div>
  </div>
</template>

<script>
import MapStartposMarkerFaction from '@/components/MapStartposMarkerFaction';

import factions from '@/data/common/factions';

export default {
  components: {
    MapStartposMarkerFaction
  },
  props: {
    startingPositions: Array
  },
  setup() {
    return {
      factions
    };
  }
};
</script>

<style lang="scss" scoped>
.startpos-wrapper {
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
