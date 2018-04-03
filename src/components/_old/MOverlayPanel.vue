<template>
  <div id="m-overlay-panel">
    <div class="button-container">
      <span>Filters:</span>
      <m-button class="small" :tooltip-text="'Settlements'" @click.native="setOverlay('/')"></m-button>
      <m-button class="small" :tooltip-text="'Resources'" @click.native="setOverlay('/')"></m-button>
      <span style="width: 40px;"></span>
      <span>Overlays:</span>
      <m-button class="small" :tooltip-text="'None'" @click.native="setOverlay('/')"></m-button>
      <m-button class="small" :icon="'static/images/icon_filter_faction.png'" :tooltip-text="'Regions'" @click.native="setOverlay('/regions')"></m-button>
      <m-button class="small" :icon="'static/images/icon_filter_faction.png'" :tooltip-text="'Provinces'" @click.native="setOverlay('/provinces')"></m-button>
      <m-button class="small" :icon="'static/images/icon_filter_climate.png'" :tooltip-text="'Climates'" @click.native="setOverlay('/climates')"></m-button>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/MButton";

export default {
  name: "m-overlay-panel",
  components: {
    "m-button": MButton
  },
  methods: {
    setOverlay(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss">
#m-overlay-panel {
  height: 68px;
  max-width: 1200px;
  border: solid;
  border-width: 0 158px 0 158px;
  border-image: url("static/images/bar_top_center_tactical_map.png") 0 158 0 158 fill repeat;
  flex: 1 0 auto;

  .button-container {
    padding-top: 10px;
    height: 38px;
    color: #fff8d7;
    display: flex;
    align-items: center;
  }
}
</style>
