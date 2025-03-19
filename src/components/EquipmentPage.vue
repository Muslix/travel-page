<template>
  <div class="equipment page-transition">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">Unsere Ausrüstung</h1>

      <!-- Tour Info Banner -->
      <div class="tour-info-banner mb-5 p-4 rounded">
        <div class="row align-items-center">
          <div class="col-md-7">
            <h2>600km Tour von Mainz nach Calais</h2>
            <p class="lead mb-3">25.-30. Mai 2025 durch Deutschland, Belgien und Frankreich</p>
            <div class="d-flex flex-wrap">
              <div class="info-badge me-2 mb-2"><i class="bi bi-calendar"></i> 6 Tage</div>
              <div class="info-badge me-2 mb-2"><i class="bi bi-geo-alt"></i> 3 Länder</div>
              <div class="info-badge me-2 mb-2"><i class="bi bi-people"></i> Martin & Rafael</div>
            </div>
          </div>
          <div class="col-md-5 mt-3 mt-md-0 text-md-end">
            <button class="btn btn-outline-light" @click="$emit('navigate', 'route')">
              <i class="bi bi-map me-2"></i> Zur Routenplanung
            </button>
          </div>
        </div>
      </div>

      <!-- Equipment Navigation -->
      <ul class="nav nav-tabs equipment-tabs mb-4" id="equipmentTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="martin-tab" data-bs-toggle="tab" data-bs-target="#martin"
                  type="button" role="tab" aria-controls="martin" aria-selected="true">
            <i class="bi bi-person-circle me-2"></i>Martins Ausrüstung
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="rafael-tab" data-bs-toggle="tab" data-bs-target="#rafael"
                  type="button" role="tab" aria-controls="rafael" aria-selected="false">
            <i class="bi bi-person-circle me-2"></i>Rafaels Ausrüstung
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="shared-tab" data-bs-toggle="tab" data-bs-target="#shared"
                  type="button" role="tab" aria-controls="shared" aria-selected="false">
            <i class="bi bi-people-fill me-2"></i>Gemeinsame Ausrüstung
          </button>
        </li>
      </ul>

      <!-- Equipment Content -->
      <div class="tab-content" id="equipmentTabContent">
        <!-- Martin's Equipment -->
        <div class="tab-pane fade show active" id="martin" role="tabpanel" aria-labelledby="martin-tab">
          <div class="row mb-4">
            <div class="col-md-4 mb-4">
              <div class="equipment-profile card h-100">
                <div class="card-body">
                  <div class="text-center mb-4">
                    <i class="bi bi-person-circle profile-icon"></i>
                    <h3 class="mt-3">Martin</h3>
                    <p class="text-muted">Radlertyp: Touring-Enthusiast</p>
                  </div>
                  <p>Der klassische Tourenfahrer, der auf bewährte Ausrüstung und Komfort setzt. Mit einem stabilen Trekkingrad und traditionellen Packtaschen ist er für die lange Strecke gerüstet.</p>
                  <div class="equipment-style">
                    <div class="style-tag">Robust</div>
                    <div class="style-tag">Komfortabel</div>
                    <div class="style-tag">Klassisch</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="card h-100">
                <div class="card-body">
                  <h3 class="card-title">Mein Hauptequipment</h3>

                  <div class="equipment-main mb-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="bike-section">
                          <h4><i class="bi bi-bicycle me-2"></i>Mein Fahrrad</h4>
                          <div class="bike-details">
                            <img src="/bike-placeholder.jpg" alt="Martins Fahrrad" class="img-fluid rounded mb-2">
                            <h5>Trek 520 Touring</h5>
                            <p>Solides Stahlrahmen-Trekkingrad speziell für lange Radreisen konzipiert. Mit stabilen 36-Speichen-Laufrädern und bequemer Geometrie für lange Tage im Sattel.</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="tent-section">
                          <h4><i class="bi bi-house me-2"></i>Mein Zelt</h4>
                          <div class="tent-details">
                            <img src="/tent-placeholder.jpg" alt="Martins Zelt" class="img-fluid rounded mb-2">
                            <h5>MSR Hubba Hubba 1P</h5>
                            <p>Kompaktes Einpersonenzelt mit guter Balance zwischen Gewicht und Stabilität. Schnell aufzubauen und sturmsicher für alle Wetterbedingungen.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 class="mt-4">Weitere Ausrüstungsgegenstände</h4>
                  <div class="equipment-list">
                    <div class="equipment-item">
                      <i class="bi bi-bag"></i>
                      <span><strong>Ortlieb Back-Roller Classic</strong> - Bewährte wasserdichte Packtaschen</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-moon"></i>
                      <span><strong>Thermarest NeoAir</strong> - Komfortable Isomatte für erholsamen Schlaf</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-bag-check"></i>
                      <span><strong>Schlafsack</strong> - 3-Jahreszeiten Schlafsack, Komfortbereich bis 5°C</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-headset"></i>
                      <span><strong>Stirnlampe</strong> - Für Arbeiten am Zelt nach Sonnenuntergang</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-cup-hot"></i>
                      <span><strong>Campinggeschirr</strong> - Leichte Titanschale und -becher</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-moisture"></i>
                      <span><strong>Regenjacke & -hose</strong> - Wasserdichte Kleidung für alle Wetterbedingungen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="equipment-philosophy mt-4 p-4 rounded">
            <h4>Meine Touring-Philosophie</h4>
            <p>
              Ich bevorzuge ein traditionelles Touring-Setup, das zuverlässig und bewährt ist.
              Lieber etwas mehr Gewicht für zusätzlichen Komfort und Sicherheit als ultraleicht und
              dann im Regen frieren oder bei technischen Problemen hilflos sein.
            </p>
            <p class="mb-0">
              Mein Motto: <em>"Gut vorbereitet ist halb gefahren."</em>
            </p>
          </div>
        </div>

        <!-- Rafael's Equipment -->
        <div class="tab-pane fade" id="rafael" role="tabpanel" aria-labelledby="rafael-tab">
          <div class="row mb-4">
            <div class="col-md-4 mb-4">
              <div class="equipment-profile card h-100 rafael-profile">
                <div class="card-body">
                  <div class="text-center mb-4">
                    <i class="bi bi-person-circle profile-icon"></i>
                    <h3 class="mt-3">Rafael</h3>
                    <p class="text-muted">Radlertyp: Gravel-Abenteurer</p>
                  </div>
                  <p>Der moderne Bikepacker mit minimalem Gepäck und maximalem Tempo. Auf seinem Gravelbike setzt Rafael auf ultraleichte Ausrüstung und aerodynamische Packweise.</p>
                  <div class="equipment-style">
                    <div class="style-tag">Schnell</div>
                    <div class="style-tag">Minimalistisch</div>
                    <div class="style-tag">Modern</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="card h-100">
                <div class="card-body">
                  <h3 class="card-title">Rafaels Hauptequipment</h3>

                  <div class="equipment-main mb-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="bike-section">
                          <h4><i class="bi bi-bicycle me-2"></i>Sein Fahrrad</h4>
                          <div class="bike-details">
                            <img src="/bike-placeholder.jpg" alt="Rafaels Fahrrad" class="img-fluid rounded mb-2">
                            <h5>Specialized Diverge</h5>
                            <p>Modernes Gravelbike mit Carbonrahmen und flexibler Geometrie. Perfekt für schnelle Strecken auf unterschiedlichen Untergründen.</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="tent-section">
                          <h4><i class="bi bi-house me-2"></i>Sein Zelt</h4>
                          <div class="tent-details">
                            <img src="/tent-placeholder.jpg" alt="Rafaels Zelt" class="img-fluid rounded mb-2">
                            <h5>Big Agnes Copper Spur HV UL1</h5>
                            <p>Ultraleichtes Einpersonenzelt mit minimalem Packmaß und schnellem Aufbau. Für Rafael zählt jedes gesparte Gramm.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 class="mt-4">Weitere Ausrüstungsgegenstände</h4>
                  <div class="equipment-list">
                    <div class="equipment-item">
                      <i class="bi bi-bag"></i>
                      <span><strong>Apidura Bikepacking Taschen</strong> - Aerodynamisches Packsystem</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-moon"></i>
                      <span><strong>Therm-a-Rest NeoAir XLite</strong> - Ultraleichte Isomatte</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-bag-check"></i>
                      <span><strong>Daunenschlafsack</strong> - Leichter Schlafsack mit Comfort bis 0°C</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-fire"></i>
                      <span><strong>MSR PocketRocket 2</strong> - Kompakter Gaskocher</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-cup"></i>
                      <span><strong>Titanium Koch-Set</strong> - Ultraleichtes Kochgeschirr</span>
                    </div>
                    <div class="equipment-item">
                      <i class="bi bi-droplet"></i>
                      <span><strong>Wasserfilter</strong> - Zum Auffüllen der Flaschen aus natürlichen Quellen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="equipment-philosophy rafael-philosophy mt-4 p-4 rounded">
            <h4>Rafaels Bikepacking-Philosophie</h4>
            <p>
              Für mich steht Geschwindigkeit und Flexibilität im Vordergrund. Jedes Gramm zählt,
              deshalb investiere ich in ultraleichte Premium-Ausrüstung und reduziere alles auf das
              Wesentliche.
            </p>
            <p class="mb-0">
              Mein Motto: <em>"Weniger ist mehr, schneller ist besser."</em>
            </p>
          </div>
        </div>

        <!-- Shared Equipment -->
        <div class="tab-pane fade" id="shared" role="tabpanel" aria-labelledby="shared-tab">
          <div class="shared-equipment-intro p-4 rounded mb-4">
            <div class="row align-items-center">
              <div class="col-md-8">
                <h3>Unsere gemeinsame Ausrüstung</h3>
                <p class="lead">
                  Einige Ausrüstungsgegenstände teilen wir uns, um Gewicht zu sparen und effizienter unterwegs zu sein.
                </p>
              </div>
              <div class="col-md-4 text-center text-md-end">
                <i class="bi bi-people-fill shared-icon"></i>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-tools"></i>
                </div>
                <h4>Werkzeug & Reparaturkit</h4>
                <p>Umfassendes Set mit Multitool, Ersatzschläuchen, Flickzeug und Spezialwerkzeugen für alle gängigen Reparaturen unterwegs.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-bandaid"></i>
                </div>
                <h4>Erste-Hilfe-Set</h4>
                <p>Kompaktes aber umfangreiches Erste-Hilfe-Set mit Verbandsmaterial, Desinfektionsmitteln, Schmerzmitteln und Blasenpflaster.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-compass"></i>
                </div>
                <h4>Navigation</h4>
                <p>Garmin GPS mit vorbereiteten Tracks, Offline-Karten und lange Akkulaufzeit. Als Backup haben wir gedruckte Karten dabei.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-battery-charging"></i>
                </div>
                <h4>Powerbank</h4>
                <p>20.000 mAh Powerbank zum Laden von Navigation, Smartphones und anderer elektronischer Geräte, mit mehreren Anschlüssen.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-camera"></i>
                </div>
                <h4>Kameraausrüstung</h4>
                <p>Kompakte Systemkamera mit wetterfestem Gehäuse und mehreren Objektiven, um die Tour in Bildern festzuhalten.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="shared-item-card h-100">
                <div class="card-icon">
                  <i class="bi bi-shield-check"></i>
                </div>
                <h4>Sicherheitsausrüstung</h4>
                <p>Fahrradschlösser, Warnwesten und starke Beleuchtungssets für sicheres Fahren bei schlechten Sichtverhältnissen.</p>
              </div>
            </div>
          </div>

          <div class="equipment-philosophy shared-philosophy mt-4 p-4 rounded">
            <h4>Unsere gemeinsame Philosophie</h4>
            <p>
              Obwohl wir unterschiedliche Ansätze beim Rad und persönlicher Ausrüstung haben, sind wir uns einig,
              dass Sicherheit und Zuverlässigkeit an erster Stelle stehen. Durch das Teilen bestimmter Ausrüstung
              sparen wir Gewicht und sind trotzdem für alle Eventualitäten gerüstet.
            </p>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <button class="btn btn-primary me-2" @click="$emit('navigate', 'route')">
          <i class="bi bi-map me-2"></i> Zur Routenplanung
        </button>
        <button class="btn btn-outline-primary" @click="$emit('navigate', 'gallery')">
          <i class="bi bi-images me-2"></i> Zur Galerie
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['navigate']);
</script>

<style scoped>
/* Tour Info Banner */
.tour-info-banner {
  background: linear-gradient(to right, var(--primary-color), #0097ff);
  color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.info-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.info-badge i {
  margin-right: 5px;
}

/* Equipment Tabs */
.equipment-tabs {
  border-bottom: 1px solid #dee2e6;
}

.equipment-tabs .nav-link {
  border: none;
  color: var(--secondary-color);
  position: relative;
  font-weight: 500;
}

.equipment-tabs .nav-link:after {
  content: '';
  position: absolute;
  height: 3px;
  width: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.equipment-tabs .nav-link.active {
  color: var(--primary-color);
  background-color: transparent;
  border: none;
}

.equipment-tabs .nav-link.active:after {
  width: 80%;
}

/* Profile Cards */
.equipment-profile {
  background: #f8f9fa;
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.profile-icon {
  font-size: 4rem;
  color: var(--primary-color);
}

.rafael-profile .profile-icon {
  color: #28a745;
}

.equipment-style {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}

.style-tag {
  background-color: rgba(0,123,255,0.1);
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 15px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

/* Equipment Items */
.equipment-main {
  margin-top: 20px;
}

.bike-section, .tent-section {
  margin-bottom: 20px;
}

.bike-details, .tent-details {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.equipment-list {
  margin-top: 15px;
}

.equipment-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.equipment-item:hover {
  background-color: #e9ecef;
  transform: translateX(5px);
}

.equipment-item i {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-right: 15px;
  min-width: 20px;
  text-align: center;
}

/* Equipment Philosophy */
.equipment-philosophy {
  background-color: #f1f8ff;
  border-left: 5px solid var(--primary-color);
}

.rafael-philosophy {
  background-color: #f1fff6;
  border-left: 5px solid #28a745;
}

.shared-philosophy {
  background-color: #f8f9fa;
  border-left: 5px solid #17a2b8;
}

/* Shared Equipment */
.shared-equipment-intro {
  background: linear-gradient(to right, #17a2b8, #5bc0de);
  color: white;
}

.shared-icon {
  font-size: 3rem;
  opacity: 0.8;
}

.shared-item-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.shared-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 2rem;
  color: #17a2b8;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .equipment-tabs .nav-link {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>