import { reactive, toRefs } from '@vue/composition-api';

const state = reactive({
  tooltip: null
});

function createTooltip(type, dataRef) {
  return {
    mouseenter: () => state.tooltip = [type, dataRef],
    mouseleave: () => state.tooltip = null
  };
}

export function useTooltip() {
  return {
    ...toRefs(state),
    createTooltip
  };
}
