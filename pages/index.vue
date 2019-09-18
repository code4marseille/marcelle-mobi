<template>
  <div class="d-flex flex-column justify-content-between dashboard-contener">
    <header>
      <!--<Navbar /> -->
      <div class="display-4">Marseille</div>
    </header>
    <!-- meteo -->
    <div>
      <p>
        <span v-html="weatherIcon"></span>
        {{ temperature }}
      </p>
      <p>
        <span v-html="windArrow"></span>
        {{ windSpeed }}
        <span class="text-lowercase" style="letter-spacing:2px">
          km
          <span>/</span> h
        </span>
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
import axios from "../plugins/axios";
export default {
  data() {
    return {
      temperature: "",
      windSpeed: 0,
      indiceQuality: 0,
      weatherIcon: "",
      weatherIcons: {
        Rain: {
          icon: '<i class="wi wi-day-rain"></i>',
          comment: "Pluie"
        },

        Clouds: {
          icon: '<i class="wi wi-day-cloudy"></i>',
          comment: "Nuageux"
        },

        Clear: {
          icon: '<i class="wi wi-day-sunny"></i>',
          comment: "Dégagé"
        },

        Snow: {
          icon: '<i class="wi wi-day-snow"></i>',
          comment: "Neige"
        },

        Mist: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: "Brumeux"
        },
        Fog: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: "Brouillard"
        },

        Drizzle: {
          icon: '<i class="wi wi-day-sleet"></i>',
          comment: "Grisaille"
        },
        Smoke: {
          icon: '<i class="wi wi-day-sleet"></i>',
          comment: "Grisaille"
        },
        Haze: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: "Brumeux"
        }
      },
      windArrow: ""
    };
  },

  computed: {
    textAirQuality() {
      switch (Math.round(this.indiceQuality)) {
        case 0:
          return "lorem0";
          break;
        case 1:
          return "lorem1";
          break;
        case 2:
          return "lorem2";
          break;
        case 3:
          return "lorem3";
          break;
        case 4:
          return "lorem4";
          break;
        case 5:
          return "lorem5";
          break;
        case 6:
          return "lorem6";
          break;
        case 7:
          return "lorem7";
          break;
        case 8:
          return "lorem8";
          break;
        case 9:
          return "lorem9";
          break;
        case 10:
          return "lorem10";
          break;
        default:
          return "neant";
      }
    }
  },
  created() {
    this.$axios
      .$get("http://marcelle-mobi-api.herokuapp.com/weathers/today")
      .then(response => {
        this.temperature = Math.round(response.main.temp) + " °C";
        this.weatherIcon = this.weatherIcons[response.weather[0].main].icon;
        this.windSpeed = Math.trunc(response.wind.speed * 3.6);
        this.windArrow = `<i class="fas fa-arrow-up" style="transform:rotate(${response.wind.deg}); font-size: 1.1em;"></i>`;
      });
    this.$axios
      .$get("http://marcelle-mobi-api.herokuapp.com/airs/quality")
      .then(response => {
        this.indiceQuality = response.data.aqi / 10;
      });
  }
};
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
