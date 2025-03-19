<template>
  <div class="equipment">
    <div class="container py-5">
      <h1 class="display-4 mb-5 text-center">Unsere Ausrüstung</h1>
      
      <section class="mb-5">
        <h2 class="mb-4">Fahrräder</h2>
        <div class="row">
          <div class="col-md-6 mb-4">
            <div class="card equipment-card h-100">
              <img src="/bike-placeholder.jpg" class="card-img-top" alt="Fahrrad 1">
              <div class="card-body">
                <h3 class="card-title">Mikes Fahrrad</h3>
                <p class="card-text">
                  Details zum ersten Fahrrad. Hier kannst du später das Modell, die Ausstattung und besondere Merkmale deines Fahrrads beschreiben.
                </p>
                <div class="mt-3">
                  <a href="#" class="btn btn-outline-primary btn-sm">Mehr Details</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 mb-4">
            <div class="card equipment-card h-100">
              <img src="/bike-placeholder.jpg" class="card-img-top" alt="Fahrrad 2">
              <div class="card-body">
                <h3 class="card-title">Martins Fahrrad</h3>
                <p class="card-text">
                  Details zum zweiten Fahrrad. Hier kannst du später das Modell, die Ausstattung und besondere Merkmale des Fahrrads beschreiben.
                </p>
                <div class="mt-3">
                  <a href="#" class="btn btn-outline-primary btn-sm">Mehr Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="mb-5">
        <h2 class="mb-4">Camping Ausrüstung</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card equipment-card h-100">
              <img src="/tent-placeholder.jpg" class="card-img-top" alt="Zelt">
              <div class="card-body">
                <h3 class="card-title">Zelt</h3>
                <p class="card-text">
                  Details zu eurem Zelt, z.B. Marke, Gewicht, Besonderheiten.
                </p>
                <a href="#" class="btn btn-sm btn-outline-primary">Produkt ansehen</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="card equipment-card h-100">
              <img src="/cooking-placeholder.jpg" class="card-img-top" alt="Kochausrüstung">
              <div class="card-body">
                <h3 class="card-title">Kochausrüstung</h3>
                <p class="card-text">
                  Details zur Kochausrüstung, die ihr auf der Tour mitnehmt.
                </p>
                <a href="#" class="btn btn-sm btn-outline-primary">Produkt ansehen</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-4">
            <div class="card equipment-card h-100">
              <img src="/sleep-placeholder.jpg" class="card-img-top" alt="Schlafsäcke">
              <div class="card-body">
                <h3 class="card-title">Schlafsäcke</h3>
                <p class="card-text">
                  Details zu euren Schlafsäcken und sonstiger Schlafausrüstung.
                </p>
                <a href="#" class="btn btn-sm btn-outline-primary">Produkt ansehen</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 class="mb-4">Weitere Ausrüstung</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Ausrüstungsgegenstand</th>
                <th>Beschreibung</th>
                <th>Gewicht</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fahrradtaschen</td>
                <td>Wasserdichte Packtaschen für Gepäck</td>
                <td>2.5 kg</td>
              </tr>
              <tr>
                <td>Navigationsgerät</td>
                <td>GPS mit vorprogrammierter Route</td>
                <td>0.2 kg</td>
              </tr>
              <tr>
                <td>Toolkit</td>
                <td>Werkzeuge für unterwegs Reparaturen</td>
                <td>0.8 kg</td>
              </tr>
              <tr>
                <td>Erste-Hilfe-Set</td>
                <td>Kompaktes Notfall-Set</td>
                <td>0.4 kg</td>
              </tr>
            </tbody>
          </table>
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
.equipment-card {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.equipment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.equipment-card img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s;
}

.equipment-card:hover img {
  transform: scale(1.05);
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
</style>