import * as fs from "fs-extra";
import * as xml2js from "xml2js";

export async function getRegionPaths(regionPathData: string) {
  const file = fs.readFileSync(regionPathData);
  const json = await xml2js.parseStringPromise(file);

  const result = {};

  json.svg.path.reduce((accumulator, path) => {
    const { fill, d } = path.$;
    accumulator[fill] = { fill, d };
    return accumulator;
  }, result);

  json.svg.g.reduce((accumulator, g) => {
    const fill = g.$.fill;
    const paths = g.path;

    const d = paths.reduce((combinedPath, path) => {
      if (combinedPath) { combinedPath += " " }
      return combinedPath += path.$.d;
    }, "");

    accumulator[fill] = { fill, d };

    return accumulator;
  }, result); // no need to merge with existing object

  return result;
}
