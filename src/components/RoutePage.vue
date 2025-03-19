<template>
  <div class="route">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">Unsere 600km Route</h1>
      
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
                Unsere 600km Route führt durch malerische Landschaften, kleine Dörfer und entlang schöner Flüsse.
                Die genaue Streckenführung wird noch festgelegt.
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
                  <strong>600 km</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Geplante Dauer:</span>
                  <strong>7 Tage</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Höhenmeter:</span>
                  <strong>ca. 3000 m</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Durchschnitt pro Tag:</span>
                  <strong>~85 km</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Start:</span>
                  <strong>TBD</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Ziel:</span>
                  <strong>TBD</strong>
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
              <tr>
                <td>Tag 1</td>
                <td>Startpunkt</td>
                <td>Ort 1</td>
                <td>80 km</td>
                <td>450 m</td>
                <td>Flache Etappe zum Einstieg</td>
              </tr>
              <tr>
                <td>Tag 2</td>
                <td>Ort 1</td>
                <td>Ort 2</td>
                <td>90 km</td>
                <td>600 m</td>
                <td>Gebirgspass mit schöner Aussicht</td>
              </tr>
              <tr>
                <td>Tag 3</td>
                <td>Ort 2</td>
                <td>Ort 3</td>
                <td>75 km</td>
                <td>300 m</td>
                <td>Entlang eines Flusses</td>
              </tr>
              <tr>
                <td>Tag 4</td>
                <td>Ort 3</td>
                <td>Ort 4</td>
                <td>95 km</td>
                <td>500 m</td>
                <td>Längste Tagesetappe</td>
              </tr>
              <tr>
                <td>Tag 5</td>
                <td>Ort 4</td>
                <td>Ort 5</td>
                <td>85 km</td>
                <td>450 m</td>
                <td>Sehenswürdigkeit unterwegs</td>
              </tr>
              <tr>
                <td>Tag 6</td>
                <td>Ort 5</td>
                <td>Ort 6</td>
                <td>80 km</td>
                <td>350 m</td>
                <td>Schöne Landschaft</td>
              </tr>
              <tr>
                <td>Tag 7</td>
                <td>Ort 6</td>
                <td>Ziel</td>
                <td>95 km</td>
                <td>350 m</td>
                <td>Finale Etappe</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-info">
                <td colspan="3"><strong>Gesamt</strong></td>
                <td><strong>600 km</strong></td>
                <td><strong>3000 m</strong></td>
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
                <h3 class="h5">Übernachtungen</h3>
                <p>
                  Wir werden hauptsächlich zelten, aber auch nach günstigen Unterkünften Ausschau halten.
                  Falls das Wetter nicht mitspielt, haben wir einen Plan B mit Hostels entlang der Strecke.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h5">Verpflegung</h3>
                <p>
                  Wir werden unterwegs einkaufen und selbst kochen. In größeren Ortschaften planen wir,
                  lokale Spezialitäten zu probieren.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div class="text-center mt-5">
        <button class="btn btn-primary" @click="$emit('navigate', 'home')">Zurück zur Startseite</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['navigate']);
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
  background-color: rgba(0,0,0,0.1);
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
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #007bff;
}

.table {
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.table thead th {
  border-top: none;
}
</style>