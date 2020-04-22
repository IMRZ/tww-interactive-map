<template>
  <img
    class="marker-starpos-faction"
    v-on="tooltipEvents"
    :src="flag"
  >
</template>

<script>
import { useTooltip } from '@/use/tooltip';
import assets from '@/assets';

export default {
  props: {
    startpos: Object,
    faction: Object
  },
  setup(props) {
    const { createTooltip } = useTooltip();

    const tooltipData = {
      faction: props.faction,
      lords: props.startpos.lords
    };
    const tooltipEvents = createTooltip('startpos-faction', tooltipData);

    return {
      tooltipEvents,
      flag: assets.flags[`${props.faction.flagKey}/mon_64`]
    }
  }
};
</script>

<style lang="scss" scoped>
.marker-starpos-faction {
  width: 64px;
  height: 64px;
  transform: scale(0.8);
  filter: drop-shadow(5px 10px 5px rgba(0,0,0,0.6));
  cursor: pointer;
  z-index: 2000;

  &:hover {
    z-index: 2001;
    transform: scale(1);
  }
}
</style>
