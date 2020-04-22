import { reactive, toRefs } from '@vue/composition-api';

import { maps } from '@/data';

function initMaps() {
  return Object.entries(maps).reduce((accumulator, [key, map]) => {
    accumulator[key] = {
      ...map,
      src: null,
      progress: null
    };
    return accumulator;
  }, {});
}

const state = reactive({
  maps: initMaps(),
});

export function useState() {
  return toRefs(state);
}
