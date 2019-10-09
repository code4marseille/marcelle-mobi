<template>
  <div id="mapPage">
    <div id="position">
      <l-map id="map" :center="location" :zoom="zoom" ref="map" @update:zoom="updateZoom">
        <MapboxTile />
        <l-wms-tile-layer
          base-url="http://geoservices.atmosud.org/geoserver/mod_sudpaca_2018/wms?"
          layers="mod_sudpaca_2018_no2_moyan"
          format="image/png"
          layer-type="base"
          :transparent="true"
          :opacity="0.3"
          :visible="$store.state.map.polVisible"
        />
        <LocateControl />
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LWMSTileLayer } from 'vue2-leaflet'
import * as L from 'leaflet'
import LocateControl from '~/components/LocateControl'
import MapboxTile from '~/components/MapboxTile.vue'

export default {
  components: {
    LMap,
    LocateControl,
    'l-wms-tile-layer': LWMSTileLayer,
    MapboxTile
  },
  data() {
    return {
      location: { lat: 43.295336, lng: 5.373907 },
      zoom: 13
    }
  },
  created() {
    this.$store.dispatch('map/fetchAllVehicles', this.location)
    this.$store.commit('map/RESET_MAP')
    this.$store.commit('map/TOGGLE_POL')
  },
  methods: {
    flyTo(latLng, zoom) {
      this.$refs.map.mapObject.flyTo(latLng, zoom)
    },
    togglePolMap() {
      this.isVisible = !this.isVisible
      this.zoomUpdated(13)
    },
    updateZoom(zoom) {
      this.zoom = zoom
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

