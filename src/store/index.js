import Vue from 'vue';
import Vuex from 'vuex';
import { SET_TOOLTIP } from '@/store/mutations';

import climates from '@/store/data/climates.json';
import memRegions from '@/store/data/mem/regions.json';
import memProvinces from '@/store/data/mem/provinces.json';
import vorRegions from '@/store/data/vor/regions.json';
import vorProvinces from '@/store/data/vor/provinces.json';
import vorSettlements from '@/store/data/vor/settlements.json';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    maps: {
      'mem': {
        regions: memRegions,
        provinces: memProvinces,
        settlements: [],
        path: '/static/images/wh_main_map.png',
        width: '4096',
        height: '3352'
      },
      'vor': {
        regions: vorRegions,
        provinces: vorProvinces,
        settlements: vorSettlements,
        path: '/static/images/wh2_main_great_vortex_map.png',
        width: '3378',
        height: '3869'
      }
    },
    climates,
    tooltip: {
      x: 0,
      y: 0,
      visibility: 'hidden',
      type: 'pre',
      data: {
        text: ''
      }
    },
    highlight: undefined
  },
  getters: {
    route: (state) => state.route,
    maps: (state) => state.maps,
    climates: (state) => state.climates,
    tooltip: (state) => state.tooltip,

    highlight: (state) => state.highlight
  },
  mutations: {
    [SET_TOOLTIP](state, payload) {
      state.tooltip = payload;
    },
    setHighlight(state, payload) {
      state.highlight = payload;
    }
  }
});
