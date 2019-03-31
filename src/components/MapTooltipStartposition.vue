<template>
  <WhTooltip class="tooltip-startpos">
    <WhTooltipBody>
      <div>{{faction.name}}</div>
      <div v-if="tooltip.lord">Lord: {{lordName}}</div>
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
    },
    lordName() {
      if (this.tooltip.lord) {
        const lord = this.tooltip.lord;
        return lord.charAt(0).toUpperCase() + lord.slice(1)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-startpos {
  color: #fff8d7;
}
</style>
