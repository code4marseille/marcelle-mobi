<template>
  <div class="modalDetails">
    <b-collapse :visible="$store.state.marius.seeModal">
      <div
        class="mx-auto modal-dialog-scrollable modal-lg rounded-top bg-secondary border-0"
        style="height: 80vh;"
      >
        <div class="modal-body">
          <p class="mt-2 text-white text-center">CE QUE MARIUS TE PROPOSE : (TEST SAFE MODE)</p>
          <a
            class="bg-light itineraries px-3 py-3 d-flex justify-content-between"
            v-for="(alternativesDetails, i) in $store.getters['marius/alternativesDetails']"
            :key="i"
            :href="gMap(i, alternativesDetails.mode)"
            target="_blank"
            @click="displayButtons"
          >
            <div>
              <p class="text-left mb-0 pb-1 font-weight-bold">{{modes[alternativesDetails.mode]}}</p>
              <p
                class="text-left mb-0 pb-1"
              >Emission de Co2 : {{Math.round(alternativesDetails.co2)}} g/km</p>
              <p class="text-left mb-0 pb-1">Durée : {{alternativesDetails.duration}} min</p>
            </div>

            <div>
              <img
                class="iconVehicule"
                :style="{borderBottom: `3px solid ${colors[i]} !important`}"
                :src="require('assets/images/' + alternativesDetails.mode +`.svg`)"
              />
            </div>
          </a>
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
  },
  data: () => ({
    modes: {
      walking: 'Transport en commun',
      bike: 'Vélo',
      bss: 'LeVélo et/ou marche à pied',
      car: 'En voiture'
    }
  }),
  methods: {
    gMap: function(i, traveltype) {
      let origin = this.$store.getters['marius/latLngsAlternatives'][i][0]
      let destination = this.$store.getters['marius/latLngsAlternatives'][i][
        this.$store.getters['marius/latLngsAlternatives'][i].length - 1
      ]

      let travelmode
      switch (traveltype) {
        case 'bike':
          travelmode = 'bicycling'
          break
        case 'bss':
          travelmode = 'walking'
          break
        case 'car':
          travelmode = 'driving'
          break
        case 'walking':
          travelmode = 'transit'
          break
      }

      return `https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${
        origin[1]
      }&destination=${destination[0]},${
        destination[1]
      }&travelmode=${travelmode}`
    },

    displayButtons: function() {
      console.log('BUTTONS')
      // this.$router.push({
      //   path: '/buttons'
      // })
    }
  }
}
</script>

<style lang="scss">
.modalDetails {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  .iconVehicule {
    width: 50px;
    height: 50px;
  }

  #modalTop {
    z-index: 0;
    background-color: #25a9e8;
    border-radius: 0px;
  }

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
