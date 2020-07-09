import { reactive, toRefs, ref } from '@vue/composition-api';
import { gameDataVersion, data } from '@/data';
import router from '../router';
import { useAlert, ALERT_TYPE } from '@/use/alert';

const ERROR = {
  VERSION_DOES_NOT_MATCH: 'VERSION_DOES_NOT_MATCH'
};

function getStateFromQueryParams(startingRegions, factions) {
  const stateFromQuery = router.app._route?.query?.state;

  if (stateFromQuery) {
    const factionsIndexed = Object.values(factions);

    const [version, ...factionsArray] = stateFromQuery.split(',');

    if (version != gameDataVersion) {
      const error = new Error(ERROR.VERSION_DOES_NOT_MATCH);
      error.requestedVersion = version;
      throw error;
    }

    const arr = factionsArray.map((value) => {
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

    removeStateFromQuery();

    return result;
  } else {
    return null;
  }
}

function removeStateFromQuery() {
  const { state, ...otherQueryParams } = router.currentRoute.query; // eslint-disable-line no-unused-vars
  router.replace({ query: otherQueryParams });
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

  arr.unshift(gameDataVersion);
  const newState = arr.join(',');

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
  .filter((f) => f.primaryColour !== '000000' && !f.name.startsWith('{{'))
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

function clear(ownedRegionsRef) {
  const cleared = Object.assign({}, ownedRegionsRef.value); // copy
  Object.keys(cleared).forEach(key => cleared[key] = null); // reset
  ownedRegionsRef.value = cleared;
}

function reset(ownedRegionsRef, startingRegions) {
  ownedRegionsRef.value = Object.assign({}, startingRegions);
}

// TODO: cleanup this shit
export function usePlanner(mapData) {
  const { showAlert } = useAlert();

  const state = reactive({
    selectedFaction: null
  });

  const ownedRegions = ref(null);
  let fromQuery = null;

  try {
    fromQuery = getStateFromQueryParams(mapData.startingRegions, data.common.factions);
  } catch (error) {
    if (error.message === ERROR.VERSION_DOES_NOT_MATCH) {
      const requestedVersion = /\d+\.\d+\.x/.test(error.requestedVersion) ? error.requestedVersion : 'latest'; // should match pattern #.#.x or redirect to latest
      const hrefToOlderVersion = location.href.replace('/latest/', `/${requestedVersion}/`);
      showAlert(ALERT_TYPE.REDIRECT_OLDER_VERSION, {
        href: hrefToOlderVersion,
        onDismiss: removeStateFromQuery
      });
    }
  }

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
    exportJson: () => {
      const a = document.createElement('a');
      const json = JSON.stringify(ownedRegions.value, null, 2);
      a.href = URL.createObjectURL(new Blob([json], { type: 'text/json' }));
      a.download = 'map.json';
      a.click();
    },
    importJson: () => {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', '.json');

      fileInput.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const mapJson = JSON.parse(event.target.result);

          // has to be sorted alphabetically?
          const ordered = Object.keys(mapJson).sort().reduce((accumulator, key) => {
            accumulator[key] = mapJson[key];
            return accumulator;
          }, {});

          ownedRegions.value = ordered;
        };
        reader.onerror = (err) => console.log(err);

        reader.readAsText(e.target.files[0]);
      };

      fileInput.click();
    }
  };
}
