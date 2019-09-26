<template>
  <l-marker :lat-lng="[parking.lat,parking.lng]">
    <l-popup style="text-align:center">
      <p style="font-weight:bold; font-size:1rem;">{{parking.name}}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        {{parking.way}}, {{parking.pCodeSeo}} {{parking.townSeo}}
      </p>
      <p v-if="parking.openingHours">
        <i class="fas fa-comment"></i>
        {{parking.openingHours}}
      </p>
      <p v-if="parking.additionalInfo.teasing">
        <i class="fas fa-comment-dots"></i>
        {{parking.additionalInfo.teasing.replace(/<[^>]*>?/gm, '')}}
      </p>

      <p></p>
    </l-popup>
    <l-icon :icon-size="[40, 40]" :icon-url="require('~/assets/images/parking.png')"></l-icon>
  </l-marker>
</template>

<script>
import { LMarker, LIcon } from 'vue2-leaflet'
import { icon } from 'leaflet'

export default {
  components: { LMarker, LIcon },
  props: {
    parking: { type: Array, required: true }
  },
  created: function() {
    // debugger
  },
  computed: {
    clearTag(html) {}
  }
}
</script>
