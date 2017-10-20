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
      x: 0,
      y: 0,
      visibility: 'hidden',
      type: 'pre',
      data: {
        text: ''
      }
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
      state.tooltip = payload;
    }
  }
});
