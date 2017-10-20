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

  body {
    margin: 0;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.2)),
      url("/static/images/veins.png");

    #app {
      height: 100%;
    }
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>

