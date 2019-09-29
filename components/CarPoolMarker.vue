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

    <l-icon
      icon-url="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
    ></l-icon>
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
      iconColor: {}
    }
  },
  created() {
    var greenIcon = new L.Icon({
      iconUrl:
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    this.iconColor = greenIcon
  }
}
</script>
