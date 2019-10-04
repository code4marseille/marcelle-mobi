<template>
  <div id="mapPage">
    <div id="position">
      <l-map id="map" ref="map">
        <MapboxTile />
        <l-polyline
          :lStyle="{offset:  3}"
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
          line-join="bevel"
        ></l-polyline>
      </l-map>
    </div>
    <ModalDetailsItineraries :colors="colors" />
  </div>
</template>

<script>
import { latLngBounds, latLng } from 'leaflet'
import 'leaflet-polylineoffset'
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import ModalDetailsItineraries from '~/components/ModalDetailsItineraries.vue'
import MapboxTile from '~/components/MapboxTile'

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    MapboxTile,
    ModalDetailsItineraries
  },

  data() {
    return {
      offsets: [-1, -4, -2],
      colors: ['red', 'blue', 'orange']
    }
  },
  mounted() {
    this.$nextTick(() => {
      let allBounds = latLngBounds(this.$store.getters['marius/latLngs'])
      this.$store.getters['marius/latLngsAlternatives'].forEach(latLngs => {
        allBounds = allBounds.extend(latLngBounds(latLngs))
      })

      this.$refs.map.mapObject.fitBounds(allBounds)
    })
  }
}
</script>

<style>
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
