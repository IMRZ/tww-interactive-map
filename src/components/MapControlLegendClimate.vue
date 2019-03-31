<template>
  <WhTooltip class="legend-climate">
    <div class="title">Legend</div>
    <div class="climate" v-for="(climate, key) in climates" :key="key">
      <span class="icon" v-tooltip="tooltip(climate)">
        <WhIcon class="icon" :icon="`climate ${climate.icon}`" />
      </span>
      <span class="label" :style="{ 'color': climate.fill }">{{climate.name}}</span>
    </div>
  </WhTooltip>
</template>

<script>
export default {
  props: {
    climates: Object
  },
  methods: {
    tooltip(climate) {
      return {
        type: "info",
        text: climate.description
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.legend-climate {
  padding: 15px;

  .title {
    margin: 5px;
    text-align: center;
    font-size: 1.3em;
  }

  .climate {
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon {
      flex: 0 1 auto;
      max-height: 26px;
      max-width: 26px;
    }

    .label {
      flex: 1;
      margin-left: 14px;
      text-shadow: 1px 1px black;
    }
  }
}
</style>
