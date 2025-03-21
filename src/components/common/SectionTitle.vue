<template>
  <div class="section-title-container" :class="{ 'text-center': centered }">
    <h2 class="section-title" :style="{ color: color }">
      {{ title }}
      <slot></slot>
    </h2>
    <div
      class="section-title-divider"
      :style="{
        width: dividerWidth,
        backgroundColor: dividerColor ? dividerColor : color
      }"
    ></div>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  // Titel der Sektion
  title: {
    type: String,
    default: ''
  },
  // Untertitel für mehr Kontext
  subtitle: {
    type: String,
    default: ''
  },
  // Ob der Titel zentriert sein soll
  centered: {
    type: Boolean,
    default: true
  },
  // Farbe des Titels
  color: {
    type: String,
    default: 'var(--dark-color, #343a40)'
  },
  // Farbe des Dividers
  dividerColor: {
    type: String,
    default: ''
  },
  // Breite des Dividers
  dividerWidth: {
    type: String,
    default: '80px'
  }
});
</script>

<style scoped>
.section-title-container {
  margin-bottom: 2rem;
}

.section-title {
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 5px;
  font-weight: 600;
}

.section-title-divider {
  height: 3px;
  background-color: var(--primary-color, #0066cc);
  margin-bottom: 1rem;
  border-radius: 2px;
  transform-origin: left center;
  transition: width 0.3s ease;
}

.text-center .section-title-divider {
  margin-left: auto;
  margin-right: auto;
  transform-origin: center;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--secondary-color, #6c757d);
  font-weight: 300;
  margin-top: 0.5rem;
}

/* Animation beim Eintritt ins Viewport */
.section-title-container {
  animation: fadeInUp 0.6s ease-out;
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
</style>