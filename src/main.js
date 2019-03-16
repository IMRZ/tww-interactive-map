import Vue from "vue";
import App from "./App.vue";
import { sync } from "vuex-router-sync";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import tooltipDirective from "@/directives/tooltip";

import TwwUi from "tww-ui/dist/tww-ui.common";
import "tww-ui/dist/tww-ui.css";

Vue.config.productionTip = false;
sync(store, router);

Vue.use(TwwUi);

Vue.directive("tooltip", tooltipDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
