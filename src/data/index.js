export const gameDataVersion = '1.9.x';

export const maps = {
  mortal: {
    path: require('./mortal/wh_main_map.png'),
    textPath: require('./mortal/wh_main_map_text.png'),
    width: 4096,
    height: 3352,
  },
  vortex: {
    path: require('./vortex/wh2_main_great_vortex_map.png'),
    textPath: require('./vortex/wh2_main_great_vortex_map_text.png'),
    width: 3376,
    height: 3868,
  }
};

export const data = {
  common: {
    climates: require('./common/climates.json'),
    factions: require('./common/factions.json'),
    resources: require('./common/resources.json')
  },
  mortal: {
    regions: require('./mortal/regions.json'),
    startingRegions: require('./mortal/starting_regions.json'),
    startingPositions: require('./mortal/starting_positions.json'),
    chokepoints: require('./mortal/choke_points.json')
  },
  vortex: {
    regions: require('./vortex/regions.json'),
    startingRegions: require('./vortex/starting_regions.json'),
    startingPositions: require('./vortex/starting_positions.json'),
    chokepoints: require('./vortex/choke_points.json')
  }
};
