import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import EquipmentPage from './components/EquipmentPage.vue'
import RoutePage from './components/RoutePage.vue'
import GalleryPage from './components/GalleryPage.vue'

// Routen definieren
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: 'Startseite' }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: EquipmentPage,
    meta: { title: 'Ausrüstung' }
  },
  {
    path: '/route',
    name: 'route',
    component: RoutePage,
    meta: { title: 'Routenplan' }
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryPage,
    meta: { title: 'Galerie' }
  },
  {
    // Fallback für nicht existierende Pfade
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

// Router-Instanz erstellen
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll zum Start der Seite bei jedem Navigieren
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Seitentitel beim Navigieren ändern
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | RAMAdventure` : 'RAMAdventure'
})

export default router