import { reactive, toRefs, ref } from '@vue/composition-api';
import { data } from '@/data';
import router from '../router';

function getStateFromQueryParams(startingRegions, factions) {
  const stateFromQuery = router.app._route?.query?.state;

  if (stateFromQuery) {
    const factionsIndexed = Object.values(factions);

    // TODO: check version
    const [version, ...factionsArray] = stateFromQuery.split(',');
    const arr = factionsArray.map((value) => {
      const index = Number(value) - 1;
      if (index >= 0) {
        return factionsIndexed[index].key;
      } else {
        return null;
      }
    });

    console.log(version);

    const result = Object.keys(startingRegions).reduce((accumulator, key, index) => {
      accumulator[key] = arr[index];
      return accumulator;
    }, {});

    const { state, ...otherQueryParams } = router.currentRoute.query; // eslint-disable-line no-unused-vars
    router.replace({ query: otherQueryParams });

    return result;
  } else {
    return null;
  }
}

function createBookmark(ownedRegionsRef, factions) {
  const enrichedFactions = Object.values(factions).map((entry, index) => {
    return {
      key: entry.key,
      index: index
    };
  });

  const arr = Object.values(ownedRegionsRef.value).reduce((accumulator, faction) => {
    const index = faction ? enrichedFactions.findIndex((entry) => entry.key === faction) : 0;
    accumulator.push(index > 0 ? index + 1 : 0);
    return accumulator;
  }, []);

  const selectedVersion = "v1.8.x";
  arr.unshift(selectedVersion);
  const newState = arr.join(",");

  var el = document.createElement('textarea');
  el.value = `${window.location.href}&state=${newState}`;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


const factionsList =  Object.values(data.common.factions).reduce((accumulator, faction) => {
  if (accumulator[faction.name] === undefined) {
    accumulator[faction.name] = faction;
  }
  return accumulator;
}, {});

const plannerFactions = Object.values(factionsList)
  .filter((f) => f.primaryColour !== '000000' && !f.name.startsWith("{{"))
  .sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

function clear(ownedRegionsRef) {
  const cleared = Object.assign({}, ownedRegionsRef.value); // copy
  Object.keys(cleared).forEach(key => cleared[key] = null); // reset
  ownedRegionsRef.value = cleared;
}

function reset(ownedRegionsRef, startingRegions) {
  ownedRegionsRef.value = Object.assign({}, startingRegions);
}

export function usePlanner(mapData) {
  const state = reactive({
    selectedFaction: null
  });

  const ownedRegions = ref(null);
  const fromQuery = getStateFromQueryParams(mapData.startingRegions, data.common.factions);
  if (fromQuery) {
    ownedRegions.value = fromQuery
  } else {
    ownedRegions.value = Object.assign({}, mapData.startingRegions);
  }

  return {
    ...toRefs(state),
    plannerFactions,
    ownedRegions,

    createBookmark: () => createBookmark(ownedRegions, data.common.factions),
    reset: () => reset(ownedRegions, mapData.startingRegions),
    clear: () => clear(ownedRegions),
  };
}
