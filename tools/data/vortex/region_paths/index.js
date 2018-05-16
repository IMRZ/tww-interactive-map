const path = require("path");
const { readFile, xmlToJson, rgbToHexString, propsDotPath } = require("../../util");

const REGION_PATH_PROPS = [
  "$.fill",
  "$.d"
];

function map(json) {
  return json.svg.path.reduce((accumulator, regionPath) => {
    const [fill, d] = propsDotPath(REGION_PATH_PROPS, regionPath);
    accumulator[fill] = { fill, d };
    return accumulator;
  }, {});
}

const regionsPathsSvgPath = path.resolve(__dirname, "./region_paths.svg");

const promise = readFile(regionsPathsSvgPath)
  .then(xmlToJson)
  .then(map);

module.exports = promise;
