<template>
  <div class="control leaflet-control" :class="{ collapsed: isCollapsed }" v-on="controlMouseEvents">
    <img class="icon" src="../assets/skins/warhammer2/icon_small_tactical_map.png" @click="expand" />
    <div class="content" v-if="mapConfig" v-on="stopPropagationListeners">
      <div class="lock" :class="{ open: !expandLocked }" @click="toggleExpandLocked" />

      <div class="section">
        <div>Selected faction:</div>
        <select v-model="plannerState.selectedFaction.value">
          <option :value="null">Abandoned</option>
          <optgroup :key="label" v-for="(factions, label) in plannerState.factionGroups" :label="label">
            <option :key="faction.key" v-for="faction in factions" :value="faction">{{faction.name}}</option>
          </optgroup>
        </select>
      </div>

      <div class="section">
        <div>Actions:</div>
        <button @click="plannerState.createBookmark">Copy link</button>
        <button @click="plannerState.reset">Reset</button>
        <button @click="plannerState.clear">Clear</button>

        <div v-on="ioTooltipEvents">
          WIP: more info <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2154921490" target="_blank" rel="noopener noreferrer">here</a>.
        </div>
        <button @click="plannerState.exportJson">Export (map.json)</button>
        <button @click="plannerState.importJson">Import (map.json)</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, computed } from '@vue/composition-api';
import { useTooltip } from '@/use/tooltip';

export default {
  props: {
    mapConfig: Object,
    plannerState: Object
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

    const { createTooltip } = useTooltip();
    const ioTooltipEvents = createTooltip('text', 'Work in progress, please leave feedback on steam or github!');

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
      },
      ioTooltipEvents
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
    width: 38px;
    height: 38px;
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
