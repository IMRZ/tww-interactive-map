module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: false,
  pwa: {
    name: "tww-interactive-map",
    short_name: "tww-interactive-map",
    themeColor: "#000000",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
