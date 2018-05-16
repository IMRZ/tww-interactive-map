const path = require("path");
const { readFile, xmlToJson, propsDotPath } = require("../../util");

const PROVINCE_PROPS = [
  "key.0",
  "onscreen.0._"
];

function map(json) {
  return json.dataroot.provinces.reduce((accumulator, province) => {
    const [key, name] = propsDotPath(PROVINCE_PROPS, province);
    accumulator[key] = { key, name };
    return accumulator;
  }, {});
}

const provincesXmlPath = path.resolve(__dirname, "./provinces.xml");

const promise = readFile(provincesXmlPath)
  .then(xmlToJson)
  .then(map);

module.exports = promise;
