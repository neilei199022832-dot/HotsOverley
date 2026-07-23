import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { RouteName } from '@/models/RouteName'
import { AppLayoutsEnum } from '@/layouts/layouts.types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.HomePage,
      component: HomeView,
      meta: {
        layout: AppLayoutsEnum.default
      }
    },
  ]
})

export default router
