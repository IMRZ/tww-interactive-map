import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueGtag from 'vue-gtag';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

import './registerServiceWorker'
const App = require('./App.vue').default;
const router = require('./router').default;

if (!window.webpackHotUpdate) {
  Vue.use(VueGtag, { config: { id: 'UA-164225754-1' } }, router);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
