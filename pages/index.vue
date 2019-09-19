<template>
  <div
    class="d-flex flex-column justify-content-between dashboard-contener"
    :style="{backgroundImage:'url('+activeBackground+')', backgroundPosition:'center', backgroundRepeat:'no-repeat'}"
  >
    <header>
      <!--<Navbar /> -->
      <div class="display-4">Marseille</div>
    </header>

    <div>
      <p>
        <span v-html="weatherIcon"></span>
        <!-- {{ weatherIcon}}  -->
        <!-- {{ }} -->
        <i class="fas fa-thermometer-half"></i>
        <span class="indice-quality">{{ temperature }}</span>
        °C
      </p>
      <p>
        <i
          class="fas fa-fan"
          style="animation-name:'rotated'; animation-iteration-count:'infinite'"
          :style="fanSpeed"
        ></i>
        <span v-html="windArrow"></span>
        <span class="indice-quality">{{ windSpeed }}</span>
        <span class="text-lowercase">km/h</span>
      </p>
    </div>
    <!-- air quality -->
    <div>
      <i class="fas fa-wind"></i>
      <span class="indice-quality">{{ indiceQuality }}</span>
      /10
      <div>{{textAirQuality}}</div>
    </div>
    <!-- what to do today -->
    <!-- <keep-alive> -->
    <p>à faire aujourd'hui :</p>
    <div>
      <div class="activitiesProposees">
        <span v-for="(act, id)
     in activitesProposees" :key="id">
          <acronym v-bind:title="act.nom">
            <span v-html="act.icon"></span>
          </acronym>
        </span>
        <!-- <i class="fas fa-basketball-ball px-5"></i>
        <i class="fas fa-bicycle px-5"></i>-->
      </div>
      <p>Description de l'activité</p>
    </div>
    <!-- </keep-alive> -->
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
      temperature: "-",
      windSpeed: "-",
      indiceQuality: "-",
      weatherIcon: "",
      weatherIcons: {
        Thunderstorm: {
          icon: "wi-day-thunderstorm",
          clear: false
        },
        Drizzle: { icon: "wi-day-sleet", clear: false },
        Rain: { icon: "wi-day-rain", clear: false },
        Snow: { icon: "wi-day-snow", clear: false },
        Mist: { icon: " wi-day-fog", clear: false },
        Smoke: { icon: "wi-day-sleet", clear: false },
        Haze: { icon: "wi-day-haze", clear: false },
        Dust: { icon: "wi-dust", clear: false },
        Fog: { icon: "wi-day-fog", clear: false },
        Sand: { icon: "wi-sandstorm", clear: false },
        Ash: { icon: "wi-volcano", clear: false },
        Squall: {
          icon: "wi-day-cloudy-gusts",
          clear: false
        },
        Tornado: { icon: "wi-tornado", clear: false },
        Clear: { icon: "wi-day-sunny", clear: true },
        Clouds: { icon: "wi-day-cloudy", clear: true }
      },
      windArrow: "",

      colorTemp: {
        cold: "#7AE5ED",
        hot: "#F9B34D",
        normal: "#AAEC76"
      },
      activitesProposees: [],
      activites: [
        {
          name: "bowling",
          icon: '<i class="fas fa-bowling-ball"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 30,
            minWind: 0,
            maxWind: 100
          }
        },
        {
          name: "cinéma",
          icon: '<i class="fas fa-film"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 30,
            minWind: 0,
            maxWind: 100
          }
        },
        {
          name: "football",
          icon: '<i class="fas fa-futbol"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          }
        },

        {
          name: "sports nautique",
          icon: '<i class="fas fa-ship"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          }
        },
        {
          name: "randonnée",
          icon: '<i class="fas fa-hiking"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          }
        },
        {
          name: "arcade",
          icon: '<i class="fas fa-gamepad"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 10,
            minWind: 0,
            maxWind: 100
          }
        },
        {
          name: "plage",
          icon: '<i class="fas fa-water"></i>',
          conditions: {
            beau: true,
            minTemp: 20,
            maxTemp: 50,
            minWind: 0,
            maxWind: 40
          }
        },
        {
          name: "basket",
          icon: '<i class="fas fa-basketball-ball"></i>',
          conditions: {
            beau: true,
            minTemp: 10,
            maxTemp: 30,
            minWind: 0,
            maxWind: 40
          }
        },
        {
          name: "sieste",
          icon: '<i class="fas fa-bed"></i>',
          conditions: {
            beau: false,
            minTemp: 30,
            maxTemp: 100,
            minWind: 50,
            maxWind: 1000
          }
        }
      ],

      activeBackground: require("~/assets/images/lungs.svg"),
      fanSpeed: { animationDuration: "42s" }
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
    let temp, wind, aq;
    this.$axios
      .$get("http://marcelle-mobi-api.herokuapp.com/weathers/today")
      .then(response => {
        let weather = "";
        temp = Math.round(response.main.temp);
        // const temp = 35;
        // if (temp < 15) {
        //   this.tColor = this.colorTemp.cold;
        // } else if (temp < 30) {
        //   this.tColor = this.colorTemp.normal;
        // } else {
        //   this.tColor = this.colorTemp.hot;
        // }
        this.temperature = temp;

        weather = response.weather[0].main;

        // weather = "Squall";
        // console.log("weather : " + weather);
        const icone =
          '<i class="wi ' + this.weatherIcons[weather].icon + '"></i>';
        this.weatherIcon = icone;
        wind = Math.trunc(response.wind.speed * 3.6);
        // const wind = 50;
        this.windSpeed = wind;

        this.fanSpeed = {
          animationDuration: wind / 42
        };
        // this.fanSpeed = { color: "red" };

        this.windArrow = `<i class="fas fa-arrow-up" style="transform:rotate(${response.wind.deg}deg); "></i>`;

        this.activites.forEach(element => {
          if (
            element.conditions.minTemp < temp &&
            element.conditions.maxTemp > temp &&
            element.conditions.minWind < wind &&
            element.conditions.maxWind > wind &&
            element.conditions.beau === this.weatherIcons[weather].clear
          ) {
            this.activitesProposees.push({
              nom: element.name.toUpperCase(),
              icon: element.icon
            });
          }
        });
        // console.log(this.activitesProposees);
      });
    this.$axios
      .$get("http://marcelle-mobi-api.herokuapp.com/airs/quality")
      .then(response => {
        const aq = Math.round(10 - response.data.aqi / 10);

        // const aq = 0;
        if (aq > 7) {
          this.activeBackground = this.activeBackground.replace(
            "lungs",
            "lavande"
          );

          // this.aQColor = this.colorTemp.normal;
        } else if (aq < 4) {
          // this.aQColo this.activeBackground = "require(this.bg.lungs)";r = this.colorTemp.hot;

          this.activeBackground = this.activeBackground.replace(
            "lungs",
            "scuba"
          );
        }

        this.indiceQuality = aq;
      });
    // console.log("temp :" + temp, aq, wind);
  }
};
</script>

<style>
body {
  background-color: rgb(37, 169, 232);
  /* background-color: black; */

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

.fa-circle,
.fa-thermometer-half {
  font-size: 1rem;
}

.fa-arrow-up {
  font-size: 1.5rem;
}

@keyframes rotated {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
