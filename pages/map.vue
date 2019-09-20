<template>
  <div id="mapPage">
    <div id="position">
      <v-map id="map" :zoom="15" :center="initialLocation" ref="map">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>

        <template v-if="$store.state.map.seeCars">
          <l-marker
            v-for="(car,i) in $store.state.map.cars"
            :key="i"
            :lat-lng="[car.gpsLatitude,car.gpsLongitude]"
            @click="selectCar([car.gpsLatitude, car.gpsLongitude], car) "
            :icon="citizIcon"
          ></l-marker>
        </template>

        <v-locatecontrol />
      </v-map>

      <MapFilter />
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlZoom, LMarker } from 'vue2-leaflet'
import { latLng, Icon, icon, popup } from 'leaflet'
import Vue2LeafletLocatecontrol from '~/components/Vue2LeafletLocatecontrol'
import MapFilter from '~/components/MapFilter.vue'
import selectedVehicule from '~/components/selectedVehicule.vue'

export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
    MapFilter,
    selectedVehicule
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
    }
  },
  created() {
    this.$store.dispatch('map/fetchCars')
  },
  methods: {
    selectCar(latLng, car) {
      this.$refs.map.mapObject.flyTo(latLng, 18)
      this.$store.commit('map/SELECT_CAR', car)
    }
  },

  computed: {
    citizIcon() {
      return icon({
        iconUrl: require('~/assets/images/citiz_marker.svg'),
        iconSize: [40, 50] // size of the icon
        // iconAnchor: [0, 15] // point of the icon which will correspond to marker's location
        // popupAnchor: [-3, -76] // point from which the po
      })
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

  .myPop {
    width: auto;
    height: auto;
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

