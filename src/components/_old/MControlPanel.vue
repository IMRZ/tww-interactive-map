<template>
  <div id="m-control-panel">
    <div id="bar-top-left">
      <div class="button-container">
        <m-button :icon="'static/images/icon_menu.png'" :tooltip-text="'Menu'"></m-button>
        <m-button :icon="'static/images/icon_question_mark.png'" :tooltip-text="'About'"></m-button>
      </div>
    </div>
    <m-overlay-panel></m-overlay-panel>
    <m-info-panel></m-info-panel>
    <!-- <m-side-panel /> -->
  </div>
</template>

<script>
import MButton from "@/components/MButton";
import MOverlayPanel from "@/components/MOverlayPanel";
import MInfoPanel from "@/components/MInfoPanel";
import MSidePanel from "@/components/MSidePanel";

export default {
  name: "m-control-panel",
  components: {
    "m-button": MButton,
    "m-overlay-panel": MOverlayPanel,
    "m-info-panel": MInfoPanel,
    "m-side-panel": MSidePanel
  }
};
</script>

<style lang="scss">
#m-control-panel {
  position: absolute;
  left: 0;
  right: 0;
  height: 68px;
  display: flex;
}

#bar-top-left {
  height: 46px;
  flex: 0 1 auto;
  border: solid;
  border-width: 0 0 0 30px;
  border-image: url("static/images/bar_top_left.png") 0 0 0 30 fill repeat;
  margin-right: 100px;
  position: relative;
  display: flex;
  padding-right: 30px;

  &::after {
    content: "";
    position: absolute;
    width: 139px;
    height: 52px;
    right: -100px;
    background-image: url("static/images//bar_top_left_corner.png");
  }

  .button-container {
    padding-top: 3px;
    display: flex;
  }
}

.info-panel {
  width: 400px;
  height: 200px;
}
</style>
