module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: false,
  pwa: {
    name: "Total War: Warhammer - Interactive Map",
    short_name: "ttwim",
    themeColor: "#000000",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
