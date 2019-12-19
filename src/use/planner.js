import { computed, ref } from '@vue/composition-api';
import router from "@/router";
import { useData } from "@/use/data";
import { useState } from "@/use/state";

const selectedFaction = ref(null);
const ownedRegions = ref(null);

function getStateFromQueryParams(startingRegions, factions) {
  if (router.currentRoute.query.state) {
    const { state } = router.currentRoute.query;

    const factionsIndexed = Object.values(factions);

    const arr = state.split(",").map((value) => {
      const index = Number(value) - 1;
      if (index >= 0) {
        return factionsIndexed[index].key;
      } else {
        return null;
      }
    });

    const result = Object.keys(startingRegions).reduce((accumulator, key, index) => {
      accumulator[key] = arr[index];
      return accumulator;
    }, {});

    return result;
  } else {
    return null;
  }
}

function createBookmark(ownedRegions, factions) {
  const enrichedFactions = Object.values(factions).map((entry, index) => {
    return {
      key: entry.key,
      index: index
    };
  });

  const arr = Object.values(ownedRegions).reduce((accumulator, faction) => {
    const index = faction ? enrichedFactions.findIndex((entry) => entry.key === faction) : 0;
    accumulator.push(index > 0 ? index + 1 : 0);
    return accumulator;
  }, []);

  const selectedVersion = "v1.8.0";
  const newState = arr.join(",");

  if (router.currentRoute.query.state !== newState) {
    const queryParams = { ...router.currentRoute.query, version: selectedVersion, state: newState };
    router.replace({ query: queryParams });
  }

  var el = document.createElement('textarea');
  el.value = window.location.href;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function reset() {
  const { state, version, ...rest } = router.currentRoute.query;
  router.replace({ query: { ...router.currentRoute.query, reset: true } });
  router.replace({ query: { ...rest } });
}

export function usePlanner() {
  const { common, maps } = useData();
  const { selectedMapId } = useState();

  // TODO: make dynamic
  const selectedVersion = "v1.8.0";

  const regions = computed(() => {
    const mapId = selectedMapId.value;
    const map = maps[mapId][selectedVersion];
    return map.regions;
  });

  const startingRegions = computed(() => {
    const mapId = selectedMapId.value;
    const map = maps[mapId][selectedVersion];
    return map.starting_regions;
  });

  return {
    selectedFaction,
    ownedRegions,

    factions: common.factions,
    regions,
    startingRegions,

    getStateFromQueryParams,
    createBookmark,
    reset
  };
}
