const path = require("path");
const { readFile, xmlToJson, rgbToHexString, propsDotPath } = require("../../util");

const CATCHMENT_PROPS = [
  "area.0",
  "red.0",
  "green.0",
  "blue.0"
];

const PATH_PROPS = [
  "$.fill",
  "$.d"
];

const G_PROPS = [
  "$.fill",
  "path"
];

function mapData(json) {
  return json.dataroot.battle_catchment_override_areas.reduce((accumulator, catchment) => {
    const [key, r, g, b] = propsDotPath(CATCHMENT_PROPS, catchment);
    const fill = rgbToHexString({ r, g, b });
    accumulator[key] = { key, fill };
    return accumulator;
  }, {});
}

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

function combine(data, paths) {
  return Object.values(data).filter(catchment => {
    return catchment.key.startsWith("wh2_main_chokepoint");
  }).reduce((accumulator, catchment) => {
    const path = paths[`#${catchment.fill}`];
    if (path) {
      const chokepoint = {
        key: catchment.key,
        fill: catchment.fill,
        d: path.d
      };
      accumulator.push(chokepoint);
    } else {
      console.warn(`mortal_empires/chokepoints#combine: skipping ${catchment.key}`);
    }

    return accumulator;
  }, []);
}

const battle_catchment_override_areas = region_paths_master = path.resolve(__dirname, "./battle_catchment_override_areas.xml");
const catchment_paths_master = region_paths_master = path.resolve(__dirname, "./catchment_paths_master.svg");

const promise = Promise.all([
  readFile(battle_catchment_override_areas),
  readFile(catchment_paths_master)
]).then(xmlFiles => {
  return Promise.all(xmlFiles.map(xmlFile => xmlToJson(xmlFile)));
}).then(([
  dataJson,
  pathsJson
]) => {
  const data = mapData(dataJson)
  const paths = mapPaths(pathsJson);
  return combine(data, paths);
});

module.exports = promise;
