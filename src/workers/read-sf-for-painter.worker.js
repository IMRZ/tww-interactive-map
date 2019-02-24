
import * as TwsParser  from "total-war-save-parser";

self.addEventListener('message', (event) => {
  try {
    const rootNode = TwsParser.read(event.data);

    const regionsArray = rootNode.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "REGION_MANAGER").data
      .find(n => n.name === "REGIONS_ARRAY").data;

    const regions_owners = regionsArray.map(entry => {
      const region = entry.data.find(n => n.name === "REGION").data;

      return {
        regionKey: region[1],
        regionOwnerIndex: region[14]
      };
    });

    const factionArray = rootNode.data
      .find(n => n.name === "CAMPAIGN_SAVE_GAME").data
      .find(n => n.name === "CAMPAIGN_ENV").data
      .find(n => n.name === "CAMPAIGN_MODEL").data
      .find(n => n.name === "WORLD").data
      .find(n => n.name === "FACTION_ARRAY").data;

    const active_factions = factionArray.map(entry => {
    const faction = entry.data.find(n => n.name === "FACTION").data;

    return {
        index: faction[0],
        factionKey: faction[1]
      };
    });

    const result = regions_owners.reduce((accumulator, entry) => {
      const { regionKey, regionOwnerIndex } = entry;
      const faction = active_factions.find(af => af.index === regionOwnerIndex);

      accumulator[regionKey] = faction ? faction.factionKey : null;

      return accumulator;
    }, {});

    self.postMessage({ success: true, result: result });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
});
