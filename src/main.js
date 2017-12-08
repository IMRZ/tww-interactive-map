
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import store from './store';
import router from './router';
import App from './App';

Vue.config.productionTip = false;
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App />',
  components: { App }
});
