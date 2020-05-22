import * as twdb from "tw-db";

const ICON_PATH_PATTERN = /^ui\\campaign ui\\effect_bundles\\(.*)\.png$/;

export function getResources() {
  const wh2Db = twdb.createInstanceWarhammer2("/mnt/d/Program\ Files\ (x86)/Steam/steamapps/common/Total\ War\ WARHAMMER\ II/assembly_kit/raw_data/db");

  const result = wh2Db.resources.reduce((accumulator, entry) => {
    const [/* fullMatch */, iconKey] = entry.iconFilepath.match(ICON_PATH_PATTERN);

    accumulator[entry.key] = {
      key: entry.key,
      icon: iconKey,
      name: entry.onscreenText,
      description: entry.description
    };

    return accumulator;
  }, {});

  return result;
}

export function extract() {
  const wh2Db = twdb.createInstanceWarhammer2("/mnt/d/Program\ Files\ (x86)/Steam/steamapps/common/Total\ War\ WARHAMMER\ II/assembly_kit/raw_data/db");

  const result = wh2Db.startPosRegionSlotTemplates.reduce((accumulator, entry) => {
    if (accumulator[entry._campaign] === undefined) {
      accumulator[entry._campaign] = [];
    }

    if (accumulator[entry._campaign][entry._region] === undefined) {
      accumulator[entry._campaign][entry._region] = [];
    }

    const slotTemplate = entry.slotTemplate;

    accumulator[entry._campaign][entry._region].push({
      key: slotTemplate.key,
      resource: slotTemplate._resource
    });

    return accumulator;
  }, {});
}
