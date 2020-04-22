<template>
  <div class="control leaflet-control" :class="{ collapsed: isCollapsed }" v-on="controlMouseEvents">
    <img class="icon" src="../assets/skins/default/icon_menu.png" @click="expand" />
    <div class="content" v-if="mapConfig" v-on="stopPropagationListeners">
      <div class="lock" :class="{ open: !expandLocked }" @click="toggleExpandLocked" />

      <div class="section" v-if="Object.keys(mapConfig.layers).length">
        <div>Layers:</div>
        <div class="layer" v-for="(_, key) in mapConfig.layers" :key="key">
          <input type="radio" :id="key" :value="key" v-model="mapConfig.layerState">
          <label :for="key">{{key}}</label>
        </div>
      </div>

      <div class="section" v-if="Object.keys(mapConfig.overlays).length">
        <div>Overlays:</div>
        <div class="overlay" v-for="(_, key) in mapConfig.overlays" :key="key">
          <input type="checkbox" :id="key" :value="key" v-model="mapConfig.overlaysState">
          <label :for="key">{{key}}</label>
        </div>
      </div>

      <div class="section">
        <div>Modes:</div>
        <router-link
          tag="button"
          :to="{ name: 'strategic', query: { layer: 'None', overlays: 'Settlements,Map labels' } }"
        >
          Strategic
        </router-link>
        <router-link
          tag="button"
          :to="{ name: 'planner', query: { overlays: 'Faction icons,Regions,Map labels' } }"
        >
          Planner
        </router-link>
        <router-link
          tag="button"
          :to="{ name: 'startpos', query: { layer: 'Lords', overlays: 'Starting regions,Map labels' } }"
        >
          Starting positions
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, computed } from '@vue/composition-api';

export default {
  props: {
    mapConfig: Object
  },
  setup(props) {
    const state = reactive({
      initialized: false,
      collapsed: true,
      expandLocked: false
    });

    const collapse = () => {
      state.collapsed = true;
    };

    const expand = (e) => {
      e.stopPropagation();
      state.collapsed = false;
    };

    const toggleExpandLocked = () => {
      state.expandLocked = !state.expandLocked;
    };

    const isCollapsed = computed(() => {
      if (state.expandLocked) {
        return false;
      } else {
        return state.collapsed;
      }
    });

    watch(() => props.mapConfig, (mapConfig) => {
      if (state.initialized === false) {
        mapConfig.map.addEventListener('click', collapse);
        mapConfig.map.addEventListener('touchstart', collapse);
        state.initialized = true;
      }
    }, { lazy: true });

    return {
      ...toRefs(state),
      collapse,
      expand,
      toggleExpandLocked,
      isCollapsed,
      controlMouseEvents: {
        mouseenter: expand,
        mouseleave: collapse
      },
      stopPropagationListeners: {
        click: (e) => e.stopPropagation(),
        touchstart: (e) => e.stopPropagation()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.control {
  min-width: 50px;
  min-height: 50px;

  font-size: 1.4em;
  font-family: 'CaslonAntique', serif;
  color: #f3eccc;

  $slice: 18;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/skins/default/tooltip_frame.png");

  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    display: none;
  }

  &.collapsed .icon {
    display: block;
  }

  .content {
    display: block;
    height: 100%;
    padding: 16px;
    max-width: 180px;
    min-width: 180px;
  }

  &.collapsed .content {
    display: none;
  }

  .section {
    margin: 4px 0;
    display: flex;
    flex-direction: column;

    button {
      margin: 2px 0;
    }

    & .router-link-active {
      font-weight: bold;
    }
  }

  .lock {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    background-image: url("~@/assets/skins/warhammer2/icon_padlock.png");

    &.open {
      background-image: url("~@/assets/skins/warhammer2/icon_padlock_open.png");
    }
  }
}
</style>
