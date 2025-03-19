<template>
  <div class="gallery page-transition w-100">
    <div class="container py-5">
      <!-- Hier konsistente Klassen für Überschriften -->
      <h1 class="section-title mb-4">Unsere Galerie</h1>
      <p class="lead text-center mb-5">Eindrücke von unserer Vorbereitung und der Tour selbst</p>

      <!-- Galerie-Filter mit konsistenten Button-Stilen -->
      <div class="gallery-filters mb-4">
        <div class="d-flex justify-content-center flex-wrap">
          <button class="btn mx-2 mb-2"
                  :class="activeFilter === 'all' ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="setFilter('all')">
            <i class="bi bi-grid-3x3"></i> Alle
          </button>
          <button class="btn mx-2 mb-2"
                  :class="activeFilter === 'vorbereitung' ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="setFilter('vorbereitung')">
            <i class="bi bi-wrench"></i> Vorbereitung
          </button>
          <button class="btn mx-2 mb-2"
                  :class="activeFilter === 'tour' ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="setFilter('tour')">
            <i class="bi bi-bicycle"></i> Tour
          </button>
          <button class="btn mx-2 mb-2"
                  :class="activeFilter === 'landschaft' ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="setFilter('landschaft')">
            <i class="bi bi-tree"></i> Landschaft
          </button>
        </div>
      </div>

      <!-- Angepasstes Galerie-Grid mit voller Breite -->
      <div class="row g-4 gallery-container w-100 m-0">
        <div v-for="(image, index) in filteredImages"
             :key="index"
             class="col-lg-4 col-md-6 gallery-item"
             :data-category="image.category">
          <div class="unified-card gallery-card" @click="openLightbox(index)">
            <div class="gallery-image">
              <img :src="image.url" :alt="image.title" class="img-fluid">
              <div class="gallery-overlay">
                <div class="gallery-info">
                  <h5>{{ image.title }}</h5>
                  <p>{{ image.description }}</p>
                  <span class="zoom-icon"><i class="bi bi-zoom-in"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- "Mehr Bilder folgen"-Karte im einheitlichen Stil -->
      <div class="unified-card text-center mt-5 coming-soon-card">
        <div class="card-body py-5">
          <i class="bi bi-camera display-1 mb-3"></i>
          <h3 class="card-title">Mehr Bilder folgen bald!</h3>
          <p class="card-text">Während unserer Tour werden wir regelmäßig neue Fotos hochladen.</p>
          <p class="card-text">Schau einfach wieder vorbei oder abonniere unseren Newsletter.</p>
          <button class="btn btn-primary mt-3" @click="$emit('navigate', 'home')">
            Zurück zur Startseite
          </button>
        </div>
      </div>

      <!-- Lightbox bleibt unverändert -->
      <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
        <!-- ... Lightbox-Inhalt ... -->
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

defineEmits(['navigate']);

// Beispielbilder (später mit echten Bildern ersetzen)
const galleryImages = ref([
  {
    url: '/bike-placeholder.jpg',
    title: 'Mein Fahrrad',
    description: 'Vorbereitung für die 600km Tour',
    category: 'vorbereitung'
  },
  {
    url: '/tent-placeholder.jpg',
    title: 'Unser Zelt',
    description: 'Leicht und kompakt für die Reise',
    category: 'vorbereitung'
  },
  {
    url: '/cooking-placeholder.jpg',
    title: 'Koch-Equipment',
    description: 'Für warme Mahlzeiten unterwegs',
    category: 'vorbereitung'
  },
  {
    url: '/sleep-placeholder.jpg',
    title: 'Schlafsack',
    description: 'Für erholsame Nächte',
    category: 'vorbereitung'
  },
  {
    url: '/hero-bike.jpg',
    title: 'Die Strecke',
    description: 'Ausblick auf die Route',
    category: 'landschaft'
  },
  {
    url: '/bike-placeholder.jpg',
    title: 'Testfahrt',
    description: 'Eine erste Probefahrt mit Gepäck',
    category: 'tour'
  }
]);

// Filter-Funktionalität
const activeFilter = ref('all');
const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredImages = computed(() => {
  if (activeFilter.value === 'all') {
    return galleryImages.value;
  }
  return galleryImages.value.filter(image => image.category === activeFilter.value);
});

// Lightbox-Funktionalität
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);
const lightboxImage = computed(() => filteredImages.value[currentImageIndex.value] || {});

const openLightbox = (index) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = ''; // Stellt Scrollen wieder her
};

const nextImage = () => {
  if (currentImageIndex.value < filteredImages.value.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// Tastatur-Navigation für Lightbox
const handleKeyDown = (e) => {
  if (!lightboxOpen.value) return;

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowRight':
      nextImage();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  // Stelle sicher, dass das Scrollen wieder aktiviert wird
  if (lightboxOpen.value) {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
/* Gallerie-spezifische Stile beibehalten, aber unnötige entfernen */
.gallery-image {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.gallery {
  width: 100vw !important;
  max-width: 100%;
  overflow-x: hidden;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-image img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info {
  text-align: center;
  padding: 20px;
}

.zoom-icon {
  display: inline-block;
  background-color: var(--primary-color);
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  margin-top: 15px;
}

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-caption {
  color: white;
  text-align: center;
  padding: 15px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1110;
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.4);
}

.lightbox-prev {
  left: -60px;
}

.lightbox-next {
  right: -60px;
}

.lightbox-counter {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.9rem;
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .gallery-image {
    height: 200px;
  }

  .lightbox-prev {
    left: 10px;
  }

  .lightbox-next {
    right: 10px;
  }
}
</style>