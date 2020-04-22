<template>
  <div class="tooltip-startpos-lord">
    <div>Faction: {{data.faction.name}}</div>
    <div>Lord: {{data.lord.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.tooltip-startpos-lord {
  min-width: 160px;
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;
}
</style>
