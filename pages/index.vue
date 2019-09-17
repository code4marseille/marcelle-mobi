<template>
  <div class="d-flex flex-column justify-content-between dashboard-contener">
    <header>
      <!--<Navbar /> -->
      <div class="display-4">Marseille</div>
    </header>
    <!-- meteo -->
    <div>
      <p>
        <span>
          <img src="~/assets/images/sun.svg" />
        </span>
        {{ temperature }}
      </p>
      <p>
        {{ windSpeed }}
        <span class="text-lowercase">km/h</span>
      </p>
    </div>
    <!-- air quality -->
    <div>
      <span class="indice-quality">{{ indiceQuality }}</span>/10
      <div>{{textAirQuality}}</div>
    </div>
    <!-- what to do today -->
    <div>
      <p>à faire aujourd'hui :</p>
      <div class="activities">
        <i class="fas fa-basketball-ball px-5"></i>
        <i class="fas fa-bicycle px-5"></i>
      </div>
      <p>Description de l'activité</p>
    </div>
    <!-- find transport -->
    <div>
      <b-button pill variant="primary">Trouver un moyen de transport</b-button>
    </div>
    <!-- infos rtm -->
    <div>Infos trafic RTM</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: '31°',
      windSpeed: 10,
      indiceQuality: 8
    }
  },

  computed: {
    textAirQuality() {
      switch (this.indiceQuality) {
        case 0:
          return 'lorem0'
          break
        case 1:
          return 'lorem1'
          break
        case 2:
          return 'lorem2'
          break
        case 3:
          return 'lorem3'
          break
        case 4:
          return 'lorem4'
          break
        case 5:
          return 'lorem5'
          break
        case 6:
          return 'lorem6'
          break
        case 7:
          return 'lorem7'
          break
        case 8:
          return 'lorem8'
          break
        case 9:
          return 'lorem9'
          break
        case 10:
          return 'lorem10'
          break
        default:
          return 'neant'
      }
    }
  }
}
</script>

<style>
body {
  background-color: rgb(37, 169, 232);
  color: white;
  text-align: center;
  font-size: 1.1em;
  text-transform: uppercase;
}

body i {
  font-size: 2.2em;
  padding: 10px;
}

.btn {
  padding: 10px;
}

.dashboard-contener {
  min-height: 100vh;
  padding: 2vh;
}

.indice-quality {
  font-size: 2em;
}
</style>
