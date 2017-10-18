import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import regions from './data/regions.json';
import provinces from './data/provinces.json';
import climates from './data/climates.json';

export default new Vuex.Store({
  strict: true,
  state: {
    regions,
    provinces,
    climates,
    tooltip: {
      top: 0,
      left: 0,
      visibility: 'hidden',
      text: ''
    }
  },
  getters: {
    regions: (state) => {
      return state.regions;
    },
    provinces: (state) => {
      return state.provinces;
    },
    climates: (state) => {
      return state.climates;
    },
    tooltip: (state) => {
      return state.tooltip;
    }
  },
  mutations: {
    setTooltip(state, payload) {
      state.tooltip.top = payload.top;
      state.tooltip.left = payload.left;
      state.tooltip.visibility = payload.visibility;
      state.tooltip.text = payload.text;
    }
  }
});
