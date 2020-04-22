import { computed, watchEffect } from '@vue/composition-api';
import router from '../router';

export function useQuery(map, layers, overlays) {
  const allowedLayers = Object.keys(layers);
  const allowedOverlays = Object.keys(overlays);

  function handleBaseLayers(route) {
    const currentBaseLayer = route?.query?.layer ?? allowedLayers[0];
    allowedLayers.forEach((allowedLayer) => {
      if (currentBaseLayer === allowedLayer) {
        map.addLayer(layers[allowedLayer]);
      } else {
        map.removeLayer(layers[allowedLayer]);
      }
    })
  }

  function handleOverlays(currentRoute) {
    const currentOverlays = currentRoute?.query?.overlays?.split(',') ?? [];
    allowedOverlays.forEach((allowedOverlay) => {
      if (currentOverlays.includes(allowedOverlay)) {
        map.addLayer(overlays[allowedOverlay]);
      } else {
        map.removeLayer(overlays[allowedOverlay]);
      }
    });
  }

  const stop = watchEffect(() => {
    handleBaseLayers(router.app._route);
    handleOverlays(router.app._route);
  });

  const layerState = computed({
    get: () => router.app._route?.query?.layer ?? allowedLayers[0],
    set: (layer) => {
      router.replace({
        ...router.app._route,
        query: {
          ...router.app._route?.query,
          layer: layer
        }
      });
    }
  });

  const overlaysState = computed({
    get: () => router.app._route?.query?.overlays?.split(',') ?? [],
    set: (overlays) => {
      if (overlays.length) {
        router.replace({
          ...router.app._route,
          query: {
            ...router.app._route?.query,
            overlays: overlays.join(',')
          }
        });
      } else {
        // eslint-disable-next-line no-unused-vars
        const { overlays, ...otherQueryParams } = router.app._route?.query ?? {};
        router.replace({
          ...router.app._route,
          query: {
            ...otherQueryParams
          }
        });
      }
    }
  });

  return {
    layerState,
    overlaysState,
    stop
  };
}
