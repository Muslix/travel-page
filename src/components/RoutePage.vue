<template>
  <div class="route page-transition">
    <div class="container py-5">
      <SectionTitle
        :title="`${currentAdventure.title}: Unsere ${currentAdventure.distance}km Route`"
        dividerWidth="150px"
      />

      <div class="row mb-5">
        <div class="col-lg-8 mb-4">
          <AppCard
            title="Routenübersicht"
            theme="primary"
            :elevation="2"
          >
            <div class="map-placeholder">
              <!-- Hier später eine echte Karte mit eurer Route einfügen -->
              <div class="map-overlay">
                <span>Karte wird geladen...</span>
              </div>
            </div>
            <p class="mt-3">
              {{ currentAdventure.route.description }}
            </p>
          </AppCard>
        </div>

        <div class="col-lg-4 mb-4">
          <AppCard
            title="Routenstatistik"
            theme="primary"
            :elevation="2"
            :full-height="true"
          >
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <span>Gesamtdistanz:</span>
                <strong>{{ currentAdventure.distance }} km</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Geplante Dauer:</span>
                <strong>{{ adventureDays }} Tage</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Höhenmeter aufwärts:</span>
                <strong>{{ currentAdventure.route.totalElevationUp }} m</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Höhenmeter abwärts:</span>
                <strong>{{ currentAdventure.route.totalElevationDown }} m</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Durchschnitt pro Tag:</span>
                <strong>~{{ Math.round(currentAdventure.distance / adventureDays) }} km</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Start:</span>
                <strong>{{ currentAdventure.route.start }}</strong>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Ziel:</span>
                <strong>{{ currentAdventure.route.end }}</strong>
              </li>
            </ul>
          </AppCard>
        </div>
      </div>

      <div class="mb-5">
        <SectionTitle
          title="Etappenplan"
          :centered="false"
          dividerWidth="80px"
        />
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-primary">
              <tr>
                <th>Tag</th>
                <th>Von</th>
                <th>Nach</th>
                <th>Distanz</th>
                <th>Höhenmeter</th>
                <th>Besonderheiten</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stage in currentAdventure.route.stages" :key="stage.day">
                <td>Tag {{ stage.day }}</td>
                <td>{{ stage.start }}</td>
                <td>{{ stage.end }}</td>
                <td>{{ stage.distance }} km</td>
                <td>{{ stage.elevation }} m</td>
                <td>{{ stage.description }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-info">
                <td colspan="3"><strong>Gesamt</strong></td>
                <td><strong>{{ currentAdventure.distance }} km</strong></td>
                <td><strong>ca. {{ currentAdventure.route.totalElevationUp }} m</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <section>
        <SectionTitle
          title="Unterkunft & Verpflegung"
          :centered="false"
          dividerWidth="100px"
        />
        <div class="row">
          <div class="col-md-6">
            <AppCard
              :title="currentAdventure.route.accommodationInfo.title"
              icon="bi bi-house"
              :elevation="2"
              theme="info"
              :full-height="true"
            >
              {{ currentAdventure.route.accommodationInfo.description }}
            </AppCard>
          </div>
          <div class="col-md-6">
            <AppCard
              :title="currentAdventure.route.foodInfo.title"
              icon="bi bi-cup-hot"
              :elevation="2"
              theme="info"
              :full-height="true"
            >
              {{ currentAdventure.route.foodInfo.description }}
            </AppCard>
          </div>
        </div>
      </section>

      <!-- Newsletter-Anmeldung -->
      <div class="newsletter-section py-5 mt-5">
        <NewsletterSignup
          title="Route-Updates erhalten"
          description="Erhalte Benachrichtigungen, wenn wir unsere Route aktualisieren oder neue Informationen hinzufügen."
          hint="Wir senden nur relevante Updates zu dieser Radtour"
        />
      </div>

      <div class="text-center mt-5">
        <router-link to="/equipment">
          <AppButton
            variant="primary"
            class="me-2"
          >
            <template #icon>
              <i class="bi bi-bicycle"></i>
            </template>
            Unsere Ausrüstung
          </AppButton>
        </router-link>
        <router-link to="/">
          <AppButton
            variant="outline-primary"
          >
            <template #icon>
              <i class="bi bi-house"></i>
            </template>
            Zurück zur Startseite
          </AppButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { calculateDays } from '../data/dateUtils';
import { AppCard, AppButton, SectionTitle, NewsletterSignup } from './common';

// Aktuelles Abenteuer aus der App.vue injizieren
const currentAdventure = inject('currentAdventure');

// Berechne die Anzahl der Tage für das aktuelle Abenteuer
const adventureDays = computed(() => {
  return calculateDays(
    currentAdventure.value.startDate,
    currentAdventure.value.endDate
  );
});
</script>

<style scoped>
/* Alle Stile wurden in die components.css ausgelagert. */
/* Hier würden nur noch sehr spezifische Anpassungen für diese Komponente stehen, falls benötigt. */
</style>
