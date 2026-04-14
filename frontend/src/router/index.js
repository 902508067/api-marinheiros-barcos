import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '../views/DashboardView.vue';
import MarinheirosView from '../views/MarinheirosView.vue';
import BarcosView from '../views/BarcosView.vue';
import ReservasView from '../views/ReservasView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/marinheiros',
      name: 'marinheiros',
      component: MarinheirosView
    },
    {
      path: '/barcos',
      name: 'barcos',
      component: BarcosView
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ReservasView
    }
  ]
});

export default router;
