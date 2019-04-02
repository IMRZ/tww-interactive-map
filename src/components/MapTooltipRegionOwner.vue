<template>
  <WhTooltip class="tooltip-region-owner">
    <WhTooltipBody>
      <div>Province: {{province.name}}</div>
      <div>Region: {{region.name}}</div>
      <div class="owner">
        <span>Owner: {{owner.name}}</span>
        <WhIcon class="icon" :icon="`small flag ${owner.flagKey}`" />
      </div>
    </WhTooltipBody>
  </WhTooltip>
</template>

<script>
const OWNER_ABANDONED = {
  key: "abandoned",
  name: "Abandoned",
  flagKey: "abandoned"
};

export default {
  props: {
    common: Object,
    map: Object,
    tooltip: Object
  },
  computed: {
    region() {
      return this.map.regions[this.tooltip.key];
    },
    province() {
      return this.map.provinces[this.region.provinceKey];
    },
    owner() {
      if (this.tooltip.owner) {
        return this.common.factions[this.tooltip.owner];
      } else {
        return OWNER_ABANDONED;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-region-owner {
  padding-right: 4px;

  .owner {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 4px;
      width: 16px !important;
      height: 16px !important;
    }
  }
}
</style>
