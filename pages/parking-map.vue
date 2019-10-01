<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="13" :center="initialLocation" ref="map">
        <MapboxTile />

        <b-form @submit.prevent="onSubmit" inline style="justify-content:center" class="mt-3">
          <b-input
            id="inline-form-input-name "
            placeholder="Rechercher une adresse"
            v-model="searchAddress"
            style="width:60%; z-index:1000; border-radius: 5px 0px 0px 5px"
            class="ml-3"
          ></b-input>
          <b-button
            variant="dark"
            type="submit"
            style="width:10%; z-index:1000; border-radius: 0px 5px 5px 0px"
            class="px-1"
          >Go</b-button>
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
        <Locatecontrol />
      </l-map>
    </div>

    <div class="fixed-bottom">
      <div>
        <b-button-group style="display:flex; justify-content:center" class="filter">
          <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            :pressed.sync="btn.state"
            variant="primary"
            size="sm"
            class="select_btn borderCentral"
          >
            <img :src="btn.icon" alt class="icon_filterbar" />
            <p class="text_filterbar">{{ btn.caption }}</p>
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
      </div>
      <!-- Fin Block -->
    </div>
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
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
          icon: require('~/assets/images/Parking_icon.svg')
        },
        {
          caption: 'Covoiturage',
          state: true,
          icon: require('~/assets/images/covoiturage.svg')
        }
      ]
    }
  },
  computed: {
    toggleButton() {
      return this.toggleView
        ? 'Afficher les parkings'
        : 'Afficher les bornes de recharge'
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
    toggleParkingButton() {
      this.toggleView = !this.toggleView
    },

    GetMpmAddress(addresses) {
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
      if (found != undefined) {
        return found
      } else return false
    },

    async onSubmit(evt) {
      if (this.searchAddress == '') return
      let coord = await this.$axios.get(
        'https://api-adresse.data.gouv.fr/search/',
        { params: { q: this.searchAddress, limit: 1000 } }
      )
      const found = this.GetMpmAddress(coord)
      if (found) {
        const lat = found.geometry.coordinates[1]
        const lng = found.geometry.coordinates[0]

        //      coord = coord.data.features[0].geometry.coordinates
        // const marker = L.marker([coord[1], coord[0]])

        L.marker([lat, lng]).addTo(this.$refs.map.mapObject)
        this.flyTo([lat, lng], 18)
      } else {
        this.$bvModal.show('notFound')
      }
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

  .leaflet-control-attribution {
    display: none;
  }

  .h_iframe iframe {
    width: 100%;
    height: 100%;
  }
  .h_iframe {
    height: 100%;
    width: 100%;
  }

  // DESIGN FILTER CARD
  .fixed-bottom {
    z-index: 450;
    padding: 20px;
  }

  .borderCentral {
    border-right: 1px solid rgba(182, 181, 181, 0.7) !important;
    border-left: 1px solid rgba(182, 181, 181, 0.7) !important;
  }

  .select_btn {
    background-color: rgb(250, 250, 250) !important;
    opacity: 1 !important;
    border: none;
    box-shadow: none;
  }

  .select_btn.active {
    background-color: #bde5f3 !important;
    outline: 1.4px solid #0e5da4 !important;
    box-shadow: none;
    z-index: 3;
  }

  .icon_filterbar {
    min-width: 40px;
    min-height: 40px;
    margin-top: 5px;
  }

  .text_filterbar {
    color: rgba(0, 0, 0, 0.7);
    margin-top: 5px;
    margin-bottom: 2px;
  }
}
</style>

