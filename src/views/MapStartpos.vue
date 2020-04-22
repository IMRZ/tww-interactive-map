<template>
  <div class="container" ref="container">
    <div class="init-container">
      <MapStartposLayerLords
        ref="startposLayer"
        :startingPositions="startingPositions"
      />
      <MapStartposLayerFactions
        ref="startposLayer2"
        :startingPositions="startingPositions"
      />
      <MapStartposLayerRegions
        ref="startposLayer3"
        :viewBox="viewBox"
        :regions="regions"
        :startingPositions="startingPositions"
        :startingRegions="startingRegions"
      />

      <Control ref="controlRef" :mapConfig="mapConfig" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer, createBoundsWithGutter } from '@/use/leaflet';
import { useState } from '@/use/state';

import MapStartposLayerFactions from '@/components/MapStartposLayerFactions';
import MapStartposLayerLords from '@/components/MapStartposLayerLords';
import MapStartposLayerRegions from '@/components/MapStartposLayerRegions';
import Control from '@/components/Control';

import { data } from '@/data';

import gsap from 'gsap';

function fadeIn(target, duration = 1) {
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration });
}

export default {
  components: {
    MapStartposLayerFactions,
    MapStartposLayerLords,
    MapStartposLayerRegions,
    Control
  },
  props: {
    mapId: String,
    query: Object
  },
  setup(props) {
    const refs = reactive({
      container: null,
      startposLayer: null,
      startposLayer2: null,
      startposLayer3: null,
      controlRef: null
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
        { element: refs.controlRef.$el, position: 'bottomright' },
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
      initBaseLayers: () => ({
        'Lords': createMarkerLayer(mapData.startingPositions, refs.startposLayer.$el.children, (data) => data.position),
        'Factions': createMarkerLayer(mapData.startingPositions, refs.startposLayer2.$el.children, (data) => data.position)
      }),
      initOverlays: () => ({
        'Starting regions': createSvgLayer(refs.startposLayer3.$el, bounds)
      }),
      onReady: (map, layers, overlays, layerState, overlaysState) => {
        mapConfig.value = { map, layers, overlays, layerState, overlaysState };
      }
    });

    return {
      ...toRefs(refs),
      zoomLevel,
      mapConfig,

      startingPositions: mapData.startingPositions,
      startingRegions: mapData.startingRegions,
      regions: Object.values(mapData.regions),

      viewBox: `0 0 ${selectedMap.width} ${selectedMap.height}`
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
