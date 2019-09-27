<template>
  <l-marker :lat-lng="[lngLat[1], lngLat[0]]"></l-marker>
  <!--<l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>-->
</template>

<script>
import { LMarker, LPolyline } from 'vue2-leaflet'

export default {
  components: { LMarker, LPolyline },

  props: {
    lngLat: { type: Array, required: true }
  },

  data() {
    return {
      polyline: {
        latlngs: [],
        color: 'green'
      }
    }
  }
}
</script>

