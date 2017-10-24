<template>
  <div id="app">
    <m-control-panel />
    <m-map-container />
    <m-cursor-tooltip />
  </div>
</template>

<script>
import MControlPanel from "@/components/MControlPanel";
import MMapContainer from "@/components/MMapContainer";
import MCursorTooltip from "@/components/MCursorTooltip";

export default {
  name: "app",
  components: {
    "m-control-panel": MControlPanel,
    "m-map-container": MMapContainer,
    "m-cursor-tooltip": MCursorTooltip
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
  font-family: Georgia, Times, "Times New Roman", serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
  background: url("/static/images/com.totalwar.warhammer.background.texture.jpg");

  #app {
    height: 100%;
  }
}
</style>

