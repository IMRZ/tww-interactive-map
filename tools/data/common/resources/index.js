const path = require("path");
const parseCsv = require("csvtojson");

async function parseStartPosRegionSlotTemplates() {
  const filePath = path.resolve(__dirname, "./start_pos_region_slot_templates.csv");
  const config = {
    delimiter: "\t",
    noheader: true,
    headers: ["id", "campaign", "region", "slot_type", "slot_template", "unique"]
  };

  const result = await parseCsv(config).fromFile(filePath);

  return result;
}

async function parseSlotTemplates() {
  const filePath = path.resolve(__dirname, "./slot_templates.csv");
  const config = {
    delimiter: "\t",
    noheader: true,
    headers: ["key", "resource"]
  };

  const result = await parseCsv(config).fromFile(filePath);

  return result;
}

async function parseResources() {
  const filePath = path.resolve(__dirname, "./resources.csv");
  const config = {
    delimiter: "\t",
    noheader: true,
    headers: ["icon_filepath", "key", "onscreen_text", "strategic_value", "unit", "trade_value", "description", "long_description", "in_encyclopedia", "show_on_city_infobar"]
  };

  const parseResult = await parseCsv(config).fromFile(filePath);

  const result = parseResult.reduce((accumulator, value) => {
    const { key, icon_filepath, onscreen_text, description  } = value;
    const icon_path = icon_filepath.replace(/\\/g, "/").replace(/ui\/campaign ui\/effect_bundles\//g, "ui/resources/");

    accumulator[key] = {
      key: key,
      icon_path: icon_path,
      name: onscreen_text,
      description: description,
    };

    return accumulator
  }, {});

  // just add port as a resource here, for tooltips etc.
  result["port"] = {
    key: "port",
    icon_path: "ui/resources/icon_port.png",
    name: "Port",
    description: ""
  };

  return result;
}

module.exports = async function () {
  const [
    start_pos_region_slot_templates,
    slot_templates,
    resources
  ] = await Promise.all([
    parseStartPosRegionSlotTemplates(),
    parseSlotTemplates(),
    parseResources()
  ]);

  const resources_map = start_pos_region_slot_templates.reduce((accumulator, value) => {
    if (accumulator[value.campaign] === undefined) {
      accumulator[value.campaign] = [];
    }

    accumulator[value.campaign].push(value);

    return accumulator;
  }, {});

  function getRegionsResources(values) {
    return values.reduce((accumulator, value) => {
      if (accumulator[value.region]  === undefined) {
        accumulator[value.region] = [];
      }

      const slotTemplate = slot_templates.find(st => st.key === value.slot_template);

      accumulator[value.region].push(slotTemplate);

      return accumulator;
    }, {});
  }

  return {
    resources,
    vortex: getRegionsResources(resources_map["wh2_main_great_vortex"]),
    mortal: getRegionsResources(resources_map["main_warhammer"]),
  };
};
