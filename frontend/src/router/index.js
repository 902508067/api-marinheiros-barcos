import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/marinheiros',
      name: 'marinheiros',
      component: () => import('../views/MarinheirosView.vue')
    },
    {
      path: '/barcos',
      name: 'barcos',
      component: () => import('../views/BarcosView.vue')
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/ReservasView.vue')
    }
  ]
})

export default router
