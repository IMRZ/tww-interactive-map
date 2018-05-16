
const promise = new Promise((resolve) => {
  const climates = require("./climates.json");
  resolve(climates);
});

module.exports = promise;
