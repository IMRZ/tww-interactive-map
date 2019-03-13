<template>
  <WhTooltip class="tooltip-default">
    <WhTooltipBody>
      <pre>{{tooltip}}</pre>
    </WhTooltipBody>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    tooltip: [String, Object]
  }
};
</script>

<style lang="scss" scoped>
.tooltip-default {
  pre {
    margin: 0;
  }
}
</style>
