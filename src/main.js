import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";

import tooltipDirective from "@/directives/tooltip";

import TwwUi from "tww-ui";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

sync(store, router);

Vue.use(TwwUi);

Vue.directive("tooltip", tooltipDirective);

const App = require("./App.vue").default;
require("./registerServiceWorker");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
