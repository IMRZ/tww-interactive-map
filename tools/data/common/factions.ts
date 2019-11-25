import * as twdb from "tw-db";

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

const FLAG_KEY_PATTERN = /^ui\\flags\\(.*)$/;

export function getFactions() {
  const wh2Db = twdb.createInstanceWarhammer2("D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War WARHAMMER II\\assembly_kit\\raw_data\\db");

  const result = wh2Db.factions.reduce((accumulator, faction) => {

    const [/* fullMatch */, flagKey] = faction.flagsPath.toLowerCase().match(FLAG_KEY_PATTERN);

    accumulator[faction.key] = {
      key: faction.key,
      name: faction.screenName,
      flagKey,
      primaryColour: rgbToHexString({ r: faction.primaryColourR, g: faction.primaryColourG, b: faction.primaryColourB })
    };

    return accumulator;
  }, {});

  return result;
}
