import * as fs from "fs-extra";
import * as path from "path";

import { getRegions } from "./scripts";
import { getChokePoints } from "./scripts/choke-points";
import { getStartPosRegions } from "./scripts/starting-regions"

import climates from "./common/climates.json";
import { getFactions } from "./common/factions";
import { getResources } from "./common/resources";

const maps = [
  {
    key: "mortal",
    campaign: "main_warhammer",
    dataPath: "./mortal",
    width: 4095,
    height: 3350
  },
  {
    key: "vortex",
    campaign: "wh2_main_great_vortex",
    dataPath: "./vortex",
    width: 3376,
    height: 3868
  }
];

function outputJson(filePath: string, data: any) {
  fs.outputJson(path.resolve(__dirname, filePath), data, { spaces: 2 });
}

Object.values(maps).forEach(async (map) => {
  const mapDataPath = path.resolve(__dirname, map.dataPath, "map_data.esf");
  const regionDataPath = path.resolve(__dirname, map.dataPath, "region_paths.svg");
  const chokepointDataPath = path.resolve(__dirname, map.dataPath, "catchments.svg");
  const regions = await getRegions(map.campaign, mapDataPath, regionDataPath, { width: map.width, height: map.height });
  const chokepoints = await getChokePoints(chokepointDataPath);
  const startingRegions = getStartPosRegions(map.campaign);

  outputJson(`../../src/store/data/${map.key}/regions.json`, regions);
  outputJson(`../../src/store/data/${map.key}/chokepoints.json`, chokepoints);
  outputJson(`../../src/store/data/${map.key}/starting-regions.json`, startingRegions);
});

outputJson("../../src/store/data/common/climates.json", climates);
outputJson("../../src/store/data/common/factions.json", getFactions());
outputJson("../../src/store/data/common/resources.json", getResources());
