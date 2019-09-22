<template>
  <div id="mapPage">
    <div id="position">
      <l-map id="map" :zoom="15" :center="initialLocation" ref="map">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

        <CarMarker
          v-for="(car,i) in $store.state.map.cars"
          :key="'car'+i"
          :car="car"
          :select="selectVehicule"
          provider="citiz"
        />

        <BikeMarker
          v-for="(bike,i) in $store.state.map.bikes"
          :key="'bike'+i"
          :bike="bike"
          :select="selectVehicule"
          provider="leVelo"
        />

        <TrotMarker
          v-for="(trot,i) in $store.state.map.trots"
          :key="'trot'+i"
          :trot="trot"
          :select="selectVehicule"
          :provider="trot.typename"
        />

        <Locatecontrol />
      </l-map>

      <MapFilter />
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import Locatecontrol from 'vue2-leaflet-locatecontrol'
import MapFilter from '~/components/MapFilter.vue'
import CarMarker from '~/components/CarMarker.vue'
import BikeMarker from '~/components/BikeMarker.vue'
import TrotMarker from '~/components/TrotMarker.vue'

export default {
  components: {
    Locatecontrol,
    LMap,
    LTileLayer,
    MapFilter,
    CarMarker,
    BikeMarker,
    TrotMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
    }
  },
  created() {
    this.$store.dispatch('map/fetchCars')
    this.$store.dispatch('map/fetchTrots')
    this.$store.dispatch('map/fetchBikes')
  },
  methods: {
    flyTo(latLng, zoom) {
      this.$refs.map.mapObject.flyTo(latLng, zoom)
    },
    selectVehicule(latLng, car, provider) {
      this.flyTo(latLng, 18)
      this.$store.commit('map/SELECT_VEHICULE', car, provider)
    }
  }
}
</script>

<style lang="scss">
#mapPage {
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

