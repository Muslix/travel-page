<script setup>
import { ref, onMounted, provide, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { getCurrentAdventure } from './data/adventures';

// Router-Instanz abrufen
const router = useRouter();

// Loading state
const isLoading = ref(true);

// Aktuelles Abenteuer
const currentAdventure = ref(getCurrentAdventure());

// Eine eindeutige ID für den Komponenten-Key
const componentKey = ref(0);

// Funktion zum Aktualisieren des aktuellen Abenteuers
const updateCurrentAdventure = (adventure) => {
  currentAdventure.value = adventure;
  reloadComponents();
};

// Funktion zum Neuladen der Komponenten
const reloadComponents = () => {
  componentKey.value++;
};

// Make sure all styles are loaded before displaying content
onMounted(() => {
  // Brief delay to ensure all CSS is processed
  // Verbessert mit nextTick für bessere Performance
  nextTick(() => {
    // Verwende requestAnimationFrame für sanftere visuelle Übergänge
    requestAnimationFrame(() => {
      isLoading.value = false;
    });
  });
});

// Das aktuelle Abenteuer für alle Komponenten bereitstellen
provide('currentAdventure', currentAdventure);
</script>

<template>
  <div class="app-container" :class="{ 'is-loading': isLoading }">
    <div v-if="isLoading" class="loading-screen">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <template v-else>
      <Navbar :currentAdventure="currentAdventure" @adventureChanged="updateCurrentAdventure" />
      <main class="main-content">
        <transition name="fade" mode="out-in">
          <router-view :key="componentKey" />
        </transition>
      </main>
      <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <h5 class="mb-3">RAMAdventure</h5>
              <p class="mb-3">
                {{ currentAdventure.title }} - {{ currentAdventure.subtitle }}
              </p>
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
                <li><router-link to="/" class="text-light text-decoration-none">
                  <i class="bi bi-chevron-right me-1 small"></i> Startseite
                </router-link></li>
                <li><router-link to="/equipment" class="text-light text-decoration-none">
                  <i class="bi bi-chevron-right me-1 small"></i> Unsere Ausrüstung
                </router-link></li>
                <li><router-link to="/route" class="text-light text-decoration-none">
                  <i class="bi bi-chevron-right me-1 small"></i> Streckenplan
                </router-link></li>
                <li><router-link to="/gallery" class="text-light text-decoration-none">
                  <i class="bi bi-chevron-right me-1 small"></i> Bildergalerie
                </router-link></li>
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
              <button class="btn btn-sm btn-outline-light" @click="(() => requestAnimationFrame(() => window.scrollTo({top: 0, behavior: 'smooth'})))()">
                <i class="bi bi-arrow-up me-1"></i> Nach oben
              </button>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<style>
/* Alle Styles wurden in die zentrale components.css ausgelagert */
/* Hier bei Bedarf nur noch sehr app-spezifische Anpassungen */
</style>