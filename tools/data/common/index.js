
const promise = Promise.all([
  require("./campaign_map_settlements"),
  require("./climates"),
  require("./factions"),
  require("./provinces"),
  require("./regions"),
  require("./region_to_province_junctions"),
  require("./resources")()
]).then(([
  campaignMapSettlements,
  climates,
  factions,
  provinces,
  regions,
  regionToProvinceJunctions,
  resources,
]) => {
  const battleMaps = require("./battle_maps.json");

  return {
    campaignMapSettlements,
    climates,
    factions,
    provinces,
    regions,
    regionToProvinceJunctions,
    battleMaps,
    resources
  };
});

module.exports = promise;
