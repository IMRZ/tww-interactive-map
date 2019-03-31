<template>
  <WhTooltip class="tooltip-chokepoint">
    <WhTooltipBody>Chokepoint: {{battleMap.label}}</WhTooltipBody>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    common: Object,
    tooltip: Object
  },
  computed: {
    battleMap() {
      return this.common.battleMaps[this.tooltip.key]
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-chokepoint {
  color: #fff8d7;
}
</style>
