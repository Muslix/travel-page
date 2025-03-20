<template>
  <div class="home page-transition">
    <!-- Modernes Hero Banner mit verbessertem Parallax-Effekt -->
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
          <button
            class="btn btn-primary btn-lg me-2"
            @click="$emit('navigate', 'equipment')"
          >
            <i class="bi bi-bicycle me-2"></i>Ausrüstung entdecken
          </button>
          <button
            class="btn btn-outline-light btn-lg"
            @click="$emit('navigate', 'route')"
          >
            <i class="bi bi-map me-2"></i>Route ansehen
          </button>
        </div>
        <div class="scroll-indicator">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <div>
            <span class="scroll-text">Scroll</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Countdown-Timer -->
    <div class="countdown-section py-4">
      <div class="container">
        <h2 class="text-center mb-4">Unser Abenteuer startet in</h2>
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
      <!-- Verbesserte Über Uns Karten mit vereinheitlichtem Design -->
      <h2 class="section-title mb-4">Über unser Projekt</h2>
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="unified-card h-100">
            <div class="card-body">
              <div class="card-icon">
                <i class="bi bi-people-fill"></i>
              </div>
              <h2 class="card-title">Über uns</h2>
              <p class="card-text">
                {{ currentAdventure.about.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="unified-card h-100">
            <div class="card-body">
              <div class="card-icon">
                <i class="bi bi-flag-fill"></i>
              </div>
              <h2 class="card-title">Das Projekt</h2>
              <p class="card-text">
                {{ currentAdventure.about.projectGoals }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Features-Sektion mit Icons -->
      <div class="features-section my-5 section-spacing">
        <h2 class="section-title mb-5">Was dich erwartet</h2>
        <div class="row text-center">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-compass"></i>
              </div>
              <h3>{{ currentAdventure.distance }}km Route</h3>
              <p>
                Eine sorgfältig geplante Route durch die schönsten Landschaften
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="feature-item">
              <i class="bi bi-camera"></i>
              <h3>Foto-Galerie</h3>
              <p>Tägliche Bilder und Videos von unserer Reise</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="feature-item">
              <i class="bi bi-journal-text"></i>
              <h3>Reisetagebuch</h3>
              <p>Tägliche Updates und Erlebnisse live von der Tour</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="feature-item">
              <i class="bi bi-gear"></i>
              <h3>Equipment-Tests</h3>
              <p>Unsere Erfahrungen mit der Ausrüstung im Praxistest</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter-Anmeldung -->
      <div class="newsletter-section py-5">
        <div class="unified-card newsletter-card">
          <div class="card-body p-4">
            <div class="row align-items-center">
              <div class="col-md-6">
                <h2 class="mb-3">Bleib auf dem Laufenden!</h2>
                <p>
                  Abonniere unseren Newsletter und erhalte Updates zu unserer
                  Tour direkt in dein Postfach.
                </p>
              </div>
              <div class="col-md-6">
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Deine E-Mail-Adresse"
                    aria-label="E-Mail"
                  />
                  <button class="btn btn-primary" type="button">
                    Abonnieren
                  </button>
                </div>
                <small class="form-text text-muted mt-2"
                  >Wir versenden nur Updates zu dieser Tour, kein Spam!</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getCurrentAdventure } from "../data/adventures";
import { formatReadableDate, calculateTimeUntil } from "../data/dateUtils";

defineEmits(["navigate"]);

// Das aktuelle Abenteuer laden
const currentAdventure = ref(getCurrentAdventure());

// Reaktive Daten für den Countdown
const countdownValues = ref({
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
});

// Variable für den Timer-Interval
let countdownInterval = null;

onMounted(() => {
  // Countdown-Timer Funktion
  const countdownTimer = () => {
    const updateTimer = () => {
      // Aktuelle Countdown-Werte berechnen
      const timeValues = calculateTimeUntil(currentAdventure.value.startDate);
      countdownValues.value = timeValues;
    };

    // Timer sofort ausführen und dann alle Sekunde aktualisieren
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
  };

  // Verbesserter Parallax-Effekt für Hero-Banner
  const parallaxEffect = () => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroElement = document.querySelector(".hero-parallax");
      if (heroElement) {
        // Sanfterer Parallax-Effekt
        heroElement.style.backgroundPositionY = `calc(50% + ${
          scrollPosition * 0.3
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Event-Listener bereinigen wenn Component unmounted wird
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
  };

  // Funktionen ausführen
  countdownTimer();
  parallaxEffect();
});

// Timer bereinigen, wenn die Komponente unmounted wird
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
});
</script>

<style scoped>
/* Hero Banner mit Parallax */
.hero-parallax {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url("/hero-bike.jpg");
  background-size: cover;
  background-position: center 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden; /* Verhindert überlappendes Scrollen */
}

.parallax-content {
  max-width: 800px;
  padding: 0 20px;
  z-index: 2; /* Stellt sicher, dass der Inhalt über dem Parallax-Hintergrund liegt */
}

.text-shadow {
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
}

/* Vereinheitlichte Karten-Stile */
.card-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

/* Feature Section */
.features-section {
  padding: 60px 0;
}

.feature-item {
  padding: 30px 15px;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.feature-item:hover {
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.feature-item i {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 3;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid white;
  border-radius: 13px;
  margin: 0 auto 10px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background: white;
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
}

.scroll-text {
  color: white;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Countdown Styles */
.countdown-section {
  background-color: #f5f5f5;
  padding: 40px 0;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.countdown-item {
  text-align: center;
  min-width: 100px;
}

.countdown-value {
  font-size: 3rem;
  font-weight: 700;
  background-color: var(--primary-color);
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.countdown-label {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--secondary-color);
}

/* Newsletter Section */
.newsletter-section {
  margin: 60px 0;
}

.newsletter-card {
  border-radius: 15px;
  background-image: linear-gradient(to right, #f8f9fa, #e9ecef);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .hero-parallax {
    background-attachment: scroll;
    height: 80vh;
  }

  .countdown-value {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
}
</style>
