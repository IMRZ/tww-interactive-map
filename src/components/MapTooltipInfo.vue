<template>
  <WhTooltip class="tooltip-info">
    <WhTooltipBody>{{tooltip.text}}</WhTooltipBody>
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
.tooltip-info {
  color: #fff8d7;
}
</style>
