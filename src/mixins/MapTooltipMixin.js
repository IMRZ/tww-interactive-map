import Vue from 'vue';

const tooltipEventBus = new Vue();

export default {
  methods: {
    setTooltipHandler(handler) {
      tooltipEventBus.$on('tooltip_changed', handler);
    },
    updateTooltip({ x, y }, type, data) {
      tooltipEventBus.$emit('tooltip_changed', { visibility: 'visible', x, y, type, data });
    },
    hideTooltip() {
      tooltipEventBus.$emit('tooltip_changed', { visibility: 'hidden' });
    }
  }
};
