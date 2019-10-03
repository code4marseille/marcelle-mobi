<template>
  <div class="filterGo">
    <b-collapse :visible="$store.state.marius.seeModal">
      <div id="filter_itineraire" class="container">
        <div class="row justify-content-between mx-0">
          <p class="text-white moyen_transport">CE QUE TU FAIS ACTUELLEMENT:</p>
        </div>
        <div class="bg-light itineraries px-3 py-3 d-flex justify-content-between">
          <div>
            <p class="text-left mb-1">Moyen de transport : {{$store.getters['marius/getMode']}}</p>
            <p
              class="text-left mb-1"
            >Emission de Co2 : {{$store.getters['marius/co2current']}} g/km Co2</p>
            <p class="text-left mb-1">Durée : {{$store.getters['marius/durationcurrent']}} min</p>
          </div>

          <img
            class="iconVehicule transport_now"
            :src="require('assets/images/' + $store.getters['marius/getMode'] +`.svg`)"
          />
        </div>
        <div class="row justify-content-between mx-0">
          <p class="moyen_transport mt-2 text-white">CE QUE MARIUS TE PROPOSE :</p>
        </div>

        <div
          class="bg-light itineraries px-3 py-3 d-flex justify-content-between"
          v-for="(AlternativesDetails, i) in $store.getters  ['marius/AlternativesDetails']"
          :key="i"
        >
          <div>
            <p class="text-left mb-0 pb-1">Moyen de transport : {{AlternativesDetails.mode}}</p>
            <p class="text-left mb-0 pb-1">Emission de Co2 : {{AlternativesDetails.co2}} g/km Co2</p>
            <p class="text-left mb-0 pb-1">Durée : {{AlternativesDetails.duration}} min</p>
          </div>

          <div>
            <img
              class="iconVehicule"
              :style="{borderBottom: `3px solid ${colors[i]} !important`}"
              :src="require('assets/images/' + AlternativesDetails.mode +`.svg`)"
            />
          </div>
        </div>
      </div>
    </b-collapse>
    <b-button
      id="modalTop"
      @click="$store.commit('marius/TOGGLE_MODAL')"
      block
      class="modal_details_transport"
    >
      <i class="fas fa-chevron-up" v-if="!$store.state.marius.seeModal"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </b-button>
  </div>
</template>
<script>
export default {
  props: {
    colors: { type: Array, required: true }
  }
}
</script>

<style lang="scss">
.iconVehicule {
  width: 50px;
  height: 50px;
}

#modalTop {
  z-index: 469;
  background-color: #25a9e8;
  border-radius: 0px;
}

.filterGo {
  #filter_itineraire {
    text-align: center;
    width: 100% !important;
    background-color: #25a9e8;
    margin-bottom: 0 !important;
    border-radius: 20px 20px 0 0;
  }

  .itineraries {
    height: 103px;
    margin: 10px 7px;
    border-radius: 10px;
    position: relative;
  }

  .moyen_transport {
    margin: 0 auto;
  }

  .iconVehicule {
    position: absolute;
    top: 40px;
    right: 15px;
  }

  .transport_now {
    border-bottom: 3px solid green !important;
  }
}
</style>
