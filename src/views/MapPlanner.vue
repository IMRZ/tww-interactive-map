<template>
  <div class="container" ref="container">
    <div class="init-container">
      <MapPlannerLayerRegions
        ref="regionsLayer"
        :viewBox="viewBox"
        :regions="regions"
        :plannerState="plannerState"
      />
      <MapPlannerLayerFactions
        ref="factionMarkersLayer"
        :regions="regionsLookup"
        :ownedRegions="plannerState.ownedRegions"
      />

      <Control ref="controlRef1" :mapConfig="mapConfig" />
      <ControlPlanner
        ref="controlRef2"
        :mapConfig="mapConfig"
        :plannerState="plannerState"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer, createBoundsWithGutter } from '@/use/leaflet';
import { useState } from '@/use/state';
import { usePlanner } from '@/use/planner';

import MapPlannerLayerRegions from '@/components/MapPlannerLayerRegions';
import MapPlannerLayerFactions from '@/components/MapPlannerLayerFactions';
import Control from '@/components/Control';
import ControlPlanner from '@/components/ControlPlanner';

import { data } from '@/data';

import gsap from 'gsap';

function fadeIn(target, duration = 1) {
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration });
}

export default {
  components: {
    MapPlannerLayerRegions,
    MapPlannerLayerFactions,
    Control,
    ControlPlanner
  },
  props: {
    mapId: String,
    query: Object
  },
  setup(props) {
    const refs = reactive({
      container: null,
      regionsLayer: null,
      factionMarkersLayer: null,
      controlRef1: null,
      controlRef2: null
    });

    const { maps } = useState();
    const selectedMap = maps.value[props.mapId];
    const mapData = data[props.mapId];
    const bounds = [[0, 0], [selectedMap.height, selectedMap.width]];

    const mapConfig = ref(null);

    const { zoomLevel } = useLeaflet({
      refs,
      bounds: createBoundsWithGutter(bounds, 100),
      controls: () => ([
        { element: refs.controlRef1.$el, position: 'bottomright' },
        { element: refs.controlRef2.$el, position: 'bottomright' },
      ]),
      initImageLayer: () => {
        const imageLayer = createImageLayer(selectedMap.path, bounds);
        imageLayer.on('load', () => fadeIn(refs.container, 0.5));
        return imageLayer;
      },
      initLabelLayer: () => {
        const layer = createImageLayer(selectedMap.textPath, bounds, { pane: 'labels' });
        return layer;
      },
      initOverlays: () => ({
        'Faction icons': createMarkerLayer(Object.values(mapData.regions), refs.factionMarkersLayer.$el.children, (data) => data.settlement),
        'Regions': createSvgLayer(refs.regionsLayer.$el, bounds)
      }),
      onReady: (map, layers, overlays, layerState, overlaysState) => {
        mapConfig.value = { map, layers, overlays, layerState, overlaysState };
      }
    });

    // planner state
    const plannerState = usePlanner(mapData);

    return {
      ...toRefs(refs),
      zoomLevel,
      mapConfig,

      startingRegions: mapData.startingRegions,
      regions: Object.values(mapData.regions),
      regionsLookup: mapData.regions,

      viewBox: `0 0 ${selectedMap.width} ${selectedMap.height}`,

      plannerState
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0;
  background-color: transparent;
}

.init-container {
  display: none;
}
</style>
