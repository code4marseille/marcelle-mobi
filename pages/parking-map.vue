<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="13" :center="initialLocation" ref="map">
        <MapboxTile />

        <b-form @submit.prevent="onSubmit" inline style="z-index:468" class="mt-3 fixed-top">
          <div class="search_content">
            <b-input
              placeholder="Rechercher une adresse"
              v-model="searchAddress"
              class="ml-3 searchbox"
            ></b-input>
            <b-button type="submit" style="z-index:468" class="pr-3 text-right loupe">
              <i class="fas fa-search"></i>
            </b-button>
          </div>
        </b-form>

        <ChargingMarker
          v-for="(charging,i) in $store.state.parkingMap.chargingStations"
          :key="'c'+i"
          :charging="charging"
          :googleMap="googleRoute"
          :visible="buttons[0].state"
        />

        <ParkingMarker
          v-for="(parking,i) in $store.state.parkingMap.parkingStations"
          :key="'p'+i"
          :parking="parking"
          :googleMap="googleRoute"
          :visible="buttons[1].state"
        />

        <CarPoolMarker
          v-for="(carPool,i) in $store.state.parkingMap.carPoolStations"
          :key="'cP'+i"
          :carPool="carPool"
          :googleMap="googleRoute"
          :visible="buttons[2].state"
        />
        <l-marker v-if="markerLatLng" :lat-lng="markerLatLng"></l-marker>
        <Locatecontrol />
      </l-map>
    </div>

    <div class="fixed-bottom mx-3 mb-3" id="filter">
      <b-button-group style="display:flex; justify-content:center">
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.state"
          variant="light"
          size="sm"
          class="select_btn col-4 borderCentral pt-1"
        >
          <img :src="btn.icon" alt class="icon_filterbar" />
          <p class="text_filterbar mb-3">{{ btn.caption }}</p>
        </b-button>
      </b-button-group>

      <div>
        <b-modal
          title="BootstrapVue"
          id="notFound"
          style="display:flex; flex-direction:row; justify-content:center"
          ok-only
        >
          <p
            class="my-4"
            style="text-align:center"
          >Adresse non trouvée dans Marseille Provence Métropole</p>
          <img src="~/assets/images/mpm.png" style="width:100%" alt />
        </b-modal>
      </div>
      <!-- Fin Block -->
    </div>
  </div>
</template>

<script>
import { LMap, Lmarker } from 'vue2-leaflet'
import Locatecontrol from '~/components/LocateControl'
import ChargingMarker from '~/components/ChargingMarker.vue'
import ParkingMarker from '~/components/ParkingMarker.vue'
import CarPoolMarker from '~/components/CarPoolMarker.vue'
import MapboxTile from '~/components/MapboxTile.vue'

export default {
  components: {
    LMap,
    Locatecontrol,
    ChargingMarker,
    ParkingMarker,
    MapboxTile,
    CarPoolMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      markerLatLng: null,
      searchAddress: '',
      buttons: [
        {
          caption: 'Recharge',
          state: false,
          icon: require('~/assets/images/electric.svg')
        },
        {
          caption: 'Parkings',
          state: false,
          icon: require('~/assets/images/parking_marker.svg')
        },
        {
          caption: 'Covoiturage',
          state: true,
          icon: require('~/assets/images/covoiturage.svg')
        }
      ]
    }
  },
  methods: {
    flyTo(latLng, zoom) {
      this.$refs.map.mapObject.flyTo(latLng, zoom)
    },
    updateParking(center) {
      const coord = { latitude: center.lat, longitude: center.lng }
      this.$store.dispatch('parkingMap/fetchChargingStations', coord)
    },
    googleRoute(lat, long) {
      return (
        'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long
      )
    },
    getMpmAddress(addresses) {
      const coordMpm = this.$store.state.parkingMap.bbox.split(',')
      //coordMpm[0] = minLat
      //coordMpm[1] = minlng
      //coordMpm[2] = maxLat
      //coordMpm[3] = maxLng
      let found = addresses.data.features.find(
        city =>
          city.geometry.coordinates[1] <= coordMpm[2] &&
          city.geometry.coordinates[1] >= coordMpm[0] &&
          city.geometry.coordinates[0] <= coordMpm[3] &&
          city.geometry.coordinates[0] >= coordMpm[1]
      )
      return found || false
    },

    async onSubmit(evt) {
      if (this.searchAddress == '') return
      let coord = await this.$axios.get(
        'https://api-adresse.data.gouv.fr/search/',
        { params: { q: this.searchAddress, limit: 1 } }
      )
      const found = this.getMpmAddress(coord)
      if (!found) return this.$bvModal.show('notFound')

      const lat = found.geometry.coordinates[1]
      const lng = found.geometry.coordinates[0]
      this.markerLatLng = [lat, lng]
      this.flyTo([lat, lng], 18)
    }
  },
  created() {
    this.$store.dispatch('parkingMap/fetchChargingStations', {
      latitude: this.initialLocation[0],
      longitude: this.initialLocation[1]
    })
    this.$store.dispatch('parkingMap/fetchParkingStations', {
      lat: this.initialLocation[0],
      long: this.initialLocation[1]
    })
    this.$store.dispatch('parkingMap/fetchCarPoolStations')
  }
}
</script>

<style lang="scss">
.mt-3 > .form-inline {
  display: inline-block;
}

#parkingMapPage {
  height: 100%;
  width: 100%;
  margin: 0;

  .leaflet-left {
    right: 0 !important;
    padding-right: 10px;
    left: unset;
  }

  #position {
    position: relative;
  }

  #map {
    width: 100wh;
    height: 100vh;
  }

  .textFilter {
    font-size: 0.5rem;
    margin-bottom: 0;
  }

  // .leaflet-control-attribution {
  //   display: none;
  // }

  .h_iframe iframe {
    width: 100%;
    height: 100%;
  }
  .h_iframe {
    height: 100%;
    width: 100%;
  }

  // DESIGN FILTER CARD

  .icon_filterbar {
    width: 35px !important;
    height: 35px !important;
    margin-top: 5px;
  }

  .text_filterbar {
    color: rgba(0, 0, 0, 0.7);
    margin-top: 5px;
    margin-bottom: 2px;
  }

  #filter {
    background-color: aliceblue;
    height: 80px;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px gray;
    z-index: 469 !important;
  }

  .borderCentral:first-child {
    border-right: 1px solid rgba(182, 181, 181, 0.8) !important;
    border-radius: 10px 0 0 10px;
  }

  .borderCentral:last-child {
    border-left: 1px solid rgba(182, 181, 181, 0.8) !important;
    border-radius: 0 10px 10px 0;
  }

  .select_btn {
    background-color: transparent;
    height: 80px;
    border: transparent;
    outline: none !important;
  }

  .active {
    background-color: rgba(187, 231, 255, 0.38) !important;
    outline: none !important;
    border: 0;
  }

  .fa-search {
    color: #0e5da4;
  }

  .loupe {
    background-color: white;
    border: none;
    border-radius: 0px 10px 10px 0;
    height: 38px;
  }

  .searchbox {
    border: none;
    border-radius: 10px 0 0 10px;
    width: 100%;
    z-index: 468;
    margin-left: 0px !important;
  }

  .search_content {
    border-radius: 10px;
    border: 0.9px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    z-index: 468;
    display: flex;
    margin-left: 70px;
    margin-right: 50px;
    width: 100%;
  }
}

// .leaflet-popup {
//   position: absolute;
//   text-align: center;
//   bottom: 30px !important;
//   left: -120px !important;
// }
</style>

