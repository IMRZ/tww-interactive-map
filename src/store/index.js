import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import common from "./data/common";
import mortal from "./data/mortal";
import vortex from "./data/vortex";

const SET_SHOW_TOOLTIP = "SET_SHOW_TOOLTIP";
const SET_MAP_OPACITY = "SET_MAP_OPACITY";
const SET_PAINTER_FACTION = "SET_PAINTER_FACTION";
const SET_PAINTER_FACTIONS = "SET_PAINTER_FACTIONS";
const SET_PAINTER_FACTIONS_ITEM = "SET_PAINTER_FACTIONS_ITEM";

const SET_TOOLTIP = "SET_TOOLTIP";
const SET_FILTER = "SET_FILTER";
const SET_MAP_ZOOM_SCALE = "SET_MAP_ZOOM_SCALE";

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    settings: {
      showTooltip: true,
      mapOpacity: 1,
      zoomScale: 0.25
    },
    painter: {
      faction: null,
      factions: null
    },
    data: {
      common,
      map: {
        mortal_empires: {
          ...mortal,
          settings: {
            path: require("@/assets/maps/wh_main_map.png"),
            width: 4096,
            height: 3352,
            chokepoints_transform: `scale(${4096 / 2032},${3352 / 1441})`
          }
        },
        vortex: {
          ...vortex,
          settings: {
            path: require("@/assets/maps/wh2_main_great_vortex_map.png"),
            width: 3378,
            height: 3869,
            chokepoints_transform: `scale(${3378 / 1452},${3869 / 1441})`
          }
        }
      }
    },
    tooltip: null,
    filters: {
      settlements: true,
      resources: true
    }
  },
  getters: {
    route: (state) => state.route,
    settings: (state) => state.settings,
    data: (state) => state.data
  },
  mutations: {
    [SET_SHOW_TOOLTIP](state, value) {
      state.settings.showTooltip = value;
    },
    [SET_MAP_OPACITY](state, value) {
      state.settings.mapOpacity = value;
    },
    [SET_PAINTER_FACTION](state, faction) {
      state.painter.faction = faction;
    },
    [SET_PAINTER_FACTIONS](state, factions) {
      state.painter.factions = factions;
    },
    [SET_PAINTER_FACTIONS_ITEM](state, { regionKey, factionKey }) {
      Vue.set(state.painter.factions, regionKey, factionKey);
    },
    [SET_TOOLTIP](state, tooltip) {
      state.tooltip = tooltip;
    },
    [SET_FILTER](state, { filter, value }) {
      state.filters[filter] = value;
    },
    [SET_MAP_ZOOM_SCALE](state, zoomScale) {
      state.settings.zoomScale = zoomScale;
    }
  }
});
