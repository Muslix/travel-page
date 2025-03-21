<template>
  <button
    :class="[
      'app-button',
      `btn-${variant}`,
      `size-${size}`,
      { 'btn-block': block, 'has-icon': $slots.icon }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner">
      <i class="bi bi-arrow-repeat spinner-icon"></i>
    </span>
    <span v-else-if="$slots.icon" class="button-icon">
      <slot name="icon"></slot>
    </span>
    <span class="button-text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup>
defineProps({
  // Text für den Button
  text: {
    type: String,
    default: ''
  },
  // Button-Variante (primary, secondary, outline-primary, etc.)
  variant: {
    type: String,
    default: 'primary'
  },
  // Button-Größe (sm, md, lg)
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  // Ob der Button deaktiviert sein soll
  disabled: {
    type: Boolean,
    default: false
  },
  // Ob der Button die volle Breite einnehmen soll
  block: {
    type: Boolean,
    default: false
  },
  // Ob ein Ladezustand angezeigt werden soll
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  outline: none;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  line-height: 1.5;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  will-change: transform, box-shadow;
}

/* Varianten mit den neuen CSS-Variablen */
.btn-primary {
  background-color: var(--primary-color);
  color: var(--primary-contrast);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: var(--secondary-contrast);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--secondary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-success {
  background-color: var(--success-color);
  color: var(--success-contrast);
}

.btn-success:hover:not(:disabled) {
  background-color: var(--success-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-accent {
  background-color: var(--accent-color);
  color: var(--accent-contrast);
}

.btn-accent:hover:not(:disabled) {
  background-color: var(--accent-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-info {
  background-color: var(--info-color);
  color: var(--info-contrast);
}

.btn-info:hover:not(:disabled) {
  background-color: var(--info-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-warning {
  background-color: var(--warning-color);
  color: var(--warning-contrast);
}

.btn-warning:hover:not(:disabled) {
  background-color: var(--warning-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-danger {
  background-color: var(--danger-color);
  color: var(--danger-contrast);
}

.btn-danger:hover:not(:disabled) {
  background-color: var(--danger-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* Outline-Varianten */
.btn-outline-primary {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline-primary:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: var(--primary-contrast);
  transform: translateY(-3px);
  box-shadow: var (--shadow-md);
}

.btn-outline-secondary {
  background-color: transparent;
  border: 2px solid var(--secondary-color);
  color: var(--secondary-color);
}

.btn-outline-secondary:hover:not(:disabled) {
  background-color: var(--secondary-color);
  color: var(--secondary-contrast);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-outline-accent {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
}

.btn-outline-accent:hover:not(:disabled) {
  background-color: var(--accent-color);
  color: var(--accent-contrast);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-outline-light {
  background-color: transparent;
  border: 2px solid var(--background-light);
  color: var(--background-light);
}

.btn-outline-light:hover:not(:disabled) {
  background-color: var(--background-light);
  color: var(--text-primary);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* Größen mit den neuen CSS-Variablen */
.size-sm {
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs) var(--spacing-md);
}

.size-md {
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-lg);
}

.size-lg {
  font-size: var(--font-size-lg);
  padding: var(--spacing-md) var(--spacing-lg);
}

/* Block-Button */
.btn-block {
  display: flex;
  width: 100%;
}

/* Deaktivierter Zustand */
.app-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Icon-Styling */
.has-icon {
  display: inline-flex;
  align-items: center;
}

.button-icon {
  margin-right: var(--spacing-sm);
}

/* Spinner-Animation */
.spinner {
  margin-right: var(--spacing-sm);
  display: inline-block;
}

.spinner-icon {
  animation: spin 1.2s linear infinite;
  display: inline-block;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Ripple-Effekt beim Klicken */
.app-button:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.app-button:focus:not(:active):after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0) translate(-50%, -50%);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>