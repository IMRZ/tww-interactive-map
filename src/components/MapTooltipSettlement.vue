<template>
  <WhTooltip class="tooltip-settlement">
    <WhTooltipBody>Settlement: {{region.name}}</WhTooltipBody>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    map: Object,
    tooltip: Object
  },
  computed: {
    region() {
      return this.map.regions[this.tooltip.key];
    },
  }
};
</script>

<style lang="scss" scoped>
.tooltip-settlement {
  color: #fff8d7;
}
</style>
