<template>
  <div class="tooltip-startpos-faction">
    <div>Faction: {{data.faction.name}}</div>
    <div>Lords: </div>
    <li style="padding-left: 10px;" v-for="lord in data.lords" :key="lord.name">{{lord.name}}</li>
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
.tooltip-startpos-faction {
  min-width: 160px;
  padding: 10px 12px;
  font-size: 1.1em;
  color: #f3eccc;
}
</style>
