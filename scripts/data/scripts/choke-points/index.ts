import * as fs from "fs-extra";
import * as xml2js from "xml2js";
import * as twdb from "tw-db";

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

export async function getChokePoints(chokepointDataPath: string) {
  const file = fs.readFileSync(chokepointDataPath);
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

  const wh2Db = twdb.createInstanceWarhammer2("D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War WARHAMMER II\\assembly_kit\\raw_data\\db");

  const chokepointAreas = wh2Db.battleCatchmentOverrideAreas
    .filter(entry => entry.area.includes("_chokepoint_"))
    .map((entry) => {

      return {
        key: entry.area,
        fill: `#${rgbToHexString({ r: entry.red, g: entry.green, b: entry.blue })}`
      };
    });

  return Object.values(result).reduce((accumulator: any[], entry: any) => {
    const maybeChokepoint = chokepointAreas.find(cpa => cpa.fill === entry.fill);

    if (maybeChokepoint) {
      accumulator.push({
        key: maybeChokepoint.key,
        name: "",
        fill: maybeChokepoint.fill,
        d: entry.d,
      });
    }

    return accumulator;
  }, []);
}
