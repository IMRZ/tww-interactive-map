<template>
  <div
    class="marker-lord"
    v-on="tooltipEvents"
  >
    <div class="background"></div>
    <img class="portrait" :src="portrait">
    <div class="porthole"></div>
    <img class="flag" :src="flag" >
  </div>
</template>

<script>
import { useTooltip } from '@/use/tooltip';

import assets from '@/assets';

export default {
  props: {
    lord: Object,
    faction: Object,
    startpos: Object
  },
  setup(props) {
    const { createTooltip } = useTooltip();
    const tooltipData = {
      faction: props.faction,
      lord: props.lord
    };
    const tooltipEvents = createTooltip('startpos-lord', tooltipData);

    return {
      tooltipEvents,
      portrait: assets.custom.portraits[props.lord.portrait],
      flag: assets.flags[`${props.faction.flagKey}/mon_24`],
    }
  }
};
</script>

<style lang="scss" scoped>
.marker-lord {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 72px;
  height: 74px;
  margin: 0 -4px;

  transform: scale(0.9);

  cursor: pointer;

  z-index: 2000;

  &:hover {
    z-index: 2001;
    transform: scale(1);
  }
}

.porthole {
  position: absolute;
  flex-shrink: 0;
  width: 72px;
  height: 74px;
  background: url('~@/assets/test/faction_icon_frame.png') no-repeat;
}

.background {
  position: absolute;
  flex-shrink: 0;
  width: 72px;
  height: 74px;
  background: url('~@/assets/test/faction_icon_back_neutral.png') center no-repeat;
}

.portrait {
  position: absolute;
  flex-shrink: 0;
  width: 164px;
  height: 164px;
  transform: scale(0.34);
  margin: 2px 0 0 2px;
}

.flag {
  position: absolute;
  width: 24px;
  height: 24px;

  bottom: 0;
  right: 0;
}
</style>
