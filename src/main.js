import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import { sync } from "vuex-router-sync";
import tooltipDirective from "@/directives/tooltip";
import TwwUi from "tww-ui";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(TwwUi);
Vue.directive("tooltip", tooltipDirective);

const router = require("./router").default;
const store = require("./store").default;

sync(store, router);

const App = require("./App.vue").default;
require("./registerServiceWorker");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
