<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <router-link
        class="navbar-brand d-flex align-items-center"
        to="/"
      >
        <i class="bi bi-bicycle me-2"></i>
        <span>RAMAdventure</span>
      </router-link>

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
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'home' }"
              to="/"
            >
              <i class="bi bi-house-door me-1"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'equipment' }"
              to="/equipment"
            >
              <i class="bi bi-tools me-1"></i> Equipment
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'route' }"
              to="/route"
            >
              <i class="bi bi-map me-1"></i> Route
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'gallery' }"
              to="/gallery"
            >
              <i class="bi bi-images me-1"></i> Galerie
            </router-link>
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
import { ref, watch, onMounted, nextTick, computed, shallowRef } from "vue";
import { useRoute } from 'vue-router';
import { adventures, getCurrentAdventure, setCurrentAdventure } from "../data/adventures";

// Aktuellen Router-Pfad beziehen
const route = useRoute();

const props = defineProps({
  currentAdventure: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["adventureChanged"]);

const availableAdventures = shallowRef(adventures); // Verwende shallowRef für bessere Performance

// Statusklassen für Badges als computed property für bessere Performance
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

// Übersetzung des Status als computed property für bessere Performance
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

// Hilfsfunktion zum Kürzen von langen Titeln - Optimiert um unnötige Berechnungen zu vermeiden
const getShortTitle = (title) => {
  if (!title) return 'Abenteuer wählen';
  const colonIndex = title.indexOf(':');
  if (colonIndex > 0) {
    return title.substring(0, colonIndex).trim();
  }
  return title.length > 15 ? title.substring(0, 15) + '...' : title;
};

// Funktion zum Auswählen eines Abenteuers
const selectAdventure = (adventureId) => {
  // Verhindern unnötiger Aktualisierungen
  if (props.currentAdventure.id === adventureId) return;

  if (setCurrentAdventure(adventureId)) {
    emit("adventureChanged", getCurrentAdventure());
  }
};

// Bootstrap-Modal Referenz
let modalInstance = null;

// Funktion zum Öffnen des Modals - optimiert mit requestAnimationFrame
const openDonateModal = () => {
  requestAnimationFrame(() => {
    if (modalInstance) {
      modalInstance.show();
    }
  });
};

// Bootstrap-Modal initialisieren mit optimierter Performance
onMounted(() => {
  // Performance-optimierte DOM-Interaktion mit requestAnimationFrame
  requestAnimationFrame(() => {
    if (window.bootstrap) {
      const modalElement = document.getElementById("donateModal");
      if (modalElement) {
        // Bootstrap Modal initialisieren
        modalInstance = new window.bootstrap.Modal(modalElement);

        // Event-Listener für das Schließen des Modals
        modalElement.addEventListener("hidden.bs.modal", () => {
          // Keine zusätzlichen Operationen nötig, da das Modal nicht mehr angezeigt wird
        }, { passive: true }); // Passive Event Listener für bessere Performance
      }
    }
  });
});
</script>

<style scoped>
/* Alle Navbar-Styles wurden in die components.css ausgelagert */
/* Hier nur noch spezifische Anpassungen für diese Komponente, falls benötigt */
</style>
