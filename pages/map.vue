<template>
  <v-map id="map" :zoom="16" :center="initialLocation">
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-locatecontrol />
  </v-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import { latLng, Icon, icon } from 'leaflet'
import Vue2LeafletLocatecontrol from '~/components/Vue2LeafletLocatecontrol'

export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  data() {
    return {
      initialLocation: [59.93428, 30.335098]
    }
  }
}
</script>

<style>
#map {
  height: 100vh;
  width: 100vw;
}
</style>
