import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LandingPage from '@/components/LandingPage';
import MapPage from '@/components/MapPage';

export default new Router({
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/map/:id',
      component: MapPage,
      props: (route) => ({
        mapId: route.params.id,
        overlay: route.query.overlay
      }),
    }
  ]
});
