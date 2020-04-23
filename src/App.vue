<template>
  <div id="app" v-on="tooltipEventListeners">
    <router-view />

    <GlobalTooltip
      :tooltip="tooltip"
      :mouseEvent="tooltipMouseEvent"
    />
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useTooltip } from '@/use/tooltip';
import GlobalTooltip from '@/components/GlobalTooltip.vue';

export default {
  components: {
    GlobalTooltip
  },
  setup(prop, context) {
    const { tooltip } = useTooltip();
    const tooltipMouseEvent = ref(null);
    const tooltipEventListeners = {
      mousemove: (e) => tooltipMouseEvent.value = e,
      mouseleave: () => tooltipMouseEvent.value = null
    };

    // TODO: move this somewhere else?
    // reset/close tooltip when route is changed.
    watch(
      () => context.root._router.app._route,
      () => tooltip.value = null,
      { lazy: true }
    );

    return {
      tooltip,
      tooltipMouseEvent,
      tooltipEventListeners
    };
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
}

@font-face {
  font-family: "CaslonAntique";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("~@/assets/fonts/CaslonAntique.ttf");
}

@font-face {
  font-family: "CaslonAntique";
  font-style: bold;
  font-weight: 700;
  font-display: swap;
  src: url("~@/assets/fonts/CaslonAntique-Bold.ttf");
}

#app {
  height: 100%;
  display: flex;
  font-family: 'CaslonAntique', serif;
}
</style>
