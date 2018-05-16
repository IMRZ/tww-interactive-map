const path = require("path");
const { readFile, xmlToJson, propsDotPath } = require("../../util");

const JUNCTION_PROPS = [
  "region.0",
  "province.0",
  "is_capital.0"
];

function map(json) {
  return json.dataroot.region_to_province_junctions.reduce((accumulator, junction) => {
    const [regionKey, provinceKey, isCapital] = propsDotPath(JUNCTION_PROPS, junction);
    accumulator[regionKey] = {
      regionKey,
      provinceKey,
      isCapital: isCapital == "1"
    };
    return accumulator;
  }, {});
}

const region_to_province_junctions = path.resolve(__dirname, "./region_to_province_junctions.xml");

const promise = readFile(region_to_province_junctions)
  .then(xmlToJson)
  .then(map);

module.exports = promise;
