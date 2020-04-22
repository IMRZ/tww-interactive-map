<template>
  <img
    class="planner-marker-faction"
    v-on="tooltipEvents"
    :src="flag"
  >
</template>

<script>
import { computed } from '@vue/composition-api';
import { useTooltip } from '@/use/tooltip';
import assets from '@/assets';

export default {
  props: {
    region: Object,
    faction: Object
  },
  setup(props) {
    const { createTooltip } = useTooltip();
    const tooltipData = {
      faction: computed(() => props.faction),
      region: props.region
    };
    const tooltipEvents = createTooltip('settlement-owner', tooltipData);

    const flag = computed(() => {
      const flagKey = props.faction?.flagKey ?? 'abandoned';
      return assets.flags[`${flagKey}/mon_24`];
    });

    return {
      tooltipEvents,
      flag
    }
  }
};
</script>

<style lang="scss" scoped>
.planner-marker-faction {
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 2000;

  &:hover {
    z-index: 2001;
  }
}
</style>
