import * as twdb from "tw-db";
import { getSettlements } from "./settlements";
import { getRegionPaths } from "./region-paths";

interface RegionData {
  key: string;
  name: string;
  fill: string;
  d: string;
  isCapital: boolean;
  province: {
    name: string;
    fill: string;
  },
  climate: string;
  settlement: {
    x: number;
    y: number;
    port: boolean;
    fortress: String | null;
    strategicLocations: any[];
    strategicResources: any[];
  }
}

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

export async function getRegions(campaignKey: string, mapDataPath: string, regionPathData: string, dims) {
  const settlements = getSettlements(mapDataPath, dims);
  const wh2Db = twdb.createInstanceWarhammer2("D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War WARHAMMER II\\assembly_kit\\raw_data\\db");

  function getResources(regionKey: string) {
    const entries = wh2Db.startPosRegionSlotTemplates.filter(entry => entry._campaign === campaignKey && entry._region === regionKey);

    return entries.reduce((accumulator, { slotTemplate }) => {
      if (slotTemplate.key.endsWith("port")) {
        accumulator.port = true;
      } else if (slotTemplate._resource) {
        if (slotTemplate._resource === "res_fortress" || slotTemplate._resource === "res_empire_fort") {
          accumulator.fortress = slotTemplate._resource;
        } else if (slotTemplate._resource.startsWith("res_location")) {
          if (accumulator.strategicLocations.includes(slotTemplate._resource) === false) {
            // dont add duplicates
            accumulator.strategicLocations.push(slotTemplate._resource);
          }
        } else {
          if (accumulator.strategicResources.includes(slotTemplate._resource) === false) {
            // dont add duplicates
            accumulator.strategicResources.push(slotTemplate._resource);
          }
        }
      }

      return accumulator;
    }, {
      port: false,
      fortress: null,
      strategicLocations: [],
      strategicResources: []
    });
  }

  function getRegionClimate(regionKey): string {
    // missing mortal map
    if (regionKey === "wh2_main_great_mortis_delta_black_pyramid_of_nagash") {
      return "desert";
    }

    if (regionKey === "wh2_main_sartosa_sartosa") {
      return "temperate";
    }

    if (regionKey === "wh_main_blood_river_valley_barak_varr") {
      return "mountain";
    }

    // missing vortex map
    if (regionKey === "wh2_main_vor_ash_river_springs_of_eternal_life") {
      return "desert";
    }

    if (regionKey === "wh2_main_vor_ashen_coast_titan_peak") {
      return "mountain";
    }

    if (regionKey === "wh2_main_vor_ashen_coast_tyrant_peak") {
      return "mountain";
    }

    if (regionKey === "wh2_main_vor_great_mortis_delta_black_pyramid_of_nagash") {
      return "desert";
    }

    if (regionKey === "wh2_main_vor_grey_guardians_sulpharets") {
      return "wasteland";
    }

    if (regionKey === "wh2_main_vor_land_of_the_dead_the_salt_plain") {
      return "desert";
    }

    const campaignMapSettlement = wh2Db.campaignMapSettlements.find((entry) => {
      const [/* tag */, key] = entry.settlementId.split(":");
      return key === regionKey;
    });

    if (!campaignMapSettlement) throw new Error(`Could not find campaignMapSettlement: ${regionKey}`);

    const [/* prefix */, climate] = campaignMapSettlement._climateType.split("_");

    return climate;
  }

  const regionPaths = await getRegionPaths(regionPathData);

  const result = Object.values(settlements).reduce<{ [key: string]: RegionData }>((accumulator, settlement) => {
    const region = wh2Db.regions.find(entry => entry.key === settlement.key);
    const provinceJunction = wh2Db.regionToProvinceJunctions.find(entry => entry._region === region.key);
    const provinceCapitalRegion = wh2Db.regionToProvinceJunctions.find(entry => entry._province === provinceJunction._province && entry.isCapital === true).region;
    const regionResources = getResources(region.key);
    const regionFill = `#${rgbToHexString(region)}`;
    const provinceFill = `#${rgbToHexString(provinceCapitalRegion)}`;
    const regionPath = regionPaths[regionFill];
    const regionClimate = getRegionClimate(region.key);

    if (!regionPath) throw Error(`Could not find regionPath for: ${region.key} - ${regionFill}`);

    accumulator[region.key] = {
      key: region.key,
      name: region.onscreen,
      fill: regionFill,
      d: regionPath.d,
      isCapital: provinceJunction.isCapital,
      province: {
        name: provinceJunction.province.onscreen,
        fill: provinceFill,
      },
      climate: regionClimate,
      settlement: {
        x: settlement.x,
        y: settlement.y,
        ...regionResources
      }
    };

    return accumulator;
  }, {});

  return result;
}
