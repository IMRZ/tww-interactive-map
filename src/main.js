import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

import './registerServiceWorker'
const App = require('./App.vue').default;
const router = require('./router').default;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
