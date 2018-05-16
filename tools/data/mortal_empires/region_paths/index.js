const path = require("path");
const { readFile, xmlToJson, propsDotPath } = require("../../util");

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

const region_paths_master = path.resolve(__dirname, "./region_paths_master.svg");

const promise = readFile(region_paths_master)
  .then(xmlToJson)
  .then(map);

module.exports = promise;
