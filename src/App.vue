<template>
  <div id="app" v-on="eventListeners">
    <router-view :class="{ fade: visible }"></router-view>
    <MapTooltip
      :mouseEvent="mouseEvent"
      :common="common"
      :map="selectedMapData"
    />
    <UpdateDialog />
  </div>
</template>

<script>
import MapSettings from "@/mixins/MapSettings";
import MapTooltip from "@/components/MapTooltip";
import UpdateDialog from "@/components/ui/UpdateDialog";

import { ref, computed } from "@vue/composition-api";
import { useState } from "@/use/state";

export default {
  components: {
    MapTooltip,
    UpdateDialog
  },
  setup(initProps, setupContext) {
    const { visible } = useState();

    // TODO: fix me later
    const common = setupContext.root.$store.state.data.common;
    const selectedMapData = computed(() => {
      const route = setupContext.root.$store.state.route;
      if (route.params && route.params.id) {
        const mapId = route.params.id;
        return setupContext.root.$store.state.data.map[mapId];
      } else {
        return null;
      }
    });

    const mouseEvent = ref(null);
    const eventListeners = {
      mousemove: (e) => mouseEvent.value = e,
      mouseleave: () => mouseEvent.value = null
    };

    return {
      visible,
      mouseEvent,
      eventListeners,

      common,
      selectedMapData
    };
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

.fade {
  filter: grayscale(75%);
}
</style>
