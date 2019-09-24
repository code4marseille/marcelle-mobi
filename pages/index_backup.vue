<template>
  <div
    id="dashboardPage"
    class="d-flex flex-column justify-content-between"
    :style="{backgroundImage:'url('+activeBackground+')',  backgroundRepeat:'no-repeat', backgroundSize:'cover'}"
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
        <i class="fas fa-fan" style="animation:rotated infinite" :style="fanSpeed"></i>
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

    <div>
      <p>à faire aujourd'hui :</p>
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
      <b-button class="btn-dark-blue" pill variant="primary" to="/map">Trouver un moyen de transport</b-button>
    </div>

    <!-- INFOS RTM MODAL -->

    <div>
      <b-button id="show-btn" @click="show = !show">
        <div class="slideInUp">
          <img src="~/assets/images/up-arrow.svg" width="30px" alt />
          <p class="mb-0">Infos Traffic RTM</p>
        </div>
      </b-button>
      <transition name="slide-fade" :duration="5000">
        <b-modal
          id="bv-modal-example"
          scrollable
          size="xl"
          dialog-class="fixed-bottom"
          hide-footer
          v-model="show"
          no-fade
        >
          <template v-slot:modal-title>
            <h3 class="modal_header mx-3 mb-0 text-uppercase">perturbations en cours</h3>
          </template>
          <div v-for="alert in alertRtm" class="content-alert-rtm mt-3 text-center border-bottom">
            <h4 class="modal_title text-uppercase text-uppercase font-weight-bold">{{ alert[1] }}</h4>
            <p class="modal_date text-uppercase mb-1">{{ alert[0] }}</p>
            <p class="modal_description">{{ alert[2] }}</p>
          </div>
        </b-modal>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import Vuetify from 'vuetify/lib'
export default {
  computed: {
    textAirQuality() {
      switch (Math.round(this.indiceQuality)) {
        case 0:
          return 'lorem0'
        case 1:
          return 'lorem1'
        case 2:
          return 'lorem2'
        case 3:
          return 'lorem3'
        case 4:
          return 'lorem4'
        case 5:
          return 'lorem5'
        case 6:
          return 'lorem6'
        case 7:
          return 'lorem7'
        case 8:
          return 'lorem8'
        case 9:
          return 'lorem9'
        case 10:
          return 'au top'
        default:
          return 'neant'
      }
    }
  },
  created() {
    this.$axios.$get('/weathers/today').then(response => {
      // const temp = Math.round(response.main.temp)
      // this.temperature = temp
      // const weather = response.weather[0].main
      // const icone = '<i class="wi ' + this.weatherIcons[weather].icon + '"></i>'
      // this.weatherIcon = icone
      // const wind = Math.trunc(response.wind.speed * 3.6)
      // const wind = 50;
      // this.windSpeed = wind

      this.fanSpeed = {
        animationDuration: (20 / wind) * 3 + 's'
      }

      // this.windArrow = `<i class="fas fa-arrow-up" style="transform:rotate(${response.wind.deg}deg); "></i>`

      //   this.activites.forEach(element => {
      //     if (
      //       element.conditions.minTemp < temp &&
      //       element.conditions.maxTemp > temp &&
      //       element.conditions.minWind < wind &&
      //       element.conditions.maxWind > wind &&
      //       element.conditions.beau === this.weatherIcons[weather].clear
      //     ) {
      //       this.activitesProposees.push({
      //         nom: element.name.toUpperCase(),
      //         icon: element.icon
      //       })
      //     }
      //   })
    })

    this.$axios
      .$get('http://marcelle-mobi-api.herokuapp.com/alerts/rtm')
      .then(response => {
        // let tabInfo = []
        response.forEach(e =>
          this.alertRtm.push(e.title.replace('-', '').split(':'))
        )
      })

    this.$axios.$get('/airs/quality').then(response => {
      const aq = Math.round(10 - response.data.aqi / 10)

      if (aq > 7) {
        this.activeBackground = this.activeBackground.replace(
          'lungs',
          'lavande'
        )
      } else if (aq < 4) {
        this.activeBackground = this.activeBackground.replace('lungs', 'scuba')
      }

      this.indiceQuality = aq
    })
  }
}
</script>

<style lang="scss">
#dashboardPage {
  background-color: rgb(37, 169, 232);
  color: white;
  text-align: center;
  font-size: 1.1em;
  text-transform: uppercase;
  min-height: 100vh;
  padding: 2vh;

  i {
    font-size: 2.2em;
    padding: 10px;
  }

  .indice-quality {
    font-size: 2em;
  }

  .fa-arrow-up {
    font-size: 1.5rem;
  }

  .fa-thermometer-half {
    font-size: 1rem;
  }

  @keyframes rotated {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* ------------------------------------------- */
  /* Buttons Dashboard */
  .btn-dark-blue {
    background-color: #0e5da4;
    padding: 7px 20px !important;
    border-radius: 50px !important;
    color: white !important;
    width: 330px;
  }

  .btn-secondary {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
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
}
/* ------------------------------------------- */
/* FONT MODAL DESIGN  */
.modal_header {
  color: rgb(37, 169, 232);
}

.modal_title {
  color: rgba(0, 0, 0, 0.7);
}

.modal_description::first-letter {
  text-transform: uppercase;
}

.modal_description {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  text-transform: lowercase;
}

.modal_date {
  color: #0e5da4;
  font-size: 1rem;
  text-transform: lowercase;
}
.modal_date::first-letter {
  text-transform: uppercase;
}

/* MODAL DESIGN  */
.modal-dialog-scrollable {
  max-height: 70%;
}

.modal-dialog {
  margin: 0 auto !important;
}

.modal-content {
  border-radius: 15px 15px 0px 0px;
}

.btn-dark-blue {
  background-color: #0e5da4;
  padding: 7px 70px !important;
  border-radius: 50px !important;
  color: white !important;
  width: 300px;
}
</style>
