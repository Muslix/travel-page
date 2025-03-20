<template>
  <div class="route">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">
        {{ currentAdventure.title }}: Unsere {{ currentAdventure.distance }}km Route
      </h1>

      <div class="row mb-5">
        <div class="col-lg-8 mb-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Routenübersicht</h2>
              <div class="map-placeholder">
                <!-- Hier später eine echte Karte mit eurer Route einfügen -->
                <div class="map-overlay">
                  <span>Karte wird geladen...</span>
                </div>
              </div>
              <p class="mt-3">
                {{ currentAdventure.route.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Routenstatistik</h2>
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
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <h2 class="mb-4">Etappenplan</h2>
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
        <h2 class="mb-4">Unterkunft & Verpflegung</h2>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h5">{{ currentAdventure.route.accommodationInfo.title }}</h3>
                <p>
                  {{ currentAdventure.route.accommodationInfo.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h5">{{ currentAdventure.route.foodInfo.title }}</h3>
                <p>
                  {{ currentAdventure.route.foodInfo.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="text-center mt-5">
        <button class="btn btn-primary me-2" @click="$emit('navigate', 'equipment')">
          <i class="bi bi-bicycle me-2"></i>Unsere Ausrüstung
        </button>
        <button class="btn btn-outline-primary" @click="$emit('navigate', 'home')">
          <i class="bi bi-house me-2"></i>Zurück zur Startseite
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCurrentAdventure } from '../data/adventures';
import { calculateDays } from '../data/dateUtils';

defineEmits(["navigate"]);

// Aktuelles Abenteuer laden
const currentAdventure = ref(getCurrentAdventure());

// Berechne die Anzahl der Tage für das aktuelle Abenteuer
const adventureDays = computed(() => {
  return calculateDays(
    currentAdventure.value.startDate,
    currentAdventure.value.endDate
  );
});
</script>

<style scoped>
.map-placeholder {
  background-color: #e9ecef;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 20px;
}

.map-overlay {
  background-color: rgba(0, 0, 0, 0.1);
  color: #495057;
  padding: 15px 30px;
  border-radius: 5px;
  font-weight: bold;
}

h2 {
  position: relative;
  padding-bottom: 10px;
}

h2:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #007bff;
}

.table {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table thead th {
  border-top: none;
}
</style>
