import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MainView.vue'
import TicketView from '../views/TicketView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView
    },
  ]
})

export default router
