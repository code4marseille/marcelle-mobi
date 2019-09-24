<template>
  <div id="parkingMapPage">
    <div id="position">
      <l-map id="map" :zoom="15" :center="initialLocation" ref="parkingMap">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <ChargingMarker
          v-for="(charging,i) in $store.state.parkingMap.chargingStations"
          :key="'charging'+i"
          :charging="charging"
        />
        <Locatecontrol />
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import Locatecontrol from 'vue2-leaflet-locatecontrol'
import ChargingMarker from '~/components/ChargingMarker.vue'
export default {
  components: {
    Locatecontrol,
    LMap,
    LTileLayer,
    ChargingMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
    }
  },

  methods: {
    flyTo(latLng, zoom) {
      this.$refs.parkingMap.mapObject.flyTo(latLng, zoom)
    }
  },
  created() {
    this.$store.dispatch('parkingMap/fetchChargingStations')
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
</style>

