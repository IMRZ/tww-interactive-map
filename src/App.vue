<template>
  <div id="app" v-on="eventListeners">
    <router-view></router-view>
    <MapTooltip
      v-if="tooltipEnabled"
      :mouseEvent="mouseEvent"
      :common="data.common"
      :map="selectedMapData"
    />
  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapTooltip from "@/components/MapTooltip";

export default {
  components: {
    MapTooltip
  },
  mixins: [MapSettings],
  data() {
    return {
      mouseEvent: undefined
    };
  },
  computed: {
    tooltipEnabled() {
      return this.settings.showTooltip;
    },
    eventListeners() {
      if (this.tooltipEnabled) {
        return {
          mousemove: (mouseEvent) => this.mouseEvent = mouseEvent,
          mouseleave: (mouseEvent) => this.mouseEvent = undefined
        };
      } else {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IM+Fell+Great+Primer');

html {
  height: 100%;
  box-sizing: border-box;
  font-family: 'IM Fell Great Primer', serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

#app {
  height: 100%;
}
</style>
