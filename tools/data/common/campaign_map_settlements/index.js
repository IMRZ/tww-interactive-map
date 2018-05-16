const path = require("path");
const { readFile, xmlToJson, propsDotPath } = require("../../util");

const CAMPAIGN_MAP_SETTLEMENT_PROPS = [
  "settlement_id.0",
  "climate_type.0"
];

function map(json) {
  return json.dataroot.campaign_map_settlements.reduce((accumulator, campaignMapSettlement) => {
    const values = propsDotPath(CAMPAIGN_MAP_SETTLEMENT_PROPS, campaignMapSettlement);
    const key = values[0].split(":")[1];
    const climate = values[1].split("_")[1];
    accumulator[key] = { key, climate };
    return accumulator;
  }, {});
}

/** Patch db errors/typos. */
function patch(campaignMapSettlements) {
  if (campaignMapSettlements["wh_main_blood_river_valley_barak_warr"]) {
    const incorrect = "wh_main_blood_river_valley_barak_warr";
    const correct = "wh_main_blood_river_valley_barak_varr";

    const settlement = {
      ...campaignMapSettlements[incorrect],
      key: correct
    };
    delete campaignMapSettlements[incorrect];
    campaignMapSettlements[correct] = settlement;
  } else {
    console.warn("common#campaign_map_settlements failed to patch: wh_main_blood_river_valley_barak_warr");
  }

  if (campaignMapSettlements["wh2_main_vor_ashens_coast_tyrant_peak"]) {
    const incorrect = "wh2_main_vor_ashens_coast_tyrant_peak";
    const correct = "wh2_main_vor_ashen_coast_tyrant_peak";

    const settlement = {
      ...campaignMapSettlements[incorrect],
      key: correct
    };
    delete campaignMapSettlements[incorrect];
    campaignMapSettlements[correct] = settlement;
  } else {
    console.warn("common#campaign_map_settlements failed to patch: wh2_main_vor_ashens_coast_tyrant_peak");
  }

  return campaignMapSettlements;
}

const campaignMapSettlementsXmlPath = path.resolve(__dirname, "./campaign_map_settlements.xml");

const promise = readFile(campaignMapSettlementsXmlPath)
  .then(xmlToJson)
  .then(map)
  .then(patch);

module.exports = promise;
