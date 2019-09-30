<template>
  <l-marker :lat-lng="[carPool.lat,carPool.lng]" :visible="visible">
    <l-popup style="text-align:center">
      <p style="font-weight:bold; font-size:1rem;">{{carPool.name}}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        <a :href="googleMap(carPool.lat,carPool.lng)" target="_blank">S'y rendre</a>
      </p>
    </l-popup>
    <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/carPool.png')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    carPool: { type: Object, required: true },
    googleMap: { type: Function, required: true },
    visible: { type: Boolean, required: true }
  }
}
</script>
