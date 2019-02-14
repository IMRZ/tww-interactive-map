const path = require("path");
const { readFile, xmlToJson, rgbToHexString, propsDotPath } = require("../../util");

const PATH_PROPS = [
  "$.fill",
  "$.d"
];

const G_PROPS = [
  "$.fill",
  "path"
];

function mapPaths(json) {
  const paths = json.svg.path.reduce((accumulator, path) => {
    const [fill, d] = propsDotPath(PATH_PROPS, path);
    accumulator[fill] = { fill, d };
    return accumulator;
  }, {});

  const gs = json.svg.g.reduce((accumulator, g) => {
    const [fill, paths] = propsDotPath(G_PROPS, g);
    const d = paths.reduce((combinedPath, path) => {
      if (combinedPath) { combinedPath += " " }
      return combinedPath += path.$.d;
    }, "");
    accumulator[fill] = { fill, d };
    return accumulator;
  }, {});

  return {
    ...paths,
    ...gs
  };
}

const region_paths_master = path.resolve(__dirname, "./region_paths_master.svg");

const promise = readFile(region_paths_master)
  .then(xmlToJson)
  .then(mapPaths);

module.exports = promise;
