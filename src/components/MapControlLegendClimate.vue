<template>
  <div class="legend">
    <TwPanel type="info">
      <TwPanelTitle>Legend</TwPanelTitle>
      <div class="content">
        <div class="climate" v-for="(climate, index) in climates" :key="index">
          <div class="colour" :style="{ 'background-color': climate.fill }"></div>
          <span class="label" :style="{ 'color': climate.fill }">{{climate.name}}</span>
        </div>
      </div>
    </TwPanel>
  </div>
</template>

<script>
import TwPanel from "@/components/ui/TwPanel";
import TwPanelTitle from "@/components/ui/TwPanelTitle";

export default {
  components: {
    TwPanel,
    TwPanelTitle
  },
  props: {
    climates: Object
  }
};
</script>

<style lang="scss" scoped>
.legend {
  .content {
    display: flex;
    flex-direction: column;
  }

  .climate {
    flex: 1;
    display: flex;
    flex-direction: row;
  }

  .label {
    flex: 1;
    padding-left: 14px;
  }

  .colour {
    flex: 0 1 auto;
    width: 18px;
    height: 18px;
    margin-left: 14px;
  }
}
</style>
