const path = require("path");
const parseCsv = require("csvtojson");

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

async function parseFactionsCsv() {
  const filePath = path.resolve(__dirname, "./factions.csv");
  const config = {
    delimiter: "\t",
    noheader: true,
    headers: [
      "key",
      "index",
      "subculture",
      "category",
      "screen_name",
      "screen_name_when_rebels",
      "screen_adjective",
      "name_group",
      "skin",
      "is_rebel",
      "flags_path",
      "republican_flag_path",
      "same_gov_type_revolution_flag_path",
      "primary_colour_r",
      "primary_colour_g",
      "primary_colour_b",
      "alt_primary_colour_r",
      "alt_primary_colour_g",
      "alt_primary_colour_b",
      "secondary_colour_r",
      "secondary_colour_g",
      "secondary_colour_b"
    ]
  };

  const result = await parseCsv(config).fromFile(filePath);

  return result;
}

const FLAG_KEY_PATTERN = /^ui\\flags\\(.*)$/;

module.exports = async () => {
  const factions = await parseFactionsCsv().then((factions) => {
    /* TODO: remove this when 'Prophet & The Warlock' is released. */
    return factions.concat(require("./_temp_"));
  });

  return factions.reduce((accumulator, faction) => {
    const {
      key,
      screen_name,
      flags_path,
      primary_colour_r,
      primary_colour_g,
      primary_colour_b
    } = faction;

    const [fullMatch, flagKey] = flags_path.toLowerCase().match(FLAG_KEY_PATTERN);

    accumulator[key] = {
      key,
      name: screen_name,
      flagKey,
      primaryColour: rgbToHexString({ r: primary_colour_r, g: primary_colour_g, b: primary_colour_b }),
    };

    return accumulator;
  }, {});
};
