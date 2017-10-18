<template>
  <div id="app">
    <m-control-panel></m-control-panel>
    <m-map-container></m-map-container>
    <m-cursor-tooltip></m-cursor-tooltip>
  </div>
</template>

<script>
import MControlPanel from '@/components/MControlPanel';
import MMapContainer from '@/components/MMapContainer';
import MCursorTooltip from '@/components/MCursorTooltip';

export default {
  name: 'app',
  components: {
    'm-control-panel': MControlPanel,
    'm-map-container': MMapContainer,
    'm-cursor-tooltip': MCursorTooltip,
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;

  body {
    margin: 0;
    height: 100%;
    background-image: url('/static/images/schematic_table_corner.png');

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

