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
        <span :style="{color:tColor}">
          <i class="fas fa-circle"></i>
        </span>
        <span class="indice-quality">{{ temperature }}</span> °C
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
      <span :style="{color:aQColor}">
        <i class="fas fa-circle"></i>
      </span>
      <span class="indice-quality">{{ indiceQuality }}</span>/10
      <div>{{textAirQuality}}</div>
    </div>
    <!-- what to do today -->
    <div>
      <p>à faire aujourd'hui :</p>
      <div class="activities">
        <span v-for="(act, id)
         in activites" :key="id" :style="act.color">
          <span v-html="act.icon"></span>
        </span>
        <!-- <i class="fas fa-basketball-ball px-5"></i>
        <i class="fas fa-bicycle px-5"></i>-->
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
      aQColor: "white",
      temperature: "",
      windSpeed: 0,
      indiceQuality: 0,
      weatherIcon: "",
      weatherIcons: {
        Rain: {
          icon: '<i class="wi wi-day-rain"></i>',
          comment: "Pluie",
          family: "clear"
        },

        Clouds: {
          icon: '<i class="wi wi-day-cloudy"></i>',
          comment: "Nuageux",
          family: "clear"
        },

        Clear: {
          icon: '<i class="wi wi-day-sunny"></i>',
          comment: "Dégagé",
          family: "clear"
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
      windArrow: "",
      tColor: "",

      colorTemp: {
        cold: "#7AE5ED",
        hot: "#F9B34D",
        normal: "#AAEC76"
      },
      activites: [
        {
          name: "bowling",
          icon: '<i class="fas fa-bowling-ball"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 20,
            minWind: 0,
            maxWind: 100
          },
          color: ""
        },
        {
          name: "cinema",
          icon: '<i class="fas fa-film"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 20,
            minWind: 0,
            maxWind: 100
          },
          color: ""
        },
        {
          name: "foot",
          icon: '<i class="far fa-futbol"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          },
          color: ""
        },

        {
          name: "nautisme",
          icon: '<i class="fas fa-ship"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          },
          color: ""
        },
        {
          name: "rando",
          icon: '<i class="fas fa-hiking"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          },
          color: ""
        },
        {
          name: "games",
          icon: '<i class="fas fa-gamepad"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 30,
            minWind: 0,
            maxWind: 100
          },
          color: ""
        },
        {
          name: "plage",
          icon: '<i class="fas fa-umbrella-beach"></i>',
          conditions: {
            beau: true,
            minTemp: 20,
            maxTemp: 50,
            minWind: 0,
            maxWind: 40
          },
          color: ""
        },
        {
          name: "basket",
          icon: '<i class="fas fa-basketball-ball"></i>',
          conditions: {
            beau: true,
            minTemp: 20,
            maxTemp: 50,
            minWind: 0,
            maxWind: 40
          },
          color: ""
        },
        {
          name: "sieste",
          icon: '<i class="fas fa-bed"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 10,
            minWind: 0,
            maxWind: 100
          },
          color: ""
        }
      ]
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
        let weather = "";

        const temp = Math.round(response.main.temp);
        if (temp < 15) {
          this.tColor = this.colorTemp.cold;
        } else if (temp < 30) {
          this.tColor = this.colorTemp.normal;
        } else {
          this.tColor = this.colorTemp.hot;
        }
        this.temperature = temp;

        weather = response.weather[0].main;
        // weather = weather.toLowerCase;
        // console.log("weather : " + weather);
        this.weatherIcon = this.weatherIcons[weather].icon;
        this.windSpeed = Math.trunc(response.wind.speed * 3.6);
        this.windArrow = `<i class="fas fa-arrow-up" style="transform:rotate(${response.wind.deg}); "></i>`;
        // console.log(this.windArrow);
      });
    this.$axios
      .$get("http://marcelle-mobi-api.herokuapp.com/airs/quality")
      .then(response => {
        const aq = Math.round(10 - response.data.aqi / 10);
        // const aq = 0;
        if (aq > 5) {
          this.aQColor = this.colorTemp.normal;
        } else {
          this.aQColor = this.colorTemp.hot;
        }

        this.indiceQuality = aq;
      });
  },
  mounted() {
    this.activites.forEach(e => {
      if (
        this.temperature < e.maxTemp &&
        (this.temperature > e.minTemp && this.windSpeed > e.minWind) &&
        this.windSpeed < e.maxWind
      ) {
        e.color = this.colorTemp.normal;
      } else {
        e.color = this.colorTemp.hot;
      }

      console.log(e.name, e.color);
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

.fa-circle {
  font-size: 0.8rem;
}
</style>
