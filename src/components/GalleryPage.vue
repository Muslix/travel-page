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
              <div class="gallery-image-container">
                <img :src="image.url" :alt="image.title" class="gallery-image" />
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
      <div class="modal-overlay" v-if="lightboxOpen" @click.self="closeLightbox">
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
/* Die spezifischen Stile wurden in die components.css ausgelagert.
 * In dieser Komponente nur noch sehr spezifische Anpassungen notwendig.
 */
@media (max-width: 768px) {
  .gallery-filters {
    display: flex;
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style>
