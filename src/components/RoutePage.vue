<template>
  <div class="route">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">RAMAdventure: Unsere 630km Route</h1>

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
                Unsere 630km Route führt durch malerische Landschaften, kleine Dörfer und entlang schöner Flüsse von Mainz nach Calais.
                Die Route umfasst etwa 5000 Höhenmeter bergauf und 5000 Höhenmeter bergab über die gesamte Strecke.
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
                  <strong>630 km</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Geplante Dauer:</span>
                  <strong>6 Tage</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Höhenmeter aufwärts:</span>
                  <strong>ca. 5000 m</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Höhenmeter abwärts:</span>
                  <strong>ca. 5000 m</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Durchschnitt pro Tag:</span>
                  <strong>~105 km</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Start:</span>
                  <strong>Mainz</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Ziel:</span>
                  <strong>Calais</strong>
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
                <td>Mainz</td>
                <td>Trier</td>
                <td>105 km</td>
                <td>850 m</td>
                <td>Entlang des Rheins und der Mosel</td>
              </tr>
              <tr>
                <td>Tag 2</td>
                <td>Trier</td>
                <td>Luxemburg</td>
                <td>105 km</td>
                <td>950 m</td>
                <td>Grenzübergang nach Luxemburg</td>
              </tr>
              <tr>
                <td>Tag 3</td>
                <td>Luxemburg</td>
                <td>Namur</td>
                <td>110 km</td>
                <td>800 m</td>
                <td>Durch die belgischen Ardennen</td>
              </tr>
              <tr>
                <td>Tag 4</td>
                <td>Namur</td>
                <td>Brüssel</td>
                <td>100 km</td>
                <td>600 m</td>
                <td>Entlang der Maas</td>
              </tr>
              <tr>
                <td>Tag 5</td>
                <td>Brüssel</td>
                <td>Lille</td>
                <td>105 km</td>
                <td>800 m</td>
                <td>Durch flämische Landschaften</td>
              </tr>
              <tr>
                <td>Tag 6</td>
                <td>Lille</td>
                <td>Calais</td>
                <td>105 km</td>
                <td>1000 m</td>
                <td>Finale Etappe mit Blick aufs Meer</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="table-info">
                <td colspan="3"><strong>Gesamt</strong></td>
                <td><strong>630 km</strong></td>
                <td><strong>5000 m</strong></td>
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