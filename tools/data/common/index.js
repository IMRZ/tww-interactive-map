const fs = require("fs");
const path = require("path");

const promise = Promise.all([
  require("./campaign_map_settlements"),
  require("./climates"),
  require("./factions"),
  require("./provinces"),
  require("./regions"),
  require("./region_to_province_junctions")
]).then(([
  campaignMapSettlements,
  climates,
  factions,
  provinces,
  regions,
  regionToProvinceJunctions
]) => {
  const battleMaps = require("./battle_maps.json");

  return {
    campaignMapSettlements,
    climates,
    factions,
    provinces,
    regions,
    regionToProvinceJunctions,
    battleMaps
  };
});

module.exports = promise;
