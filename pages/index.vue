<template>
  <div
    id="dashboardPage"
    class="d-flex flex-column justify-content-between"
    :style="{backgroundImage:'url('+$store.state.dashboard.activeBackground+')', backgroundSize:'cover'}"
  >
    <header>
      <!--<Navbar /> -->
      <div class="display-4">Marseille</div>
    </header>

    <div>
      <p>
        <i :class="['wi', $store.state.dashboard.weather.icon]"></i>
        <!-- {{ weatherIcon}}  -->
        <!-- {{ }} -->
        <i class="fas fa-thermometer-half"></i>
        <span class="indice-quality">{{$store.state.dashboard.temperature}}</span>
        °C
      </p>
      <p>
        <i
          class="fas fa-fan"
          style="animation:rotated infinite"
          :style="$store.state.dashboard.speedRotation"
        ></i>
        <i class="fas fa-arrow-up" :style="$store.state.dashboard.orientation"></i>
        <span class="indice-quality">{{ $store.state.dashboard.windSpeed }}</span>
        <span class="text-lowercase">km/h</span>
      </p>
    </div>
    <!-- air quality -->
    <div>
      <div
        style="margin:0; padding:0"
        v-b-tooltip.hover
        title="Les stations de contrôle de la qualité de l’air de GAIA utilisent des capteurs de particules laser de haute technologie pour mesurer en temps réel la pollution par les P2,5, l’un des polluants les plus nocifs."
      >
        <i class="fas fa-wind"></i>
        <span class="indice-quality">{{ $store.state.dashboard.airQuality}}</span> /10
        <span class="ml-3 indice-quality">{{ $store.state.dashboard.airQualitySummary}}</span>

        <div>{{$store.state.dashboard.airQualityText}}</div>
      </div>
    </div>
    <!-- what to do today -->
    <div>
      <p>à faire aujourd'hui :</p>
      <div class="activitiesProposees d-flex justify-content-around">
        <span v-for="(act, id) in $store.getters['dashboard/activitesProposees']" :key="id">
          <b-button v-b-tooltip.hover :title="act.name" class="p-0">
            <i class="fa" :class="act.icon"></i>
          </b-button>
        </span>
      </div>
    </div>
    <div>
      <b-button class="btn-dark-blue" pill variant="primary" to="/map">Trouver un moyen de transport</b-button>
    </div>
    <div>
      <b-button id="show-btn" @click="show = !show">
        <div class="slideInUp">
          <img src="~/assets/images/up-arrow.svg" width="30px" alt />
          <p class="mb-0">Infos Trafic RTM</p>
        </div>
      </b-button>
      <b-collapse id="collapse-1-inner" class="fixed-bottom" :visible="show">
        <div tabindex="-1" role="dialog" aria-hidden="true">
          <div
            class="modal-dialog modal-dialog-scrollable modal-lg"
            role="document"
            style="height: 80vh;"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal_header mx-3 mb-0 text-uppercase text-center">Perturbations en cours</h3>
                <button type="button" class="close" @click="show = !show">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div
                  v-for="(alert, id) in $store.state.dashboard.alertsRtm"
                  :key="id"
                  class="content-alert-rtm mt-3 text-center border-bottom"
                >
                  <h4 class="modal_title text-uppercase font-weight-bold">{{ alert[1] }}</h4>
                  <p class="modal_date text-uppercase mb-1">{{ alert[0] }}</p>
                  <p class="modal_description">{{ alert[2] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {
    this.$store.dispatch('dashboard/fetchAirQuality')
    this.$store.dispatch('dashboard/fetchWeather')
    this.$store.dispatch('dashboard/fetchAlertsRtm')
  }
}
</script>


<style lang="scss">
#dashboardPage {
  background-color: rgb(37, 169, 232);
  color: white;
  text-align: center;
  font-size: 1.1em;
  min-height: 100vh;
  padding: 2vh;

  i {
    font-size: 2.2em;
    padding: 10px;
  }

  .indice-quality {
    font-size: 2em;
  }

  .fa-thermometer-half {
    font-size: 1rem;
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
