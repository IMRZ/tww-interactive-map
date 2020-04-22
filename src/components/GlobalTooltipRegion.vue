<template>
  <div class="tooltip-region">
    <div>Province: {{region.province.name}}</div>
    <div>Region: {{region.name}}</div>
    <div>Climate: {{climate.name}}</div>
  </div>
</template>

<script>
import { data } from '@/data';

export default {
  props: {
    data: Object
  },
  setup(props) {
    return {
      region: props.data,
      climate: data.common.climates[props.data.climate]
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip-region {
  min-width: 160px;
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;
}
</style>
