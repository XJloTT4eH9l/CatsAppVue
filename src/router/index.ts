import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import VotingPage from '../pages/VotingPage.vue'
import BreedsPage from '../pages/BreedsPage.vue'
import GalleryPage from '../pages/GalleryPage.vue'
import LikesPage from '../pages/LikesPage.vue'
import DislikesPage from '../pages/DislikesPage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'

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
    },
    {
      path: '/likes',
      name: 'likes',
      component: LikesPage
    },
    {
      path: '/dislikes',
      name: 'dislikes',
      component: DislikesPage
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage
    }
  ]
})

export default router
