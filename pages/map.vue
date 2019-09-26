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
        <MapboxTile />

        <VehiculeMarker
          v-for="(vehicule, i) in $store.getters['map/allVehicules']"
          :key="i"
          :vehicule="vehicule"
          :select="selectVehicule"
          :provider="vehicule.provider"
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
import VehiculeMarker from '~/components/VehiculeMarker.vue'
export default {
  components: {
    LocateControl,
    LMap,
    LTileLayer,
    MapFilter,
    LMarker,
    VehiculeMarker
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907]
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
      this.$store.commit('map/SELECT_VEHICULE', { vehicule })
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

