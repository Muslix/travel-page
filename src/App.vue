<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import HomePage from './components/HomePage.vue';
import EquipmentPage from './components/EquipmentPage.vue';
import RoutePage from './components/RoutePage.vue';
import GalleryPage from './components/GalleryPage.vue';

// Aktuell angezeigte Seite
const currentPage = ref('home');

// Navigation wechseln
function navigateTo(page) {
  currentPage.value = page;
  // Scrollen zum Seitenanfang bei Seitenwechsel
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="app-container">
    <Navbar @navigate="navigateTo" :currentPage="currentPage" />
    
    <main>
      <transition name="fade" mode="out-in">
        <component 
          :is="currentPage === 'home' ? HomePage : 
               currentPage === 'equipment' ? EquipmentPage : 
               currentPage === 'route' ? RoutePage : 
               currentPage === 'gallery' ? GalleryPage : null" 
          @navigate="navigateTo" 
          :key="currentPage"
        />
      </transition>
    </main>

    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <h5 class="mb-3">600km Radtour Challenge</h5>
            <p class="mb-3">Eine epische Radtour Ende Mai 2024 - Folge unserem Abenteuer!</p>
            <div class="social-icons">
              <a href="#" class="text-white me-3"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-youtube"></i></a>
              <a href="#" class="text-white"><i class="bi bi-strava"></i></a>
            </div>
          </div>
          <div class="col-md-4">
            <h5 class="mb-3">Schnellnavigation</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#" class="text-light text-decoration-none" @click.prevent="navigateTo('home')">
                <i class="bi bi-chevron-right me-1 small"></i> Startseite
              </a></li>
              <li><a href="#" class="text-light text-decoration-none" @click.prevent="navigateTo('equipment')">
                <i class="bi bi-chevron-right me-1 small"></i> Unsere Ausrüstung
              </a></li>
              <li><a href="#" class="text-light text-decoration-none" @click.prevent="navigateTo('route')">
                <i class="bi bi-chevron-right me-1 small"></i> Streckenplan
              </a></li>
              <li><a href="#" class="text-light text-decoration-none" @click.prevent="navigateTo('gallery')">
                <i class="bi bi-chevron-right me-1 small"></i> Bildergalerie
              </a></li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5 class="mb-3">Kontakt</h5>
            <p class="mb-2"><i class="bi bi-envelope me-2"></i> info@radtour-600km.de</p>
            <p><i class="bi bi-phone me-2"></i> +49 123 456789</p>
          </div>
        </div>
        <hr class="mt-4 mb-3 border-secondary">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 small">&copy; 2024 600km Radtour Challenge. Alle Rechte vorbehalten.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <button class="btn btn-sm btn-outline-light" @click="window.scrollTo({top: 0, behavior: 'smooth'})">
              <i class="bi bi-arrow-up me-1"></i> Nach oben
            </button>
          </div>
        </div>
      </div>
    </footer>
    
    <!-- Cookie-Banner -->
    <div class="cookie-banner" id="cookieBanner">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between flex-wrap">
          <p class="mb-md-0">Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.</p>
          <div class="cookie-buttons">
            <button class="btn btn-sm btn-outline-secondary me-2">Einstellungen</button>
            <button class="btn btn-sm btn-primary" @click="document.getElementById('cookieBanner').style.display='none'">
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Globale Styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

h1, h2, h3, h4, h5 {
  font-weight: 600;
}

/* Seitenübergang-Animationen */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Bootstrap Erweiterungen */
.btn {
  border-radius: 4px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #0069d9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-outline-primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
}

.card {
  border-radius: 8px;
  overflow: hidden;
}

/* Social Icons im Footer */
.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.social-icons i {
  font-size: 1.2rem;
}

.footer-links li {
  margin-bottom: 8px;
  transition: all 0.2s;
}

.footer-links li:hover {
  transform: translateX(5px);
}

/* Cookie-Banner */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
  padding: 15px 0;
  z-index: 1000;
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .display-3 {
    font-size: 2.5rem;
  }
  
  .display-4 {
    font-size: 2rem;
  }
  
  .cookie-banner p {
    margin-bottom: 15px;
  }
}
</style>
