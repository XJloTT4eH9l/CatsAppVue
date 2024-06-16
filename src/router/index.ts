import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import VotingPage from '../pages/VotingPage.vue'
import BreedsPage from '../pages/BreedsPage.vue'
import GalleryPage from '../pages/GalleryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/voting',
      name: 'voting',
      component: VotingPage
    },
    {
      path: '/breeds',
      name: 'breeds',
      component: BreedsPage
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryPage
    }
  ]
})

export default router
