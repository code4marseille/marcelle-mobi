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
        <v-marker-cluster class="cluster">
          <VehiculeMarker
            v-for="(vehicule, i) in $store.getters['map/allVehicules']"
            :key="i"
            :vehicule="vehicule"
            :select="selectVehicule"
            :provider="vehicule.provider"
          />
        </v-marker-cluster>
        <v-btn class="mx-2 btn-refresh" fab light small color="green" @click="refreshMap">
          <v-icon dark>mdi-cached</v-icon>
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
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
export default {
  components: {
    LMap,
    LocateControl,
    MapFilter,
    VehiculeMarker,
    MapboxTile,
    'v-marker-cluster': Vue2LeafletMarkerCluster
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
    this.$store.dispatch('map/fetchRtms')
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
    },
    refreshMap() {
      this.$store.dispatch('map/fetchAllVehicles', {
        lat: this.initialLocation[0],
        lng: this.initialLocation[1]
      })
    }
  }
}
</script>

<style lang="scss">
#mapPage {
  .btn-refresh {
    position: fixed;
    left: 0.8vw;
    bottom: 30vh;
    z-index: 999;
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
.cluster {
  background: blue;
  color: white;
}
</style>

