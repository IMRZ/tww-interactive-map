const fs = require("fs");
const path = require("path");

const promise = Promise.all([
  require("./common"),
  require("./mortal_empires"),
  // require("./vortex")
]).then(([
  common,
  mortal_empires,
  vortex
]) => {
  fs.writeFileSync(path.resolve(__dirname, "../../src/store/data/common.json"), JSON.stringify(common, null, 2));
  fs.writeFileSync(path.resolve(__dirname, "../../src/store/data/mortal_empires.json"), JSON.stringify(mortal_empires, null, 2));
  // fs.writeFileSync(path.resolve(__dirname, "../../src/store/data/vortex.json"), JSON.stringify(vortex, null, 2));
});
