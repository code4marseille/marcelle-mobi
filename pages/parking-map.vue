<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="13" :center="initialLocation" ref="map">
        <MapboxTile />
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

    <div class="fixed-bottom container">
      <div>
        <b-button-group style="display:flex; justify-content:center">
          <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            :pressed.sync="btn.state"
            variant="primary"
            size="sm"
            style="padding:.5rem; margin:.1rem"
          >{{ btn.caption }}</b-button>
        </b-button-group>
        <b-form @submit.prevent="onSubmit" inline style="justify-content:center">
          <b-input
            id="inline-form-input-name "
            placeholder="Rechercher une adresse"
            v-model="searchAddress"
            style="width:55%"
          ></b-input>
          <b-button
            variant="dark"
            type="submit"
            style="width:45%"
            @click.prevent="onSubmit"
          >Chercher</b-button>
        </b-form>
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
        { caption: 'Borne de Recharge', state: false },
        { caption: 'Parkings', state: false },
        { caption: 'Zone de covoiturage', state: true }
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
    checkAddress(addresses) {
      addresses = addresses.data.features

      const coordinates = addresses.find(latlng =>
        this.$store.getters.isInsidePerimeter(
          latlng.geometry.coordinates[1],
          latlng.geometry.coordinates[0]
        )
      )

      if (coordinates != undefined) {
        return coordinates.geometry.coordinates.reverse()
      } else {
        return false
      }
    },
    async onSubmit(evt) {
      if (this.searchAddress == '') return
      let coord = await this.$axios.get(
        'https://api-adresse.data.gouv.fr/search/',
        { params: { q: this.searchAddress, limit: 1000 } }
      )
      // console.log('toto')

      const found = this.checkAddress(coord)

      if (found != false) {
        L.marker(found).addTo(this.$refs.map.mapObject)
        this.flyTo(found, 18)
      } else {
        this.$store.dispatch('changeStateModal', true)
      }
    }
  },
  created() {
    this.$store.dispatch('parkingMap/fetchChargingStations', {
      latitude: this.initialLocation[0],
      longitude: this.initialLocation[1]
    })
    //   this.$store.dispatch('parkingMap/fetchParkingStations', {
    //     lat: this.initialLocation[0],
    //     long: this.initialLocation[1]
    //   })
    //   this.$store.dispatch('parkingMap/fetchCarPoolStations')
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
  .fixed-bottom {
    z-index: 450;
    padding: 20px;
    opacity: 0.8;
    text-shadow: 1px 0 black;
  }
}
</style>

