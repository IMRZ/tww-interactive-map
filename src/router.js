import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import MainView from "@/views/MainView";
import MapView from "@/views/MapView";

export default new Router({
  routes: [
    {
      path: "/",
      component: MainView
    },
    {
      path: "/map/:id",
      component: MapView
    }
  ]
});
