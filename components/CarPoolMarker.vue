<template>
  <l-marker :lat-lng="[carPool.lat,carPool.lng]" :visible="visible">
    <l-popup style="text-align:center">
      <h6>Aire de co-voiturage</h6>

      <p
        style="font-weight:bold; font-size:1rem;"
      >{{carPool.name.replace("Aire de covoiturage ","")}}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        <a :href="googleMap(carPool.lat,carPool.lng)" target="_blank">S'y rendre</a>
      </p>
    </l-popup>

    <l-icon :icon-url="marker.image" style="width:40px, height:40px"></l-icon>
    <!-- <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/carPool.png')"></l-icon> -->
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
  },
  data() {
    return {
      iconColor: {},
      marker: {
        image: require('~/assets/images/covoit.png')
      }
    }
  },
  created() {
    console.log(this.carPool)
  }
}
</script>
<style lang="scss">
.leaflet-marker-icon {
  width: 40px !important;
  height: 40px !important;
}
</style>
