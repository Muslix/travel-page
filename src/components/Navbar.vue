<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#" @click.prevent="$emit('navigate', 'home')">
        <i class="bi bi-bicycle me-2"></i>
        <span>Radtour 600km</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activePage === 'home' }" href="#"
               @click.prevent="navigateTo('home')">
               <i class="bi bi-house-door me-1"></i> Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activePage === 'equipment' }" href="#"
               @click.prevent="navigateTo('equipment')">
               <i class="bi bi-tools me-1"></i> Equipment
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activePage === 'route' }" href="#"
               @click.prevent="navigateTo('route')">
               <i class="bi bi-map me-1"></i> Route
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activePage === 'gallery' }" href="#"
               @click.prevent="navigateTo('gallery')">
               <i class="bi bi-images me-1"></i> Galerie
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link highlight-link" href="#"
               @click.prevent="showDonateModal = true">
               <i class="bi bi-heart-fill me-1"></i> Unterstützen
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Spenden-Modal -->
    <div class="modal fade" id="donateModal" tabindex="-1" aria-labelledby="donateModalLabel"
         aria-hidden="true" v-if="showDonateModal" @hidden.bs.modal="showDonateModal = false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="donateModalLabel">Unterstütze unser Projekt</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Du kannst unsere Radtour unterstützen, indem du für einen guten Zweck spendest.
               Wir radeln für den Klimaschutz!</p>
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
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
});

const activePage = ref(props.currentPage);
const showDonateModal = ref(false);

// Aktualisiere die aktive Seite, wenn sich die Props ändern
watch(() => props.currentPage, (newPage) => {
  activePage.value = newPage;
});

const navigateTo = (page) => {
  activePage.value = page;
  emit('navigate', page);
};

const emit = defineEmits(['navigate']);

// Bootstrap-Modal initialisieren
onMounted(() => {
  // Bootstrap-Modale initialisieren, wenn Bootstrap geladen ist
  window.addEventListener('load', () => {
    if (window.bootstrap && window.bootstrap.Modal) {
      const modalElement = document.getElementById('donateModal');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);

        // Modal zeigen, wenn showDonateModal true ist
        watch(showDonateModal, (show) => {
          if (show) {
            modal.show();
          } else {
            modal.hide();
          }
        });

        // Event-Listener für das Schließen des Modals
        modalElement.addEventListener('hidden.bs.modal', () => {
          showDonateModal.value = false;
        });
      }
    }
  });
});
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 15px 0;
  transition: all 0.3s ease;
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
  content: '';
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

/* Responsive Anpassungen */
@media (max-width: 991px) {
  .navbar-collapse {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin-top: 10px;
  }

  .nav-link {
    margin: 5px 0;
  }

  .highlight-link {
    margin-top: 10px;
  }
}
</style>