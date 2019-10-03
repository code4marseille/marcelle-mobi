<template>
  <div>
    <div class="filterGo">
      <transition name="slide">
        <div v-if="$store.state.marius.seeModal" id="filter" class="container">
          <div class="row justify-content-between mx-0">
            <p class="text-left text-white ml-5 mb-1">CE QUE TU FAIS ACTUELLEMENT:</p>
          </div>
          <div class="bg-light Itineraries">
            <p class="text-left mb-1">Mode: {{$store.getters['marius/getMode']}}</p>
            <p
              class="text-left mb-1"
            >Emission de Co2: {{$store.getters['marius/co2current']}} g/km Co2</p>
            <p class="text-left mb-1">Durée: {{$store.getters['marius/durationcurrent']}} min</p>
            <img
              class="iconVehicule"
              :src="require('assets/images/' + $store.getters['marius/getMode'] +`.svg`)"
            />
          </div>
          <div class="row justify-content-between mx-0">
            <p class="text-left mb-1 ml-5 text-white">CE QUE MARIUS TE PROPOSE:</p>
          </div>
          <div
            class="bg-light Itineraries"
            v-for="(AlternativesDetails, j) in $store.getters  ['marius/AlternativesDetails']"
            :key="j"
          >
            <p class="text-left mb-0 pb-1">Mode: {{AlternativesDetails.mode}}</p>
            <p class="text-left mb-0 pb-1">Emission de Co2: {{AlternativesDetails.co2}} g/km Co2</p>
            <p class="text-left mb-0 pb-1">Durée: {{AlternativesDetails.duration}} min</p>
            <div>
              <img
                class="iconVehicule"
                :src="require('assets/images/' + AlternativesDetails.mode +`.svg`)"
              />
            </div>
          </div>
        </div>
      </transition>
      <b-button id="modalTop" @click="$store.commit('marius/TOGGLE_MODAL')" block>
        <i class="fas fa-chevron-up"></i>
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {}
}
</script>

<style lang="scss">
.iconVehicule {
  width: 50px;
  height: 50px;
}

.Itineraries {
  border-radius: 5px;
  padding: 3px;
  margin: 3px;
}

#modalTop {
  z-index: 9999;
  background-color: #25a9e8;
  border-radius: 0px;
}

.filterGo {
  width: 100%;
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;

  .active {
    background-color: rgba(187, 231, 255, 0.38);
  }

  #filter {
    z-index: 800;
    text-align: center;
    background-color: aliceblue;
    width: 100%;
    transition: transform 0.2s linear;
    max-width: 100%;
    padding: 5px;
    background-color: #25a9e8;
    margin-bottom: 0;
    border-radius: 0px;
  }

  .slide-enter-active,
  .slide-leave-active {
    transform: translateY(600px);
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(600px);
  }
}
</style>
