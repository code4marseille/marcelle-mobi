<template>
  <div id="mapPage">
    <div id="position">
      <l-map
        id="map"
        :zoom="16"
        :center="initialLocation"
        ref="map"
        @update:center="updateVehicules"
      >
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`"
        ></l-tile-layer>

        <CarMarker
          v-for="(car,i) in $store.state.map.cars"
          :key="'car'+i"
          :car="car"
          :select="selectVehicule"
          :provider="car.provider"
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

        <LocateControl />
        <MapFilter />
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import LocateControl from '~/components/LocateControl'

import MapFilter from '~/components/MapFilter.vue'
import CarMarker from '~/components/CarMarker.vue'
import BikeMarker from '~/components/BikeMarker.vue'
import TrotMarker from '~/components/TrotMarker.vue'

export default {
  components: {
    LocateControl,
    LMap,
    LTileLayer,
    MapFilter,
    CarMarker,
    BikeMarker,
    TrotMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      mapBoxToken:
        'pk.eyJ1Ijoia2V2aW5iZXJ0aGllciIsImEiOiJjazB3NzVheWYwa282M2NvY3pxb2UxejBnIn0.mb5T4YX7EH2NZGxa4c9RxQ'
    }
  },
  created() {
    this.$store.dispatch('map/fetchCitiz')
    this.$store.dispatch('map/fetchTotems')
    this.$store.dispatch('map/fetchTrots', {
      lat: this.initialLocation[0],
      lng: this.initialLocation[1]
    })
    this.$store.dispatch('map/fetchBikes')
  },
  methods: {
    flyTo(latLng, zoom) {
      this.$refs.map.mapObject.flyTo(latLng, zoom)
    },
    selectVehicule(latLng, vehicule, provider) {
      this.flyTo(latLng, 18)
      this.$store.commit('map/SELECT_VEHICULE', { vehicule, provider })
    },
    updateVehicules(center) {
      this.$store.dispatch('map/fetchTrots', center)
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
    display: flex;
  }

  #map {
    width: 100wh;
    height: 100vh;
    position: relative;
    display: flex;
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

