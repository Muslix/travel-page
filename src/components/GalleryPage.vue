<template>
  <div class="gallery page-transition">
    <div class="container py-5">
      <h1 class="display-4 mb-4 text-center section-header">Unsere Galerie</h1>
      <p class="lead text-center mb-5">Eindrücke von unserer Vorbereitung und der Tour selbst</p>

      <!-- Galerie-Filter -->
      <div class="gallery-filters mb-4">
        <div class="d-flex justify-content-center flex-wrap">
          <button class="btn filter-btn mx-2 mb-2"
                  :class="{ active: activeFilter === 'all' }"
                  @click="setFilter('all')">
            <i class="bi bi-grid-3x3"></i> Alle
          </button>
          <button class="btn filter-btn mx-2 mb-2"
                  :class="{ active: activeFilter === 'vorbereitung' }"
                  @click="setFilter('vorbereitung')">
            <i class="bi bi-wrench"></i> Vorbereitung
          </button>
          <button class="btn filter-btn mx-2 mb-2"
                  :class="{ active: activeFilter === 'tour' }"
                  @click="setFilter('tour')">
            <i class="bi bi-bicycle"></i> Tour
          </button>
          <button class="btn filter-btn mx-2 mb-2"
                  :class="{ active: activeFilter === 'landschaft' }"
                  @click="setFilter('landschaft')">
            <i class="bi bi-tree"></i> Landschaft
          </button>
        </div>
      </div>

      <!-- Galerie-Grid -->
      <div class="row g-4 gallery-container">
        <div v-for="(image, index) in filteredImages"
             :key="index"
             class="col-lg-4 col-md-6 gallery-item"
             :data-category="image.category">
          <div class="gallery-card" @click="openLightbox(index)">
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

      <!-- "Mehr Bilder folgen"-Karte -->
      <div class="card text-center mt-5 coming-soon-card">
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

      <!-- Lightbox -->
      <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" @click="closeLightbox">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="lightbox-image-container">
            <img :src="lightboxImage.url" :alt="lightboxImage.title" class="lightbox-image">
          </div>
          <div class="lightbox-caption">
            <h3>{{ lightboxImage.title }}</h3>
            <p>{{ lightboxImage.description }}</p>
          </div>
          <button class="lightbox-prev" @click.stop="prevImage" v-if="currentImageIndex > 0">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="lightbox-next" @click.stop="nextImage" v-if="currentImageIndex < filteredImages.length - 1">
            <i class="bi bi-chevron-right"></i>
          </button>
          <div class="lightbox-counter">{{ currentImageIndex + 1 }} / {{ filteredImages.length }}</div>
        </div>
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
/* Galerie Styles */
.gallery-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.gallery-image {
  position: relative;
  overflow: hidden;
  height: 250px;
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

/* Filter Buttons */
.filter-btn {
  background-color: #f8f9fa;
  border: none;
  border-radius: 30px;
  padding: 8px 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 5px 15px rgba(0,123,255,0.3);
}

.filter-btn:hover {
  background-color: #e9ecef;
}

.filter-btn.active:hover {
  background-color: #0069d9;
}

/* Coming Soon Card */
.coming-soon-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-top: 40px;
}

.coming-soon-card i {
  color: var(--primary-color);
  opacity: 0.8;
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

/* Animation für das Erscheinen der Galerie-Elemente */
.gallery-item {
  animation: fadeInUp 0.6s both;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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