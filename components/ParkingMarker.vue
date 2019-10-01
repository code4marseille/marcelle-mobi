<template>
  <l-marker
    :lat-lng="[parking.lat,parking.lng]"
    :visible="visible&&this.$store.getters.isInsidePerimeter(parking.lat,parking.lng)"
  >
    <l-popup style="text-align:center">
      <h6>Parking</h6>

      <p style="font-weight:bold; font-size:1rem;">{{parking.name}}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        <a
          :href="this.googleMap(parking.lat,parking.lng)"
          target="_blank"
        >{{parking.way}}, {{parking.pCodeSeo}} {{parking.townSeo}}</a>
      </p>
      <p v-if="parking.openingHours">
        <i class="fas fa-comment"></i>
        {{parking.openingHours}}
      </p>
      <p v-if="parking.additionalInfo.teasing">
        <i class="fas fa-comment-dots"></i>
        {{parking.additionalInfo.teasing.replace(/<[^>]*>?/gm, '')}}
      </p>
      <p v-if="parking.additionalInfo.reservationTemplatizedUrl">
        <i class="fas fa-link"></i>
        <a :href="parking.additionalInfo.reservationTemplatizedUrl" target="_blank">Visitez le site</a>
      </p>
      <p></p>
    </l-popup>
    <l-icon
      icon-url="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
    ></l-icon>
    <!-- <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/parking.png')"></l-icon> -->
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    parking: { type: Object, required: true },
    googleMap: { type: Function, required: true },
    visible: { type: Boolean, required: true }
  }
}
</script>

