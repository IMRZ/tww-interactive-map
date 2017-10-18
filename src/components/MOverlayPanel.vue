<template>
  <div id="m-overlay-panel">
    <div class="button-container">
      <span>Overlays:</span>
      <m-button class="small" :tooltip-text="'None'" @click.native="setOverlay('/')"></m-button>
      <m-button class="small" :icon="'/static/images//icon_filter_faction.png'" :tooltip-text="'Regions'" @click.native="setOverlay('/regions')"></m-button>
      <m-button class="small" :icon="'/static/images//icon_filter_faction.png'" :tooltip-text="'Provinces'" @click.native="setOverlay('/provinces')"></m-button>
      <m-button class="small" :icon="'/static/images//icon_filter_diplomatic_attitude.png'" :tooltip-text="'Climates'" @click.native="setOverlay('/climates')"></m-button>
    </div>
  </div>
</template>

<script>
import MButton from '@/components/MButton';

export default {
  name: 'm-overlay-panel',
  components: {
    'm-button': MButton
  },
  methods: {
    setOverlay(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss">
#m-overlay-panel {
  height: 68px;
  max-width: 1200px;
  border: solid transparent;
  border-width: 0 158px 0 158px;
  border-image: url('/static/images//bar_top_center_tactical_map.png') 0 158 0 158 fill repeat;
  flex: 1 0 auto;

  .button-container {
    padding-top: 12px;
    color: white;
    display: flex;
  }
}
</style>
