module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  lintOnSave: false,
  pwa: {
    name: 'Total War: Warhammer II - Interactive Map',
    short_name: 'twwim',
    themeColor: '#000000',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
};
