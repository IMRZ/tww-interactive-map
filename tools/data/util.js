const fs = require("fs");
const xml2js = require("xml2js");
const { promisify } = require("util");
const R = require("ramda");
const dotPath = R.useWith(R.path, [R.split('.')]);
const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

module.exports = {
  readFile: promisify(fs.readFile),
  xmlToJson: promisify(xml2js.parseString),
  rgbToHexString: rgbToHexString,
  propsDotPath: propsDotPath
};
