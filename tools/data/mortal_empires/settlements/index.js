
const fs = require("fs");
const path = require("path");
const TwsParser = require("total-war-save-parser");

function main() {
  const file = fs.readFileSync(path.resolve(__dirname, "../src.save"));
  const rootNode = TwsParser.read(file);

  const regionsArray = rootNode.data
    .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
    .find(n => n.name === "CAMPAIGN_ENV").data
    .find(n => n.name === "CAMPAIGN_MODEL").data
    .find(n => n.name === "WORLD").data
    .find(n => n.name === "REGION_MANAGER").data
    .find(n => n.name === "REGIONS_ARRAY").data;

  return regionsArray.map(entry => {
    const region = entry.data.find(n => n.name === "REGION").data;
    const settlement = region.find(n => n.name === "SETTLEMENT").data;
    const settlement_expansion_manager = settlement.find(n => n.name === "SETTLEMENT_EXPANSION_MANAGER").data;

    const settlementX = settlement_expansion_manager[4] * (4095 / 1013);
    const settlementY = 3350 - (settlement_expansion_manager[5] * (3350 / 717));

    return {
      key: region[1],
      x: Math.round(settlementX),
      y: Math.round(settlementY)
    };
  });
};

main().length;

module.exports = main;
