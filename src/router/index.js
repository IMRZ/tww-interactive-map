import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import MapView from '@/views/MapView';
import MapStrategic from '@/views/MapStrategic';
import MapPlanner from '@/views/MapPlanner';
import MapStartpos from '@/views/MapStartpos';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: { name: 'home' }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/map/:mapId',
    component: MapView,
    props: (route) => ({ mapId: route.params.mapId, query: route.query }),
    children: [
      {
        path: 'strategic',
        name: 'strategic',
        component: MapStrategic,
        props: (route) => ({ mapId: route.params.mapId, query: route.query })
      },
      {
        path: 'planner',
        name: 'planner',
        component: MapPlanner,
        props: (route) => ({ mapId: route.params.mapId, query: route.query })
      },
      {
        path: 'startpos',
        name: 'startpos',
        component: MapStartpos,
        props: (route) => ({ mapId: route.params.mapId, query: route.query })
      }
    ]
  }
];

const router = new VueRouter({ routes });

export default router;
