<template>
  <div class="equipment page-transition">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">Unsere Ausrüstung</h1>

      <!-- Tour Info Banner -->
      <div class="tour-info-banner mb-5 p-4 rounded">
        <div class="row align-items-center">
          <div class="col-md-7">
            <h2>{{ currentAdventure.title }}</h2>
            <p class="lead mb-3">
              {{ formatReadableDate(currentAdventure.startDate) }} -
              {{ formatReadableDate(currentAdventure.endDate) }} durch
              {{ currentAdventure.countries.join(", ") }}
            </p>
            <div class="d-flex flex-wrap">
              <div class="info-badge me-2 mb-2">
                <i class="bi bi-calendar"></i> {{ adventureDays }} Tage
              </div>
              <div class="info-badge me-2 mb-2">
                <i class="bi bi-geo-alt"></i>
                {{ currentAdventure.countries.length }} Länder
              </div>
              <div class="info-badge me-2 mb-2">
                <i class="bi bi-people"></i>
                {{ currentAdventure.participants.join(" & ") }}
              </div>
            </div>
          </div>
          <div class="col-md-5 mt-3 mt-md-0 text-md-end">
            <button
              class="btn btn-outline-light"
              @click="$emit('navigate', 'route')"
            >
              <i class="bi bi-map me-2"></i> Zur Routenplanung
            </button>
          </div>
        </div>
      </div>

      <!-- Equipment Navigation -->
      <ul
        class="nav nav-tabs equipment-tabs mb-4"
        id="equipmentTabs"
        role="tablist"
      >
        <li
          class="nav-item"
          role="presentation"
          v-for="(participant, index) in currentAdventure.participants"
          :key="participant"
        >
          <button
            class="nav-link"
            :class="{ active: activeTab === participant.toLowerCase() }"
            :id="`${participant.toLowerCase()}-tab`"
            data-bs-toggle="tab"
            :data-bs-target="`#${participant.toLowerCase()}`"
            type="button"
            role="tab"
            :aria-controls="participant.toLowerCase()"
            :aria-selected="activeTab === participant.toLowerCase()"
            @click="activeTab = participant.toLowerCase()"
          >
            <i class="bi bi-person-circle me-2"></i>{{ participant }}s
            Ausrüstung
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'shared' }"
            id="shared-tab"
            data-bs-toggle="tab"
            data-bs-target="#shared"
            type="button"
            role="tab"
            aria-controls="shared"
            :aria-selected="activeTab === 'shared'"
            @click="activeTab = 'shared'"
          >
            <i class="bi bi-people-fill me-2"></i>Gemeinsame Ausrüstung
          </button>
        </li>
      </ul>

      <!-- Equipment Content -->
      <div class="tab-content" id="equipmentTabContent">
        <!-- Dynamically generated equipment tabs for participants -->
        <template
          v-for="participant in currentAdventure.participants"
          :key="participant"
        >
          <div
            class="tab-pane fade"
            :class="{ 'show active': activeTab === participant.toLowerCase() }"
            :id="participant.toLowerCase()"
            role="tabpanel"
            :aria-labelledby="`${participant.toLowerCase()}-tab`"
          >
            <div class="row mb-4">
              <!-- Participant profile -->
              <div class="col-md-4 mb-4">
                <div
                  class="equipment-profile card"
                  :class="{ 'rafael-profile': participant === 'Rafael' }"
                >
                  <div class="card-body">
                    <div class="text-center mb-4">
                      <i class="bi bi-person-circle profile-icon"></i>
                      <h3 class="mt-3">
                        {{ equipment[participant.toLowerCase()]?.profile.name }}
                      </h3>
                      <p class="text-muted">
                        Radlertyp:
                        {{ equipment[participant.toLowerCase()]?.profile.type }}
                      </p>
                    </div>
                    <p>
                      {{
                        equipment[participant.toLowerCase()]?.profile
                          .description
                      }}
                    </p>
                    <div class="equipment-style">
                      <div
                        class="style-tag"
                        v-for="(tag, tagIndex) in equipment[
                          participant.toLowerCase()
                        ]?.profile.tags"
                        :key="tagIndex"
                      >
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Equipment details -->
              <div class="col-md-8">
                <div class="card h-100">
                  <div class="card-body">
                    <h3 class="card-title">
                      {{
                        participant === currentAdventure.participants[0]
                          ? "Mein"
                          : `${participant}s`
                      }}
                      Hauptequipment
                    </h3>

                    <!-- Main equipment (bike & tent) -->
                    <div class="equipment-main mb-4">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="bike-section">
                            <h4>
                              <i class="bi bi-bicycle me-2"></i
                              >{{
                                participant === currentAdventure.participants[0]
                                  ? "Mein"
                                  : "Sein"
                              }}
                              Fahrrad
                            </h4>
                            <div class="bike-details">
                              <img
                                :src="
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.bike.image
                                "
                                :alt="`${participant}s Fahrrad`"
                                class="img-fluid rounded mb-2"
                              />
                              <h5>
                                {{
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.bike.title
                                }}
                              </h5>
                              <p>
                                {{
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.bike.description
                                }}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="tent-section">
                            <h4>
                              <i class="bi bi-house me-2"></i
                              >{{
                                participant === currentAdventure.participants[0]
                                  ? "Mein"
                                  : "Sein"
                              }}
                              Zelt
                            </h4>
                            <div class="tent-details">
                              <img
                                :src="
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.tent.image
                                "
                                :alt="`${participant}s Zelt`"
                                class="img-fluid rounded mb-2"
                              />
                              <h5>
                                {{
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.tent.title
                                }}
                              </h5>
                              <p>
                                {{
                                  equipment[participant.toLowerCase()]
                                    ?.mainEquipment.tent.description
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Show categorized equipment for first participant -->
                    <template
                      v-if="participant === currentAdventure.participants[0]"
                    >
                      <template
                        v-for="(category, categoryKey) in equipment.categories"
                        :key="categoryKey"
                      >
                        <template
                          v-if="
                            equipment.martin[categoryKey] &&
                            equipment.martin[categoryKey].length > 0
                          "
                        >
                          <h4 class="mt-4">{{ category.title }}</h4>
                          <div class="equipment-list">
                            <div
                              class="equipment-item"
                              v-for="(item, index) in equipment.martin[
                                categoryKey
                              ]"
                              :key="index"
                            >
                              <i :class="`bi ${item.icon}`"></i>
                              <span
                                ><strong>{{ item.title }}</strong> -
                                {{ item.description }}</span
                              >
                            </div>
                          </div>
                        </template>
                      </template>
                    </template>

                    <!-- Show other equipment for other participants -->
                    <template v-else>
                      <h4 class="mt-4">Weitere Ausrüstungsgegenstände</h4>
                      <div class="equipment-list">
                        <div
                          class="equipment-item"
                          v-for="(item, index) in equipment.rafael
                            .otherEquipment"
                          :key="index"
                        >
                          <i :class="`bi ${item.icon}`"></i>
                          <span
                            ><strong>{{ item.title }}</strong> -
                            {{ item.description }}</span
                          >
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Philosophy section -->
            <div
              class="equipment-philosophy mt-4 p-4 rounded"
              :class="{ 'rafael-philosophy': participant === 'Rafael' }"
            >
              <h4>
                {{
                  participant === currentAdventure.participants[0]
                    ? "Meine"
                    : `${participant}s`
                }}
                Bikepacking-Philosophie
              </h4>
              <p>
                {{
                  equipment[participant.toLowerCase()]?.profile.philosophy.text
                }}
              </p>
              <p class="mb-0">
                Mein Motto:
                <em
                  >"{{
                    equipment[participant.toLowerCase()]?.profile.philosophy
                      .motto
                  }}"</em
                >
              </p>
            </div>
          </div>
        </template>

        <!-- Shared Equipment -->
        <div
          class="tab-pane fade"
          :class="{ 'show active': activeTab === 'shared' }"
          id="shared"
          role="tabpanel"
          aria-labelledby="shared-tab"
        >
          <div class="shared-equipment-intro p-4 rounded mb-4">
            <div class="row align-items-center">
              <div class="col-md-8">
                <h3>{{ equipment.shared.intro.title }}</h3>
                <p class="lead">{{ equipment.shared.intro.description }}</p>
              </div>
              <div class="col-md-4 text-center text-md-end">
                <i class="bi bi-people-fill shared-icon"></i>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div
              class="col-md-6 col-lg-4"
              v-for="(item, index) in equipment.shared.items"
              :key="index"
            >
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i :class="`bi ${item.icon}`"></i>
                </div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="equipment-philosophy shared-philosophy mt-4 p-4 rounded">
            <h4>{{ equipment.shared.philosophy.title }}</h4>
            <p>{{ equipment.shared.philosophy.text }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <button
          class="btn btn-primary me-2"
          @click="$emit('navigate', 'route')"
        >
          <i class="bi bi-map me-2"></i> Zur Routenplanung
        </button>
        <button
          class="btn btn-outline-primary"
          @click="$emit('navigate', 'gallery')"
        >
          <i class="bi bi-images me-2"></i> Zur Galerie
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  getCurrentAdventure,
  getEquipmentForAdventure,
} from "../data/adventures";
import {
  formatDate,
  formatReadableDate,
  calculateDays,
} from "../data/dateUtils";

defineEmits(["navigate"]);

// Aktiver Tab
const activeTab = ref("martin");

// Aktuelles Abenteuer und Equipment-Daten laden
const currentAdventure = ref(getCurrentAdventure());
const equipment = ref(getEquipmentForAdventure());

// Berechnete Anzahl der Tage für das aktuelle Abenteuer
const adventureDays = computed(() => {
  return calculateDays(
    currentAdventure.value.startDate,
    currentAdventure.value.endDate
  );
});
</script>

<style scoped>
/* Component-specific styles that override or extend the global styles */

/* Tour Info Banner - specific to this page */
.tour-info-banner {
  background: linear-gradient(to right, var(--primary-color), #0097ff);
  color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

/* Profile-specific styles */
.profile-icon {
  font-size: 4rem;
  color: var(--primary-color);
}

.rafael-profile .profile-icon {
  color: var(--accent-color);
}

.equipment-style {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}

.style-tag {
  background-color: rgba(0, 123, 255, 0.1);
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: var(--radius-pill);
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

/* Equipment specific components */
.bike-section,
.tent-section {
  margin-bottom: 20px;
}

.bike-details,
.tent-details {
  background-color: var(--background-light);
  padding: 15px;
  border-radius: var(--radius-md);
}

/* Rafael specific styles */
.rafael-philosophy {
  background-color: #f1fff6;
  border-left: 5px solid var(--accent-color);
}

/* Shared equipment section styles */
.shared-equipment-intro {
  background: linear-gradient(to right, #17a2b8, #5bc0de);
  color: white;
  border-radius: var(--radius-md);
}

.shared-icon {
  font-size: 3rem;
  opacity: 0.8;
}

.shared-item-card {
  background-color: var(--background-light);
  border-radius: var(--radius-md);
  padding: 25px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.shared-item-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.card-icon {
  font-size: 2rem;
  color: #17a2b8;
  margin-bottom: 15px;
}

.shared-philosophy {
  background-color: var(--background-light);
  border-left: 5px solid #17a2b8;
}
</style>
