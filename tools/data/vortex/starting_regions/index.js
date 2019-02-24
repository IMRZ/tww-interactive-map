
const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const TwsParser = require("total-war-save-parser");

function getRegionOwners(rootNode) {
  const regionsArray = rootNode.data
    .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
    .find(n => n.name === "CAMPAIGN_ENV").data
    .find(n => n.name === "CAMPAIGN_MODEL").data
    .find(n => n.name === "WORLD").data
    .find(n => n.name === "REGION_MANAGER").data
    .find(n => n.name === "REGIONS_ARRAY").data;

  const result = regionsArray.map(entry => {
    const region = entry.data.find(n => n.name === "REGION").data;

    return {
      regionKey: region[1],
      regionOwnerIndex: region[14]
    };
  });

  return result;
}

function getActiveFactions(rootNode) {
  const factionArray = rootNode.data
    .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
    .find(n => n.name === "CAMPAIGN_ENV").data
    .find(n => n.name === "CAMPAIGN_MODEL").data
    .find(n => n.name === "WORLD").data
    .find(n => n.name === "FACTION_ARRAY").data;

  const result = factionArray.map(entry => {
    const faction = entry.data.find(n => n.name === "FACTION").data;

    return {
      index: faction[0],
      factionKey: faction[1]
    };
  });

  return result;
}

async function getStartingRegions() {
  const fileName = path.resolve(__dirname, "./vortex_lothern_turn_0_v1_5_1.save");
  const rootNode = await readFile(fileName).then(buffer => TwsParser.read(buffer));

  const active_factions = getActiveFactions(rootNode);
  const regions_owners = getRegionOwners(rootNode);

  return regions_owners.reduce((accumulator, entry) => {
    const { regionKey, regionOwnerIndex } = entry;
    const faction = active_factions.find(af => af.index === regionOwnerIndex);

    accumulator[regionKey] = faction ? faction.factionKey : null;

    return accumulator;
  }, {});
}

module.exports = getStartingRegions;
