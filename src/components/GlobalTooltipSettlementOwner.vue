<template>
  <div class="tooltip-settlement-owner">
    <div>Settlement: {{data.region.name}}</div>
    <div class="faction">
      <span>Owner:</span>
      <img class="flag" :src="flag" />
      <span>{{faction.name}}</span>
    </div>
  </div>
</template>

<script>
import { computed, isRef } from '@vue/composition-api';

import assets from '@/assets';

const OWNER_RUINS = {
  name: 'Ruins',
  flagKey: 'abandoned'
};

export default {
  props: {
    data: Object
  },
  setup(props) {
    // faction value could be reactive, e.g. owner is changed in planner
    const faction = computed(() => {
      const factionValue = isRef(props.data.faction)
        ? props.data.faction.value
        : props.data.faction;
      return factionValue ?? OWNER_RUINS;
    });

    const flag = computed(() => {
      const flagKey = `${faction.value.flagKey}/mon_24`;
      return assets.flags[flagKey];
    });

    return {
      faction,
      flag
    };
  }
};
</script>

<style lang="scss" scoped>
.tooltip-settlement-owner {
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;

  .faction {
    display: flex;
    align-items: center;
  }

  .flag {
    width: 16px;
    height: 16px;
    margin: 0 4px;
  }
}
</style>
