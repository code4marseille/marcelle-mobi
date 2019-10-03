<template>
  <div id="mapPage">
    <div id="position">
      <l-map id="map" :zoom="16" :center="location" ref="map" @update:center="updateVehicules">
        <MapboxTile />
        <v-marker-cluster :options="clusterOptions">
          <VehiculeMarker
            v-for="(vehicule, i) in $store.getters['map/allVehicules']"
            :key="i"
            :vehicule="vehicule"
            :select="selectVehicule"
            :provider="vehicule.provider"
          />
        </v-marker-cluster>
        <LocateControl />
        <MapFilter :location="location"/>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet'
import * as L from 'leaflet'
import LocateControl from '~/components/LocateControl'
import MapFilter from '~/components/MapFilter.vue'
import VehiculeMarker from '~/components/VehiculeMarker.vue'
import MapboxTile from '~/components/MapboxTile.vue'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
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
      location: { lat: 43.295336, lng: 5.373907 },
      clusterOptions: {
        spiderfyOnMaxZoom: false,
        maxClusterRadius: 40,
        disableClusteringAtZoom: 17,
        iconCreateFunction: cluster => {
          var markers = cluster.getAllChildMarkers()
          var html = `<div>${markers.length}</div>`
          return L.divIcon({
            html: html,
            className: 'clusterMarker',
            iconSize: L.point(32, 32)
          })
        }
      }
    }
  },
  created() {
    this.$store.dispatch('map/fetchAllVehicles', this.location)
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
      this.location = center
      this.$store.dispatch('map/fetchTrots', center)
    }
  }
}
</script>

<style lang="scss">
#mapPage {
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
  .clusterMarker {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border: white 3px solid;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

