<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="10" :center="initialLocation" ref="map">
        <MapboxTile />
        <ChargingMarker
          v-for="(charging,i) in $store.state.parkingMap.chargingStations"
          :key="'c'+i"
          :charging="charging"
          :googleMap="googleRoute"
          :visible="toggleView"
        />

        <ParkingMarker
          v-for="(parking,i) in $store.state.parkingMap.parkingStations"
          :key="'p'+i"
          :parking="parking"
          :googleMap="googleRoute"
          :visible="!toggleView"
        />
        <Locatecontrol />
      </l-map>
    </div>

    <div class="fixed-bottom">
      <!-- Search Button -->
      <b-form inline v-show="!toggleView" @submit.prevent="onSubmit">
        <b-input
          id="inline-form-input-name"
          placeholder="Rechercher un parking"
          class="w-75"
          v-model="searchAddress"
        ></b-input>
        <b-button
          class="w-25"
          variant="dark"
          style="font-size:.9rem; padding:7px 0;"
          type="submit"
        >Chercher</b-button>
      </b-form>

      <!-- Fin Search button -->

      <!-- Block de bouttons -->
      <b-button block @click="this.toggleParkingButton">{{toggleButton}}</b-button>
    </div>
    <!-- Fin Block -->
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import Locatecontrol from '~/components/LocateControl'
import ChargingMarker from '~/components/ChargingMarker.vue'
import ParkingMarker from '~/components/ParkingMarker.vue'
import MapboxTile from '~/components/MapboxTile.vue'

export default {
  components: {
    LMap,
    Locatecontrol,
    ChargingMarker,
    ParkingMarker,
    MapboxTile
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      toggleView: true,
      searchAddress: ''
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
    async onSubmit(evt) {
      if (this.searchAddress == '') return
      let coord = await this.$axios.get(
        'https://api-adresse.data.gouv.fr/search/',
        { params: { q: this.searchAddress, limit: 1 } }
      )

      coord = coord.data.features[0].geometry.coordinates
      const marker = L.marker([coord[1], coord[0]])
      marker.addTo(this.$refs.map.mapObject)
      this.flyTo([coord[1], coord[0]], 18)
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

