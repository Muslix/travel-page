<template>
  <div class="home page-transition">
    <!-- Modernes Hero Banner mit Parallax-Effekt -->
    <div class="hero-parallax">
      <div class="parallax-content">
        <h1 class="display-2 mb-4 fw-bold text-shadow">
          {{ currentAdventure.distance }}km Radtour Challenge
        </h1>
        <p class="lead mb-4 fw-light fs-3">
          Das Abenteuer beginnt am
          {{ formatReadableDate(currentAdventure.startDate) }}!
        </p>
        <div class="hero-buttons">
          <router-link to="/equipment">
            <AppButton
              variant="primary"
              size="lg"
              class="me-2"
            >
              <template #icon>
                <i class="bi bi-bicycle"></i>
              </template>
              Ausrüstung entdecken
            </AppButton>
          </router-link>
          <router-link to="/route">
            <AppButton
              variant="outline-light"
              size="lg"
            >
              <template #icon>
                <i class="bi bi-map"></i>
              </template>
              Route ansehen
            </AppButton>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Countdown-Timer -->
    <div class="countdown-section py-4">
      <div class="container">
        <SectionTitle
          title="Unser Abenteuer startet in"
          centered
        />
        <div class="countdown-timer" id="countdown">
          <div class="countdown-item">
            <div class="countdown-value">{{ countdownValues.days }}</div>
            <div class="countdown-label">Tage</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdownValues.hours }}</div>
            <div class="countdown-label">Stunden</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdownValues.minutes }}</div>
            <div class="countdown-label">Minuten</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-value">{{ countdownValues.seconds }}</div>
            <div class="countdown-label">Sekunden</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <!-- Verbesserte "Über Uns" Karten mit wiederverwendbaren Komponenten -->
      <SectionTitle title="Über unser Projekt" />
      <div class="row">
        <div class="col-md-6 mb-4">
          <AppCard
            title="Über uns"
            icon="bi bi-people-fill"
            theme="primary"
            :full-height="true"
          >
            {{ currentAdventure.about.description }}
          </AppCard>
        </div>

        <div class="col-md-6 mb-4">
          <AppCard
            title="Das Projekt"
            icon="bi bi-flag-fill"
            theme="accent"
            :full-height="true"
          >
            {{ currentAdventure.about.projectGoals }}
          </AppCard>
        </div>
      </div>

      <!-- Features-Sektion mit Icons -->
      <div class="features-section my-5 section-spacing">
        <SectionTitle
          title="Was dich erwartet"
          subtitle="Unsere Tour bietet dir viele spannende Einblicke"
        />
        <div class="row text-center">
          <div class="col-lg-3 col-md-6 mb-4">
            <FeatureItem
              title="Route"
              icon="bi bi-compass"
              description="Eine sorgfältig geplante Route durch die schönsten Landschaften"
            >
              {{ currentAdventure.distance }}km Route
            </FeatureItem>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <FeatureItem
              title="Foto-Galerie"
              icon="bi bi-camera"
              description="Tägliche Bilder und Videos von unserer Reise"
            />
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <FeatureItem
              title="Reisetagebuch"
              icon="bi bi-journal-text"
              description="Tägliche Updates und Erlebnisse live von der Tour"
            />
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <FeatureItem
              title="Equipment-Tests"
              icon="bi bi-gear"
              description="Unsere Erfahrungen mit der Ausrüstung im Praxistest"
            />
          </div>
        </div>
      </div>

      <!-- Newsletter-Anmeldung als wiederverwendbare Komponente -->
      <div class="newsletter-section py-5">
        <NewsletterSignup @submit="handleNewsletterSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { formatReadableDate, calculateTimeUntil } from "../data/dateUtils";
import { SectionTitle, AppCard, FeatureItem, AppButton, NewsletterSignup } from "./common";

// Das aktuelle Abenteuer vom Hauptkomponenten injizieren
const currentAdventure = inject('currentAdventure');

// Reaktive Daten für den Countdown
const countdownValues = ref({
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
});

// Variable für den Timer-Interval
let countdownInterval = null;
// Variable für den Scroll-Handler
let scrollHandler = null;
// Scroll Throttle Variable für Performance
let lastScrollTime = 0;
const throttleTime = 10; // ms - Wert für Scroll-Throttling

onMounted(() => {
  // Optimierter Countdown-Timer mit RequestAnimationFrame
  const countdownTimer = () => {
    const updateTimer = () => {
      // RequestAnimationFrame für flüssigere Updates
      countdownInterval = requestAnimationFrame(() => {
        // Aktuelle Countdown-Werte berechnen
        const timeValues = calculateTimeUntil(currentAdventure.value.startDate);

        // Nur aktualisieren, wenn sich Werte geändert haben
        if (JSON.stringify(countdownValues.value) !== JSON.stringify(timeValues)) {
          countdownValues.value = timeValues;
        }

        // Timer wiederholen
        updateTimer();
      });
    };

    // Timer sofort ausführen
    updateTimer();
  };

  // Verbesserter Parallax-Effekt für Hero-Banner mit Performance-Optimierungen
  const setupParallaxEffect = () => {
    const heroElement = document.querySelector(".hero-parallax");

    if (!heroElement) return;

    // Hardware-Beschleunigung aktivieren
    heroElement.style.willChange = 'background-position';

    // Optimierter Scroll-Handler mit Throttling
    scrollHandler = () => {
      const now = Date.now();

      // Throttle das Scroll-Event für bessere Performance
      if (now - lastScrollTime >= throttleTime) {
        lastScrollTime = now;

        // Nutze requestAnimationFrame für flüssigere Animationen
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          // Sanfterer Parallax-Effekt mit Transform statt Background-Position
          const translateY = Math.min(scrollPosition * 0.3, 200);
          heroElement.style.backgroundPosition = `center calc(50% + ${translateY}px)`;
        });
      }
    };

    // Event-Listener mit passivem Flag für bessere Performance
    window.addEventListener("scroll", scrollHandler, { passive: true });
  };

  // Funktionen ausführen mit kurzer Verzögerung für bessere Initial-Performance
  requestAnimationFrame(() => {
    countdownTimer();
    setupParallaxEffect();
  });
});

// Timer und Event-Listener bereinigen, wenn die Komponente unmounted wird
onUnmounted(() => {
  if (countdownInterval) {
    cancelAnimationFrame(countdownInterval);
  }

  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
  }
});

// Newsletter-Anmeldung verarbeiten
const handleNewsletterSubmit = (data) => {
  console.log('Newsletter-Anmeldung:', data.email);
  // Hier könntest du die E-Mail an einen Backend-Service senden
};
</script>

<style scoped>
/* Alle spezifischen Stile wurden in die components.css ausgelagert. */
/* Hier nur noch spezifische Anpassungen für diese Komponente, falls benötigt. */
</style>
