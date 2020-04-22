<template>
  <div class="container" ref="container">
    <div class="init-container">
      <MapStrategicLayerRegions
        ref="transparentLayer"
        :viewBox="viewBox"
        :regions="regions"
      />
      <MapStrategicLayerRegions
        ref="regionsLayer"
        :viewBox="viewBox"
        :regions="regions"
        :regionStyle="(r) => ({ fill: r.fill })"
      />
      <MapStrategicLayerRegions
        ref="provincesLayer"
        :viewBox="viewBox"
        :regions="regions"
        :regionStyle="(r) => ({ fill: r.province.fill })"
      />
      <MapStrategicLayerRegions
        ref="climatesLayer"
        :viewBox="viewBox"
        :regions="regions"
        :regionStyle="(r) => ({ fill: climates[r.climate].fill })"
      />
      <MapStrategicLayerChokepoints
        ref="chokepointsLayer"
        :viewBox="viewBox"
        :scaleTransform="scaleTransform"
        :chokepoints="chokepoints"
      />
      <MapStrategicLayerSettlements
        ref="settlementsLayer"
        :regions="regions"
        :zoomLevel="zoomLevel"
      />

      <Control ref="controlRef" :mapConfig="mapConfig" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer, createBoundsWithGutter } from '@/use/leaflet';
import { useState } from '@/use/state';

import MapStrategicLayerRegions from '@/components/MapStrategicLayerRegions';
import MapStrategicLayerSettlements from '@/components/MapStrategicLayerSettlements';
import MapStrategicLayerChokepoints from '@/components/MapStrategicLayerChokepoints';
import Control from '@/components/Control';

import { data } from '@/data';

import gsap from 'gsap';

function fadeIn(target, duration = 1) {
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration });
}

export default {
  components: {
    MapStrategicLayerRegions,
    MapStrategicLayerSettlements,
    MapStrategicLayerChokepoints,
    Control
  },
  props: {
    mapId: String,
    query: Object
  },
  setup(props) {
    const refs = reactive({
      container: null,
      transparentLayer: null,
      regionsLayer: null,
      settlementsLayer: null,
      provincesLayer: null,
      climatesLayer: null,
      chokepointsLayer: null,
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
        'None': createSvgLayer(refs.transparentLayer.$el, bounds),
        'Regions': createSvgLayer(refs.regionsLayer.$el, bounds),
        'Provinces': createSvgLayer(refs.provincesLayer.$el, bounds),
        'Climates': createSvgLayer(refs.climatesLayer.$el, bounds),
        'Chokepoints': createSvgLayer(refs.chokepointsLayer.$el, bounds),
      }),
      initOverlays: () => ({
        'Settlements': createMarkerLayer(Object.values(mapData.regions), refs.settlementsLayer.$el.children, (data) => data.settlement)
      }),
      onReady: (map, layers, overlays, layerState, overlaysState) => {
        mapConfig.value = { map, layers, overlays, layerState, overlaysState };
      }
    });

    // TODO: move me?
    const scaleTransform = props.mapId === 'mortal'
      ? `scale(${4096 / 2032},${3352 / 1441})`
      : `scale(${3378 / 1452},${3869 / 1441})`;

    return {
      ...toRefs(refs),
      zoomLevel,
      mapConfig,

      viewBox: `0 0 ${selectedMap.width} ${selectedMap.height}`,
      regions: Object.values(mapData.regions),
      climates: data.common.climates,
      chokepoints: mapData.chokepoints,

      scaleTransform
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
