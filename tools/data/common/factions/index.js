const path = require("path");
const { readFile, xmlToJson, rgbToHexString, propsDotPath } = require("../../util");

const FACTION_PROPS = [
  "key.0",
  "screen_name.0._",
  "flags_path.0",
  "primary_colour_r.0",
  "primary_colour_g.0",
  "primary_colour_b.0"
];

function map(json) {
  return json.dataroot.factions.reduce((accumulator, faction) => {
    const [key, name, flagsPath, r, g, b] = propsDotPath(FACTION_PROPS, faction);
    accumulator[key] = {
      key,
      name,
      flagsPath: flagsPath.replace(/\\/g, "/"),
      primaryColour: rgbToHexString({ r, g, b })
    };
    return accumulator;
  }, {});
}

/** amend WH1 Norsca DLC to factions */
function amend(factions) {
  const ammend_factions = require("./factions.json");

  Object.values(ammend_factions).forEach(faction => {
    const key = faction.key;
    factions[key] = faction;
  });

  return factions;
}

const factionsXmlPath = path.resolve(__dirname, "./factions.xml");

const promise = readFile(factionsXmlPath)
  .then(xmlToJson)
  .then(map)
  .then(amend);

module.exports = promise;
