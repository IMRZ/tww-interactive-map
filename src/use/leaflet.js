import { reactive, toRefs, onMounted, onUnmounted } from '@vue/composition-api';
import { useQuery } from '@/use/query';

import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function useLeaflet(settings) {
  let map = null;
  let stopQueryWatcher = null;

  const state = reactive({
    zoomLevel: 'high'
  });

  onMounted(() => {
    // image layer
    const imageLayer = settings.initImageLayer();

    if (Leaflet.Browser.gecko) {
      console.log('is firefox')
    }

    // map
    map = Leaflet.map(settings.refs.container, {
      crs: Leaflet.CRS.Simple,
      zoomAnimation: Leaflet.Browser.gecko ? false : true, // disable zoom animation for firefox
      markerZoomAnimation: Leaflet.Browser.gecko ? false : true, // disable zoom animation for firefox
      minZoom: -2,
      maxZoom: 2,
      zoomControl: false,
      inertiaMaxSpeed: Infinity,
      attributionControl: false,
      doubleClickZoom: false,
      maxBounds: settings.bounds,
      layers: [
        imageLayer
      ]
    });

    // base layers
    const baseLayers = settings.initBaseLayers?.() ?? {};
    Object.values(baseLayers)[0]?.addTo(map);

    // overlays
    const overlays = settings.initOverlays?.() ?? {};
    Object.values(overlays).forEach(overlay => overlay.addTo(map));

    // labels layer
    map.createPane('labels');
    map.getPane('labels').style.zIndex = 450;
    map.getPane('labels').style.pointerEvents = 'none';
    const labelsLayer = settings.initLabelLayer();
    labelsLayer.addTo(map);
    overlays['Map labels'] = labelsLayer;

    // controls
    settings.controls?.().forEach((config) => {
      createControl({ element: config.element })
        .setPosition(config.position)
        .addTo(map);
    });

    // listeners
    map.on('zoomend', (e) => {
      if (e.target._zoom < -1) {
        state.zoomLevel = 'high';
      } else if (e.target._zoom > 0) {
        state.zoomLevel = 'low';
      } else {
        state.zoomLevel = 'med';
      }
    });

    const mapHandlers = {
      addLayer: map.addLayer.bind(map),
      removeLayer: map.removeLayer.bind(map),
      addEventListener: (event, fn) => map.on(event, fn)
    };

    // listen to query params
    const { layerState, overlaysState, stop } = useQuery(
      mapHandlers,
      baseLayers,
      overlays
    );
    stopQueryWatcher = stop;

    // trigger onReady callback
    settings.onReady?.(
      mapHandlers,
      baseLayers,
      overlays,
      layerState,
      overlaysState
    );

    map.fitBounds(settings.bounds);
  });

  onUnmounted(() => {
    stopQueryWatcher();
    map.remove();
  });

  return {
    map: {},
    ...toRefs(state)
  };
}

export function createBoundsWithGutter(bounds, size) {
  const [[y1, x1], [y2, x2]] = bounds;
  return [[y1 - size, x1 - size], [y2 + size, x2 + size]];
}

export function createImageLayer(imagePath, bounds, options) {
  return Leaflet.imageOverlay(imagePath, bounds, options)
}

export function createSvgLayer(target, bounds) {
  return Leaflet.svgOverlay(target, bounds)
}

export function createMarkerLayer(data, elements, getCoords) {
  const markers = [];

  elements.forEach((element, i) => {
    const icon = createMarkerIcon({ element });
    const dataItem = data[i];
    const { y, x } = getCoords(dataItem);
    const latLng = Leaflet.latLng(y, x);
    const marker = Leaflet.marker(latLng, { icon }); // .bindPopup(name);
    markers.push(marker);
  });

  return Leaflet.layerGroup(markers);
}

const VueMarkerIcon = Leaflet.DivIcon.extend({
  options: {
    element: null
  },
  createIcon: function () {
    return this.options.element;
  }
});

function createMarkerIcon(options) {
  return new VueMarkerIcon(options);
}

const VueControl = Leaflet.Control.extend({
  options: {
    element: null
  },
  onAdd() {
    return this.options.element;
  }
})

function createControl(options) {
  return new VueControl(options);
}
