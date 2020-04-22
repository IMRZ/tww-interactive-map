/* webpack only */

const requireSkinsDefault = require.context('./skins/default', false, /^(.+)\.png$/);
const skinsDefault = requireSkinsDefault.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.png$/);
  accumulator[key] = requireSkinsDefault(imageName);
  return accumulator;
}, {});

const requireCampaignUiEffectBundles = require.context('./campaign_ui/effect_bundles', false, /^(.+)\.png$/);
const campaignUiEffectBundles = requireCampaignUiEffectBundles.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.png$/);
  accumulator[key] = requireCampaignUiEffectBundles(imageName);
  return accumulator;
}, {});

const requireCustomPortraits = require.context('./custom/portraits', false, /^(.+)\.png$/);
const customPortraits = requireCustomPortraits.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.png$/);
  accumulator[key] = requireCustomPortraits(imageName);
  return accumulator;
}, {});

const requireFlags = require.context('./flags', true, /^(.+)\.png$/);
const flags = requireFlags.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.png$/);
  accumulator[key] = requireFlags(imageName);
  return accumulator;
}, {});

export default {
  skins: {
    default: skinsDefault
  },
  campaign_ui: {
    effect_bundles: campaignUiEffectBundles
  },
  custom: {
    portraits: customPortraits
  },
  flags: flags
};
