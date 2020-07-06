<template>
  <div style="display: none;">
    <div
      class="startpos-wrapper"
      v-for="startpos in startingPositions"
      :key="startpos.key"
    >
      <MapStartposMarkerLord
        v-for="lord in startpos.lords"
        :key="lord.name"
        :lord="lord"
        :faction="factions[startpos.faction]"
        :startpos="startpos"
      />
      <div
        class="banner"
        :style="{ 'min-width': startpos.lords.length > 1 ? `${85 * startpos.lords.length}px` : '100px' }"
        v-on="createTooltip('startpos-faction', { faction: factions[startpos.faction], lords: startpos.lords })"
      >
        <div class="text">
          {{factions[startpos.faction].name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTooltip } from '@/use/tooltip';

import MapStartposMarkerLord from '@/components/MapStartposMarkerLord.vue';

import vanilla_factions from '@/data/common/factions';
import custom_factions from '@/data/common/custom_factions';
const factions = { ...vanilla_factions, ...custom_factions };

export default {
  components: {
    MapStartposMarkerLord
  },
  props: {
    startingPositions: Array
  },
  setup() {
    const { createTooltip } = useTooltip();
    // const tooltipData = {
    //   faction: props.faction,
    //   lords: props.startpos.lords
    // };
    // const tooltipEvents = createTooltip('startpos-faction', tooltipData);

    return {
      createTooltip,
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

.banner {
  position: absolute;
  bottom: -55px;
  min-width: 90px;
  height: 57px;
  padding: 30px 20px 5px 20px;

  font-family: 'CaslonAntique', serif;
  font-size: 1.4em;
  text-align: center;
  white-space: nowrap;
  color: white;
  text-shadow: 1px 1px black;

  $slice: 25;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/test/faction_icon_banner_neutral.png");
}
</style>
