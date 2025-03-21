<template>
  <div class="newsletter-container" :class="`theme-${theme}`">
    <AppCard :full-height="true" :hover-effect="false" :elevation="elevation">
      <template #header v-if="showHeader">
        <h2 class="newsletter-title">{{ title }}</h2>
      </template>

      <div class="row align-items-center">
        <div :class="`col-md-${descriptionCols}`">
          <p class="newsletter-description">
            <slot>{{ description }}</slot>
          </p>
        </div>
        <div :class="`col-md-${12 - descriptionCols}`">
          <form @submit.prevent="handleSubmit" class="newsletter-form">
            <div class="input-group">
              <input
                v-model="email"
                type="email"
                class="form-control"
                :placeholder="placeholder"
                aria-label="E-Mail-Adresse"
                required
              />
              <AppButton
                :loading="loading"
                :variant="buttonVariant"
                type="submit"
              >
                {{ buttonText }}
              </AppButton>
            </div>
            <small v-if="showHint" class="form-text text-muted mt-2">{{ hint }}</small>
            <div v-if="message" :class="`alert alert-${messageType} mt-3`" role="alert">
              {{ message }}
            </div>
          </form>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppCard from './AppCard.vue';
import AppButton from './AppButton.vue';

const props = defineProps({
  // Titel des Newsletter-Blocks
  title: {
    type: String,
    default: 'Bleib auf dem Laufenden!'
  },
  // Beschreibungstext
  description: {
    type: String,
    default: 'Abonniere unseren Newsletter und erhalte Updates zu unserer Tour direkt in dein Postfach.'
  },
  // Platzhaltertext für Email-Input
  placeholder: {
    type: String,
    default: 'Deine E-Mail-Adresse'
  },
  // Text für den Submit-Button
  buttonText: {
    type: String,
    default: 'Abonnieren'
  },
  // Hinweistext unter dem Formular
  hint: {
    type: String,
    default: 'Wir versenden nur Updates zu dieser Tour, kein Spam!'
  },
  // Anzahl der Spalten für die Beschreibung (bei einer 12-Spalten-Grid)
  descriptionCols: {
    type: Number,
    default: 6,
    validator: (value) => value > 0 && value < 12
  },
  // Ob der Header mit Titel angezeigt werden soll
  showHeader: {
    type: Boolean,
    default: true
  },
  // Ob der Hinweistext angezeigt werden soll
  showHint: {
    type: Boolean,
    default: true
  },
  // Farbschema (primary, secondary, light, dark)
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'primary', 'secondary'].includes(value)
  },
  // Button-Variante
  buttonVariant: {
    type: String,
    default: 'primary'
  },
  // Schatten-Stufe der Karte
  elevation: {
    type: Number,
    default: 2
  }
});

const emit = defineEmits(['submit']);

const email = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref('success');

// Newsletter-Anmeldung verarbeiten
async function handleSubmit() {
  if (!email.value) return;

  loading.value = true;

  try {
    // Hier würde normalerweise die API-Anfrage stehen
    // Simuliere eine API-Anfrage mit Timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Erfolg simulieren
    message.value = 'Vielen Dank! Deine Anmeldung war erfolgreich.';
    messageType.value = 'success';

    // Event emittieren
    emit('submit', { email: email.value });

    // Formular zurücksetzen
    email.value = '';
  } catch (error) {
    // Fehlerfall simulieren
    message.value = 'Es gab ein Problem bei der Anmeldung. Bitte versuche es später erneut.';
    messageType.value = 'danger';
  } finally {
    loading.value = false;

    // Message nach 5 Sekunden ausblenden
    setTimeout(() => {
      message.value = '';
    }, 5000);
  }
}
</script>

<style scoped>
.newsletter-container {
  margin-bottom: 2rem;
}

.newsletter-title {
  margin-bottom: 0.5rem;
}

.newsletter-description {
  line-height: 1.6;
}

.newsletter-form {
  margin-top: 1rem;
}

/* Verschiedene Farbthemen */
.theme-light {
  --newsletter-bg: linear-gradient(to right, #f8f9fa, #e9ecef);
  --newsletter-text: var(--dark-color, #343a40);
}

.theme-dark {
  --newsletter-bg: linear-gradient(to right, #343a40, #212529);
  --newsletter-text: white;
}

.theme-primary {
  --newsletter-bg: linear-gradient(to right, var(--primary-color, #0066cc), #0055b3);
  --newsletter-text: white;
}

.theme-secondary {
  --newsletter-bg: linear-gradient(to right, var(--secondary-color, #6c757d), #5a6268);
  --newsletter-text: white;
}

/* Responsives Design */
@media (max-width: 767px) {
  .newsletter-form {
    margin-top: 1.5rem;
  }
}
</style>