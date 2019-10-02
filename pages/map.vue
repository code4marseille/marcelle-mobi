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

        <v-btn class="mx-2 btn-refresh spin" fab light small @click="refreshMap">
          <v-icon dark>mdi-cached {{ isLoading ? 'fa-spin' : ''}}</v-icon>
        </v-btn>

        <LocateControl />
        <MapFilter />
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import LocateControl from '~/components/LocateControl'
import MapFilter from '~/components/MapFilter.vue'
import VehiculeMarker from '~/components/VehiculeMarker.vue'
import MapboxTile from '~/components/MapboxTile.vue'

export default {
  components: {
    LMap,
    LocateControl,
    MapFilter,
    VehiculeMarker,
    MapboxTile
  },
  data() {
    return {
      initialLocation: [43.295336, 5.373907],
      isLoading: false
    }
  },
  created() {
    this.$store.dispatch('map/fetchAllVehicles', {
      lat: this.initialLocation[0],
      lng: this.initialLocation[1]
    })
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
      this.initialLocation = center
      this.$store.dispatch('map/fetchTrots', center)
    },
    async refreshMap() {
      this.isLoading = true
      await this.$store.dispatch('map/fetchAllVehicles', {
        lat: this.initialLocation[0],
        lng: this.initialLocation[1]
      })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
#mapPage {
  .btn-refresh {
    position: fixed;
    right: 0.8vw;
    bottom: 30vh;
    z-index: 999;
  }

  .spinnerLoading {
    z-index: 1000;
    position: fixed;
    top: 50vh;
    left: 50vw;
  }
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

