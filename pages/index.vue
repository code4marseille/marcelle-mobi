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
        <i class="fas fa-thermometer-half"></i>
        <span class="indice-quality">{{ temperature }}</span> °C
        <span :style="{color:tColor}">
          <i class="fas fa-circle"></i>
        </span>
      </p>
      <p>
        <i class="fas fa-fan"></i>
        <span v-html="windArrow"></span>
        <span class="indice-quality">{{ windSpeed }}</span>
        <span class="text-lowercase">
          km/h
          <span :style="{color:wColor}">
            <i class="fas fa-circle"></i>
          </span>
        </span>
      </p>
    </div>
    <!-- air quality -->
    <div>
      <i class="fas fa-wind"></i>
      <span class="indice-quality">{{ indiceQuality }}</span>/10
      <!-- <span :style="{color:aQColor}">
        <i class="fas fa-circle"></i>
      </span>-->
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
      <b-button class="btn-dark-blue" pill variant="primary">Trouver un moyen de transport</b-button>
    </div>

    <!-- INFOS RTM MODAL -->

    <div>
      <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">
        <div class="slideInUp">
          <img src="~/assets/images/up-arrow.svg" width="30px" alt />
          <p class="mb-0">Infos Traffic RTM</p>
        </div>
      </b-button>

      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          <p class="modal_header mx-3 mb-0">perturbations en cours</p>
        </template>

        <div class="carousel">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="white"
            color="rgb(37, 169, 232);"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide>
              <h4 class="modal_title d-block text-center text-capitalize">{{textPlaceModal}}</h4>
              <p class="modal_description text-lowercase">{{textDescriptionModal}}</p>
            </b-carousel-slide>
          </b-carousel>
        </div>
        <b-button class="mt-3 button_modal" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios'
export default {
  data() {
    return {
      // aQColor: "white",
      wColor: 'white',
      temperature: 20,
      windSpeed: 10,
      indiceQuality: 10,
      weatherIcon: '',
      weatherIcons: {
        Rain: {
          icon: '<i class="wi wi-day-rain"></i>',
          comment: 'Pluie',
          clear: true
        },

        Clouds: {
          icon: '<i class="wi wi-day-cloudy"></i>',
          comment: 'Nuageux',
          clear: true
        },

        Clear: {
          icon: '<i class="wi wi-day-sunny"></i>',
          comment: 'Dégagé',
          clear: true
        },

        Snow: {
          icon: '<i class="wi wi-day-snow"></i>',
          comment: 'Neige',
          clear: false
        },

        Mist: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: 'Brumeux',
          clear: false
        },
        Fog: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: 'Brouillard',
          clear: false
        },

        Drizzle: {
          icon: '<i class="wi wi-day-sleet"></i>',
          comment: 'Grisaille',
          clear: false
        },
        Smoke: {
          icon: '<i class="wi wi-day-sleet"></i>',
          comment: 'Grisaille',
          clear: false
        },
        Haze: {
          icon: '<i class="wi wi-day-fog"></i>',
          comment: 'Brumeux',
          clear: false
        }
      },
      windArrow: '',
      tColor: '',

      colorTemp: {
        cold: '#7AE5ED',
        hot: '#F9B34D',
        normal: '#AAEC76'
      },
      activitesProposees: [],
      activites: [
        {
          name: 'bowling',
          icon: '<i class="fas fa-bowling-ball"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 20,
            minWind: 0,
            maxWind: 100
          }
        },
        {
          name: 'cinéma',
          icon: '<i class="fas fa-film"></i>',
          conditions: {
            beau: false,
            minTemp: -50,
            maxTemp: 20,
            minWind: 0,
            maxWind: 100
          }
        },
        {
          name: 'football',
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
          name: 'sports nautique',
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
          name: 'randonée',
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
          name: 'arcade',
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
          name: 'plage',
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
          name: 'basket',
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
          name: 'sieste',
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
      // TEXT MODAL
      textDescriptionModal: 'Lorem, ipsum dolor sit amet consectetur',
      textPlaceModal: 'M2 - Saint Just',
      slide: 0,
      sliding: null,
      activeBackground: require('~/assets/images/lungs.svg')
    }
  },

  computed: {
    textAirQuality() {
      switch (Math.round(this.indiceQuality)) {
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
  },
  created() {
    let temp, wind, aq
    this.$axios
      .$get('http://marcelle-mobi-api.herokuapp.com/weathers/today')
      .then(response => {
        let weather = ''
        temp = Math.round(response.main.temp)
        // const temp = 35;
        if (temp < 15) {
          this.tColor = this.colorTemp.cold
        } else if (temp < 30) {
          this.tColor = this.colorTemp.normal
        } else {
          this.tColor = this.colorTemp.hot
        }
        this.temperature = temp

        weather = response.weather[0].main
        // weather = weather.toLowerCase;
        // console.log("weather : " + weather);
        this.weatherIcon = this.weatherIcons[weather].icon
        wind = Math.trunc(response.wind.speed * 3.6)
        // const wind = 50;
        this.windSpeed = wind
        if (wind < 40) {
          this.wColor = this.colorTemp.normal
        } else {
          this.wColor = this.colorTemp.hot
        }
        this.windArrow = `<i class="fas fa-arrow-up" style="transform:rotate(${response.wind.deg}deg); "></i>`

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
            })
          }
        })
        // console.log(this.activitesProposees);
      })
    this.$axios
      .$get('http://marcelle-mobi-api.herokuapp.com/airs/quality')
      .then(response => {
        const aq = Math.round(10 - response.data.aqi / 10)

        // const aq = 0;
        if (aq > 7) {
          this.activeBackground = this.activeBackground.replace(
            'lungs',
            'lavande'
          )

          // this.aQColor = this.colorTemp.normal;
        } else if (aq < 4) {
          // this.aQColo this.activeBackground = "require(this.bg.lungs)";r = this.colorTemp.hot;

          this.activeBackground = this.activeBackground.replace(
            'lungs',
            'scuba'
          )
        }

        this.indiceQuality = aq
      })
    // console.log("temp :" + temp, aq, wind);
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
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
.carousel p {
  color: rgb(37, 169, 232);
}

body i {
  font-size: 2.2em;
  padding: 10px;
}

/* .btn {
  padding: 10px;
} */

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

.fas:hover {
  transform: rotate(360deg);
  transition: transform 5s;
}

.btn-dark-blue {
  background-color: #0e5da4;
  padding: 7px 70px !important;
  border-radius: 50px !important;
  color: white !important;
  width: 300px;
}

/* "Info Traffic RTM" Slide In Up*/
.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes slideInUp {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(30);
  }
}
@keyframes slideInUp {
  0% {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* MODAL DESIGN  */
.modal_header {
  color: rgb(37, 169, 232);
  display: block !important;
}
.modal_title {
  color: rgba(0, 0, 0, 0.7);
}
.modal_description::first-letter {
  text-transform: uppercase;
}
.modal_description {
  color: rgba(0, 0, 0, 0.3);
  font-size: 1rem;
}
.button_modal {
  border-radius: 20px;
  width: 200px;
  margin: 0 auto;
}
</style>
