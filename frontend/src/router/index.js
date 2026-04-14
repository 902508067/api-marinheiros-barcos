import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import MarinheirosView from '../views/MarinheirosView.vue';
import BarcosView from '../views/BarcosView.vue';
import ReservasView from '../views/ReservasView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/barcos',
      name: 'barcos',
      component: BarcosView
    },
    {
      path: '/marinheiros',
      name: 'marinheiros',
      component: MarinheirosView
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ReservasView
    }
  ]
});

export default router;
