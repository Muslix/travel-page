<template>
  <div class="feature-item-container" :class="{ 'text-center': centered }">
    <div v-if="icon" class="feature-icon">
      <i :class="icon"></i>
    </div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-description">
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.action" class="feature-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // Titel des Features
  title: {
    type: String,
    required: true
  },
  // Beschreibungstext
  description: {
    type: String,
    default: ''
  },
  // Icon-Klasse (z.B. 'bi bi-bicycle')
  icon: {
    type: String,
    default: ''
  },
  // Ob das Feature zentriert sein soll
  centered: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.feature-item-container {
  padding: 30px 15px;
  transition: all var(--transition-normal, 0.3s) ease;
  border-radius: 10px;
  will-change: transform, box-shadow;
  height: 100%;
}

.feature-item-container:hover {
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--primary-color, #0066cc);
  transition: transform var(--transition-normal, 0.3s) ease;
}

.feature-item-container:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-weight: 600;
  margin-bottom: 15px;
}

.feature-description {
  color: var(--secondary-color, #6c757d);
  font-size: 1rem;
  line-height: 1.6;
}

.feature-action {
  margin-top: 20px;
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .feature-item-container {
    padding: 20px 10px;
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  .feature-title {
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
}
</style>