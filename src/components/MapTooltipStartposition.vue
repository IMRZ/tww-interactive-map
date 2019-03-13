<template>
  <WhTooltip class="tooltip-startpos">
    <WhTooltipBody>
      <div>{{faction.name}}</div>
      <p v-if="tooltip.lord">Lord: {{tooltip.lord}}</p>
    </WhTooltipBody>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    common: Object,
    tooltip: Object
  },
  computed: {
    faction() {
      return this.common.factions[this.tooltip.key];
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-startpos {
  color: #fff8d7;

  p {
    margin-bottom: 0;
  }
}
</style>
