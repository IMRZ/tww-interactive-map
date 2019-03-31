<template>
  <WhTooltip class="tooltip-region">
    <WhTooltipHeader>
      <WhIcon :icon="icon" />
      <span class="region-name">{{region.name}}</span>
    </WhTooltipHeader>
    <WhTooltipBody>
      <div>Province: {{province.name}}</div>
      <div>Climate: {{climate.name}}</div>
    </WhTooltipBody>
  </WhTooltip>
</template>

<script>
const ICON = {
  CAPITAL: "xs default icon_marker_settlement",
  MINOR: "xs warhammer2 icon_marker_settlement"
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
    climate() {
      return this.common.climates[this.region.climate];
    },
    icon() {
      return this.region.isCapital ? ICON.CAPITAL : ICON.MINOR;
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-region {
  min-width: 200px;
  padding-bottom: 8px;
}

.region-name {
  margin-left: 8px;
}
</style>
