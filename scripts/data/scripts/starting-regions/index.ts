import * as twdb from "tw-db";

export function getStartPosRegions(campaign) {
  const wh2Db = twdb.createInstanceWarhammer2("/mnt/d/Program\ Files\ (x86)/Steam/steamapps/common/Total\ War\ WARHAMMER\ II/assembly_kit/raw_data/db");

  const result = wh2Db.startPosRegions
    .filter(entry => entry._campaign === campaign)
    .reduce((accumulator, startPosRegion) => {
      const owningFaction = startPosRegion._owningFaction ? startPosRegion.owningFaction.faction.key : null;
      accumulator[startPosRegion.region.key] = owningFaction;
      return accumulator;
    }, {});

  return result;
}
