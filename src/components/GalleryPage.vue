<template>
  <div class="gallery page-transition w-100">
    <div class="container py-5">
      <SectionTitle
        title="Unsere Galerie"
        subtitle="Eindrücke von unserer Vorbereitung und der Tour selbst"
        dividerWidth="100px"
      />

      <!-- Galerie-Filter mit den neuen AppButton-Komponenten -->
      <div class="gallery-filters mb-5">
        <div class="d-flex justify-content-center flex-wrap">
          <AppButton
            :variant="activeFilter === 'all' ? 'primary' : 'outline-secondary'"
            class="mx-2 mb-2"
            @click="setFilter('all')"
          >
            <template #icon>
              <i class="bi bi-grid-3x3"></i>
            </template>
            Alle
          </AppButton>
          <AppButton
            :variant="activeFilter === 'vorbereitung' ? 'primary' : 'outline-secondary'"
            class="mx-2 mb-2"
            @click="setFilter('vorbereitung')"
          >
            <template #icon>
              <i class="bi bi-wrench"></i>
            </template>
            Vorbereitung
          </AppButton>
          <AppButton
            :variant="activeFilter === 'tour' ? 'primary' : 'outline-secondary'"
            class="mx-2 mb-2"
            @click="setFilter('tour')"
          >
            <template #icon>
              <i class="bi bi-bicycle"></i>
            </template>
            Tour
          </AppButton>
          <AppButton
            :variant="activeFilter === 'landschaft' ? 'primary' : 'outline-secondary'"
            class="mx-2 mb-2"
            @click="setFilter('landschaft')"
          >
            <template #icon>
              <i class="bi bi-tree"></i>
            </template>
            Landschaft
          </AppButton>
        </div>
      </div>

      <!-- Angepasstes Galerie-Grid mit AppCard-Komponenten -->
      <div class="row g-4 gallery-container w-100 m-0">
        <div
          v-for="(image, index) in filteredImages"
          :key="index"
          class="col-lg-4 col-md-6 gallery-item"
          :data-category="image.category"
        >
          <div class="gallery-card-wrapper" @click="openLightbox(index)">
            <AppCard
              :elevation="2"
              :hover-effect="true"
              :show-header="false"
              class="gallery-card"
            >
              <div class="gallery-image">
                <img :src="image.url" :alt="image.title" class="img-fluid" />
                <div class="gallery-overlay">
                  <div class="gallery-info">
                    <h5>{{ image.title }}</h5>
                    <p>{{ image.description }}</p>
                    <span class="zoom-icon"><i class="bi bi-zoom-in"></i></span>
                  </div>
                </div>
              </div>
            </AppCard>
          </div>
        </div>
      </div>

      <!-- "Mehr Bilder folgen"-Karte als AppCard -->
      <div class="mt-5">
        <AppCard :elevation="3" class="text-center coming-soon-card">
          <template #header>
            <i class="bi bi-camera display-1 mb-3"></i>
            <h3>Mehr Bilder folgen bald!</h3>
          </template>

          <p class="card-text">
            Während unserer Tour werden wir regelmäßig neue Fotos hochladen.
          </p>
          <p class="card-text">
            Schau einfach wieder vorbei oder abonniere unseren Newsletter.
          </p>

          <template #footer>
            <router-link to="/">
              <AppButton
                variant="primary"
              >
                <template #icon>
                  <i class="bi bi-house"></i>
                </template>
                Zurück zur Startseite
              </AppButton>
            </router-link>
          </template>
        </AppCard>
      </div>

      <!-- Newsletter Anmeldung hinzufügen -->
      <div class="mt-5">
        <NewsletterSignup
          title="Neue Bilder per E-Mail erhalten"
          description="Lass dich benachrichtigen, wenn wir neue Bilder von unserer Tour hochladen."
          theme="light"
        />
      </div>

      <!-- Navigation Buttons -->
      <div class="text-center mt-5">
        <router-link to="/equipment">
          <AppButton
            variant="primary"
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
            variant="outline-primary"
          >
            <template #icon>
              <i class="bi bi-map"></i>
            </template>
            Zur Routenplanung
          </AppButton>
        </router-link>
      </div>

      <!-- Lightbox bleibt größtenteils unverändert -->
      <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" @click="closeLightbox">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="lightbox-image-container">
            <button class="lightbox-prev" @click.stop="prevImage" v-if="currentImageIndex > 0">
              <i class="bi bi-chevron-left"></i>
            </button>

            <img
              :src="lightboxImage.url"
              :alt="lightboxImage.title"
              class="lightbox-image"
            />

            <button
              class="lightbox-next"
              @click.stop="nextImage"
              v-if="currentImageIndex < filteredImages.length - 1"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>

          <div class="lightbox-caption">
            <h4>{{ lightboxImage.title }}</h4>
            <p>{{ lightboxImage.description }}</p>
          </div>

          <div class="lightbox-counter">
            {{ currentImageIndex + 1 }} / {{ filteredImages.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { AppCard, AppButton, SectionTitle, NewsletterSignup } from "./common";

// Beispielbilder (später mit echten Bildern ersetzen)
const galleryImages = ref([
  {
    url: "/bike-placeholder.jpg",
    title: "Mein Fahrrad",
    description: "Vorbereitung für die 600km Tour",
    category: "vorbereitung",
  },
  {
    url: "/tent-placeholder.jpg",
    title: "Unser Zelt",
    description: "Leicht und kompakt für die Reise",
    category: "vorbereitung",
  },
  {
    url: "/cooking-placeholder.jpg",
    title: "Koch-Equipment",
    description: "Für warme Mahlzeiten unterwegs",
    category: "vorbereitung",
  },
  {
    url: "/sleep-placeholder.jpg",
    title: "Schlafsack",
    description: "Für erholsame Nächte",
    category: "vorbereitung",
  },
  {
    url: "/hero-bike.jpg",
    title: "Die Strecke",
    description: "Ausblick auf die Route",
    category: "landschaft",
  },
  {
    url: "/bike-placeholder.jpg",
    title: "Testfahrt",
    description: "Eine erste Probefahrt mit Gepäck",
    category: "tour",
  },
]);

// Filter-Funktionalität
const activeFilter = ref("all");
const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredImages = computed(() => {
  if (activeFilter.value === "all") {
    return galleryImages.value;
  }
  return galleryImages.value.filter(
    (image) => image.category === activeFilter.value
  );
});

// Lightbox-Funktionalität
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);
const lightboxImage = computed(
  () => filteredImages.value[currentImageIndex.value] || {}
);

const openLightbox = (index) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden"; // Verhindert Scrollen im Hintergrund
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = ""; // Stellt Scrollen wieder her
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
    case "Escape":
      closeLightbox();
      break;
    case "ArrowRight":
      nextImage();
      break;
    case "ArrowLeft":
      prevImage();
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  // Stelle sicher, dass das Scrollen wieder aktiviert wird
  if (lightboxOpen.value) {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
/* Gallerie-spezifische Stile */
.gallery-card-wrapper {
  cursor: pointer;
}

.gallery-image {
  position: relative;
  overflow: hidden;
  height: 250px;
  border-radius: 10px;
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
  will-change: transform;
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
  will-change: opacity;
}

.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info {
  text-align: center;
  padding: 20px;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.gallery-card:hover .gallery-info {
  transform: translateY(0);
}

.zoom-icon {
  display: inline-block;
  background-color: var(--primary-color, #0066cc);
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  margin-top: 15px;
  transition: transform 0.3s ease;
}

.zoom-icon:hover {
  transform: scale(1.1);
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
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
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
  transition: transform 0.3s ease;
}

.lightbox-close:hover {
  transform: scale(1.1);
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
  transition: background 0.3s ease, transform 0.3s ease;
  will-change: transform;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 15px;
}

/* Responsive Anpassungen */
@media (max-width: 992px) {
  .gallery-image {
    height: 220px;
  }
}

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

  .gallery-filters {
    display: flex;
    overflow-x: auto;
    padding-bottom: 10px;
  }
}

@media (max-width: 576px) {
  .lightbox-image {
    max-height: 70vh;
  }

  .lightbox-caption h4 {
    font-size: 1.2rem;
  }

  .lightbox-caption p {
    font-size: 0.9rem;
  }
}
</style>
