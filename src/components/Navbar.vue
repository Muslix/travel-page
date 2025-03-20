<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a
        class="navbar-brand d-flex align-items-center"
        href="#"
        @click.prevent="$emit('navigate', 'home')"
      >
        <i class="bi bi-bicycle me-2"></i>
        <span>RAMAdventure</span>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activePage === 'home' }"
              href="#"
              @click.prevent="navigateTo('home')"
            >
              <i class="bi bi-house-door me-1"></i> Home
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activePage === 'equipment' }"
              href="#"
              @click.prevent="navigateTo('equipment')"
            >
              <i class="bi bi-tools me-1"></i> Equipment
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activePage === 'route' }"
              href="#"
              @click.prevent="navigateTo('route')"
            >
              <i class="bi bi-map me-1"></i> Route
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activePage === 'gallery' }"
              href="#"
              @click.prevent="navigateTo('gallery')"
            >
              <i class="bi bi-images me-1"></i> Galerie
            </a>
          </li>
          <!-- Abenteuer Dropdown-Menü -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle adventure-dropdown"
              href="#"
              id="navbarAdventureDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{ 'active-adventure': true }"
            >
              <i class="bi bi-compass me-1"></i>
              <span v-if="currentAdventure">{{ getShortTitle(currentAdventure.title) }}</span>
              <span v-else>Abenteuer wählen</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarAdventureDropdown">
              <li v-for="adventure in availableAdventures" :key="adventure.id">
                <a
                  class="dropdown-item"
                  href="#"
                  :class="{ active: adventure.id === currentAdventure.id }"
                  @click.prevent="selectAdventure(adventure.id)"
                >
                  <div class="adventure-item">
                    <div class="adventure-title-row">
                      <span class="adventure-title">
                        <span class="text-content">{{ adventure.title }}</span>
                      </span>
                      <span class="badge status-badge" :class="getStatusBadgeClass(adventure.status)">
                        {{ getStatusLabel(adventure.status) }}
                      </span>
                    </div>
                    <small class="adventure-subtitle text-muted d-block">
                      <span class="text-content">{{ adventure.subtitle }}</span>
                    </small>
                  </div>
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item disabled" href="#">
                  <i class="bi bi-info-circle me-2"></i>Wähle ein Abenteuer
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a
              class="nav-link highlight-link"
              href="#"
              @click.prevent="openDonateModal"
            >
              <i class="bi bi-heart-fill me-1"></i> Unterstützen
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Spenden-Modal mit einheitlichem Design -->
    <!-- Das Modal ist immer im DOM, wird aber durch Bootstrap ein- und ausgeblendet -->
    <div
      class="modal fade"
      id="donateModal"
      tabindex="-1"
      aria-labelledby="donateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header">
            <h5 class="modal-title" id="donateModalLabel">
              Unterstütze unser Projekt
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Du kannst unsere Radtour unterstützen, indem du für einen guten
              Zweck spendest. Wir radeln für den Klimaschutz!
            </p>
            <div class="d-grid gap-2">
              <button class="btn btn-outline-success" data-bs-dismiss="modal">
                <i class="bi bi-heart me-1"></i> Mehr Infos folgen bald
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { adventures, getCurrentAdventure, setCurrentAdventure } from "../data/adventures";

const props = defineProps({
  currentPage: {
    type: String,
    default: "home",
  },
});

const emit = defineEmits(["navigate", "adventureChanged"]);

const activePage = ref(props.currentPage);
const showDonateModal = ref(false);
const availableAdventures = ref(adventures);
const currentAdventure = ref(getCurrentAdventure());

// Aktualisiere die aktive Seite, wenn sich die Props ändern
watch(
  () => props.currentPage,
  (newPage) => {
    activePage.value = newPage;
  }
);

const navigateTo = (page) => {
  activePage.value = page;
  emit("navigate", page);
};

// Bootstrap-Modal Referenz
let modalInstance = null;

// Funktion zum Öffnen des Modals
const openDonateModal = () => {
  if (modalInstance) {
    modalInstance.show();
  }
};

// Bootstrap-Modal initialisieren
onMounted(() => {
  // Warten bis das DOM vollständig geladen ist
  nextTick(() => {
    if (window.bootstrap) {
      const modalElement = document.getElementById("donateModal");
      if (modalElement) {
        // Bootstrap Modal initialisieren
        modalInstance = new window.bootstrap.Modal(modalElement);

        // Event-Listener für das Schließen des Modals
        modalElement.addEventListener("hidden.bs.modal", () => {
          showDonateModal.value = false;
        });
      }
    }
  });
});

// Hilfsfunktion zum Kürzen von langen Titeln
const getShortTitle = (title) => {
  const colonIndex = title.indexOf(':');
  if (colonIndex > 0) {
    return title.substring(0, colonIndex).trim();
  }
  return title.length > 15 ? title.substring(0, 15) + '...' : title;
};

// Hilfsfunktion zur Bestimmung der Statusklasse
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'upcoming':
      return 'bg-primary';
    case 'active':
      return 'bg-success';
    case 'completed':
      return 'bg-secondary';
    default:
      return 'bg-info';
  }
};

// Hilfsfunktion zur Übersetzung des Status
const getStatusLabel = (status) => {
  switch (status) {
    case 'upcoming':
      return 'Geplant';
    case 'active':
      return 'Aktiv';
    case 'completed':
      return 'Abgeschlossen';
    default:
      return status;
  }
};

// Funktion zum Auswählen eines Abenteuers
const selectAdventure = (adventureId) => {
  if (setCurrentAdventure(adventureId)) {
    currentAdventure.value = getCurrentAdventure();
    emit("adventureChanged", currentAdventure.value);
  }
};
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  transition: all 0.3s ease;
  z-index: 1000; /* Stellt sicher, dass die Navbar über anderen Elementen liegt */
  width: 100%;
  max-width: 100%;
  overflow: visible; /* Wichtig: Erlaubt dem Dropdown, über die Navbar hinauszuragen */
}

.navbar > .container {
  width: 100%;
  overflow: visible; /* Erlaubt dem Dropdown-Menü, sichtbar zu sein */
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--primary-color);
}

.navbar-brand i {
  font-size: 1.6rem;
}

.nav-link {
  font-weight: 500;
  color: var(--secondary-color);
  margin: 0 5px;
  transition: all 0.2s ease;
  position: relative;
  padding: 8px 15px !important;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 80%;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
}

.highlight-link {
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 20px;
  color: var(--primary-color);
  font-weight: 600;
}

.highlight-link:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Modal-Stile */
.modal-content {
  border-radius: 10px;
}

.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* Abenteuer-Dropdown-Styling */
.adventure-dropdown {
  position: relative;
  border-radius: var(--radius-pill);
  background-color: rgba(52, 152, 219, 0.1);
  font-weight: 600;
  z-index: 1000; /* Stellt sicher, dass das Dropdown über anderen Elementen liegt */
}

.active-adventure {
  color: var(--primary-color);
  z-index: 1000;
}

/* Fix für das Dropdown-Menü, damit es über andere Elemente hinausragt */
.navbar-nav {
  overflow: visible !important; /* Verhindert, dass die Navbar scrollbar wird */
}

.nav-item.dropdown {
  position: relative; /* Immer relative */
  overflow: visible !important; /* Erlaubt dem Dropdown, außerhalb zu erscheinen */
}

/* Dropdown-Menü richtig positionieren */
.dropdown-menu {
  position: absolute !important; /* Immer absolute, um außerhalb der Navbar zu fließen */
  border-radius: var(--radius-md);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 300px; /* Etwas breiter für mehr Text */
  max-width: 350px; /* Maximale Breite begrenzen */
  z-index: 1050; /* Höherer z-index als die Navbar */
  max-height: 80vh; /* Begrenzt die Höhe auf 80% der Viewport-Höhe */
  overflow-y: auto; /* Ermöglicht vertikales Scrollen, wenn das Menü zu groß ist */
  overflow-x: hidden; /* Verhindert horizontales Scrollen */
}

/* Verbessertes Layout für Adventure-Items */
.adventure-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.adventure-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px; /* Abstand zwischen Titel und Badge */
}

/* Lauftext für zu lange Texte (Marquee-Effekt) */
.adventure-title {
  flex: 1;
  min-width: 0;
  position: relative;
  overflow: hidden;
}

.adventure-title:hover .text-content {
  animation: marqueeTitleEffect 8s linear infinite;
  white-space: nowrap;
}

.adventure-subtitle {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.adventure-subtitle:hover .text-content {
  animation: marqueeSubtitleEffect 10s linear infinite;
  white-space: nowrap;
}

@keyframes marqueeTitleEffect {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% + 150px)); }
}

@keyframes marqueeSubtitleEffect {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% + 150px)); }
}

.text-content {
  display: inline-block;
  white-space: nowrap;
  transition: transform 0.2s ease;
  padding-right: 20px; /* Etwas Abstand am Ende des Textes */
}

.status-badge {
  flex-shrink: 0; /* Verhindert, dass der Badge schrumpft */
  font-size: 0.7rem;
  padding: 0.25em 0.6em;
  white-space: nowrap;
}

.dropdown-item {
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s;
  z-index: 1000;
  white-space: normal; /* Erlaubt Text-Umbruch bei Bedarf */
}

/* Responsive Anpassungen */
@media (max-width: 991px) {
  .navbar-collapse {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    width: 100%; /* Stellt sicher, dass es nicht überläuft */
    max-height: 80vh; /* Begrenzt die Höhe auf 80% der Viewport-Höhe */
    overflow-y: auto; /* Ermöglicht vertikales Scrollen, wenn das Menü zu groß ist */
    overflow-x: hidden; /* Verhindert horizontales Scrollen */
  }

  .nav-link {
    margin: 5px 0;
  }

  .highlight-link {
    margin-top: 10px;
  }

  .dropdown-menu {
    position: static !important; /* Im mobilen Layout als statisches Element */
    float: none; /* Verhindert, dass das Dropdown floating ist */
    width: 100%; /* Volle Breite im mobilen Menü */
    border: none;
    box-shadow: none;
    padding-left: 1rem;
    max-height: none; /* Kein Höhenlimit auf Mobilgeräten */
    overflow-y: visible; /* Kein Scrollen innerhalb des Dropdowns auf Mobilgeräten */
  }
}

/* Stellt sicher, dass das Dropdown-Menü nicht abgeschnitten wird */
:deep(.dropdown-menu.show) {
  display: block;
  transform: none !important; /* Verhindert Bootstrap-Transformationen, die Probleme verursachen können */
}
</style>
