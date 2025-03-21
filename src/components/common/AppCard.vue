<template>
  <div
    class="app-card"
    :class="[
      `theme-${theme}`,
      `elevation-${elevation}`,
      {
        'full-height': fullHeight,
        'hover-effect': hoverEffect,
        'has-icon': icon
      }
    ]"
  >
    <div v-if="showHeader || $slots.header || title || icon" class="card-header">
      <div v-if="icon" class="card-icon">
        <i :class="icon"></i>
      </div>
      <div class="card-header-content">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // Titel der Karte
  title: {
    type: String,
    default: ''
  },
  // Icon-Klasse (z.B. 'bi bi-bicycle')
  icon: {
    type: String,
    default: ''
  },
  // Farbschema (primary, secondary, accent, success, info, warning, danger, light, dark)
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'primary', 'secondary', 'accent', 'success', 'info', 'warning', 'danger'].includes(value)
  },
  // Ob die Karte die volle Höhe des Containers einnehmen soll
  fullHeight: {
    type: Boolean,
    default: false
  },
  // Ob ein Hover-Effekt angewendet werden soll
  hoverEffect: {
    type: Boolean,
    default: true
  },
  // Höhe des Schattens (1-5)
  elevation: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0 && value <= 5
  },
  // Ob der Header angezeigt werden soll (falls kein Titel oder Icon definiert ist)
  showHeader: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.app-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: white;
  background-clip: border-box;
  border-radius: var(--radius-md, 10px);
  overflow: hidden;
  height: auto;
  width: 100%;
  transition: all var(--transition-normal, 0.3s) ease;
  will-change: transform, box-shadow;
  margin-bottom: var(--spacing-md, 1rem);
  border-top: 4px solid transparent;
}

/* Verschiedene Elevation-Stufen für unterschiedliche Schattierungen */
.elevation-0 {
  box-shadow: none;
}

.elevation-1 {
  box-shadow: var(--shadow-sm, 0 2px 5px rgba(0, 0, 0, 0.05));
}

.elevation-2 {
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
}

.elevation-3 {
  box-shadow: var(--shadow-lg, 0 8px 20px rgba(0, 0, 0, 0.15));
}

.elevation-4 {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.elevation-5 {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

/* Hover-Effekt */
.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg, 0 8px 20px rgba(0, 0, 0, 0.15));
}

/* Volle Höhe */
.full-height {
  height: 100%;
}

/* Karten-Header mit Titelbereich */
.card-header {
  padding: var(--spacing-lg, 1.5rem) var(--spacing-lg, 1.5rem) var(--spacing-md, 1rem);
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: rgba(0, 0, 0, 0.01);
}

.card-icon {
  font-size: 1.75rem;
  margin-right: var(--spacing-md, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-header-content {
  flex: 1;
}

.card-title {
  margin: 0;
  font-size: var(--font-size-xl, 1.25rem);
  font-weight: 600;
  line-height: 1.4;
}

/* Karten-Body */
.card-body {
  flex: 1 1 auto;
  padding: var(--spacing-lg, 1.5rem);
  padding-top: var(--spacing-md, 1rem);
}

/* Karten-Footer */
.card-footer {
  padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
  background-color: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

/* Verschiedene Farbthemen mit Akzent-Rand */
.theme-light {
  border-top-color: var(--background-medium, #e9ecef);
}

.theme-light .card-icon {
  color: var(--text-secondary, #6c757d);
}

.theme-dark {
  border-top-color: var(--background-dark, #343a40);
}

.theme-dark .card-icon {
  color: var(--background-dark, #343a40);
}

.theme-primary {
  border-top-color: var(--primary-color, #0066cc);
}

.theme-primary .card-icon {
  color: var(--primary-color, #0066cc);
}

.theme-secondary {
  border-top-color: var(--secondary-color, #6c757d);
}

.theme-secondary .card-icon {
  color: var(--secondary-color, #6c757d);
}

.theme-accent {
  border-top-color: var(--accent-color, #25a03a);
}

.theme-accent .card-icon {
  color: var(--accent-color, #25a03a);
}

.theme-success {
  border-top-color: var(--success-color, #28a745);
}

.theme-success .card-icon {
  color: var(--success-color, #28a745);
}

.theme-info {
  border-top-color: var(--info-color, #17a2b8);
}

.theme-info .card-icon {
  color: var(--info-color, #17a2b8);
}

.theme-warning {
  border-top-color: var(--warning-color, #ffc107);
}

.theme-warning .card-icon {
  color: var(--warning-color, #ffc107);
}

.theme-danger {
  border-top-color: var(--danger-color, #dc3545);
}

.theme-danger .card-icon {
  color: var(--danger-color, #dc3545);
}

/* Responsive Anpassungen */
@media (max-width: 768px) {
  .card-header, .card-body, .card-footer {
    padding: var(--spacing-md, 1rem);
  }

  .card-header {
    padding-bottom: 0.5rem;
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: var(--font-size-lg, 1.125rem);
  }
}
</style>