<template>
  <div id="mapPage">
    <div id="position">
      <l-map id="map" :zoom="zoom" :center="center" ref="map">
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`"
        ></l-tile-layer>
        <l-polyline
          :lStyle="{
            offset:  3,
          }"
          :lat-lngs="$store.getters['marius/latLngs']"
          color="green"
          :weight="3"
        ></l-polyline>
        <l-polyline
          v-for="(latLngs, i ) in $store.getters['marius/latLngsAlternatives']"
          :key="i"
          :weight="4"
          :lat-lngs="latLngs"
          :lStyle="{
            offset: offsets[i],
          }"
          :color="colors[i]"
          linejoin="bevel"
        ></l-polyline>
      </l-map>
    </div>
    <ModalDetailsItineraries />
  </div>
</template>

<script>
import { latLngBounds, latLng } from 'leaflet'
import 'leaflet-polylineoffset'
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import ModalDetailsItineraries from '~/components/ModalDetailsItineraries.vue'

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    ModalDetailsItineraries
  },

  data() {
    return {
      mapBoxToken:
        'pk.eyJ1Ijoia2V2aW5iZXJ0aGllciIsImEiOiJjazB3NzVheWYwa282M2NvY3pxb2UxejBnIn0.mb5T4YX7EH2NZGxa4c9RxQ',
      zoom: 16,
      center: [43.29494, 5.374508],
      // bounds: latLngBounds($store.getters['marius/fitBounds'])
      offsets: [-1, -4, -2],
      colors: ['red', 'blue', 'orange']
    }
  },

  methods: {}
}
</script>

<style>
.test {
  transform: translateX(100px);
}

.animate-bottom {
  position: relative;
  animation: animatebottom 0.4s;
}

@keyframes animatebottom {
  from {
    bottom: -00px;
    opacity: 0;
  }

  to {
    bottom: 0;
    opacity: 1;
  }
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
</style>
