<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import HomePage from './components/HomePage.vue';
import EquipmentPage from './components/EquipmentPage.vue';
import RoutePage from './components/RoutePage.vue';
import GalleryPage from './components/GalleryPage.vue';

// Loading state
const isLoading = ref(true);

// Aktuell angezeigte Seite
const currentPage = ref('home');

// Navigation wechseln
function navigateTo(page) {
  currentPage.value = page;
  // Scrollen zum Seitenanfang bei Seitenwechsel
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make sure all styles are loaded before displaying content
onMounted(() => {
  // Brief delay to ensure all CSS is processed
  setTimeout(() => {
    isLoading.value = false;
  }, 100);
});
</script>

<template>
  <div class="app-container" :class="{ 'is-loading': isLoading }">
    <div v-if="isLoading" class="loading-screen">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <template v-else>
      <Navbar @navigate="navigateTo" :currentPage="currentPage" />

      <main class="main-content">
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
              <h5 class="mb-3">RAMAdventure</h5>
              <p class="mb-3">Eine epische Radtour Ende Mai 2025 - Folge unserem Abenteuer!</p>
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
              <p class="mb-2"><i class="bi bi-envelope me-2"></i> info@ramadventure.de</p>
              <p><i class="bi bi-phone me-2"></i> +49 123 456789</p>
            </div>
          </div>
          <hr class="mt-4 mb-3 border-secondary">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <p class="mb-0 small">&copy; 2025 RAMAdventure. Alle Rechte vorbehalten.</p>
            </div>
            <div class="col-md-6 text-center text-md-end">
              <button class="btn btn-sm btn-outline-light" @click="window.scrollTo({top: 0, behavior: 'smooth'})">
                <i class="bi bi-arrow-up me-1"></i> Nach oben
              </button>
            </div>
          </div>
        </div>
      </footer>

      <!-- Cookie-Banner mit einheitlichem Design -->
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
    </template>
  </div>
</template>

<style>
/* Globale Styles */
:root {
  --primary-color: #0066cc; /* Dunkleres Blau für besseren Kontrast */
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
}

/* Fix für das temporäre Scrollbar-Problem */
html, body {
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
  position: relative; /* Wichtig für absolute positionierte Elemente */
}

/* Loading Screen Styles */
.is-loading {
  visibility: hidden;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  visibility: visible;
}

/* Verhindern von horizontalem Überlauf während Übergängen */
*, *::before, *::after {
  box-sizing: border-box;
  max-width: 100%;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden; /* Wichtig: Verhindert horizontales Scrollen im Container */
  position: relative;
}

.main-content {
  flex: 1;
  width: 100%;
  position: relative;
  overflow-x: hidden; /* Verhindert horizontales Scrollen im Hauptinhalt */
}

/* Seitenübergang-Animationen optimiert */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  overflow: hidden; /* Verhindert Overflow während der Animation */
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Rest der Styles */
h1, h2, h3, h4, h5 {
  font-weight: 600;
}

/* Einheitliche Karten-Stile */
.card {
  border-radius: 10px;
  border: none;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

/* Einheitliche Button-Stile */
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
  background-color: #0055b3;
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

/* Einheitliche Seitentitel */
.section-title {
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 30px;
  text-align: center;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
}

/* Einheitliches Container-Padding für alle Seiten */
.container {
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  max-width: 1200px; /* Konsistente maximale Breite */
}

/* Row-Overflow verhindern */
.row {
  margin-left: -15px;
  margin-right: -15px;
  width: auto; /* Verhindert Overflow */
}

/* Animationen vereinheitlichen */
.page-transition {
  animation: fadeIn 0.4s ease-out;
  width: 100%;
  overflow-x: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bilder können manchmal Overflow verursachen */
img {
  max-width: 100%;
  height: auto;
}

/* Tabellen können manchmal Overflow verursachen */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>