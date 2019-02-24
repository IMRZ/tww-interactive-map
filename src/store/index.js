import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import common from "./data/common.json";
import mortal_empires from "./data/mortal_empires.json";
import vortex from "./data/vortex.json";

const SET_SHOW_TOOLTIP = "SET_SHOW_TOOLTIP";
const SET_MAP_OPACITY = "SET_MAP_OPACITY";
const SET_PAINTER_FACTION = "SET_PAINTER_FACTION";
const SET_PAINTER_FACTIONS = "SET_PAINTER_FACTIONS";
const SET_PAINTER_FACTIONS_ITEM = "SET_PAINTER_FACTIONS_ITEM";

export default new Vuex.Store({
  state: {
    settings: {
      showTooltip: true,
      mapOpacity: 1
    },
    painter: {
      faction: null,
      factions: null
    },
    data: {
      common,
      map: {
        mortal_empires: {
          ...mortal_empires,
          settings: {
            path: require("@/assets/maps/wh_main_map.png"),
            width: 4096,
            height: 3352,
            chokepoints_transform: "scale(2.0157,2.3261)"
          }
        },
        vortex: {
          ...vortex,
          settings: {
            path: require("@/assets/maps/wh2_main_great_vortex_map.png"),
            width: 3378,
            height: 3869,
            chokepoints_transform: "scale(2.3264,2.6849)"
          }
        }
      }
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
    }
  }
});
