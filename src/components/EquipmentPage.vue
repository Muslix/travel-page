<template>
  <div class="equipment page-transition">
    <div class="container py-5">
      <SectionTitle
        title="Unsere Ausrüstung"
        dividerWidth="120px"
      />

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
            <router-link to="/route">
              <AppButton
                variant="outline-light"
              >
                <template #icon>
                  <i class="bi bi-map"></i>
                </template>
                Zur Routenplanung
              </AppButton>
            </router-link>
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
                <AppCard
                  :full-height="true"
                  :elevation="3"
                  :theme="participant === 'Rafael' ? 'accent' : 'primary'"
                  :class="{ 'rafael-profile': participant === 'Rafael' }"
                >
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
                </AppCard>
              </div>

              <!-- Equipment details -->
              <div class="col-md-8">
                <AppCard :full-height="true" :elevation="2">
                  <template #header>
                    <h3 class="card-title">
                      {{
                        participant === currentAdventure.participants[0]
                          ? "Mein"
                          : `${participant}s`
                      }}
                      Hauptequipment
                    </h3>
                  </template>

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
                </AppCard>
              </div>
            </div>

            <!-- Philosophy section -->
            <AppCard
              :elevation="2"
              :theme="participant === 'Rafael' ? 'accent' : 'primary'"
              class="equipment-philosophy mt-4"
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
            </AppCard>
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
          <AppCard :elevation="3" theme="info" class="shared-equipment-intro mb-4">
            <div class="row align-items-center">
              <div class="col-md-8">
                <h3>{{ equipment.shared.intro.title }}</h3>
                <p class="lead">{{ equipment.shared.intro.description }}</p>
              </div>
              <div class="col-md-4 text-center text-md-end">
                <i class="bi bi-people-fill shared-icon"></i>
              </div>
            </div>
          </AppCard>

          <div class="row g-4">
            <div
              class="col-md-6 col-lg-4"
              v-for="(item, index) in equipment.shared.items"
              :key="index"
            >
              <FeatureItem
                :title="item.title"
                :description="item.description"
                :icon="item.icon"
              />
            </div>
          </div>

          <AppCard
            :elevation="2"
            theme="info"
            class="mt-4 shared-philosophy"
          >
            <h4>{{ equipment.shared.philosophy.title }}</h4>
            <p>{{ equipment.shared.philosophy.text }}</p>
          </AppCard>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/route">
          <AppButton
            variant="primary"
            class="me-2"
          >
            <template #icon>
              <i class="bi bi-map"></i>
            </template>
            Zur Routenplanung
          </AppButton>
        </router-link>
        <router-link to="/gallery">
          <AppButton
            variant="outline-primary"
          >
            <template #icon>
              <i class="bi bi-images"></i>
            </template>
            Zur Galerie
          </AppButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { getEquipmentForAdventure } from "../data/adventures";
import { formatReadableDate, calculateDays } from "../data/dateUtils";
import { AppCard, AppButton, FeatureItem, SectionTitle } from "./common";

// Aktiver Tab
const activeTab = ref("martin");

// Aktuelles Abenteuer injizieren statt neu zu laden
const currentAdventure = inject('currentAdventure');
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
/* Alle gemeinsamen Stile wurden in die components.css ausgelagert. */
/* Hier nur noch sehr spezifische Anpassungen, falls nötig. */
</style>
