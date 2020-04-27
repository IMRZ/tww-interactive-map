import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueGtag from 'vue-gtag';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

import './registerServiceWorker'
const App = require('./App.vue').default;
const router = require('./router').default;

if (!window.webpackHotUpdate) {
  const gtagId = 'UA-164225754-1';
  Vue.use(VueGtag, {
    config: {
      id: gtagId,
      params: {
        send_page_view: false
      },
    },
    onReady(gtag) {
      // send initial page-view after load
      gtag('config', gtagId, {
        'page_path': location.hash.substring(1)
      });
    }
  }, router);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
