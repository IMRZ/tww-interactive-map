
function isMortalEmpires(key) {
  const notTestbed = !key.startsWith("wh2_main_testbed_");
  const notVortex = !key.startsWith("wh2_main_vor_");
  return notTestbed && notVortex;
}

function combineRegionData(regions, provinces, regionToProvinceJunctions, campaignMapSettlements, regionPaths) {
  // TODO: fix me cant find key 'wh2_main_sartosa_sartosa'
  campaignMapSettlements["wh2_main_sartosa_sartosa"] = { key: "wh2_main_sartosa_sartosa", climate: "temperate" };

  return Object.values(regions)
    .filter(region => isMortalEmpires(region.key))
    .filter(region => region.isSea === false)
    .reduce((accumulator, region) => {
      const junction = regionToProvinceJunctions[region.key];
      const province = junction ? provinces[junction.provinceKey] : undefined;
      const settlement = campaignMapSettlements[region.key];

      if (province && settlement) {
        accumulator[region.key] = {
          key: region.key,
          provinceKey: province.key,
          name: region.name,
          isCapital: junction.isCapital,
          climate: settlement.climate,
          fill: region.fill,
          d: regionPaths[`#${region.fill}`].d
        };
      } else {
        console.warn(`mortal_empires#combineRegionData: skipping ${region.key}`);
      }

      return accumulator;
    }, {});
}

function combineProvinceData(regions, provinces) {
  return Object.values(regions)
    .filter(region => region.isCapital)
    .reduce((accumulator, region) => {
      accumulator[region.provinceKey] = {
        key: region.provinceKey,
        name: provinces[region.provinceKey].name,
        fill: region.fill
      };
      return accumulator;
    }, {});
}

const promise = Promise.all([
  require("../common"),
  require("./choke_points"),
  require("./region_paths")
]).then(([
  common,
  chokepoints,
  regionPaths
]) => {
  const { campaignMapSettlements, climates, factions, provinces, regions, regionToProvinceJunctions } = common;
  const combinedRegionData = combineRegionData(regions, provinces, regionToProvinceJunctions, campaignMapSettlements, regionPaths);
  const combinedProvinceData = combineProvinceData(combinedRegionData, provinces);
  const startpositions = require("./start_positions.json");
  const settlements = require("./settlements.json");

  return {
    regions: combinedRegionData,
    provinces: combinedProvinceData,
    chokepoints: chokepoints,
    startpositions: startpositions,
    settlements: settlements
  };
});

module.exports = promise;
