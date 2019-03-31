<template>
  <WhTooltip class="tooltip-resource">
    <WhTooltipBody>
      <div>{{resourceName}}</div>
      <p v-if="resourceDescription">{{resourceDescription}}</p>
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
    resource() {
      const { key } = this.tooltip;
      return this.common.resources[key];
    },
    resourceName() {
      return this.resource.name;
    },
    resourceDescription() {
      return this.resource.description;
    },
  }
};
</script>

<style lang="scss" scoped>
.tooltip-resource {
  color: #fff8d7;
  max-width: 380px;

  p {
    margin-bottom: 0;
  }
}
</style>
