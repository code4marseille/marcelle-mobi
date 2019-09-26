<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="15" :center="initialLocation" ref="parkingMap">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <div id="ViewChargingMarkers" v-if="toggleView">
          <ChargingMarker
            v-for="(charging,i) in $store.state.parkingMap.chargingStations"
            :key="i"
            :charging="charging"
            :googleMap="googleRoute"
          />
        </div>
        <div id="ViewParkinggMarkers" v-if="!toggleView">
          <ParkingMarker
            v-for="(parking,i) in $store.state.parkingMap.parkingStations"
            :key="i"
            :parking="parking"
            :googleMap="googleRoute"
          />
        </div>
        <Locatecontrol />
      </l-map>
    </div>
    <!-- Block de bouttons -->
    <div style="z-index:470; ">
      <b-button
        block
        style="z-index:470; padding:20px; opacity:.8; text-shadow:1px 0 black;"
        class="fixed-bottom"
        @click="this.toggleParkingButton"
      >{{toggleButton}}</b-button>
    </div>
    <!-- Fin Block -->
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import Locatecontrol from 'vue2-leaflet-locatecontrol'
import ChargingMarker from '~/components/ChargingMarker.vue'
import ParkingMarker from '~/components/ParkingMarker.vue'

export default {
  components: {
    Locatecontrol,
    LMap,
    LTileLayer,
    ChargingMarker,
    ParkingMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      toggleView: true,
      toggleButton: 'Afficher les parkings'
    }
  },

  methods: {
    flyTo(latLng, zoom) {
      this.$refs.parkingMap.mapObject.flyTo(latLng, zoom)
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
      switch (this.toggleView) {
        case true:
          this.toggleButton = 'Afficher les parkings'
          break

        default:
          this.toggleButton = 'Afficher les bornes de recharge'
          break
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
  }
}
</script>

<style lang="scss">
#parkingMapPage {
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
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
.h_iframe iframe {
  width: 100%;
  height: 100%;
}
.h_iframe {
  height: 100%;
  width: 100%;
}
</style>

