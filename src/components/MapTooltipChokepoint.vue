<template>
  <WhTooltip class="tooltip-chokepoint">
    <WhTooltipBody>Chokepoint</WhTooltipBody>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    tooltip: Object
  }
};
</script>

<style lang="scss" scoped>
.tooltip-chokepoint {
  color: #fff8d7;
}
</style>
