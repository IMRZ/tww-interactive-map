
const CURRENT_VERSION = "v1.8.0";

const common = {
  climates: require("@/data/common/climates.json"),
  factions: require("@/data/common/factions.json"),
  resources: require("@/data/common/resources.json")
};

const maps = {
  mortal_empires: {
    "v1.8.0": {
      chokepoints: require("@/data/maps/mortal_empires/v1.8.0/chokepoints.json"),
      regions: require("@/data/maps/mortal_empires/v1.8.0/regions.json"),
      starting_regions: require("@/data/maps/mortal_empires/v1.8.0/starting_regions.json"),
    }
  },
  vortex: {
    "v1.8.0": {
      chokepoints: require("@/data/maps/vortex/v1.8.0/chokepoints.json"),
      regions: require("@/data/maps/vortex/v1.8.0/regions.json"),
      starting_regions: require("@/data/maps/vortex/v1.8.0/starting_regions.json"),
    }
  }
};

export function useData() {
  return {
    currentVersion: CURRENT_VERSION,
    common,
    maps
  };
}
