const path = require("path");
const { readFile, xmlToJson, rgbToHexString, propsDotPath } = require("../../util");

const REGION_PROPS = [
  "key.0",
  "onscreen.0._",
  "r.0",
  "g.0",
  "b.0",
  "is_sea.0"
];

function map(json) {
  return json.dataroot.regions.reduce((accumulator, region) => {
    const [key, name, r, g, b, isSea] = propsDotPath(REGION_PROPS, region);
    accumulator[key] = {
      key,
      name,
      fill: rgbToHexString({ r, g, b }),
      isSea: isSea == "1"
    };
    return accumulator;
  }, {});
}

const regionsXmlPath = path.resolve(__dirname, "./regions.xml");

const promise = readFile(regionsXmlPath)
  .then(xmlToJson)
  .then(map);

module.exports = promise;
