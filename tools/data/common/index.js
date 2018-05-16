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
  // fs.writeFileSync(
  //   // path.resolve(__dirname, "../../src/store/data/") + "common.json",
  //   "src/store/data/common.json",
  //   JSON.stringify(common, null, 2)
  // );

  return {
    campaignMapSettlements,
    climates,
    factions,
    provinces,
    regions,
    regionToProvinceJunctions
  };
});

module.exports = promise;
